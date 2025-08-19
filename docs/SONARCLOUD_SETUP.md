# SonarCloud Integration Setup

This repository includes GitHub workflows for automated code quality analysis and code coverage reporting using SonarCloud, integrated with our Clean Architecture solution structure.

## Required Secrets

To enable SonarCloud integration, you need to configure the following secrets in your GitHub repository:

### SONAR_TOKEN
1. Go to [SonarCloud](https://sonarcloud.io) and log in with your GitHub account
2. Navigate to your organization: `nimbleloop-technologies`
3. Go to **My Account** > **Security** > **Generate Tokens**
4. Create a new token with appropriate permissions
5. Copy the token and add it as a repository secret:
   - Go to your GitHub repository settings
   - Navigate to **Secrets and variables** > **Actions**
   - Click **New repository secret**
   - Name: `SONAR_TOKEN`
   - Value: The token you copied from SonarCloud

## SonarCloud Project Configuration

The project is configured with the following key:
- **Project Key**: `NimbleLoop-Technologies_Website`
- **Organization**: `nimbleloop-technologies`

Make sure the project exists in SonarCloud with these exact identifiers.

## Clean Architecture Integration

The SonarCloud configuration is optimized for our Clean Architecture solution structure:

### Test Projects
The workflow automatically detects and runs tests from all Clean Architecture test projects:
- `NimbleLoop.WebApp.Tests` - Legacy integration tests
- `NimbleLoop.WebApp.Domain.Tests` - Domain layer unit tests
- `NimbleLoop.WebApp.Application.Tests` - Application layer unit tests  
- `NimbleLoop.WebApp.Db.Tests` - Database integration tests
- `NimbleLoop.WebApp.Ui.Tests` - UI component tests (bUnit)

### Coverage Exclusions
The following are excluded from code coverage analysis:
- All test projects and test files
- Database migrations (`**/Migrations/**`)
- Static web assets (`**/wwwroot/**`)
- Legacy data models (`**/Data/**`)
- Client-side projects (`**/*.Client/**`)
- Application entry points (`**/Program.cs`)

## Workflow Features

The SonarCloud workflow (`sonarcloud.yml`) includes:

- **Automatic trigger** on pull requests to master branch
- **Code coverage collection** from all .NET test projects using OpenCover format
- **Code quality analysis** with SonarCloud scanner for .NET 9.0
- **Performance optimization** with intelligent caching for SonarCloud packages
- **Security hardened** environment variable usage to prevent secret expansion

## Code Coverage

Code coverage is automatically collected from the comprehensive test suite. The workflow:

1. Builds the entire Clean Architecture solution
2. Runs all test projects with coverage collection
3. Generates OpenCover format reports
4. Uploads coverage data to SonarCloud
5. Applies intelligent exclusions for test projects and generated code

## Adding New Test Projects

When adding new test projects to the Clean Architecture solution:

1. Follow the established naming convention: `NimbleLoop.WebApp.[Layer].Tests`
2. Reference the appropriate layer project (Domain, Application, Db, etc.)
3. Include required test framework packages (xUnit, bUnit for UI tests)
4. The workflow will automatically detect and include them in coverage analysis

### Example Test Project Structure
```
NimbleLoop.WebApp.NewLayer.Tests/
├── NimbleLoop.WebApp.NewLayer.Tests.csproj
├── UnitTests/
│   └── EntityTests.cs
└── IntegrationTests/
    └── ServiceTests.cs
```

## Files Configuration

The SonarCloud integration includes:

- `.github/workflows/sonarcloud.yml` - Clean Architecture optimized workflow
- `sonar-project.properties` - Project configuration with Clean Architecture exclusions
- `Directory.Build.props` - Global code coverage settings for all projects
- `docs/SONARCLOUD_SETUP.md` - This documentation file

## Testing Commands

To verify the configuration locally:

```bash
# Build the solution
dotnet restore
dotnet build --no-restore

# Run tests with coverage (matching CI workflow)
dotnet test --configuration Release \
  --collect:"XPlat Code Coverage" \
  --results-directory "./TestResults/" \
  -- DataCollectionRunSettings.DataCollectors.DataCollector.Configuration.Format=opencover
```