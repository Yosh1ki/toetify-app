# TOEIC Study App - Local Development Setup

This guide will help you set up the local development environment for the TOEIC Study App.

## Prerequisites

- **Docker Desktop**: Download and install from [docker.com](https://www.docker.com/products/docker-desktop)
- **Node.js**: Version 18 or higher
- **Homebrew** (macOS) or **npm** (for Supabase CLI installation)

## Quick Start

1. **Clone the repository and navigate to the project directory**

2. **Run the setup script**:

   ```bash
   ./scripts/setup-supabase.sh
   ```

3. **Copy environment variables**:

   ```bash
   cp .env.local .env
   ```

4. **Start the local Supabase environment**:
   ```bash
   supabase start
   ```

## Manual Setup (Alternative)

If you prefer to set up manually:

### 1. Install Supabase CLI

**macOS (Homebrew)**:

```bash
brew install supabase/tap/supabase
```

**npm (Cross-platform)**:

```bash
npm install -g supabase
```

### 2. Initialize Supabase

```bash
supabase init
```

### 3. Start Local Services

```bash
supabase start
```

## Environment Configuration

The project includes three environment files:

- `.env.local` - Local Supabase configuration
- `.env.development` - Development app configuration
- `.env.production` - Production app configuration

Copy the appropriate environment file to `.env` based on your needs:

```bash
# For local development
cp .env.development .env
```

## Available Services

Once started, you'll have access to:

| Service         | URL                                                     | Description            |
| --------------- | ------------------------------------------------------- | ---------------------- |
| Supabase Studio | http://localhost:54323                                  | Database management UI |
| API Gateway     | http://localhost:54321                                  | REST API endpoint      |
| Database        | postgresql://postgres:postgres@localhost:54322/postgres | Direct DB access       |
| Inbucket        | http://localhost:54324                                  | Email testing          |

## Database Schema

The local database is automatically initialized with:

- User management tables
- Question and answer tables
- Study session tracking
- Progress analytics
- Row Level Security (RLS) policies
- Sample questions for testing

## Useful Commands

```bash
# Check service status
supabase status

# Stop all services
supabase stop

# Reset database (WARNING: destroys all data)
supabase db reset

# Generate TypeScript types
supabase gen types typescript --local > types/supabase.ts

# View logs
supabase logs

# Access database shell
supabase db shell
```

## Troubleshooting

### Docker Issues

- Ensure Docker Desktop is running
- Check available ports (54321-54324)
- Try `docker system prune` if you encounter issues

### Port Conflicts

If you have port conflicts, you can modify the ports in `supabase/config.toml`:

```toml
[api]
port = 54321  # Change this if needed

[studio]
port = 54323  # Change this if needed
```

### Database Connection Issues

- Verify services are running: `supabase status`
- Check logs: `supabase logs`
- Reset if needed: `supabase db reset`

## Next Steps

After setup is complete:

1. Proceed to task 1.2 to initialize the Expo Router project
2. Configure the Supabase client in your React Native app
3. Test the database connection

## Security Notes

- The `.env.local` file contains default development keys
- **Never use these keys in production**
- Change all passwords and secrets before deploying
- The default JWT secret is for development only
