
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

    
const contractAddress = "0x929fAB33EA6A6911da4821a14f052FE377cc27e6"; //contract address


// the smart contract ABI with the contract address toghether in a variable
const contract = new web3.eth.Contract([
	{
		"constant": false,
		"inputs": [],
		"name": "buyTokens",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "destroy",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "initialize",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "_tokenAddr",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"payable": true,
		"stateMutability": "payable",
		"type": "fallback"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "BoughtTokens",
		"type": "event"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "CAP",
		"outputs": [
			{
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
		"name": "DAYS",
		"outputs": [
			{
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
		"name": "goalReached",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "initialized",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "initialTokens",
		"outputs": [
			{
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
		"name": "isActive",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
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
		"name": "raisedAmount",
		"outputs": [
			{
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
		"name": "RATE",
		"outputs": [
			{
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
		"name": "START",
		"outputs": [
			{
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
		"name": "tokensAvailable",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]

, contractAddress)

console.log(contract);

//interact with smart contract

let hash = ""

async function claim(amount) {
  const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
  const account = accounts[0];
  //const tx = await contract.methods.transfer(account, amount).send({from:account});
  const tx = web3.eth.sendTransaction({from:account,
	 to:contractAddress,
	  value:(amount*10**18),
	   chain:"goerli"},
	   function(err, hash) {
		if (!err)
		console.log("it works" + hash); // not called awaits send transaction 
	    checkTx(hash);
	});
	}

//triggers transaction
const buyNova = document.getElementById("submitBtn");

buyNova.addEventListener('click', (event) => {
    event.preventDefault();
    let amount = document.getElementById("input").value;
    claim(amount);
    console.log(amount);
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

 let txHash = ethereum.request({
	method: 'eth_sendTransaction',
	params: [tx],
}).then((hash) => {
	console.log(hash)
}).catch((err) => console.log(err))


function checkTx(hash) {
    let statusElement = document.getElementById("transaction-message")
	let subMessageElement = document.getElementById("submessage")

    // Log which tx hash we're checking
    console.log("Waiting for tx " + hash)
    //statusElement.innerHTML = "Waiting"

    // Set interval to regularly check if we can get a receipt
    let interval = setInterval(() => {
        console.log(1)
        web3.eth.getTransactionReceipt(hash, (err, receipt) => {
			console.log(2)
			console.log(receipt)
            // If we've got a receipt, check status and log / change text accordingly
            if (receipt) {
                
                console.log("Gotten receipt2")
                if (receipt.status === true) {
                    console.log(receipt)
                    statusElement.innerHTML = "Success"
					subMessageElement.innerHTML = "The Transaction Was Completed"
					document.getElementById('transaction-image').src="assets/bluecheck.png"
					document.querySelector(".spin-load").style.animation = 'none';
                } else if (receipt.status === false) {
                    console.log("Tx failed")
                    statusElement.innerHTML = "Failed"
                }

                // Clear interval
                clearInterval(interval)
            }
        })
    }, 5000)
}

function resetTransactionPopup() {
	let statusElement = document.getElementById("transaction-message")
	let subMessageElement = document.getElementById("submessage")
	document.getElementById('transaction-image').src="assets/spin load.png"
	document.querySelector(".spin-load").style.animation = 'spin 2s linear infinite';
	statusElement.innerHTML = "Transaction Pending"
	subMessageElement.innerHTML = "Approve This Transaction In Your Wallet"
}

function resetInputValue() {
	document.getElementById("input").value = ""
	document.getElementById("nova-input").value = ""
}