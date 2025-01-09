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

# Installation

    Besu-Runner  can be run via both github and npm library

 ## Via Github

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

 ## Via Npm

    You can install the Besu Runner Library globally via npm to run it directly from the command line:

1. Install the library globally:

    ```bash
    npm install -g besu-runner-lib
    cd besu
    ```

2. Verify the installation:

    ```bash
    besu-runner-lib --help
    ```

  This will show the available commands for starting, connecting, managing Besu containers.


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

## 4. Starting an The Besu with dev network with own geneis

You can start a new Besu node using a custom genesis file. This allows you to define your own network configuration.

- Steps:

    1. Enter the network name.
    2. Provide the desired RPC HTTP and P2P ports.
    3. Optionally enable WebSocket RPC and specify its port.
    4. Provide the path to your custom genesis file or leave it empty to skip.

    ### Example Command Flow
    ```
    Enter the network (default: holesky): devnet
    Enter the RPC HTTP Port (default: 8545): 9000
    Enter the P2P Port (default: 30303): 9001
    Do you want to enable RPC Web socket (y/n)? y
    Enter the RPC WebSocket Port (default: 8546): 9002
    Enter the path to the genesis file (or leave empty to skip): /path/to/genesis.json
    ```

## Connecting Nodes to Eth Mainnet and Public Testnet

Use the besu command with the required command line options to start a node.

- Download the Besu [packaged binaries](https://github.com/hyperledger/besu/releases)

- cd into Besu extracted folder

- start besu via binaries
 ```
  bin/besu --network=dev --miner-enabled --miner-coinbase=<miner-address> --rpc-http-cors-origins="all" --host-allowlist="*" --rpc-ws-enabled --rpc-http-enabled --data-path=/tmp/tmpDatdir
```


