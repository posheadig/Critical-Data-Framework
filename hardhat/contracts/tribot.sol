// SPDX-License-Identifier: MIT
pragma solidity =0.8.21;

import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract DataArb {
    IUniswapV2Router02 public immutable uniswapV2Router;

    constructor() {
        uniswapV2Router = IUniswapV2Router02(0xC532a74256D3Db42D0Bf7a0400fEFDbad7694008);
    }

    // This function is payable as it may need to send ETH for the first swap
    function executeArbitrage(
        address[] calldata path,
        uint[] calldata amounts
    ) external payable {
        require(path.length == 4 && amounts.length == 3, "Invalid path or amounts");
        require(path[0] == uniswapV2Router.WETH() && path[path.length - 1] == uniswapV2Router.WETH(), "Path must start and end with WETH");

        // Define paths for each swap
        address[] memory pathETHToToken1 = new address[](2);
        pathETHToToken1[0] = path[0];
        pathETHToToken1[1] = path[1];

        address[] memory pathToken1ToToken2 = new address[](2);
        pathToken1ToToken2[0] = path[1];
        pathToken1ToToken2[1] = path[2];

        address[] memory pathToken2ToETH = new address[](2);
        pathToken2ToETH[0] = path[2];
        pathToken2ToETH[1] = path[3];

        // ETH -> Token1
        uint[] memory amountsOutETHToToken1 = uniswapV2Router.swapETHForExactTokens{value: msg.value}(
            amounts[0],
            pathETHToToken1,
            address(this),
            block.timestamp + 300
        );

        IERC20(path[1]).approve(address(uniswapV2Router), amountsOutETHToToken1[1]);

        // Token1 -> Token2
        uniswapV2Router.swapExactTokensForTokens(
            amounts[0],
            0,
            pathToken1ToToken2,
            address(this),
            block.timestamp + 300
        );

        IERC20 token2 = IERC20(path[2]);
        uint256 token2Balance = token2.balanceOf(address(this));
        token2.approve(address(uniswapV2Router), token2Balance);
        // Token2 -> ETH
        uniswapV2Router.swapExactTokensForETH(
            amounts[1],
            0,
            pathToken2ToETH,
            msg.sender,
            block.timestamp + 300
        );

        // Return leftover ETH to sender (if any)
        uint256 leftoverEth = address(this).balance;
        if (leftoverEth > 0) {
            (bool success, ) = payable(msg.sender).call{value: leftoverEth}("");
            require(success, "Failed to return ETH");
        }
    }

    receive() external payable {}
}