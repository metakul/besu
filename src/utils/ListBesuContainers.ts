import { exec } from "child_process";

// Function to list existing Besu containers
export const listBesuContainers = (): Promise<void> => {
    return new Promise((resolve, reject) => {
        exec('docker ps -a --filter "ancestor=hyperledger/besu" --format "{{.ID}}\t{{.Status}}\t{{.Names}}"', (err, stdout, stderr) => {
            if (err) {
                reject(stderr);
                return;
            }
            if (stdout.trim()) {
                console.log('Existing Besu containers:');
                console.log('CONTAINER ID\tSTATUS\t\tNAMES');
                console.log(stdout.trim());
            } else {
                console.log('No existing Besu containers found.');
            }
            resolve();
        });
    });
};

// Function to show logs of a running container
export const showContainerLogs = (containerId: string): void => {
    const logProcess = exec(`docker logs -f ${containerId}`);

    logProcess.stdout?.on('data', (data) => console.log(data.toString()));
    logProcess.stderr?.on('data', (data) => console.error(data.toString()));

    logProcess.on('exit', () => {
        console.log(`Stopped showing logs for container ${containerId}.`);
    });
};