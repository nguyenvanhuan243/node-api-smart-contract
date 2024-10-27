# node-api-smart-contract

# Start hardhat
```
npx hardhat node
```

# Create contract address
```
npx hardhat run --network volta scripts/deploy.js
```
# Guide for developer
- use hardhat local development

```
const API_URL = process.env.API_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const contractAddress = process.env.CONTRACT_ADDRESS;
const {abi} = require("./artifacts/contracts/contractApi.sol/contractApi.json");
```

- Use infure

- Infura Dashboard
![image](https://github.com/user-attachments/assets/2b451bac-d1aa-451e-8b83-09574cff4779)
```
const API_URL         = "https://sepolia.infura.io/v3/af2df50ef3c746f182a124a437a00aab";
const PRIVATE_KEY     = "4362035908f92c110cf8da15a3669fecf82e1c98157ebc0eae2d5f378bf52361"
const contractAddress = "0x9A686AF407cb937da3869a8bA57C0eDD1dC0795B";
const abi             = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"deleteProduct","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getAllProducts","outputs":[{"components":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"string","name":"name","type":"string"},{"internalType":"uint256","name":"price","type":"uint256"},{"internalType":"uint256","name":"quantity","type":"uint256"}],"internalType":"struct contractApi.Product[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"getProduct","outputs":[{"internalType":"string","name":"","type":"string"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"productArray","outputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"string","name":"name","type":"string"},{"internalType":"uint256","name":"price","type":"uint256"},{"internalType":"uint256","name":"quantity","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"products","outputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"string","name":"name","type":"string"},{"internalType":"uint256","name":"price","type":"uint256"},{"internalType":"uint256","name":"quantity","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"removeMe","outputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"string","name":"name","type":"string"},{"internalType":"uint256","name":"price","type":"uint256"},{"internalType":"uint256","name":"quantity","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"},{"internalType":"string","name":"_name","type":"string"},{"internalType":"uint256","name":"_price","type":"uint256"},{"internalType":"uint256","name":"_quantity","type":"uint256"}],"name":"setProduct","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"},{"internalType":"string","name":"_name","type":"string"},{"internalType":"uint256","name":"_price","type":"uint256"},{"internalType":"uint256","name":"_quantity","type":"uint256"}],"name":"updateProduct","outputs":[],"stateMutability":"nonpayable","type":"function"}]
```
- Sepolia scan: https://sepolia.etherscan.io/address/0x9a686af407cb937da3869a8ba57c0edd1dc0795b

