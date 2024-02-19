STEPS

initializing Graph-Node:
1. Clone local graph-node repo - git@github.com:graphprotocol/graph-node.git
2. Modify graph-node/docker/docker-compose.yml file
    a. line22 | ethereum: 'mainnet:http://host.docker.internal:8545' -----> ethereum: 'hardhat:http://host.docker.internal:8545'
3. Start Docker
4. CD to ./docker and run in terminal 'docker-compose up' - starts local graph node

start HardHat:
5. cd hardhat and npm i 
6. npx hardhat compile
7. npx hardhat node
8. npx hardhat run scripts/deployUniswap.js --network localhost
9. npx hardhat run scripts/deployOV.js --network localhost 

deploy subgraph to local graph-node:
10. cd subgraph
11. graph codegen
12. graph build
13. graph create --node http://localhost:8020 graphname
14. graph deploy --node http://localhost:8020 --ipfs http://localhost:5001 graphname

***local query - replace graphname with actual name of deployed subgraph

http://localhost:8000/subgraphs/name/graphname/graphql?query=+query+MyQuery+%7B%0A+++++tokens%28first%3A+500%29+%7B%0A+++++++++id%0A+++++++++name%0A+++++++++address%0A+++++%7D%0A+++++pairs%28first%3A+500%29+%7B%0A+++++++++id%0A+++++++++token0%0A+++++++++token1%0A+++++++++address%0A+++++++++token1Name%0A+++++++++token0Name%0A+++++++++reserve1%0A+++++++++reserve0%0A+++++%7D%0A+%7D

***When shutting down graph-node be sure to delete latest generated data at docker/data

15. done: graph remove --node http://localhost:8020 graphname