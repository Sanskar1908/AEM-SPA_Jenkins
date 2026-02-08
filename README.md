# AEM Guides - WKND SPA Project
# WKND SPA React - AEM Modernized Build

This project is a customized version of the AEM WKND SPA React guide, optimized for **Apple Silicon (M1/M2/M3)** and **Node 18+**.

## System Requirements
- **Node.js**: v18.20.8
- **NPM**: 10.8.2
- **Java**: 11
- **Maven**: 3.9.x
- **OS**: macOS (ARM64)

## Critical Fixes for Modern Environments

### 1. OpenSSL Legacy Support
Node 18+ uses OpenSSL 3.0 which is incompatible with older Webpack hashing. 
- **Fix**: Added `NODE_OPTIONS=--openssl-legacy-provider` to `ui.frontend/pom.xml` and Jenkins environment.

### 2. Sass Migration
Original `node-sass` fails on ARM64 Macs.
- **Fix**: Migrated to `sass` (Dart Sass) in `ui.frontend/package.json`.

### 3. NPM Dependency Resolution
NPM 10+ is strict about peer dependencies.
- **Fix**: Configured Maven to run `npm install --legacy-peer-deps`.

### 4. Clientlib Array Fix
Updated `ui.frontend/clientlib.config.js` to wrap library configurations in arrays `[ ]` to satisfy modern AEM Clientlib Generator requirements.

## CI/CD Pipeline (Jenkins)
A local Jenkins pipeline is configured to automate deployments to AEM:
- **Build Trigger**: `git commit` via a local `post-commit` hook.
- **Goals**: `mvn clean install -PautoInstallSinglePackage -DskipTests`
- **Hook Location**: `.git/hooks/post-commit`


## How to build

To build all the modules run in the project root directory the following command with Maven 3:

    mvn clean install

If you have a running AEM instance you can build and package the whole project and deploy into AEM with

    mvn clean install -PautoInstallSinglePackage

Or to deploy it to a publish instance, run

    mvn clean install -PautoInstallSinglePackagePublish

### Building for AEM 6.x.x

The project has been designed for **AEM as a Cloud Service**. The project is also backward compatible with AEM **6.4.8** by adding the `classic` profile when executing a build, i.e:

    mvn clean install -PautoInstallSinglePackage -Pclassic
