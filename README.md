# Besu Runner Library

A TypeScript library for running and managing Hyperledger Besu nodes. This library simplifies the process of installing, starting, and connecting to Besu nodes via Docker.

## Features

- Install the Besu Docker image.
- Start a Besu node with specific network configurations.
- Connect to a Besu node using custom network settings.

## Prerequisites

- **Docker** must be installed and running on your machine.
- **Node.js** and **npm** must be installed to use the library and run the commands.

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/metakul/besu.git
    cd besu
    ```

2. Install the required dependencies:

    ```bash
    npm install
    ```

    This will install both the runtime dependencies and TypeScript development tools.

## Usage

### 1. Installing the Besu Docker Image

You can pull the latest Besu Docker image using the following command:

```bash
npm run install-besu
