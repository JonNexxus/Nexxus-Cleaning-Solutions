#!/bin/bash

# ProjectX Deployment Script
# Usage: ./scripts/deploy.sh [environment] [app]
# Example: ./scripts/deploy.sh production web

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Default values
ENVIRONMENT=${1:-staging}
APP=${2:-web}
SKIP_TESTS=${SKIP_TESTS:-false}
SKIP_BUILD=${SKIP_BUILD:-false}

# Validate environment
if [[ ! "$ENVIRONMENT" =~ ^(development|staging|production)$ ]]; then
    echo -e "${RED}Error: Invalid environment '$ENVIRONMENT'. Must be one of: development, staging, production${NC}"
    exit 1
fi

# Validate app
if [[ ! "$APP" =~ ^(web|admin|all)$ ]]; then
    echo -e "${RED}Error: Invalid app '$APP'. Must be one of: web, admin, all${NC}"
    exit 1
fi

echo -e "${BLUE}🚀 Starting deployment for $APP to $ENVIRONMENT environment${NC}"

# Function to deploy a single app
deploy_app() {
    local app_name=$1
    echo -e "${YELLOW}📦 Deploying $app_name...${NC}"
    
    # Check if app directory exists
    if [ ! -d "apps/$app_name" ]; then
        echo -e "${RED}Error: App directory 'apps/$app_name' not found${NC}"
        return 1
    fi
    
    # Set environment variables
    if [ -f ".env.$ENVIRONMENT" ]; then
        echo -e "${BLUE}Loading environment variables from .env.$ENVIRONMENT${NC}"
        export $(cat .env.$ENVIRONMENT | grep -v '^#' | xargs)
    else
        echo -e "${YELLOW}Warning: .env.$ENVIRONMENT file not found${NC}"
    fi
    
    # Copy environment-specific env file to app
    if [ -f ".env.$ENVIRONMENT" ]; then
        cp ".env.$ENVIRONMENT" "apps/$app_name/.env.local"
        echo -e "${GREEN}✅ Environment variables copied to apps/$app_name/.env.local${NC}"
    fi
    
    # Install dependencies
    echo -e "${BLUE}📥 Installing dependencies...${NC}"
    npm install
    
    # Run tests (unless skipped)
    if [ "$SKIP_TESTS" != "true" ]; then
        echo -e "${BLUE}🧪 Running tests...${NC}"
        npm run test:$app_name || {
            echo -e "${RED}❌ Tests failed for $app_name${NC}"
            return 1
        }
        echo -e "${GREEN}✅ Tests passed for $app_name${NC}"
    else
        echo -e "${YELLOW}⚠️  Skipping tests${NC}"
    fi
    
    # Build the application (unless skipped)
    if [ "$SKIP_BUILD" != "true" ]; then
        echo -e "${BLUE}🔨 Building $app_name...${NC}"
        npm run build:$app_name || {
            echo -e "${RED}❌ Build failed for $app_name${NC}"
            return 1
        }
        echo -e "${GREEN}✅ Build completed for $app_name${NC}"
    else
        echo -e "${YELLOW}⚠️  Skipping build${NC}"
    fi
    
    # Run deployment based on environment
    case $ENVIRONMENT in
        "development")
            echo -e "${BLUE}🏃 Starting development server for $app_name...${NC}"
            npm run dev:$app_name
            ;;
        "staging")
            echo -e "${BLUE}🚀 Deploying to staging...${NC}"
            # Add your staging deployment commands here
            # Example: vercel --prod --token $VERCEL_TOKEN
            echo -e "${GREEN}✅ Deployed $app_name to staging${NC}"
            ;;
        "production")
            echo -e "${BLUE}🚀 Deploying to production...${NC}"
            # Add your production deployment commands here
            # Example: vercel --prod --token $VERCEL_TOKEN
            echo -e "${GREEN}✅ Deployed $app_name to production${NC}"
            ;;
    esac
}

# Pre-deployment checks
echo -e "${BLUE}🔍 Running pre-deployment checks...${NC}"

# Check if we're in the right directory
if [ ! -f "package.json" ] || [ ! -d "apps" ]; then
    echo -e "${RED}Error: This script must be run from the project root directory${NC}"
    exit 1
fi

# Check if required environment file exists for production
if [ "$ENVIRONMENT" = "production" ] && [ ! -f ".env.production" ]; then
    echo -e "${RED}Error: .env.production file is required for production deployment${NC}"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node --version)
echo -e "${BLUE}Node.js version: $NODE_VERSION${NC}"

# Check npm version
NPM_VERSION=$(npm --version)
echo -e "${BLUE}npm version: $NPM_VERSION${NC}"

# Deploy based on app selection
if [ "$APP" = "all" ]; then
    echo -e "${BLUE}🚀 Deploying all applications...${NC}"
    deploy_app "web"
    deploy_app "admin"
else
    deploy_app "$APP"
fi

# Post-deployment checks
echo -e "${BLUE}🔍 Running post-deployment checks...${NC}"

# Health check (if not development)
if [ "$ENVIRONMENT" != "development" ]; then
    sleep 5  # Wait for deployment to be ready
    
    if [ "$APP" = "web" ] || [ "$APP" = "all" ]; then
        echo -e "${BLUE}🏥 Checking web app health...${NC}"
        # Add health check URL based on your deployment
        # curl -f https://your-domain.com/api/health-check || echo "Health check failed"
    fi
    
    if [ "$APP" = "admin" ] || [ "$APP" = "all" ]; then
        echo -e "${BLUE}🏥 Checking admin app health...${NC}"
        # Add health check URL based on your deployment
        # curl -f https://admin.your-domain.com/api/health-check || echo "Health check failed"
    fi
fi

echo -e "${GREEN}🎉 Deployment completed successfully!${NC}"

# Cleanup
echo -e "${BLUE}🧹 Cleaning up...${NC}"
# Remove temporary environment files if needed
# rm -f apps/*/env.local

echo -e "${GREEN}✨ All done! Your application is now deployed to $ENVIRONMENT${NC}"
