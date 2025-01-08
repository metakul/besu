import { exec } from 'child_process';
// import path from 'path';
// import { fileURLToPath } from 'url';
import readline from 'readline';
import { listBesuContainers, showContainerLogs } from './utils/ListBesuContainers.js';

// Get __dirname equivalent in ES module
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// Set up readline interface for user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to prompt user for input
const promptUser = (question: string): Promise<string> => {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
        });
    });
};

// Function to start Besu node
export const startBesu = async (): Promise<void> => {
    await listBesuContainers();

    const useExisting = (await promptUser('Do you want to rerun an existing container? (y/n): ')).toLowerCase() === 'y';

    if (useExisting) {
        const containerId = await promptUser('Enter the container ID to rerun: ');
        exec(`docker start ${containerId}`, (err, stdout, stderr) => {
            if (err) {
                console.error(`Failed to start container ${containerId}: ${stderr}`);
                rl.close();
                return;
            }
            console.log(`Container ${containerId} started successfully.`);
            showContainerLogs(containerId); // Show logs after starting the container
            rl.close();
        });
    } else {
    // Prompt for all required fields
    const network = await promptUser('Enter the network (default: holesky): ') || 'holesky';
    const rpcHttpPort = await promptUser('Enter the RPC HTTP Port (default: 8545): ') || '8545';
    const p2pPort = await promptUser('Enter the P2P Port (default: 30303): ') || '30303';

    const enableRpc = (await promptUser('Do you want to enable RPC Web socket (y/n)? ')).toLowerCase() === 'y';

    let rpcWsPort = '8546';
    let rpcOptions = '';
    let enableRpcWs = '';

    if (enableRpc) {
        rpcWsPort = await promptUser('Enter the RPC WebSocket Port (default: 8546): ') || '8546';
        rpcOptions = `-p ${rpcWsPort}:8546 `;
        enableRpcWs ="--rpc-ws-enabled"
    }

    // Construct the docker run command
    const command = `docker run -p ${rpcHttpPort}:8545 ${rpcOptions} -p ${p2pPort}:30303 -e BESU_RPC_HTTP_ENABLED=true -e BESU_NETWORK=${network} hyperledger/besu:latest --rpc-http-enabled ${enableRpcWs} --sync-mode=SNAP --data-storage-format=BONSAI --data-path=${network}/besu-data`;

    console.log('Starting Besu node with the following command:');
    console.log(command);

    // Execute the command
    const process = exec(command);

    // Listen to stdout to display logs continuously
    process.stdout?.on('data', (data) => {
        console.log(data.toString());
    });

    // Listen to stderr for error output
    process.stderr?.on('data', (data) => {
        console.error(data.toString());
    });

    // Handle process exit
    process.on('exit', (code) => {
        if (code === 0) {
            console.log('Besu node started successfully.');
        } else {
            console.error(`Besu node exited with code ${code}`);
        }
        rl.close();
    });
};
}

startBesu();
