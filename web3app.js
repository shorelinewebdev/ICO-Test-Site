



if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask is installed!');
  } else {
      conspole.log('anger anger')
  }


  const ethereumButton = document.querySelector('.connect-btn');
  const showAccount = document.querySelector('.showAccount');

  ethereumButton.addEventListener('click', () => {
    //Will Start the metamask extension
    ethereum.request({ method: 'eth_requestAccounts' });
  });

  ethereumButton.addEventListener('click', () => {
    getAccount();
  });
  
  async function getAccount() {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    showAccount.innerHTML = account;
  }




l