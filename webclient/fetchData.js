
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
            const response = await fetch('http://localhost:8000/subgraphs/name/first/', {
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