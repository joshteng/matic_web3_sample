const Web3 = require('Web3')
const web3 = new Web3('<YOUR RPC URL>')

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function getLatestBlockNumber() {
  const block = await web3.eth.getBlock('latest')
  return +block.number
}

async function totalTransactions() {
  let totalTransactions = 0
  const latestBlockNumber = await getLatestBlockNumber()

  for (i = 0; i <= latestBlockNumber; i++) {
    const block = await web3.eth.getBlock(i)
    totalTransactions += block.transactions.length
    await sleep(1000 / 200) // avoid rate limit of 200 per 1 second
    console.log(i)
    // if (i === 5) { break; }
  };
  return totalTransactions
}

(async () => {
  console.log(`total transactions: #${await totalTransactions()}`)
})()
