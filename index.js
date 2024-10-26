const ethers = require('ethers');
require('dotenv').config();

// use hardhat local development
// const API_URL = process.env.API_URL;
// const PRIVATE_KEY = process.env.PRIVATE_KEY;
// const contractAddress = process.env.CONTRACT_ADDRESS;
// const {abi} = require("./artifacts/contracts/contractApi.sol/contractApi.json");

// Use infure
// Scan: https://sepolia.etherscan.io/address/0x9a686af407cb937da3869a8ba57c0edd1dc0795b
const API_URL         = "https://sepolia.infura.io/v3/af2df50ef3c746f182a124a437a00aab";
const PRIVATE_KEY     = "4362035908f92c110cf8da15a3669fecf82e1c98157ebc0eae2d5f378bf52361"
const contractAddress = "0x9A686AF407cb937da3869a8bA57C0eDD1dC0795B";
const abi             = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"deleteProduct","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getAllProducts","outputs":[{"components":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"string","name":"name","type":"string"},{"internalType":"uint256","name":"price","type":"uint256"},{"internalType":"uint256","name":"quantity","type":"uint256"}],"internalType":"struct contractApi.Product[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"getProduct","outputs":[{"internalType":"string","name":"","type":"string"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"productArray","outputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"string","name":"name","type":"string"},{"internalType":"uint256","name":"price","type":"uint256"},{"internalType":"uint256","name":"quantity","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"products","outputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"string","name":"name","type":"string"},{"internalType":"uint256","name":"price","type":"uint256"},{"internalType":"uint256","name":"quantity","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"removeMe","outputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"string","name":"name","type":"string"},{"internalType":"uint256","name":"price","type":"uint256"},{"internalType":"uint256","name":"quantity","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"},{"internalType":"string","name":"_name","type":"string"},{"internalType":"uint256","name":"_price","type":"uint256"},{"internalType":"uint256","name":"_quantity","type":"uint256"}],"name":"setProduct","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"},{"internalType":"string","name":"_name","type":"string"},{"internalType":"uint256","name":"_price","type":"uint256"},{"internalType":"uint256","name":"_quantity","type":"uint256"}],"name":"updateProduct","outputs":[],"stateMutability":"nonpayable","type":"function"}]

const provider = new ethers.providers.JsonRpcProvider(API_URL);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);
const contractInstance = new ethers.Contract(contractAddress, abi, signer);

const express = require('express');
const app = express();
app.use(express.json());

app.get('/', async(req, res) => {
    res.send({
        message: "ok"
    });
});

app.get('/products/:id', async(req, res) => {   //http://localhost:3000/products/1
    try {
        const id = req.params.id;
        const product = await contractInstance.getProduct(id);
        let prod = []
        prod[0] = product[0];
        prod[1] = parseInt(product[1]);
        prod[2] = parseInt(product[2]);
        res.send(prod);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});

app.get('/products/', async(req, res) => {   //http://localhost:3000/products/
    try {
        const allProducts = await contractInstance.getAllProducts();
        const products = allProducts.map(product => ({
            id : parseInt(product.id),
            name: product.name,
            price: parseInt(product.price),
            quantity: parseInt(product.quantity)
        }))
        console.log(products)
        res.send(products);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});


app.post('/products', async(req, res) => {
    try {
        const {id, name, price, quantity} = req.body;
        const tx = await contractInstance.setProduct(id, name, price, quantity);
        await tx.wait();
        res.json({success: true})
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});

app.put('/products/:id', async (req, res) => {   //http://localhost:3000/products/1
    try {
        const id = req.params.id;
        const {name, price, quantity} = req.body;
        const tx = await contractInstance.updateProduct(id, name, price, quantity);
        await tx.wait();
        res.json({success: true})
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});

app.delete('/products/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const tx = await contractInstance.deleteProduct(id);
        await tx.wait();
        res.json({success: true})
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});

const port = 3000;
app.listen(port, () => {
    console.log("API server is listening on port 3000")
})

