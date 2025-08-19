# NimbleLoop Technologies Website

ASP.NET Core Blazor WebAssembly application built with .NET 9.0. Contains a server-side ASP.NET Core application (`NimbleLoop.WebApp`) and a client-side Blazor WebAssembly application (`NimbleLoop.WebApp.Client`) with Entity Framework Identity authentication.

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Working Effectively

### Bootstrap and Build Process
- **CRITICAL**: Install .NET 9.0 SDK (default system has .NET 8.0 which will fail):
  - `wget https://dot.net/v1/dotnet-install.sh && chmod +x dotnet-install.sh`
  - `./dotnet-install.sh --version 9.0.100` -- takes 8 seconds. NEVER CANCEL.
  - `export PATH="/home/runner/.dotnet:$PATH"`
  - Verify: `dotnet --version` should return `9.0.100`

- **Build the application**:
  - `dotnet restore` -- takes 15 seconds. NEVER CANCEL. Set timeout to 60+ minutes.
  - `dotnet build --no-restore` -- takes 12 seconds. NEVER CANCEL. Set timeout to 60+ minutes.

- **Run tests** (currently no test projects exist):
  - `dotnet test --no-build --verbosity normal` -- completes in under 1 second

### Running the Application
- **ALWAYS run the bootstrapping steps first** before attempting to run the application
- **Start the server**:
  - `cd NimbleLoop.WebApp/NimbleLoop.WebApp`
  - `dotnet run` -- starts in 4-5 seconds. Application runs on:
    - HTTP: `http://localhost:5142`
    - HTTPS: `https://localhost:7060` (may have certificate warnings in development)

## Critical Database Configuration Issue

**CRITICAL**: The application is configured to use LocalDB (SQL Server) which **DOES NOT WORK on Linux**. The application will start successfully but **user registration and any database operations will fail** with:
```
PlatformNotSupportedException: LocalDB is not supported on this platform.
```

- The application can be built and the UI navigated successfully
- Pages like Home and Weather work fine (Weather shows mock data)
- **Registration/login functionality will fail** due to database connectivity issues
- This affects any Entity Framework operations

## Validation Scenarios

**ALWAYS manually validate any new code** using these specific scenarios after making changes:

### Basic Functionality Test
1. **Navigate to home page**: Verify "Hello, world!" message displays at `http://localhost:5142`
2. **Test Weather page**: Navigate to `/weather` - should display a data table with 5 weather forecasts
3. **Test Navigation**: Click between Home, Counter, Weather links - all should work

### Authentication System Test (Will Fail)
1. **Navigate to Register page**: `/Account/Register` - form should display
2. **Attempt registration**: Fill form with test data - **WILL FAIL** with LocalDB error
3. **Expected behavior**: 500 Internal Server Error due to database configuration

### Manual Testing Commands
```bash
# Start application
export PATH="/home/runner/.dotnet:$PATH"
cd NimbleLoop.WebApp/NimbleLoop.WebApp
dotnet run

# In another terminal, test with curl:
curl -s http://localhost:5142 | grep "Hello, world"
curl -s http://localhost:5142/weather | grep "Weather"
```

## Project Structure and Navigation

### Key Directories
```
Website.sln                           # Visual Studio solution file
├── NimbleLoop.WebApp/               # Server-side ASP.NET Core application
│   ├── NimbleLoop.WebApp/
│   │   ├── Components/              # Razor components
│   │   │   ├── Pages/              # Main pages (Home.razor, Weather.razor)
│   │   │   ├── Account/            # Authentication pages (Register, Login)
│   │   │   └── Layout/             # Layout components
│   │   ├── Data/                   # Entity Framework context and models
│   │   │   ├── ApplicationDbContext.cs
│   │   │   ├── ApplicationUser.cs
│   │   │   └── Migrations/         # EF Core migrations
│   │   ├── Program.cs              # Application startup and configuration
│   │   ├── appsettings.json        # Configuration (contains LocalDB connection)
│   │   └── Properties/launchSettings.json
│   └── NimbleLoop.WebApp.Client/   # Client-side Blazor WebAssembly
│       ├── Pages/                  # Client-side pages (Counter.razor, Auth.razor)
│       └── Program.cs              # WebAssembly host configuration
├── .github/workflows/              # CI/CD pipelines
│   ├── build-and-test.yml         # Main build pipeline (.NET 9.0)
│   └── codeql.yml                  # Security analysis
└── README.md                       # Basic project information
```

### Common File Locations
- **Main application startup**: `NimbleLoop.WebApp/NimbleLoop.WebApp/Program.cs`
- **Database configuration**: `NimbleLoop.WebApp/NimbleLoop.WebApp/appsettings.json`
- **Shared components**: `NimbleLoop.WebApp/NimbleLoop.WebApp/Components/`
- **Authentication pages**: `NimbleLoop.WebApp/NimbleLoop.WebApp/Components/Account/Pages/`
- **Client-side pages**: `NimbleLoop.WebApp/NimbleLoop.WebApp.Client/Pages/`

## Build and CI Information

### GitHub Actions Workflows
- **Build pipeline**: `.github/workflows/build-and-test.yml`
  - Runs on Ubuntu with .NET 9.0
  - Steps: restore → build → test
  - **No additional validation steps required** - pipeline uses standard .NET commands

### No Linting or Formatting Tools
- **No EditorConfig, StyleCop, or linting tools configured**
- **No code formatting requirements** beyond standard .NET conventions
- CI pipeline **does not include linting steps**

## Common Development Tasks

### Adding New Pages
- **Server-side pages**: Add `.razor` files to `NimbleLoop.WebApp/Components/Pages/`
- **Client-side pages**: Add `.razor` files to `NimbleLoop.WebApp.Client/Pages/`
- **Update navigation**: Modify `NimbleLoop.WebApp/Components/Layout/` components

### Working with Authentication
- **Authentication logic**: `NimbleLoop.WebApp/Components/Account/`
- **User model**: `NimbleLoop.WebApp/Data/ApplicationUser.cs`
- **Database context**: `NimbleLoop.WebApp/Data/ApplicationDbContext.cs`
- **Remember**: Database operations will fail without LocalDB fix

### Making Changes to Dependencies
- **Server dependencies**: Edit `NimbleLoop.WebApp/NimbleLoop.WebApp/NimbleLoop.WebApp.csproj`
- **Client dependencies**: Edit `NimbleLoop.WebApp/NimbleLoop.WebApp.Client/NimbleLoop.WebApp.Client.csproj`
- **Always run `dotnet restore` after dependency changes**

## Timing Expectations

- **.NET SDK Installation**: 8 seconds
- **Package Restore**: 15 seconds - NEVER CANCEL
- **Build Process**: 12 seconds - NEVER CANCEL
- **Application Startup**: 4-5 seconds
- **Test Execution**: <1 second (no tests exist)

**NEVER CANCEL builds or long-running commands**. While current build times are fast, always set timeouts to 60+ minutes to handle potential system variations.

## Known Issues and Limitations

1. **Database Configuration**: LocalDB dependency prevents cross-platform development
2. **No Test Infrastructure**: No unit tests or integration tests exist
3. **HTTPS Warnings**: Development certificates may show warnings in browsers
4. **Registration/Login**: Will fail without database configuration changes

## Quick Reference Commands

```bash
# Complete setup from scratch
wget https://dot.net/v1/dotnet-install.sh && chmod +x dotnet-install.sh
./dotnet-install.sh --version 9.0.100
export PATH="/home/runner/.dotnet:$PATH"
dotnet restore
dotnet build --no-restore

# Run application
cd NimbleLoop.WebApp/NimbleLoop.WebApp
dotnet run

# Verify application is working
curl -s http://localhost:5142 | grep "Hello, world"
```