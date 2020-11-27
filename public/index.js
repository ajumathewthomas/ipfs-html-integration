const IPFS = require('ipfs-core')
const uint8ArrayConcat = require('uint8arrays/concat')
const all = require('it-all')

var node;
var photoMatrix = {};
var account;

window.addEventListener('load', async () => {


  if (typeof window.ethereum !== 'undefined') {
    console.log("MetaMask is Available :) !");
  }

  // Modern DApp browsers
  if (window.ethereum) {
    window.web3 = new Web3(ethereum);

    // To prevent the page reloading when the MetaMask network changes
    ethereum.autoRefreshOnNetworkChange = false;

    // To Capture the account details from MetaMask
    const accounts = await ethereum.enable();
    account = accounts[0];

  }
  // Legacy DApp browsers
  else if (window.web3) {
    //window.web3 = new Web3(web3.currentProvider);
    window.web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/cbd9dc11b30147e9a2cc974be655ef7c"));
  }
  // Non-DApp browsers
  else {
    console.log('Non-Ethereum browser detected. Please install MetaMask');
  }

});

var abi = [
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
        "name": "contractAddress",
        "type": "address"
      }
    ],
    "name": "ContractCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "key",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "bytes",
        "name": "value",
        "type": "bytes"
      }
    ],
    "name": "DataChanged",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "_operation",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "_to",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "_value",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "bytes",
        "name": "_data",
        "type": "bytes"
      }
    ],
    "name": "Executed",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_operation",
        "type": "uint256"
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
      },
      {
        "internalType": "bytes",
        "name": "_data",
        "type": "bytes"
      }
    ],
    "name": "execute",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "_key",
        "type": "bytes32"
      }
    ],
    "name": "getData",
    "outputs": [
      {
        "internalType": "bytes",
        "name": "_value",
        "type": "bytes"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_ssn_id",
        "type": "string"
      }
    ],
    "name": "getUserfileDetails",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
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
    "inputs": [
      {
        "internalType": "string",
        "name": "_ssn_id",
        "type": "string"
      }
    ],
    "name": "getuserDetails",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
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
    "name": "owner",
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
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "_key",
        "type": "bytes32"
      },
      {
        "internalType": "bytes",
        "name": "_value",
        "type": "bytes"
      }
    ],
    "name": "setData",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_ssn_id",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_dob",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_gender",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_contact_no",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_email",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_blood_group",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_city",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_state",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_photoHash",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_ltHash",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_rtHash",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_leHash",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_reHash",
        "type": "string"
      }
    ],
    "name": "setDetails",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes4",
        "name": "interfaceId",
        "type": "bytes4"
      }
    ],
    "name": "supportsInterface",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]
var contractaddress = '0x78a8f7b5d3c8657d76e66d3CF4aAd03C02C05C2C';

function set_details() {
  var myContract = new web3.eth.Contract(abi, contractaddress, { from: account, gasPrice: '5000000', gas: '5000000' });

  var name = document.getElementById("name").value;
  var dob = document.getElementById("birthday").value;
  var gender = document.getElementById("gender").value;
  var cnumber = document.getElementById("contact_no").value;
  var email = document.getElementById("email_id").value;
  var bgroup = document.getElementById("bloodgroup").value;
  var city = document.getElementById("city").value;
  var state = document.getElementById("state").value;
  var photo = photoMatrix['image'] ? photoMatrix['image'] : "";
  var photo1 = photoMatrix['image1'] ? photoMatrix['image1'] : "";
  var photo2 = photoMatrix['image2'] ? photoMatrix['image2'] : "";
  var photo3 = photoMatrix['image3'] ? photoMatrix['image3'] : "";
  var photo4 = photoMatrix['image4'] ? photoMatrix['image4'] : "";
  var ssnid = web3.utils.randomHex(8);

  var result = myContract.methods.setDetails(ssnid, name, dob, gender, cnumber, email, bgroup, city, state, photo, photo1, photo2, photo3, photo4).send(function (err, result) {

    if (err) { console.log(err); }
    if (result) {

      document.getElementById("result").innerHTML = result;
      document.getElementById("result4").innerHTML = ssnid;

    }

  });
}
function show_details() {
  var myContract = new web3.eth.Contract(abi, contractaddress, { from: account, gasPrice: '5000000', gas: '500000' });
  var s_id = document.getElementById("ssn_id").value;
  var result = myContract.methods.getuserDetails(s_id).call(function (err, result) {

    if (err) { console.log(err); }
    if (result) {
      document.getElementById("get_name").innerHTML = result[0];
      document.getElementById("get_dob").innerHTML = result[1];
      document.getElementById("get_gender").innerHTML = result[2];
      document.getElementById("get_number").innerHTML = result[3];
      document.getElementById("get_email").innerHTML = result[4];
      document.getElementById("get_bloodgroup").innerHTML = result[5];
      document.getElementById("get_city").innerHTML = result[6];
    }
  });
  
  var fileDetails  = myContract.methods.getUserfileDetails(s_id).call(function (err,fileDetails) {

    if (err) { console.log(err); }
    if (fileDetails) {
      document.getElementById("get_state").innerHTML = fileDetails[0];
      document.getElementById("get_photo").innerHTML = getFile(fileDetails[1], 'get_photo');
      document.getElementById("get_leftThumb").innerHTML = getFile(fileDetails[2], 'get_leftThumb');
      document.getElementById("get_rightThumb").innerHTML = getFile(fileDetails[3], 'get_rightThumb');
      document.getElementById("get_leftEye").innerHTML = getFile(fileDetails[4], 'get_leftEye');
      document.getElementById("get_rightEye").innerHTML = getFile(fileDetails[5], 'get_rightEye');
    }
  });
}


async function uploadFile(file) {

  const fileAdded = await node.add({
    path: file.name,
    content: file
  }, {
    wrapWithDirectory: true
  })

  // As we are wrapping the content we use that hash to keep
  // the original file name when adding it to the table
  return (fileAdded.cid.toString());
}

async function getFile(cid, id) {

  for await (const file of node.get(cid)) {
    if (file.content) {
      const content = uint8ArrayConcat(await all(file.content))

      await appendFile(content, id)
    }
  }
}

function appendFile(data, id) {
  const file = new window.Blob([data], { type: 'application/octet-binary' })
  const url = window.URL.createObjectURL(file)
  document.getElementById(id).setAttribute('src', url);
}

async function catchFile(e, id) {
  photoMatrix[id] = await uploadFile(e.target.files[0]);
  console.log(photoMatrix);
}

async function start() {
  node = await IPFS.create();

  if (document.getElementById('image')) {
    document.getElementById("image").addEventListener("change", (e) => catchFile(e, 'image'));
    document.getElementById("image1").addEventListener("change", (e) => catchFile(e, 'image1'));
    document.getElementById("image2").addEventListener("change", (e) => catchFile(e, 'image2'));
    document.getElementById("image3").addEventListener("change", (e) => catchFile(e, 'image3'));
    document.getElementById("image4").addEventListener("change", (e) => catchFile(e, 'image4'));
    document.getElementById('submitBtnIndex').addEventListener("click", () => set_details());
  } else {
    document.getElementById('getDetailsBtn').addEventListener("click", () => show_details());
  }
}

start();