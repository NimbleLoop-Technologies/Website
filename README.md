# Website

This repository contains the NimbleLoop Technologies website built with ASP.NET Core and Blazor WebAssembly.

## Projects

- **NimbleLoop.WebApp** - Main ASP.NET Core server project
- **NimbleLoop.WebApp.Client** - Blazor WebAssembly client project  
- **NimbleLoop.WebApp.Tests** - Unit tests for the web application

## Development

### Prerequisites
- .NET 9.0 SDK
- SQL Server (for Entity Framework)

### Building
```bash
dotnet restore
dotnet build
```

### Running Tests
```bash
dotnet test
```

## Quality Assurance

This project uses SonarCloud for code quality analysis and code coverage reporting. See [SonarCloud Setup Documentation](docs/SONARCLOUD_SETUP.md) for configuration details.

### Code Coverage
Code coverage is automatically collected when running tests and sent to SonarCloud for analysis.

## CI/CD

The repository includes GitHub workflows for:
- **Build and Test** - Builds the solution and runs tests on pull requests
- **SonarCloud Analysis** - Code quality analysis and coverage reporting
- **CodeQL** - Security analysis