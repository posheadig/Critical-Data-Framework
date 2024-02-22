window.global = window;
module.exports = {
...require('./network_utilities/provider.js'),
...require('./network_utilities/eventHandler.js'),
...require('./network_utilities/getConstants.js'),
...require('./constants/sepolia.js'),
...require('./blockchain_posts/buyToken.js'),
...require('./blockchain_posts/sellToken.js'),
...require('./blockchain_posts/newToken.js'),
...require('./blockchain_posts/newLink.js'),
...require('./blockchain_posts/removeLiquidity.js'),
...require('./blockchain_posts/botswap.js'),
...require('./blockchain_posts/bot.js'),
...require('./blockchain_posts/botswap.js'),
...require('./blockchain_posts/removeLiquidity.js')
}
