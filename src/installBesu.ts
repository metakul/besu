import { execSync, exec } from 'child_process';

// Function to check if Docker is installed
function checkDockerInstalled(): boolean {
    try {
        // Run `docker --version` to check if Docker is installed
        execSync("docker --version", { stdio: "ignore" });
        return true;
    } catch (err) {
        return false;
    }
}

// Print Docker system information
function printDockerInfo(): void {
    console.log("Checking Docker info...");
    exec("docker info", (error, stdout, stderr) => {
        if (error) {
            console.error(`Error getting Docker info: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Docker info stderr: ${stderr}`);
            return;
        }
        console.log(`Docker Info: ${stdout}`);
    });
}

// Function to install Besu
function installBesu(): void {
    if (!checkDockerInstalled()) {
        console.error("Docker is not installed. Please install Docker before proceeding.");
        return;
    }

    console.log("Docker is installed, proceeding with installation of Besu...");

    // Print Docker system info
    printDockerInfo();

    // Logic for installing Besu (docker-compose, etc.)
    try {
        console.log("Starting Besu installation...");
        // Example: Pull Besu Docker image
        execSync("docker pull hyperledger/besu:latest", { stdio: "inherit" });

        // Further installation steps like running Besu container, etc.
        console.log("Besu installed successfully.");
    } catch (error) {
        console.error(`Error installing Besu: ${error}`);
    }
}

// Call installBesu to initiate the process
installBesu();
