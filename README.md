# Frontend: Gym App

A brief description of your project.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Running the Project](#running-the-project)
5. [Troubleshooting](#troubleshooting)
6. [Contributing](#contributing)
7. [License](#license)

## Getting Started

These instructions will help you set up and run your React Native project on your local machine for development and testing purposes.

## Prerequisites

Make sure you have the following installed on your system:

- **Node.js** (version 14 or higher recommended)
- **npm** (comes with Node.js) or **yarn**
- **Watchman** (brew install watchman`)
- **React Native CLI** (`npm install -g react-native-cli`)
- **Xcode** (for iOS development on macOS)
- **Android Studio** (for Android development)
- **Java SDK** (>17 and <21 `brew install openjdk@17`)
- **ABD tools:**

```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"

brew install android-platform-tools

adb devices
```

## Installation

### Clone the repository:

```
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name

```

### Install dependencies:

```
rm -rf node_modules package-lock.json
npm install

-- or --

rm -rf node_modules yarn.lock
yarn install
```

### ENV's:

- Set environment variables `API_BASE_URL`
- For androind: under `/android/` paste `fileName: local.properties` with content `sdk.dir = /Users/your_mac_username/Library/Android/sdk`

### Start Project:

```
npx react-native run-android
```

### Verify Environment Setup:

1. Run the doctor command:

```
npx react-native doctor

```

2. Follow the recommendations:

- Address any issues or warnings reported by the doctor command.
