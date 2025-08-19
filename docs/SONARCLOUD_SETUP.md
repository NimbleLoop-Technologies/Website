# SonarCloud Integration Setup

This repository includes GitHub workflows for automated code quality analysis and code coverage reporting using SonarCloud.

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

## Workflow Features

The SonarCloud workflow (`sonarcloud.yml`) includes:

- **Automatic trigger** on pull requests and pushes to master
- **Code coverage collection** from .NET test projects
- **Code quality analysis** with SonarCloud scanner
- **Artifact upload** of test results and coverage reports

## Code Coverage

Code coverage is automatically collected when test projects are present. The workflow:

1. Detects test projects (files matching `*Test*.csproj` or `*Tests.csproj`)
2. Runs tests with OpenCover format coverage collection
3. Uploads coverage data to SonarCloud
4. Excludes test files and migrations from coverage analysis

## Adding Test Projects

When you add test projects to the solution:

1. Name them with `Test` or `Tests` in the project name (e.g., `NimbleLoop.WebApp.Tests`)
2. The workflow will automatically detect and run them
3. Coverage reports will be generated and sent to SonarCloud

## Files Added/Modified

- `.github/workflows/sonarcloud.yml` - Main SonarCloud integration workflow
- `sonar-project.properties` - SonarCloud project configuration
- `Directory.Build.props` - Code coverage settings for all projects
- `docs/SONARCLOUD_SETUP.md` - This documentation file