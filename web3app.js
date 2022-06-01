
//check if web3
if (typeof web3 !== 'undefined') {
  web3 = new Web3(ethereum);
  console.log(web3.eth.accounts);

} else {
  web3 = new Web3(new Web3.providers.HttpProvider('https://goerli.infura.io/v3/a563c008f9504d33bce5075a3100da08'));
  
}

const connectBtn = document.getElementById("connect")
const walletAddress = document.getElementById("wallet-address")
let addressArray = []

//connect to wallet
var web3;
    
async function connect() {

    if (window.ethereum) {
       await window.ethereum.send('eth_requestAccounts');
       window.web3 = new Web3(window.ethereum);
       connectBtn.innerHTML = "Connected";
       getAccount()
       
      }
      
    }

    
const contractAddress = "0x1a0E6664D47218F2a31Ea3220A834EDF98da5884"; //contract address
let minter_address = "0xb14969b2eCA9733150fFF0C2e9b45844A25e371F";


// the smart contract ABI with the contract address toghether in a variable
const contract = new web3.eth.Contract([
{
  "anonymous": false,
  "inputs": [
    {
      "indexed": true,
      "internalType": "address",
      "name": "_owner",
      "type": "address"
    },
    {
      "indexed": true,
      "internalType": "address",
      "name": "_spender",
      "type": "address"
    },
    {
      "indexed": false,
      "internalType": "uint256",
      "name": "_value",
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
      "name": "_from",
      "type": "address"
    },
    {
      "indexed": true,
      "internalType": "address",
      "name": "_to",
      "type": "address"
    },
    {
      "indexed": false,
      "internalType": "uint256",
      "name": "_value",
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
      "name": "_owner",
      "type": "address"
    },
    {
      "internalType": "address",
      "name": "_spender",
      "type": "address"
    }
  ],
  "name": "allowance",
  "outputs": [
    {
      "internalType": "uint256",
      "name": "remaining",
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
      "name": "_spender",
      "type": "address"
    },
    {
      "internalType": "uint256",
      "name": "_value",
      "type": "uint256"
    }
  ],
  "name": "approve",
  "outputs": [
    {
      "internalType": "bool",
      "name": "success",
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
      "name": "_owner",
      "type": "address"
    }
  ],
  "name": "balanceOf",
  "outputs": [
    {
      "internalType": "uint256",
      "name": "balance",
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
      "name": "_to",
      "type": "address"
    },
    {
      "internalType": "uint256",
      "name": "_value",
      "type": "uint256"
    }
  ],
  "name": "transfer",
  "outputs": [
    {
      "internalType": "bool",
      "name": "success",
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
      "name": "_from",
      "type": "address"
    },
    {
      "internalType": "address",
      "name": "_to",
      "type": "address"
    },
    {
      "internalType": "uint256",
      "name": "_value",
      "type": "uint256"
    }
  ],
  "name": "transferFrom",
  "outputs": [
    {
      "internalType": "bool",
      "name": "success",
      "type": "bool"
    }
  ],
  "stateMutability": "nonpayable",
  "type": "function"
}
], contractAddress)

console.log(contract);

//interact with smart contract

async function claim(amount) {
  const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
  const account = accounts[0];
  const tx = await contract.methods.transferFrom(minter_address, account, amount).send({from:account});
  
}

//triggers transaction
const buyNova = document.getElementById("submitBtn");

buyNova.addEventListener('click', (event) => {
    event.preventDefault();
    let tokenInput = document.getElementById("input").value;
    claim(tokenInput);
    console.log(tokenInput);
})

//displays eth balance & account number
let ethBalance = document.getElementById("eth-balance")

  async function getAccount() {
   const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
   const account = accounts[0];
   walletAddress.innerHTML += account;
   web3.eth.getBalance(account, function(err, result) {
    if (err) {
      console.log(err)
    } else {
      ethBalance.innerHTML += web3.utils.fromWei(result, "ether") + " ETH"
      console.log(web3.utils.fromWei(result, "ether") + " ETH")
    }
  })
  
 }


 
