### Prerequisites

Before you begin, ensure you have the following installed:
- Docker
- Node.js and npm
- HardHat
- The Graph CLI

### Initializing Graph-Node

Follow these steps to set up a local Graph-Node environment:

1. **Clone the Graph-Node Repository**
   Clone the repository to your local machine using:
   ```bash
   git clone git@github.com:graphprotocol/graph-node.git
   ```

2. **Modify the Docker Compose File**
   Navigate to the `graph-node/docker` directory and modify the `docker-compose.yml` file:
   - Change line 22 from:
     ```
     ethereum: 'mainnet:http://host.docker.internal:8545'
     ```
     To:
     ```
     ethereum: 'hardhat:http://host.docker.internal:8545'
     ```

3. **Start Docker**
   Ensure Docker is running on your machine.

4. **Launch the Graph-Node**
   In the terminal, navigate to the `./docker` directory and execute:
   ```bash
   docker-compose up
   ```
   This starts the local Graph-Node.

### Starting HardHat

To set up and start HardHat, follow these steps:

5. **Install Dependencies**
   ```bash
   cd hardhat && npm i
   ```

6. **Compile Smart Contracts**
   ```bash
   npx hardhat compile
   ```

7. **Start the Local Node**
   ```bash
   npx hardhat node
   ```

8. **Deploy Smart Contracts**
   Deploy Uniswap and OV contracts by running:
   - Uniswap:
     ```bash
     npx hardhat run scripts/deployUniswap.js --network localhost
     ```
   - OV:
     ```bash
     npx hardhat run scripts/deployOV.js --network localhost
     ```

### Deploying Subgraph to Local Graph-Node

To deploy your subgraph to the local Graph-Node, follow these steps:

9. **Navigate to the Subgraph Directory**
   ```bash
   cd subgraph
   ```

10. **Generate Code**
    ```bash
    graph codegen
    ```

11. **Build the Subgraph**
    ```bash
    graph build
    ```

12. **Create the Subgraph on the Local Node**
    ```bash
    graph create --node http://localhost:8020 graphname
    ```

13. **Deploy the Subgraph**
    ```bash
    graph deploy --node http://localhost:8020 --ipfs http://localhost:5001 graphname
    ```

### Querying the Subgraph

- Perform local queries by replacing `graphname` with the actual name of your deployed subgraph. Example query URL:
  ```
  http://localhost:8000/subgraphs/name/graphname/graphql?query=+query+MyQuery+%7B%0A+++++tokens%28first%3A+500%29+%7B%0A+++++++++id%0A+++++++++name%0A+++++++++address%0A+++++%7D%0A+++++pairs%28first%3A+500%29+%7B%0A+++++++++id%0A+++++++++token0%0A+++++++++token1%0A+++++++++address%0A+++++++++token1Name%0A+++++++++token0Name%0A+++++++++reserve1%0A+++++++++reserve0%0A+++++%7D%0A+%7D
  ```

### Cleanup

- **Important**: When shutting down the graph-node, remember to delete the latest generated data at `docker/data`. Then graph remove --node http://localhost:8020 graphname

### Completion

You have now successfully set up and deployed your project!
