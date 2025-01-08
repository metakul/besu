# Besu Runner Library

A TypeScript library for running and managing Hyperledger Besu nodes. This library simplifies the process of installing, starting, and connecting to Besu nodes via Docker. 
By default, Besu stores data in the Forest of Tries format. Here We Stores Data in bonsai format.

## Features

- Install the Besu Docker image.
- Start a Besu node with specific network configurations.
- Connect to a Besu node using custom network settings.
- Supports real-time logs after starting or restarting a container.
- Allows restarting and attaching to existing Besu containers.
- Run besu on specific web socket

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
```

### 2. Starting a Besu Node

Use the besu-start command with the required command line options to start a node. Enter the information for network name, RPC HTTP port, WebSocket port (optional), and P2P port.

#### Supported Networks

- MAINNET
- SEPOLIA
- HOLESKY
- LUKSO
- EPHEMERY
- DEV
- FUTURE_EIPS
- EXPERIMENTAL_EIPS
- CLASSIC
- MORDOR


It uses `--sync-mode=SNAP` for a faster sync

```bash
npm run start-besu
```

## 3. Restarting an Existing Besu Container

If a Besu container was previously stopped, you can restart it and view its logs:

-
  1. List existing Besu containers.

  2. Choose a container ID to restart.

  3. Attach to the restarted container and view     real-time logs.
    

### Example Command Flow

```
 npm run start-besu

Enter the network (default: holesky): mainnet

Enter the RPC HTTP Port (default: 8545): 8001

Enter the P2P Port (default: 30303): 8002

Do you want to enable RPC Web socket (y/n)? y

Enter the RPC WebSocket Port (default: 8546): 8002

Starting Besu node with the following command:
docker run -p 8545:8545 -p 8546:8546 -p 30303:30303 -e BESU_RPC_HTTP_ENABLED=true -e BESU_NETWORK=mainnet hyperledger/besu:latest --rpc-http-enabled --rpc-ws-enabled --sync-mode=SNAP --data-storage-format=BONSAI --data-path=mainnet/besu-data
```