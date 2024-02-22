export const ovtokenbase_abi = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "token",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "TokenCreated",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "ETH_INITIAL_LIQUIDITY",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "TOKEN_INITIAL_LIQUIDITY",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "desiredTokenAmount",
				"type": "uint256"
			}
		],
		"name": "createTokenAndAddLiquidity",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "desiredTokenAmount",
				"type": "uint256"
			}
		],
		"name": "getEstimatedETH",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getTokenCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "tokens",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "uniswapV2Router",
		"outputs": [
			{
				"internalType": "contract IUniswapV2Router02",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
export const uniswap_factory_abi = [
{
"inputs": [
{
    "internalType": "address",
    "name": "_feeToSetter",
    "type": "address"
}
],
"payable": false,
"stateMutability": "nonpayable",
"type": "constructor"
},
{
"anonymous": false,
"inputs": [
{
    "indexed": true,
    "internalType": "address",
    "name": "token0",
    "type": "address"
},
{
    "indexed": true,
    "internalType": "address",
    "name": "token1",
    "type": "address"
},
{
    "indexed": false,
    "internalType": "address",
    "name": "pair",
    "type": "address"
},
{
    "indexed": false,
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
}
],
"name": "PairCreated",
"type": "event"
},
{
"constant": true,
"inputs": [],
"name": "INIT_CODE_HASH",
"outputs": [
{
    "internalType": "bytes32",
    "name": "",
    "type": "bytes32"
}
],
"payable": false,
"stateMutability": "view",
"type": "function"
},
{
"constant": true,
"inputs": [
{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
}
],
"name": "allPairs",
"outputs": [
{
    "internalType": "address",
    "name": "",
    "type": "address"
}
],
"payable": false,
"stateMutability": "view",
"type": "function"
},
{
"constant": true,
"inputs": [],
"name": "allPairsLength",
"outputs": [
{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
}
],
"payable": false,
"stateMutability": "view",
"type": "function"
},
{
"constant": false,
"inputs": [
{
    "internalType": "address",
    "name": "tokenA",
    "type": "address"
},
{
    "internalType": "address",
    "name": "tokenB",
    "type": "address"
}
],
"name": "createPair",
"outputs": [
{
    "internalType": "address",
    "name": "pair",
    "type": "address"
}
],
"payable": false,
"stateMutability": "nonpayable",
"type": "function"
},
{
"constant": true,
"inputs": [],
"name": "feeTo",
"outputs": [
{
    "internalType": "address",
    "name": "",
    "type": "address"
}
],
"payable": false,
"stateMutability": "view",
"type": "function"
},
{
"constant": true,
"inputs": [],
"name": "feeToSetter",
"outputs": [
{
    "internalType": "address",
    "name": "",
    "type": "address"
}
],
"payable": false,
"stateMutability": "view",
"type": "function"
},
{
"constant": true,
"inputs": [
{
    "internalType": "address",
    "name": "",
    "type": "address"
},
{
    "internalType": "address",
    "name": "",
    "type": "address"
}
],
"name": "getPair",
"outputs": [
{
    "internalType": "address",
    "name": "",
    "type": "address"
}
],
"payable": false,
"stateMutability": "view",
"type": "function"
},
{
"constant": false,
"inputs": [
{
    "internalType": "address",
    "name": "_feeTo",
    "type": "address"
}
],
"name": "setFeeTo",
"outputs": [],
"payable": false,
"stateMutability": "nonpayable",
"type": "function"
},
{
"constant": false,
"inputs": [
{
    "internalType": "address",
    "name": "_feeToSetter",
    "type": "address"
}
],
"name": "setFeeToSetter",
"outputs": [],
"payable": false,
"stateMutability": "nonpayable",
"type": "function"
}
];
export const ovpoolbase_abi = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "tokenA",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "tokenB",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amountA",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amountB",
                "type": "uint256"
            }
        ],
        "name": "LiquidityAdded",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "tokenA",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "tokenB",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "pair",
                "type": "address"
            }
        ],
        "name": "PairCreated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "token",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "recipient",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "RemainderTransferred",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "tokenA",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "tokenB",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amountA",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amountB",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "minAmountTokenA",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "minAmountTokenB",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
            }
        ],
        "name": "addOwnedTokensAsLiquidity",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "tokenA",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "tokenB",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "minAmountTokenA",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "minAmountTokenB",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
            }
        ],
        "name": "buyTokensAsLiquidity",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "uniswapV2Router",
        "outputs": [
            {
                "internalType": "contract IUniswapV2Router02",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "stateMutability": "payable",
        "type": "receive"
    }
];
export const uniswap_router_abi = [
{
"inputs": [
{
    "internalType": "address",
    "name": "_factory",
    "type": "address"
},
{
    "internalType": "address",
    "name": "_WETH",
    "type": "address"
}
],
"stateMutability": "nonpayable",
"type": "constructor"
},
{
"inputs": [],
"name": "WETH",
"outputs": [
{
    "internalType": "address",
    "name": "",
    "type": "address"
}
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [
{
    "internalType": "address",
    "name": "tokenA",
    "type": "address"
},
{
    "internalType": "address",
    "name": "tokenB",
    "type": "address"
},
{
    "internalType": "uint256",
    "name": "amountADesired",
    "type": "uint256"
},
{
    "internalType": "uint256",
    "name": "amountBDesired",
    "type": "uint256"
},
{
    "internalType": "uint256",
    "name": "amountAMin",
    "type": "uint256"
},
{
    "internalType": "uint256",
    "name": "amountBMin",
    "type": "uint256"
},
{
    "internalType": "address",
    "name": "to",
    "type": "address"
},
{
    "internalType": "uint256",
    "name": "deadline",
    "type": "uint256"
}
],
"name": "addLiquidity",
"outputs": [
{
    "internalType": "uint256",
    "name": "amountA",
    "type": "uint256"
},
{
    "internalType": "uint256",
    "name": "amountB",
    "type": "uint256"
},
{
    "internalType": "uint256",
    "name": "liquidity",
    "type": "uint256"
}
],
"stateMutability": "nonpayable",
"type": "function"
},
{
"inputs": [
{
    "internalType": "address",
    "name": "token",
    "type": "address"
},
{
    "internalType": "uint256",
    "name": "amountTokenDesired",
    "type": "uint256"
},
{
    "internalType": "uint256",
    "name": "amountTokenMin",
    "type": "uint256"
},
{
    "internalType": "uint256",
    "name": "amountETHMin",
    "type": "uint256"
},
{
    "internalType": "address",
    "name": "to",
    "type": "address"
},
{
    "internalType": "uint256",
    "name": "deadline",
    "type": "uint256"
}
],
"name": "addLiquidityETH",
"outputs": [
{
    "internalType": "uint256",
    "name": "amountToken",
    "type": "uint256"
},
{
    "internalType": "uint256",
    "name": "amountETH",
    "type": "uint256"
},
{
    "internalType": "uint256",
    "name": "liquidity",
    "type": "uint256"
}
],
"stateMutability": "payable",
"type": "function"
},
{
"inputs": [],
"name": "factory",
"outputs": [
{
    "internalType": "address",
    "name": "",
    "type": "address"
}
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [
{
    "internalType": "uint256",
    "name": "amountOut",
    "type": "uint256"
},
{
    "internalType": "uint256",
    "name": "reserveIn",
    "type": "uint256"
},
{
    "internalType": "uint256",
    "name": "reserveOut",
    "type": "uint256"
}
],
"name": "getAmountIn",
"outputs": [
{
    "internalType": "uint256",
    "name": "amountIn",
    "type": "uint256"
}
],
"stateMutability": "pure",
"type": "function"
},
{
"inputs": [
{
    "internalType": "uint256",
    "name": "amountIn",
    "type": "uint256"
},
{
    "internalType": "uint256",
    "name": "reserveIn",
    "type": "uint256"
},
{
    "internalType": "uint256",
    "name": "reserveOut",
    "type": "uint256"
}
],
"name": "getAmountOut",
"outputs": [
{
    "internalType": "uint256",
    "name": "amountOut",
    "type": "uint256"
}
],
"stateMutability": "pure",
"type": "function"
},
{
"inputs": [
{
    "internalType": "uint256",
    "name": "amountOut",
    "type": "uint256"
},
{
    "internalType": "address[]",
    "name": "path",
    "type": "address[]"
}
],
"name": "getAmountsIn",
"outputs": [
{
    "internalType": "uint256[]",
    "name": "amounts",
    "type": "uint256[]"
}
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [
{
    "internalType": "uint256",
    "name": "amountIn",
    "type": "uint256"
},
{
    "internalType": "address[]",
    "name": "path",
    "type": "address[]"
}
],
"name": "getAmountsOut",
"outputs": [
{
    "internalType": "uint256[]",
    "name": "amounts",
    "type": "uint256[]"
}
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [
{
    "internalType": "uint256",
    "name": "amountA",
    "type": "uint256"
},
{
    "internalType": "uint256",
    "name": "reserveA",
    "type": "uint256"
},
{
    "internalType": "uint256",
    "name": "reserveB",
    "type": "uint256"
}
],
"name": "quote",
"outputs": [
{
    "internalType": "uint256",
    "name": "amountB",
    "type": "uint256"
}
],
"stateMutability": "pure",
"type": "function"
},
{
"inputs": [
{
    "internalType": "address",
    "name": "tokenA",
    "type": "address"
},
{
    "internalType": "address",
    "name": "tokenB",
    "type": "address"
},
{
    "internalType": "uint256",
    "name": "liquidity",
    "type": "uint256"
},
{
    "internalType": "uint256",
    "name": "amountAMin",
    "type": "uint256"
},
{
    "internalType": "uint256",
    "name": "amountBMin",
    "type": "uint256"
},
{
    "internalType": "address",
    "name": "to",
    "type": "address"
},
{
    "internalType": "uint256",
    "name": "deadline",
    "type": "uint256"
}
],
"name": "removeLiquidity",
"outputs": [
{
    "internalType": "uint256",
    "name": "amountA",
    "type": "uint256"
},
{
    "internalType": "uint256",
    "name": "amountB",
    "type": "uint256"
}
],
"stateMutability": "nonpayable",
"type": "function"
},
{
"inputs": [
{
    "internalType": "address",
    "name": "token",
    "type": "address"
},
{
    "internalType": "uint256",
    "name": "liquidity",
    "type": "uint256"
},
{
    "internalType": "uint256",
    "name": "amountTokenMin",
    "type": "uint256"
},
{
    "internalType": "uint256",
    "name": "amountETHMin",
    "type": "uint256"
},
{
    "internalType": "address",
    "name": "to",
    "type": "address"
},
{
    "internalType": "uint256",
    "name": "deadline",
    "type": "uint256"
}
],
"name": "removeLiquidityETH",
"outputs": [
{
    "internalType": "uint256",
    "name": "amountToken",
    "type": "uint256"
},
{
    "internalType": "uint256",
    "name": "amountETH",
    "type": "uint256"
}
],
"stateMutability": "nonpayable",
"type": "function"
},
{
"inputs": [
{
    "internalType": "address",
    "name": "token",
    "type": "address"
},
{
    "internalType": "uint256",
    "name": "liquidity",
    "type": "uint256"
},
{
    "internalType": "uint256",
    "name": "amountTokenMin",
    "type": "uint256"
},
{
    "internalType": "uint256",
    "name": "amountETHMin",
    "type": "uint256"
},
{
    "internalType": "address",
    "name": "to",
    "type": "address"
},
{
    "internalType": "uint256",
    "name": "deadline",
    "type": "uint256"
}
],
"name": "removeLiquidityETHSupportingFeeOnTransferTokens",
"outputs": [
{
    "internalType": "uint256",
    "name": "amountETH",
    "type": "uint256"
}
],
"stateMutability": "nonpayable",
"type": "function"
},
{
"inputs": [
{
    "internalType": "address",
    "name": "token",
    "type": "address"
},
{
    "internalType": "uint256",
    "name": "liquidity",
    "type": "uint256"
},
{
    "internalType": "uint256",
    "name": "amountTokenMin",
    "type": "uint256"
},
{
    "internalType": "uint256",
    "name": "amountETHMin",
    "type": "uint256"
},
{
    "internalType": "address",
    "name": "to",
    "type": "address"
},
{
    "internalType": "uint256",
    "name": "deadline",
    "type": "uint256"
},
{
    "internalType": "bool",
    "name": "approveMax",
    "type": "bool"
},
{
    "internalType": "uint8",
    "name": "v",
    "type": "uint8"
},
{
    "internalType": "bytes32",
    "name": "r",
    "type": "bytes32"
},
{
    "internalType": "bytes32",
    "name": "s",
    "type": "bytes32"
}
],
"name": "removeLiquidityETHWithPermit",
"outputs": [
{
    "internalType": "uint256",
    "name": "amountToken",
    "type": "uint256"
},
{
    "internalType": "uint256",
    "name": "amountETH",
    "type": "uint256"
}
],
"stateMutability": "nonpayable",
"type": "function"
},
{
"inputs": [
{
    "internalType": "address",
    "name": "token",
    "type": "address"
},
{
    "internalType": "uint256",
    "name": "liquidity",
    "type": "uint256"
},
{
    "internalType": "uint256",
    "name": "amountTokenMin",
    "type": "uint256"
},
{
    "internalType": "uint256",
    "name": "amountETHMin",
    "type": "uint256"
},
{
    "internalType": "address",
    "name": "to",
    "type": "address"
},
{
    "internalType": "uint256",
    "name": "deadline",
    "type": "uint256"
},
{
    "internalType": "bool",
    "name": "approveMax",
    "type": "bool"
},
{
    "internalType": "uint8",
    "name": "v",
    "type": "uint8"
},
{
    "internalType": "bytes32",
    "name": "r",
    "type": "bytes32"
},
{
    "internalType": "bytes32",
    "name": "s",
    "type": "bytes32"
}
],
"name": "removeLiquidityETHWithPermitSupportingFeeOnTransferTokens",
"outputs": [
{
    "internalType": "uint256",
    "name": "amountETH",
    "type": "uint256"
}
],
"stateMutability": "nonpayable",
"type": "function"
},
{
"inputs": [
{
    "internalType": "address",
    "name": "tokenA",
    "type": "address"
},
{
    "internalType": "address",
    "name": "tokenB",
    "type": "address"
},
{
    "internalType": "uint256",
    "name": "liquidity",
    "type": "uint256"
},
{
    "internalType": "uint256",
    "name": "amountAMin",
    "type": "uint256"
},
{
    "internalType": "uint256",
    "name": "amountBMin",
    "type": "uint256"
},
{
    "internalType": "address",
    "name": "to",
    "type": "address"
},
{
    "internalType": "uint256",
    "name": "deadline",
    "type": "uint256"
},
{
    "internalType": "bool",
    "name": "approveMax",
    "type": "bool"
},
{
    "internalType": "uint8",
    "name": "v",
    "type": "uint8"
},
{
    "internalType": "bytes32",
    "name": "r",
    "type": "bytes32"
},
{
    "internalType": "bytes32",
    "name": "s",
    "type": "bytes32"
}
],
"name": "removeLiquidityWithPermit",
"outputs": [
{
    "internalType": "uint256",
    "name": "amountA",
    "type": "uint256"
},
{
    "internalType": "uint256",
    "name": "amountB",
    "type": "uint256"
}
],
"stateMutability": "nonpayable",
"type": "function"
},
{
"inputs": [
{
    "internalType": "uint256",
    "name": "amountOut",
    "type": "uint256"
},
{
    "internalType": "address[]",
    "name": "path",
    "type": "address[]"
},
{
    "internalType": "address",
    "name": "to",
    "type": "address"
},
{
    "internalType": "uint256",
    "name": "deadline",
    "type": "uint256"
}
],
"name": "swapETHForExactTokens",
"outputs": [
{
    "internalType": "uint256[]",
    "name": "amounts",
    "type": "uint256[]"
}
],
"stateMutability": "payable",
"type": "function"
},
{
"inputs": [
{
    "internalType": "uint256",
    "name": "amountOutMin",
    "type": "uint256"
},
{
    "internalType": "address[]",
    "name": "path",
    "type": "address[]"
},
{
    "internalType": "address",
    "name": "to",
    "type": "address"
},
{
    "internalType": "uint256",
    "name": "deadline",
    "type": "uint256"
}
],
"name": "swapExactETHForTokens",
"outputs": [
{
    "internalType": "uint256[]",
    "name": "amounts",
    "type": "uint256[]"
}
],
"stateMutability": "payable",
"type": "function"
},
{
"inputs": [
{
    "internalType": "uint256",
    "name": "amountOutMin",
    "type": "uint256"
},
{
    "internalType": "address[]",
    "name": "path",
    "type": "address[]"
},
{
    "internalType": "address",
    "name": "to",
    "type": "address"
},
{
    "internalType": "uint256",
    "name": "deadline",
    "type": "uint256"
}
],
"name": "swapExactETHForTokensSupportingFeeOnTransferTokens",
"outputs": [],
"stateMutability": "payable",
"type": "function"
},
{
"inputs": [
{
    "internalType": "uint256",
    "name": "amountIn",
    "type": "uint256"
},
{
    "internalType": "uint256",
    "name": "amountOutMin",
    "type": "uint256"
},
{
    "internalType": "address[]",
    "name": "path",
    "type": "address[]"
},
{
    "internalType": "address",
    "name": "to",
    "type": "address"
},
{
    "internalType": "uint256",
    "name": "deadline",
    "type": "uint256"
}
],
"name": "swapExactTokensForETH",
"outputs": [
{
    "internalType": "uint256[]",
    "name": "amounts",
    "type": "uint256[]"
}
],
"stateMutability": "nonpayable",
"type": "function"
},
{
"inputs": [
{
    "internalType": "uint256",
    "name": "amountIn",
    "type": "uint256"
},
{
    "internalType": "uint256",
    "name": "amountOutMin",
    "type": "uint256"
},
{
    "internalType": "address[]",
    "name": "path",
    "type": "address[]"
},
{
    "internalType": "address",
    "name": "to",
    "type": "address"
},
{
    "internalType": "uint256",
    "name": "deadline",
    "type": "uint256"
}
],
"name": "swapExactTokensForETHSupportingFeeOnTransferTokens",
"outputs": [],
"stateMutability": "nonpayable",
"type": "function"
},
{
"inputs": [
{
    "internalType": "uint256",
    "name": "amountIn",
    "type": "uint256"
},
{
    "internalType": "uint256",
    "name": "amountOutMin",
    "type": "uint256"
},
{
    "internalType": "address[]",
    "name": "path",
    "type": "address[]"
},
{
    "internalType": "address",
    "name": "to",
    "type": "address"
},
{
    "internalType": "uint256",
    "name": "deadline",
    "type": "uint256"
}
],
"name": "swapExactTokensForTokens",
"outputs": [
{
    "internalType": "uint256[]",
    "name": "amounts",
    "type": "uint256[]"
}
],
"stateMutability": "nonpayable",
"type": "function"
},
{
"inputs": [
{
    "internalType": "uint256",
    "name": "amountIn",
    "type": "uint256"
},
{
    "internalType": "uint256",
    "name": "amountOutMin",
    "type": "uint256"
},
{
    "internalType": "address[]",
    "name": "path",
    "type": "address[]"
},
{
    "internalType": "address",
    "name": "to",
    "type": "address"
},
{
    "internalType": "uint256",
    "name": "deadline",
    "type": "uint256"
}
],
"name": "swapExactTokensForTokensSupportingFeeOnTransferTokens",
"outputs": [],
"stateMutability": "nonpayable",
"type": "function"
},
{
"inputs": [
{
    "internalType": "uint256",
    "name": "amountOut",
    "type": "uint256"
},
{
    "internalType": "uint256",
    "name": "amountInMax",
    "type": "uint256"
},
{
    "internalType": "address[]",
    "name": "path",
    "type": "address[]"
},
{
    "internalType": "address",
    "name": "to",
    "type": "address"
},
{
    "internalType": "uint256",
    "name": "deadline",
    "type": "uint256"
}
],
"name": "swapTokensForExactETH",
"outputs": [
{
    "internalType": "uint256[]",
    "name": "amounts",
    "type": "uint256[]"
}
],
"stateMutability": "nonpayable",
"type": "function"
},
{
"inputs": [
{
    "internalType": "uint256",
    "name": "amountOut",
    "type": "uint256"
},
{
    "internalType": "uint256",
    "name": "amountInMax",
    "type": "uint256"
},
{
    "internalType": "address[]",
    "name": "path",
    "type": "address[]"
},
{
    "internalType": "address",
    "name": "to",
    "type": "address"
},
{
    "internalType": "uint256",
    "name": "deadline",
    "type": "uint256"
}
],
"name": "swapTokensForExactTokens",
"outputs": [
{
    "internalType": "uint256[]",
    "name": "amounts",
    "type": "uint256[]"
}
],
"stateMutability": "nonpayable",
"type": "function"
},
{
"stateMutability": "payable",
"type": "receive"
}
];
export const uniswap_pair_abi = [
{
"inputs": [],
"payable": false,
"stateMutability": "nonpayable",
"type": "constructor"
},
{
"anonymous": false,
"inputs": [
{
    "indexed": true,
    "internalType": "address",
    "name": "owner",
    "type": "address"
},
{
    "indexed": true,
    "internalType": "address",
    "name": "spender",
    "type": "address"
},
{
    "indexed": false,
    "internalType": "uint256",
    "name": "value",
    "type": "uint256"
}
],
"name": "Approval",
"type": "event"
},
{
"anonymous": false,
"inputs": [
{
    "indexed": true,
    "internalType": "address",
    "name": "sender",
    "type": "address"
},
{
    "indexed": false,
    "internalType": "uint256",
    "name": "amount0",
    "type": "uint256"
},
{
    "indexed": false,
    "internalType": "uint256",
    "name": "amount1",
    "type": "uint256"
},
{
    "indexed": true,
    "internalType": "address",
    "name": "to",
    "type": "address"
}
],
"name": "Burn",
"type": "event"
},
{
"anonymous": false,
"inputs": [
{
    "indexed": true,
    "internalType": "address",
    "name": "sender",
    "type": "address"
},
{
    "indexed": false,
    "internalType": "uint256",
    "name": "amount0",
    "type": "uint256"
},
{
    "indexed": false,
    "internalType": "uint256",
    "name": "amount1",
    "type": "uint256"
}
],
"name": "Mint",
"type": "event"
},
{
"anonymous": false,
"inputs": [
{
    "indexed": true,
    "internalType": "address",
    "name": "sender",
    "type": "address"
},
{
    "indexed": false,
    "internalType": "uint256",
    "name": "amount0In",
    "type": "uint256"
},
{
    "indexed": false,
    "internalType": "uint256",
    "name": "amount1In",
    "type": "uint256"
},
{
    "indexed": false,
    "internalType": "uint256",
    "name": "amount0Out",
    "type": "uint256"
},
{
    "indexed": false,
    "internalType": "uint256",
    "name": "amount1Out",
    "type": "uint256"
},
{
    "indexed": true,
    "internalType": "address",
    "name": "to",
    "type": "address"
}
],
"name": "Swap",
"type": "event"
},
{
"anonymous": false,
"inputs": [
{
    "indexed": false,
    "internalType": "uint112",
    "name": "reserve0",
    "type": "uint112"
},
{
    "indexed": false,
    "internalType": "uint112",
    "name": "reserve1",
    "type": "uint112"
}
],
"name": "Sync",
"type": "event"
},
{
"anonymous": false,
"inputs": [
{
    "indexed": true,
    "internalType": "address",
    "name": "from",
    "type": "address"
},
{
    "indexed": true,
    "internalType": "address",
    "name": "to",
    "type": "address"
},
{
    "indexed": false,
    "internalType": "uint256",
    "name": "value",
    "type": "uint256"
}
],
"name": "Transfer",
"type": "event"
},
{
"constant": true,
"inputs": [],
"name": "DOMAIN_SEPARATOR",
"outputs": [
{
    "internalType": "bytes32",
    "name": "",
    "type": "bytes32"
}
],
"payable": false,
"stateMutability": "view",
"type": "function"
},
{
"constant": true,
"inputs": [],
"name": "MINIMUM_LIQUIDITY",
"outputs": [
{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
}
],
"payable": false,
"stateMutability": "view",
"type": "function"
},
{
"constant": true,
"inputs": [],
"name": "PERMIT_TYPEHASH",
"outputs": [
{
    "internalType": "bytes32",
    "name": "",
    "type": "bytes32"
}
],
"payable": false,
"stateMutability": "view",
"type": "function"
},
{
"constant": true,
"inputs": [
{
    "internalType": "address",
    "name": "",
    "type": "address"
},
{
    "internalType": "address",
    "name": "",
    "type": "address"
}
],
"name": "allowance",
"outputs": [
{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
}
],
"payable": false,
"stateMutability": "view",
"type": "function"
},
{
"constant": false,
"inputs": [
{
    "internalType": "address",
    "name": "spender",
    "type": "address"
},
{
    "internalType": "uint256",
    "name": "value",
    "type": "uint256"
}
],
"name": "approve",
"outputs": [
{
    "internalType": "bool",
    "name": "",
    "type": "bool"
}
],
"payable": false,
"stateMutability": "nonpayable",
"type": "function"
},
{
"constant": true,
"inputs": [
{
    "internalType": "address",
    "name": "",
    "type": "address"
}
],
"name": "balanceOf",
"outputs": [
{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
}
],
"payable": false,
"stateMutability": "view",
"type": "function"
},
{
"constant": false,
"inputs": [
{
    "internalType": "address",
    "name": "to",
    "type": "address"
}
],
"name": "burn",
"outputs": [
{
    "internalType": "uint256",
    "name": "amount0",
    "type": "uint256"
},
{
    "internalType": "uint256",
    "name": "amount1",
    "type": "uint256"
}
],
"payable": false,
"stateMutability": "nonpayable",
"type": "function"
},
{
"constant": true,
"inputs": [],
"name": "decimals",
"outputs": [
{
    "internalType": "uint8",
    "name": "",
    "type": "uint8"
}
],
"payable": false,
"stateMutability": "view",
"type": "function"
},
{
"constant": true,
"inputs": [],
"name": "factory",
"outputs": [
{
    "internalType": "address",
    "name": "",
    "type": "address"
}
],
"payable": false,
"stateMutability": "view",
"type": "function"
},
{
"constant": true,
"inputs": [],
"name": "getReserves",
"outputs": [
{
    "internalType": "uint112",
    "name": "_reserve0",
    "type": "uint112"
},
{
    "internalType": "uint112",
    "name": "_reserve1",
    "type": "uint112"
},
{
    "internalType": "uint32",
    "name": "_blockTimestampLast",
    "type": "uint32"
}
],
"payable": false,
"stateMutability": "view",
"type": "function"
},
{
"constant": false,
"inputs": [
{
    "internalType": "address",
    "name": "_token0",
    "type": "address"
},
{
    "internalType": "address",
    "name": "_token1",
    "type": "address"
}
],
"name": "initialize",
"outputs": [],
"payable": false,
"stateMutability": "nonpayable",
"type": "function"
},
{
"constant": true,
"inputs": [],
"name": "kLast",
"outputs": [
{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
}
],
"payable": false,
"stateMutability": "view",
"type": "function"
},
{
"constant": false,
"inputs": [
{
    "internalType": "address",
    "name": "to",
    "type": "address"
}
],
"name": "mint",
"outputs": [
{
    "internalType": "uint256",
    "name": "liquidity",
    "type": "uint256"
}
],
"payable": false,
"stateMutability": "nonpayable",
"type": "function"
},
{
"constant": true,
"inputs": [],
"name": "name",
"outputs": [
{
    "internalType": "string",
    "name": "",
    "type": "string"
}
],
"payable": false,
"stateMutability": "view",
"type": "function"
},
{
"constant": true,
"inputs": [
{
    "internalType": "address",
    "name": "",
    "type": "address"
}
],
"name": "nonces",
"outputs": [
{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
}
],
"payable": false,
"stateMutability": "view",
"type": "function"
},
{
"constant": false,
"inputs": [
{
    "internalType": "address",
    "name": "owner",
    "type": "address"
},
{
    "internalType": "address",
    "name": "spender",
    "type": "address"
},
{
    "internalType": "uint256",
    "name": "value",
    "type": "uint256"
},
{
    "internalType": "uint256",
    "name": "deadline",
    "type": "uint256"
},
{
    "internalType": "uint8",
    "name": "v",
    "type": "uint8"
},
{
    "internalType": "bytes32",
    "name": "r",
    "type": "bytes32"
},
{
    "internalType": "bytes32",
    "name": "s",
    "type": "bytes32"
}
],
"name": "permit",
"outputs": [],
"payable": false,
"stateMutability": "nonpayable",
"type": "function"
},
{
"constant": true,
"inputs": [],
"name": "price0CumulativeLast",
"outputs": [
{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
}
],
"payable": false,
"stateMutability": "view",
"type": "function"
},
{
"constant": true,
"inputs": [],
"name": "price1CumulativeLast",
"outputs": [
{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
}
],
"payable": false,
"stateMutability": "view",
"type": "function"
},
{
"constant": false,
"inputs": [
{
    "internalType": "address",
    "name": "to",
    "type": "address"
}
],
"name": "skim",
"outputs": [],
"payable": false,
"stateMutability": "nonpayable",
"type": "function"
},
{
"constant": false,
"inputs": [
{
    "internalType": "uint256",
    "name": "amount0Out",
    "type": "uint256"
},
{
    "internalType": "uint256",
    "name": "amount1Out",
    "type": "uint256"
},
{
    "internalType": "address",
    "name": "to",
    "type": "address"
},
{
    "internalType": "bytes",
    "name": "data",
    "type": "bytes"
}
],
"name": "swap",
"outputs": [],
"payable": false,
"stateMutability": "nonpayable",
"type": "function"
},
{
"constant": true,
"inputs": [],
"name": "symbol",
"outputs": [
{
    "internalType": "string",
    "name": "",
    "type": "string"
}
],
"payable": false,
"stateMutability": "view",
"type": "function"
},
{
"constant": false,
"inputs": [],
"name": "sync",
"outputs": [],
"payable": false,
"stateMutability": "nonpayable",
"type": "function"
},
{
"constant": true,
"inputs": [],
"name": "token0",
"outputs": [
{
    "internalType": "address",
    "name": "",
    "type": "address"
}
],
"payable": false,
"stateMutability": "view",
"type": "function"
},
{
"constant": true,
"inputs": [],
"name": "token1",
"outputs": [
{
    "internalType": "address",
    "name": "",
    "type": "address"
}
],
"payable": false,
"stateMutability": "view",
"type": "function"
},
{
"constant": true,
"inputs": [],
"name": "totalSupply",
"outputs": [
{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
}
],
"payable": false,
"stateMutability": "view",
"type": "function"
},
{
"constant": false,
"inputs": [
{
    "internalType": "address",
    "name": "to",
    "type": "address"
},
{
    "internalType": "uint256",
    "name": "value",
    "type": "uint256"
}
],
"name": "transfer",
"outputs": [
{
    "internalType": "bool",
    "name": "",
    "type": "bool"
}
],
"payable": false,
"stateMutability": "nonpayable",
"type": "function"
},
{
"constant": false,
"inputs": [
{
    "internalType": "address",
    "name": "from",
    "type": "address"
},
{
    "internalType": "address",
    "name": "to",
    "type": "address"
},
{
    "internalType": "uint256",
    "name": "value",
    "type": "uint256"
}
],
"name": "transferFrom",
"outputs": [
{
    "internalType": "bool",
    "name": "",
    "type": "bool"
}
],
"payable": false,
"stateMutability": "nonpayable",
"type": "function"
}
]
export const ovswapbase_abi = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "buyer",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "tokenAddress",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amountOut",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "ethSpent",
                "type": "uint256"
            }
        ],
        "name": "TokensPurchased",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "seller",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "tokenAddress",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amountIn",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "ethReceived",
                "type": "uint256"
            }
        ],
        "name": "TokensSold",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "tokenAddress",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amountOutMin",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
            }
        ],
        "name": "buyExactTokenWithETH",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "tokenAddress",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amountIn",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amountOutMin",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
            }
        ],
        "name": "sellExactTokenForETH",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "uniswapV2Router",
        "outputs": [
            {
                "internalType": "contract IUniswapV2Router02",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]
export const nameassymbolerc20_abi = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "allowance",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "needed",
                "type": "uint256"
            }
        ],
        "name": "ERC20InsufficientAllowance",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "sender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "balance",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "needed",
                "type": "uint256"
            }
        ],
        "name": "ERC20InsufficientBalance",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "approver",
                "type": "address"
            }
        ],
        "name": "ERC20InvalidApprover",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "receiver",
                "type": "address"
            }
        ],
        "name": "ERC20InvalidReceiver",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "sender",
                "type": "address"
            }
        ],
        "name": "ERC20InvalidSender",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            }
        ],
        "name": "ERC20InvalidSpender",
        "type": "error"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "internalType": "uint8",
                "name": "",
                "type": "uint8"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]
export const arbitrageExecutorABI = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [
            {
                "internalType": "address[]",
                "name": "path",
                "type": "address[]"
            },
            {
                "internalType": "uint256[]",
                "name": "amounts",
                "type": "uint256[]"
            }
        ],
        "name": "executeArbitrage",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "uniswapV2Router",
        "outputs": [
            {
                "internalType": "contract IUniswapV2Router02",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "stateMutability": "payable",
        "type": "receive"
    }
]

export const UNISWAP_FACTORY_ADDRESS = '0x7E0987E5b3a30e3f2828572Bb659A548460a3003';
export const WETH_ADDRESS = '0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9';
export const UNISWAP_PAIR_ADDRESS = '0x486941CfA4e4E38e4337f1341700E1941cfF5005';
export const UNISWAP_ROUTER = '0xC532a74256D3Db42D0Bf7a0400fEFDbad7694008';
export const OVPOOLBASE_ADDRESS = '0xc1baaea3b2879a6bd60b7acea170f36ff991a142';
export const OVSWAPBASE_ADDRESS = '0x090A0F10d6c50C6e6505d6d60695048318aFd752'; 
export const OVTOKENBASE_ADDRESS = '0x313ff3927a284e7897ef7b48f005f7fb3be2f043';
export const ARBITRAGE_EXECUTOR_ADDRESS = '0xb43eeb2fa9e2d78728b32b442ad03e4866effd55';
export const BLOCK_HEIGHT = 4000000;