# Web 3.0 YouTube App 📹

### Built with Next Js, Hardhat, Solidity, IPFS, The Graph Protocol and Tailwind CSS.

### Functionalities

- [x] Upload Video
- [x] play video
- [x] Search Videos
- [x] Upload Short
- [x] Search by Category
- [] comments - soon 

### Stack

- Frontend : [Next Js](https://nextjs.org/)
- Smart Contract Lang : [Solidity](https://docs.soliditylang.org/en/v0.8.17/)
- Indexing :  [The Graph](https://thegraph.com/en/)
- Dev Environment for ETH Software: [Hardhat](https://hardhat.org/)
- Testing: [Chai](https://www.chaijs.com/)
- File Storage : [IPFS](https://ipfs.tech/)
- Style : [Tailwind CSS](https://tailwindcss.com/)
- State management : [GraphQL Apollo Client](https://www.apollographql.com/)
- Icons : [React Icons](https://react-icons.github.io/react-icons/)


### Installation

####  Fork The Repo 

Click on the Right Side of the Top Bar to After the Watch button. <img src="https://upload.wikimedia.org/wikipedia/commons/3/38/GitHub_Fork_Button.png" width="120px" />

Now It will be available in GitHub Account.

#### OR

#### Clone

- Clone this repo with url

```shell
git clone 
```

##### Setup

> Install npm dependencies using npm install

```shell
$ npm install && cd web3-youtube && npm install
```

> Set up environment Variables I already Provided .env.example file.

> Create a .env file in the root directory.

> Set up required environment variables.

```
URL="POLYGON_TESTNET_URI"
PRIVATE_KEY="METAMASK_PRIVATE_KEY"
NEXT_PUBLIC_CONTRACT_ADDRESS="CONTRACT_ADDRESS"
NEXT_PUBLIC_PROJECT_ID="PROJECT_ID"
NEXT_PUBLIC_PROJECT_SECRET="PROJECT_SECRET"
NEXT_PUBLIC_GRAPHQL_URL="GRAPHQL_URL"
```

> In the Root Directory First Compile Your Smart Contract with This Following Command.

```shell
npx hardhat compile
```

> After Deploy Smart Contract to the Polygon Mumbai Testnet with this command.

```shell
npx hardhat run scripts/deploy.js --network mumbai
```

> Copy Smart Contract Address and replace it in with your "CONTRACT_ADDRESS"

```
NEXT_PUBLIC_CONTRACT_ADDRESS="CONTRACT_ADDRESS"
```

### Screenshots

#### Web