import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

/**
 * Health check endpoint for monitoring application status
 * 
 * @param request - The incoming request
 * @returns JSON response with health status
 */
export async function GET(request: NextRequest) {
  const startTime = Date.now()
  
  try {
    // Check database connectivity
    const { data: dbHealth, error: dbError } = await supabase
      .from('profiles')
      .select('count')
      .limit(1)
      .single()

    // Check environment variables
    const envCheck = {
      supabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      supabaseKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      nodeEnv: process.env.NODE_ENV,
    }

    // Calculate response time
    const responseTime = Date.now() - startTime

    // Determine overall health status
    const isHealthy = !dbError && envCheck.supabaseUrl && envCheck.supabaseKey
    const status = isHealthy ? 'healthy' : 'unhealthy'

    const healthData = {
      status,
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      responseTime: `${responseTime}ms`,
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      checks: {
        database: {
          status: dbError ? 'error' : 'ok',
          error: dbError?.message || null,
        },
        environment: {
          status: envCheck.supabaseUrl && envCheck.supabaseKey ? 'ok' : 'error',
          variables: envCheck,
        },
      },
      system: {
        memory: {
          used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
          total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
        },
        platform: process.platform,
        nodeVersion: process.version,
      },
    }

    return NextResponse.json(healthData, {
      status: isHealthy ? 200 : 503,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    })
  } catch (error) {
    const responseTime = Date.now() - startTime
    
    return NextResponse.json(
      {
        status: 'error',
        timestamp: new Date().toISOString(),
        responseTime: `${responseTime}ms`,
        error: error instanceof Error ? error.message : 'Unknown error',
        environment: process.env.NODE_ENV || 'development',
      },
      {
        status: 503,
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      }
    )
  }
}

/**
 * Handle HEAD requests for basic connectivity checks
 */
export async function HEAD() {
  return new NextResponse(null, { status: 200 })
}
