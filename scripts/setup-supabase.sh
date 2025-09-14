#!/bin/bash

# Setup script for Supabase local development environment
# This script installs Supabase CLI and initializes the local environment

set -e

echo "🚀 Setting up Supabase local development environment..."

# Check if Homebrew is installed (macOS)
if command -v brew &> /dev/null; then
    echo "📦 Installing Supabase CLI via Homebrew..."
    brew install supabase/tap/supabase
elif command -v npm &> /dev/null; then
    echo "📦 Installing Supabase CLI via npm..."
    npm install -g supabase
else
    echo "❌ Neither Homebrew nor npm found. Please install one of them first."
    exit 1
fi

# Verify installation
if command -v supabase &> /dev/null; then
    echo "✅ Supabase CLI installed successfully"
    supabase --version
else
    echo "❌ Supabase CLI installation failed"
    exit 1
fi

# Initialize Supabase project if not already initialized
if [ ! -f "supabase/config.toml" ]; then
    echo "🔧 Initializing Supabase project..."
    supabase init
else
    echo "✅ Supabase project already initialized"
fi

# Check if Docker is running
if ! docker info &> /dev/null; then
    echo "❌ Docker is not running. Please start Docker Desktop and try again."
    exit 1
fi

echo "🐳 Starting Supabase local development environment..."
supabase start

echo "✅ Supabase setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Visit http://localhost:54323 to access Supabase Studio"
echo "2. Your local Supabase URL: http://localhost:54321"
echo "3. Run 'supabase status' to see all service URLs"
echo "4. Run 'supabase stop' to stop all services"
echo ""
echo "🔑 Default credentials:"
echo "- Studio: http://localhost:54323"
echo "- API URL: http://localhost:54321"
echo "- DB URL: postgresql://postgres:postgres@localhost:54322/postgres"