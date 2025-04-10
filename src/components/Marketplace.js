import { useState } from "react";
import Navbar from "./Navbar";
import NFTTile from "./NFTTile";
import MarketplaceJSON from "../Marketplace.json";
import { GetIpfsUrlFromPinata } from "../utils";
import axios from "axios";

export default function Marketplace() {
  // const sampleData = [
  //   {
  //     name: "NFT#1",
  //     description: "Alchemy's First NFT",
  //     website: "http://axieinfinity.io",
  //     audioUrl:
  //       "https://gateway.pinata.cloud/ipfs/QmNVnJoZEB4rSyEWZCmRsqgcMTMzGhpsBJyRauk3Q421Jx",
  //     image:
  //       "https://gateway.pinata.cloud/ipfs/QmTsRJX7r5gyubjkdmzFrKQhHv74p5wT9LdeF1m3RTqrE5",
  //     price: "0.03ETH",
  //     currentlySelling: "True",
  //     address: "0xe81Bf5A757CB4f7F82a2F23b1e59bE45c33c5b13",
  //   },
  //   {
  //     name: "NFT#2",
  //     description: "Alchemy's Second NFT",
  //     website: "http://axieinfinity.io",
  //     audioUrl:
  //       "https://gateway.pinata.cloud/ipfs/QmNVnJoZEB4rSyEWZCmRsqgcMTMzGhpsBJyRauk3Q421Jx",
  //     image:
  //       "https://gateway.pinata.cloud/ipfs/QmdhoL9K8my2vi3fej97foiqGmJ389SMs55oC5EdkrxF2M",
  //     price: "0.03ETH",
  //     currentlySelling: "True",
  //     address: "0xe81Bf5A757C4f7F82a2F23b1e59bE45c33c5b13",
  //   },
  //   {
  //     name: "NFT#3",
  //     description: "Alchemy's Third NFT",
  //     website: "http://axieinfinity.io",
  //     audioUrl:
  //       "https://gateway.pinata.cloud/ipfs/QmNVnJoZEB4rSyEWZCmRsqgcMTMzGhpsBJyRauk3Q421Jx",
  //     image:
  //       "https://gateway.pinata.cloud/ipfs/QmTsRJX7r5gyubjkdmzFrKQhHv74p5wT9LdeF1m3RTqrE5",
  //     price: "0.03ETH",
  //     currentlySelling: "True",
  //     address: "0xe81Bf5A757C4f7F82a2F23b1e59bE45c33c5b13",
  //   },
  // ];

  const [data, updateData] = useState([]);
  const [dataFetched, updateFetched] = useState(false);

  async function getAllNFTs() {
    const ethers = require("ethers");
    //After adding your Hardhat network to your metamask, this code will get providers and signers
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    //Pull the deployed contract instance
    let contract = new ethers.Contract(
      MarketplaceJSON.address,
      MarketplaceJSON.abi,
      signer
    );
    //create an NFT Token
    let transaction = await contract.getAllNFTs();

    //Fetch all the details of every NFT from the contract and display
    const items = await Promise.all(
      transaction.map(async (i) => {
        var tokenURI = await contract.tokenURI(i.tokenId);
        console.log("getting this tokenUri", tokenURI);
        tokenURI = GetIpfsUrlFromPinata(tokenURI);
        let meta = await axios.get(tokenURI);
        meta = meta.data;

        let price = ethers.utils.formatUnits(i.price.toString(), "ether");
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: meta.image,
          name: meta.name,
          description: meta.description,
        };
        return item;
      })
    );

    updateFetched(true);
    updateData(items);
  }

  if (!dataFetched) getAllNFTs();

  return (
    <div className="min-h-screen bg-darkblue text-white font-poppins">
      <Navbar />
      <div className="flex flex-col items-center mt-20 px-4">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-500">
          Top NFTs
        </h1>
        <div className="w-full flex flex-col md:flex-row justify-center md:gap-y-6 md:gap-x-10 mt-10">
          {data &&
            data.map((value, index) => <NFTTile data={value} key={index} />)}
        </div>
      </div>
    </div>
  );
}
