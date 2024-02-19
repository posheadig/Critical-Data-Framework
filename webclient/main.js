async function displayData() {
   const ETH_ADDRESS = "0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0"; //change ETH_ADDRESS to local address
   const data = await fetchPairsLocalJSON(ETH_ADDRESS); //change to fetchPairsHardHat when running local node
   createGraph(data);
}

displayData();
