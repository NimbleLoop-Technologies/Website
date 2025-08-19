# NimbleLoop Technologies Website

ASP.NET Core Blazor WebAssembly application built with .NET 9.0.8 following **Clean Architecture** principles. The solution includes multiple layers for separation of concerns, comprehensive test coverage, and a modern web presentation layer with both server-side and client-side Blazor WebAssembly components.

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Application Architecture

### Clean Architecture Overview

The application follows **Clean Architecture** principles with clear separation of concerns across multiple layers. Dependencies flow inward toward the domain core, ensuring maintainability and testability.

#### Architecture Layers

**1. Domain Layer** (`NimbleLoop.WebApp.Domain`)
- **Purpose**: Contains core business entities, value objects, and domain logic
- **Dependencies**: No external dependencies (pure .NET)
- **Characteristics**: 
  - Independent of frameworks, UI, and data access
  - Contains business rules and domain models
  - Defines interfaces for repositories and services

**2. Application Layer** (`NimbleLoop.WebApp.Application`) 
- **Purpose**: Contains use cases, application services, and business workflows
- **Dependencies**: Domain layer only
- **Characteristics**:
  - Orchestrates domain objects to perform application use cases
  - Defines interfaces for external services
  - Contains application-specific business rules

**3. Infrastructure Layer** (`NimbleLoop.WebApp.Db`)
- **Purpose**: Implements data access, external services, and cross-cutting concerns
- **Dependencies**: Application and Domain layers
- **Characteristics**:
  - Entity Framework Core implementation
  - Repository pattern implementations
  - External API integrations
  - Database migrations and configurations

**4. Shared Layer** (`NimbleLoop.WebApp.Shared`)
- **Purpose**: Common components, DTOs, and utilities used across layers
- **Dependencies**: No project dependencies
- **Characteristics**:
  - Data Transfer Objects (DTOs)
  - Common utilities and extensions
  - Shared constants and enumerations

**5. Presentation Layer** (`NimbleLoop.WebApp` + `NimbleLoop.WebApp.Client`)
- **Purpose**: User interface and API controllers
- **Dependencies**: Application, Domain, Infrastructure, and Shared layers
- **Characteristics**:
  - Server-side Blazor components and pages
  - Client-side Blazor WebAssembly components
  - API controllers and authentication
  - Dependency injection configuration

#### Dependency Flow
```
Presentation → Application → Domain
     ↓             ↓
Infrastructure → Application
```

**Key Principles:**
- **Dependency Inversion**: High-level modules don't depend on low-level modules
- **Single Responsibility**: Each layer has a single, well-defined purpose
- **Testability**: Each layer can be tested in isolation using dependency injection
- **Maintainability**: Changes in outer layers don't affect inner layers

## Working Effectively

### Bootstrap and Build Process
- **CRITICAL**: Install .NET 9.0 SDK (default system has .NET 8.0 which will fail):
  - `wget https://dot.net/v1/dotnet-install.sh && chmod +x dotnet-install.sh`
  - `./dotnet-install.sh --version 9.0.8` -- takes 8 seconds. NEVER CANCEL.
  - `export PATH="/home/runner/.dotnet:$PATH"`
  - Verify: `dotnet --version` should return `9.0.8`

- **Build the application**:
  - `dotnet restore` -- takes 15 seconds. NEVER CANCEL. Set timeout to 60+ minutes.
  - `dotnet build --no-restore` -- takes 12 seconds. NEVER CANCEL. Set timeout to 60+ minutes.

- **Run tests** (comprehensive test suite available):
  - `dotnet test --no-build --verbosity normal` -- runs all test projects
  - **Domain Tests**: `dotnet test NimbleLoop.WebApp.Domain.Tests --no-build`
  - **Application Tests**: `dotnet test NimbleLoop.WebApp.Application.Tests --no-build`
  - **Database Tests**: `dotnet test NimbleLoop.WebApp.Db.Tests --no-build`
  - **UI Tests**: `dotnet test NimbleLoop.WebApp.Ui.Tests --no-build`

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

### Clean Architecture Solution Structure
```
Website.sln                                    # Visual Studio solution file
├── 📁 Presentation/                          # Presentation layer folder
│   ├── NimbleLoop.WebApp/                    # Server-side ASP.NET Core application
│   │   ├── Components/                       # Blazor components
│   │   │   ├── Pages/                       # Server-side pages
│   │   │   ├── Account/                     # Authentication components
│   │   │   └── Layout/                      # Layout components
│   │   ├── Data/                            # Legacy data models (to be migrated)
│   │   ├── Program.cs                       # Application startup and DI configuration
│   │   ├── appsettings.json                 # Configuration
│   │   └── wwwroot/                         # Static web assets
│   └── NimbleLoop.WebApp.Client/             # Client-side Blazor WebAssembly
│       ├── Pages/                           # Client-side pages (Counter.razor, Auth.razor)
│       ├── Program.cs                       # WebAssembly host configuration
│       └── wwwroot/                         # Client static assets
├── 📁 Core Layers/                          # Business logic layers
│   ├── NimbleLoop.WebApp.Domain/            # 🟦 Domain Layer (Core Business Logic)
│   │   ├── Entities/                        # Domain entities
│   │   ├── ValueObjects/                    # Value objects
│   │   ├── Interfaces/                      # Repository and service interfaces
│   │   └── DomainServices/                  # Domain services
│   ├── NimbleLoop.WebApp.Application/       # 🟩 Application Layer (Use Cases)
│   │   ├── UseCases/                        # Application use cases
│   │   ├── Services/                        # Application services
│   │   ├── Interfaces/                      # External service interfaces
│   │   └── DTOs/                            # Data Transfer Objects
│   └── NimbleLoop.WebApp.Shared/            # 🟨 Shared Layer (Common Components)
│       ├── DTOs/                            # Shared data transfer objects
│       ├── Extensions/                      # Extension methods
│       └── Constants/                       # Application constants
├── 📁 Infrastructure/                       # External concerns
│   └── NimbleLoop.WebApp.Db/                # 🟪 Infrastructure Layer (Data Access)
│       ├── Repositories/                    # Repository implementations
│       ├── Configurations/                  # EF Core configurations
│       ├── Migrations/                      # Database migrations
│       └── DbContext/                       # Database context
├── 📁 Tests/                               # Test projects (organized by layer)
│   ├── NimbleLoop.WebApp.Domain.Tests/     # 🧪 Domain layer tests (xUnit)
│   ├── NimbleLoop.WebApp.Application.Tests/ # 🧪 Application layer tests (xUnit)
│   ├── NimbleLoop.WebApp.Db.Tests/         # 🧪 Database layer tests (xUnit)
│   └── NimbleLoop.WebApp.Ui.Tests/         # 🧪 UI component tests (bUnit)
├── .github/workflows/                       # CI/CD pipelines
│   ├── build-and-test.yml                  # Main build pipeline (.NET 9.0.8)
│   └── codeql.yml                           # Security analysis
└── README.md                                # Project documentation
```

### Layer-Specific File Locations

#### Domain Layer (`NimbleLoop.WebApp.Domain`)
- **Entities**: Core business entities and aggregate roots
- **Interfaces**: `IRepository<T>`, `IDomainService` interfaces
- **Value Objects**: Immutable objects representing domain concepts
- **Domain Services**: Business logic that doesn't belong to a specific entity

#### Application Layer (`NimbleLoop.WebApp.Application`)
- **Use Cases**: Application-specific business workflows
- **Service Interfaces**: `IEmailService`, `IPaymentService`, etc.
- **DTOs**: Request/Response models for use cases
- **Validators**: Input validation logic

#### Infrastructure Layer (`NimbleLoop.WebApp.Db`)
- **Repository Implementations**: EF Core repository implementations
- **DbContext**: `ApplicationDbContext` for data access
- **Configurations**: EF Core entity configurations
- **Migrations**: Database schema migrations

#### Presentation Layer (`NimbleLoop.WebApp`)
- **Program.cs**: Dependency injection container configuration
- **Components/Pages**: Server-side Blazor pages
- **Components/Account**: Authentication and user management
- **Components/Layout**: Application layout components
- **appsettings.json**: Application configuration

#### Client Layer (`NimbleLoop.WebApp.Client`)
- **Pages**: Client-side Blazor WebAssembly pages
- **Program.cs**: WebAssembly host and service registration
- **wwwroot**: Client-side static assets

## Testing Architecture and Guidelines

### Test Project Structure

The solution includes comprehensive test coverage across all architectural layers using industry-standard testing frameworks:

#### 1. Domain Tests (`NimbleLoop.WebApp.Domain.Tests`)
- **Framework**: xUnit with .NET Test SDK
- **Purpose**: Unit tests for domain entities, value objects, and domain services
- **Scope**: Pure business logic testing without external dependencies
- **Key Features**:
  - Entity behavior validation
  - Domain service logic verification
  - Value object immutability and equality tests
  - Business rule enforcement tests

#### 2. Application Tests (`NimbleLoop.WebApp.Application.Tests`)
- **Framework**: xUnit with .NET Test SDK
- **Purpose**: Unit tests for use cases and application services
- **Scope**: Application workflow testing with mocked dependencies
- **Key Features**:
  - Use case orchestration testing
  - Application service integration tests
  - DTO mapping and validation tests
  - Mock repository and external service interactions

#### 3. Database Tests (`NimbleLoop.WebApp.Db.Tests`)
- **Framework**: xUnit with .NET Test SDK
- **Purpose**: Integration tests for data access layer
- **Scope**: Repository implementations and database operations
- **Key Features**:
  - Repository pattern implementation tests
  - Entity Framework configuration validation
  - Database migration tests
  - Query performance and optimization tests

#### 4. UI Tests (`NimbleLoop.WebApp.Ui.Tests`)
- **Framework**: bUnit (Blazor Unit Testing) with xUnit
- **Purpose**: Component-level testing for Blazor components
- **Scope**: UI component behavior and rendering tests
- **Key Features**:
  - Component rendering validation
  - User interaction simulation
  - Component state management tests
  - Event handling verification

### Testing Commands and Workflows

#### Running All Tests
```bash
# Run all tests across all projects
dotnet test --no-build --verbosity normal

# Run tests with coverage reporting
dotnet test --collect:"XPlat Code Coverage" --no-build
```

#### Layer-Specific Test Execution
```bash
# Domain layer tests only
dotnet test NimbleLoop.WebApp.Domain.Tests --no-build --verbosity normal

# Application layer tests only  
dotnet test NimbleLoop.WebApp.Application.Tests --no-build --verbosity normal

# Database integration tests only
dotnet test NimbleLoop.WebApp.Db.Tests --no-build --verbosity normal

# UI component tests only
dotnet test NimbleLoop.WebApp.Ui.Tests --no-build --verbosity normal
```

#### Test Development Guidelines

**Domain Tests Best Practices:**
- Test business logic in isolation
- Use pure domain objects without mocking
- Verify business rule enforcement
- Test entity lifecycle and state changes

**Application Tests Best Practices:**
- Mock external dependencies (repositories, services)
- Test complete use case workflows
- Verify proper exception handling
- Test authorization and validation logic

**Database Tests Best Practices:**
- Use in-memory databases for fast execution
- Test repository contract implementations
- Verify entity mappings and relationships
- Test complex queries and performance

**UI Tests Best Practices:**
- Test component rendering and lifecycle
- Simulate user interactions (clicks, form input)
- Verify component state changes
- Test component integration and communication

### Test Coverage Expectations

- **Domain Layer**: >90% coverage (critical business logic)
- **Application Layer**: >85% coverage (use case workflows)
- **Database Layer**: >80% coverage (data access patterns)
- **UI Layer**: >70% coverage (component behavior)

### Adding New Tests

**When adding new functionality, always include tests:**

1. **Domain changes**: Add corresponding domain tests for new entities/business rules
2. **Application changes**: Add use case tests with proper mocking
3. **Database changes**: Add repository tests for new data operations
4. **UI changes**: Add component tests for new Blazor components

**Test project dependencies are automatically configured:**
- Each test project references its corresponding layer project
- Test frameworks (xUnit, bUnit) are pre-configured
- Code coverage tools (coverlet) are included
- InternalsVisibleTo attributes enable testing of internal members

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

### Adding New Features (Clean Architecture Workflow)

**1. Domain-First Development:**
- **Add Domain Entities**: Create new entities in `NimbleLoop.WebApp.Domain/Entities/`
- **Define Domain Interfaces**: Add repository interfaces in `NimbleLoop.WebApp.Domain/Interfaces/`
- **Write Domain Tests**: Add corresponding tests in `NimbleLoop.WebApp.Domain.Tests/`

**2. Application Layer Development:**
- **Create Use Cases**: Add use case classes in `NimbleLoop.WebApp.Application/UseCases/`
- **Define DTOs**: Create data transfer objects in `NimbleLoop.WebApp.Application/DTOs/`
- **Write Application Tests**: Add tests in `NimbleLoop.WebApp.Application.Tests/`

**3. Infrastructure Implementation:**
- **Implement Repositories**: Add repository implementations in `NimbleLoop.WebApp.Db/Repositories/`
- **Configure Entity Mappings**: Add EF Core configurations in `NimbleLoop.WebApp.Db/Configurations/`
- **Write Database Tests**: Add integration tests in `NimbleLoop.WebApp.Db.Tests/`

**4. Presentation Layer:**
- **Server-side Pages**: Add `.razor` files to `NimbleLoop.WebApp/Components/Pages/`
- **Client-side Pages**: Add `.razor` files to `NimbleLoop.WebApp.Client/Pages/`
- **Update Navigation**: Modify `NimbleLoop.WebApp/Components/Layout/` components
- **Write UI Tests**: Add component tests in `NimbleLoop.WebApp.Ui.Tests/`

### Working with Authentication
- **Authentication Components**: `NimbleLoop.WebApp/Components/Account/`
- **User Entities**: Domain entities in `NimbleLoop.WebApp.Domain/Entities/`
- **Database Context**: `NimbleLoop.WebApp.Db/DbContext/ApplicationDbContext.cs`
- **Repository Implementations**: `NimbleLoop.WebApp.Db/Repositories/`

### Managing Dependencies

**Layer-Specific Dependencies:**
- **Domain**: `NimbleLoop.WebApp.Domain/NimbleLoop.WebApp.Domain.csproj` (minimal dependencies)
- **Application**: `NimbleLoop.WebApp.Application/NimbleLoop.WebApp.Application.csproj`
- **Infrastructure**: `NimbleLoop.WebApp.Db/NimbleLoop.WebApp.Db.csproj` (EF Core, external libraries)
- **Presentation**: `NimbleLoop.WebApp/NimbleLoop.WebApp/NimbleLoop.WebApp.csproj`
- **Client**: `NimbleLoop.WebApp.Client/NimbleLoop.WebApp.Client.csproj`
- **Shared**: `NimbleLoop.WebApp.Shared/NimbleLoop.WebApp.Shared.csproj`

**Always follow dependency rules:**
- Domain should have no external dependencies
- Application should only reference Domain
- Infrastructure can reference Application and Domain
- Presentation can reference all layers
- **Always run `dotnet restore` after dependency changes**

### Database Migrations
```bash
# Add new migration
dotnet ef migrations add MigrationName --project NimbleLoop.WebApp.Db --startup-project NimbleLoop.WebApp/NimbleLoop.WebApp

# Update database
dotnet ef database update --project NimbleLoop.WebApp.Db --startup-project NimbleLoop.WebApp/NimbleLoop.WebApp
```

## Timing Expectations

- **.NET SDK Installation**: 8 seconds
- **Package Restore**: 15 seconds - NEVER CANCEL
- **Build Process**: 12 seconds - NEVER CANCEL
- **Application Startup**: 4-5 seconds
- **Test Execution**: Variable by layer (comprehensive test suite available)
  - **Domain Tests**: <2 seconds (pure unit tests)
  - **Application Tests**: <5 seconds (mocked dependencies)
  - **Database Tests**: <10 seconds (integration tests)
  - **UI Tests**: <15 seconds (component rendering tests)
  - **All Tests**: <30 seconds total

**NEVER CANCEL builds or long-running commands**. While current build times are fast, always set timeouts to 60+ minutes to handle potential system variations.

## Known Issues and Limitations

1. **Database Configuration**: LocalDB dependency prevents cross-platform development (MongoDB migration planned)
2. **Legacy Data Layer**: Some data models still exist in presentation layer during Clean Architecture migration
3. **HTTPS Warnings**: Development certificates may show warnings in browsers
4. **Registration/Login**: Will fail without database configuration changes
5. **Architecture Migration**: Some components may still reference legacy patterns during ongoing Clean Architecture implementation

## Quick Reference Commands

```bash
# Complete setup from scratch
wget https://dot.net/v1/dotnet-install.sh && chmod +x dotnet-install.sh
./dotnet-install.sh --version 9.0.8
export PATH="/home/runner/.dotnet:$PATH"
dotnet restore
dotnet build --no-restore

# Run comprehensive tests
dotnet test --no-build --verbosity normal

# Run application
cd NimbleLoop.WebApp/NimbleLoop.WebApp
dotnet run

# Verify application is working
curl -s http://localhost:5142 | grep "Hello, world"

# Layer-specific testing
dotnet test NimbleLoop.WebApp.Domain.Tests --no-build
dotnet test NimbleLoop.WebApp.Application.Tests --no-build
dotnet test NimbleLoop.WebApp.Db.Tests --no-build
dotnet test NimbleLoop.WebApp.Ui.Tests --no-build
```