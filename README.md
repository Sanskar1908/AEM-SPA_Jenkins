# 🚀 WKND SPA React - Modernized for Apple Silicon

[![AEM Version](https://img.shields.io)](https://experienceleague.adobe.com)
[![Node Version](https://img.shields.io)](https://nodejs.org)
[![Jenkins](https://img.shields.io)](http://localhost:8080)

This is a modernized version of the **AEM WKND SPA React** project. It has been specifically re-engineered to run on **Apple Silicon (M1/M2/M3)** using **Node 18+**, bypassing the common "dependency hell" found in older AEM archetypes.

---

## 💻 System Environment
| Tool | Version |
| :--- | :--- |
| **Operating System** | macOS ARM64 (Apple Silicon) |
| **Node.js** | `v18.20.8` |
| **NPM** | `10.8.2` |
| **Java** | `JDK 11` |
| **Maven** | `3.9.x` |

---

## 🛠 Critical Fixes & "Transplants"
To make this legacy project compatible with modern hardware, the following fixes were applied:

### 1. Hardware Architecture (Sass)
Original projects use `node-sass`, which requires Intel-based compilation. 
*   **Fix:** Replaced with `sass` (Dart Sass).
*   **Result:** Native performance on M1/M2/M3 chips without C++ compiler errors.

### 2. OpenSSL Legacy Bridge
Node 18+ uses OpenSSL 3.0, which breaks older Webpack hashing.
*   **Fix:** Injected `NODE_OPTIONS=--openssl-legacy-provider` into Maven and Jenkins.
*   **File:** `ui.frontend/pom.xml`

### 3. Dependency Overrides
Forced specific versions of sub-dependencies to prevent `node:stream` and `parse5` errors common in Node 18 environments.
*   **Fix:** Added `overrides` for `yargs-parser` and `parse5` in `package.json`.

### 4. Clientlib Array Migration
Modern AEM Clientlib generators require iterable arrays for library definitions.
*   **Fix:** Wrapped `libs` properties in `[ ]` within `ui.frontend/clientlib.config.js`.

---

## 🤖 CI/CD Automation (Jenkins)
This project features a local **Jenkins Pipeline** for instant AEM deployment.

### Automated Trigger
A local **Git Hook** triggers Jenkins the moment you commit code:
1.  **Stage & Commit:** `git commit -m "Update styles"`
2.  **Instant Signal:** `.git/hooks/post-commit` pings Jenkins via `curl`.
3.  **Auto-Deploy:** Jenkins runs the Maven build and pushes to AEM.

---

## 🚀 How To Build

### Standard Deployment
Deploy the entire project to a local AEM Author instance:
```bash
mvn clean install -PautoInstallSinglePackage -DskipTests
