const ETH_ADDRESS = "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512"; //change ETH_ADDRESS to local address

async function displayData() {
   const data = await fetchAllPairsHardHat(ETH_ADDRESS); //change to fetchPairsHardHat when running local node
   createGraph(data);
}

async function fetchAllPairsHardHat(ETH_ADDRESS) {
   let allTokens = [];
   let allPairs = [];
   let skip = 0;
   const fetchSize = 1000; // Max items per query

   while (true) {
       const query = `
           query {
               tokens(first: ${fetchSize}, skip: ${skip}) {
                   id
                   name
                   address
               }
               pairs(first: ${fetchSize}, skip: ${skip}) {
                   id
                   token0
                   token1
                   address
                   token1Name
                   token0Name
                   reserve1
                   reserve0
               }
           }`;

       try {
           const response = await fetch('http://localhost:8000/subgraphs/name/seven/', {
               method: 'POST',
               headers: {
                   'Content-Type': 'application/json',
                   'Accept': 'application/json',
               },
               body: JSON.stringify({
                   query: query
               })
           });

           if (!response.ok) {
               throw new Error(`HTTP Error: ${response.statusText}`);
           }

           const data = await response.json();
           if (data.errors) {
               throw new Error(`GraphQL Error: ${data.errors.map(e => e.message).join('\n')}`);
           }
          // saveToFile;
           allTokens = allTokens.concat(data.data.tokens);
           allPairs = allPairs.concat(data.data.pairs);

           // Check if we've fetched all available data
           if (data.data.tokens.length < fetchSize && data.data.pairs.length < fetchSize) {
               break; // Exit loop if fewer items than fetchSize were returned for both tokens and pairs
           }

           skip += fetchSize; // Prepare `skip` for the next iteration
       } catch (error) {
           console.error('Fetch Error:', error);
           break; // Exit loop in case of error
       }
   }
  // saveDataAsJson(allTokens, allPairs);   /// save as JSON and upload to IPFS for serving to GPT
   const processed = await processData(allTokens, allPairs, ETH_ADDRESS);
   return processed;
}

async function fetchPairsLocalJSON(ETH_ADDRESS) {
  try {

     // Fetch the JSON data from the local file
     const response = await fetch('sampleData.json');
     
     if (!response.ok) {
        throw new Error(`HTTP Error: ${response.statusText}`);
     }

     const jsonData = await response.json();

     if (jsonData.errors) {
        throw new Error(`JSON Parse Error: ${jsonData.errors}`);
     }

     const proced = await processData(jsonData.data.tokens, jsonData.data.pairs, ETH_ADDRESS);

     return proced
  } catch (error) {
     console.error('Fetch Error:', error);
  }
}


function saveDataAsJson(tokens, pairs) {
   const jsonData = {
       data: {
           tokens: tokens,
           pairs: pairs
       }
   };

   const dataStr = JSON.stringify(jsonData, null, 2); 
   const blob = new Blob([dataStr], {type: "application/json"});
   const url = URL.createObjectURL(blob);

   const a = document.createElement('a');
   a.href = url;
   a.download = "dataAll.json";
   document.body.appendChild(a); 
   a.click();
   document.body.removeChild(a);
}

async function processData(tokens, pairs) {
   // Filter out ETH pairs and process tokens
   const ethPairs = pairs.filter(p => p.token0 === ETH_ADDRESS || p.token1 === ETH_ADDRESS);
   const processedTokens = tokens.map(token => processTokenData(token, ethPairs));

   // Create a map of token prices for easy lookup
   const tokenPrices = processedTokens.reduce((acc, token) => {
      acc[token.id] = token.currentPrice;
      return acc;
   }, {});

   // Process non-ETH pairs
   const nonEthPairs = pairs.filter(p => p.token0 !== ETH_ADDRESS && p.token1 !== ETH_ADDRESS);
   const processedPairs = nonEthPairs.map(pair => processPairData(pair, tokenPrices));

   return {
      tokens: processedTokens,
      pairs: processedPairs
   };
}

function processTokenData(token, pairs) {
   // Find the corresponding ETH pair for this token
   const ethPair = pairs.find(p => (p.token0 === token.id || p.token1 === token.id) && (p.token0 === ETH_ADDRESS || p.token1 === ETH_ADDRESS));
   let currentPrice = 0;
   if (ethPair) {
      const ethReserve = ethPair.token0 === ETH_ADDRESS ? ethPair.reserve0 : ethPair.reserve1;
      const tokenReserve = ethPair.token0 === ETH_ADDRESS ? ethPair.reserve1 : ethPair.reserve0;
      currentPrice = parseFloat(ethers.utils.formatEther(ethReserve)) / parseFloat(ethers.utils.formatEther(tokenReserve));
   }

   return {
      ...token,
      currentPrice
   };
}

function processPairData(pair, tokenPrices) {
   const token0Price = tokenPrices[pair.token0] || 0;
   const token1Price = tokenPrices[pair.token1] || 0;
   const token0ReserveInEth = parseFloat(ethers.utils.formatEther(pair.reserve0)) * token0Price;
   const token1ReserveInEth = parseFloat(ethers.utils.formatEther(pair.reserve1)) * token1Price;
   const totalValue = token0ReserveInEth + token1ReserveInEth;

   return {
      pairAddress: pair.id,
      token0Address: pair.token0,
      token1Address: pair.token1,
      token0Name: pair.token0Name,
      token1Name: pair.token1Name,
      token0Reserve: ethers.utils.formatEther(pair.reserve0),
      token1Reserve: ethers.utils.formatEther(pair.reserve1),
      totalValue
   };
}

function prepareGraphData(data) {
   const nodes = data.tokens.map(token => {
      return {
         id: token.id,
         name: token.name,
         currentPrice: token.currentPrice // Include current price for sizing
      };
   });

   const links = data.pairs.map(pair => {
      return {
         source: pair.token0Address, // Assuming token0 is the ID of the source node
         target: pair.token1Address, // Assuming token1 is the ID of the target node
         token0Name: pair.token0Name, // Additional pair data
         token1Name: pair.token1Name,
         totalValue: pair.totalValue
      };
   });
   console.log(links);

   return {
      nodes,
      links
   };
}

function createGraph(data) {
   const graphData = prepareGraphData(data);
   const width = 5600,
      height = 5300;

   // Create SVG element
   const svg = d3.select('body').append('svg')
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('preserveAspectRatio', 'xMidYMid meet')
      .attr('width', '100%') // Set SVG width to 100%
      .attr('height', '100%'); // Height adjusts automatically


   // Scaling function for node size
   const sizeScale = d3.scaleLog()
      .domain([0.000005, 0.0002])
      //  .domain([d3.min(graphData.nodes, d => d.currentPrice), d3.max(graphData.nodes, d => d.currentPrice)])
      .range([10, 80]); // Increased size range for nodes
   // Define a scale for the link width
   const linkWidthScale = d3.scaleLinear()
      .domain(d3.extent(graphData.links, d => d.totalValue))
      .range([3, 4]); //

   // Create links (lines)
   const link = svg.selectAll(".link")
      .data(graphData.links)
      .enter().append("line")
      .attr("class", "link")
      .attr("stroke-dasharray", "5,5")
      .style("stroke-width", d => linkWidthScale(d.totalValue))
      .style("stroke", "#999") // Style for links
      .style("stroke-opacity", 0.9);
   link.on('click', function (d, i) {
      document.getElementById('tokenAAddressModal').value = i.source.id; // Correctly reference source id
      document.getElementById('tokenBAddressModal').value = i.target.id; // Correctly reference target id
      document.getElementById('liquidityModal').style.display = 'block';
   });

   // Create nodes (circles)
   const node = svg.selectAll(".node")
      .data(graphData.nodes)
      .enter().append("circle")
      .attr("class", "node")
      .attr("r", d => sizeScale(d.currentPrice)) // Node size based on current price
      //  .style("fill", "#000000"); // Style for nodes
      .style("fill", d => {
         if (d.name.toLowerCase().includes('nbc')) {
            return 'blue'; // Set nodes with 'nbc' in their name to blue
         } else if (d.name.toLowerCase().includes('breitbart')) {
            return 'red'; // Set nodes with 'breitbart' in their name to red
         } else {
            return '#000000'; // Default color for other nodes
         }
      });
   node.on('click', function (d, i) {
      if (activePairInput) {
         document.getElementById(activePairInput).value = i.id;
         activePairInput = null; // Reset the active input field
      } else {
         // Existing functionality for node click
         document.getElementById('tokenName').textContent = i.name;
         document.getElementById('buyTokenAddress').value = i.id;
         document.getElementById('sellTokenAddress').value = i.id;
         document.getElementById('selectionModal').style.display = 'block';
      }
   });

   // Define drag behavior

   const drag = d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);

   function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
   }

   function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
   }

   function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
   }

   // Apply the drag behavior to the nodes
   node.call(drag);


   // Create label groups
   const labelGroups = svg.selectAll(".label-group")
      .data(graphData.nodes)
      .enter().append("g")
      .attr("class", "label-group");

   // Append foreignObject to each label group
   labelGroups.append("foreignObject")
      .attr("class", "label-foreignObj")
      .attr("width", 275) // Fixed width
      .attr("height", 150) // Initial height, adjust later
      .html(d => `
   <div style="font-size: 20px; text-align: left; word-wrap: break-word;">
     <span style="font-weight: bold; font-size: 24px;">${(d.currentPrice * 100000).toFixed(4)}  </span>
     <a target="_blank" href="https://www.google.com/search?q=${d.name}" style="text-decoration: none; color: #000000; ${!d.name.startsWith('https') ? 'font-size: 24px;' : ''}">${d.name}</a></div>
 `)

      .each(function () {
         // After appending, adjust height based on the actual content height
         const fo = this; // Reference to the foreignObject
         setTimeout(() => {
            const contentDiv = fo.querySelector("div");
            const height = contentDiv.offsetHeight;
            d3.select(fo)
               .attr("height", height + 0); // Adjust height, add some padding
         }, 0);
      });
   // Dynamically adjust the size and position of the rectangle based on the foreignObject content
   labelGroups.each(function () {
      const foreignObject = d3.select(this).select(".label-foreignObj");
      setTimeout(() => { // Wait for the DOM to be updated
         const bbox = foreignObject.node().getBoundingClientRect();
         // Adjust padding as needed
         d3.select(this).insert("rect", ":first-child")
            .attr("class", "label-bg")
            .attr("x", -10) // Adjust based on actual positioning within the SVG
            .attr("y", -10) // Adjust based on actual positioning
            .attr("width", bbox.width + 20) // Add some padding around the text
            .attr("height", bbox.height + 20)
            .attr("rx", 10) // Set the x-axis radius for rounded corners
            .attr("ry", 10) // Set the y-axis radius for rounded corners
            .style("fill", "#fff")
            .style("stroke", "#000")
            .style("opacity", 0.8);
      }, 0);
   });

   const labelBackgrounds = svg.selectAll(".label-bg")
      .data(graphData.nodes)
      .enter().append("rect")
      .style("border", "#005") // White background
      .style("opacity", 0.7); // Slightly transparent
   const padding = 10; // Adjust as needed
   const minX = padding;
   const minY = padding;
   const maxX = width - padding;
   const maxY = height - padding;


   const simulation = d3.forceSimulation(graphData.nodes)
      .force("link", d3.forceLink(graphData.links).id(d => d.id).distance(300))
      .force("charge", d3.forceManyBody().strength(-2000))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("x", d3.forceX().x(d => Math.max(minX, Math.min(maxX, d.x))))
      .force("y", d3.forceY().y(d => Math.max(minY, Math.min(maxY, d.y))));


   simulation.on("tick", () => {
      link.attr("x1", d => d.source.x)
         .attr("y1", d => d.source.y)
         .attr("x2", d => d.target.x)
         .attr("y2", d => d.target.y);
      node.attr("cx", d => d.x)
         .attr("cy", d => d.y);
      // Position label groups
      labelGroups.attr("transform", d => `translate(${d.x}, ${d.y})`);

      labelGroups.select(".label-bg")
         .each(function () {
            const bbox = this.nextSibling.getBBox();
            d3.select(this)
               .attr("x", bbox.x - 5) // Add some padding
               .attr("y", bbox.y - 2)
               .attr("width", bbox.width + 10) // Add some padding
               .attr("height", bbox.height + 4);
         });
   });
}

displayData();
