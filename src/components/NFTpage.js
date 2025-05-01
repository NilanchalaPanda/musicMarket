import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import MarketplaceJSON from "../Marketplace.json";
import axios from "axios";
import { useState } from "react";
import { GetIpfsUrlFromPinata } from "../utils";

export default function NFTPage(props) {
  const [data, updateData] = useState({});
  const [message, updateMessage] = useState("");
  const [currAddress, updateCurrAddress] = useState("0x");
  const [dataFetched, updateDataFetched] = useState(false);

  async function getNFTData(tokenId) {
    const ethers = require("ethers");
    //After adding your Hardhat network to your metamask, this code will get providers and signers
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const addr = await signer.getAddress();
    //Pull the deployed contract instance
    let contract = new ethers.Contract(
      MarketplaceJSON.address,
      MarketplaceJSON.abi,
      signer
    );
    //create an NFT Token
    var tokenURI = await contract.tokenURI(tokenId);
    const listedToken = await contract.getListedForTokenId(tokenId);
    tokenURI = GetIpfsUrlFromPinata(tokenURI);
    let meta = await axios.get(tokenURI);
    meta = meta.data;
    console.log(listedToken);

    let item = {
      price: meta.price,
      tokenId: tokenId,
      seller: listedToken.seller,
      owner: listedToken.owner,
      image: meta.image,
      name: meta.name,
      description: meta.description,
    };
    console.log(item);
    updateData(item);
    updateDataFetched(true);
    console.log("address", addr);
    updateCurrAddress(addr);
  }

  async function buyNFT(tokenId) {
    try {
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
      const salePrice = ethers.utils.parseUnits(data.price, "ether");
      updateMessage("Buying the NFT... Please Wait (Upto 5 mins)");
      //run the executeSale function
      let transaction = await contract.executeSale(tokenId, {
        value: salePrice,
      });
      await transaction.wait();

      alert("You successfully bought the NFT!");
      updateMessage("");
    } catch (e) {
      alert("Upload Error" + e);
    }
  }

  const params = useParams();
  const tokenId = params.tokenId;
  if (!dataFetched) getNFTData(tokenId);
  if (typeof data.image == "string")
    data.image = GetIpfsUrlFromPinata(data.image);

  return (
    <div className="min-h-screen overflow-x-hidden bg-darkblue text-white font-poppins">
      <Navbar />

      <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-10 p-10">
        {/* NFT Image */}
        <img
          src={data.image}
          alt="NFT Preview"
          className="w-full md:w-2/5 rounded-2xl shadow-lg object-cover"
        />

        {/* NFT Details */}
        <div className="text-base md:text-lg bg-[#101624] border border-[#1a1f2e] shadow-2xl rounded-2xl p-6 space-y-6 w-full max-w-xl">
          <div>
            <span className="font-semibold text-purple-400">Name:</span>{" "}
            {data.name}
          </div>

          <div>
            <span className="font-semibold text-purple-400">Description:</span>{" "}
            {data.description}
          </div>

          <div>
            <span className="font-semibold text-purple-400">Price:</span>{" "}
            {data.price} ETH
          </div>

          <div>
            <span className="font-semibold text-purple-400">Owner:</span>
            <div className="text-sm break-words">{data.owner}</div>
          </div>

          <div>
            <span className="font-semibold text-purple-400">Seller:</span>
            <div className="text-sm break-words">{data.seller}</div>
          </div>

          {/* Buy Button / Ownership Info */}
          <div>
            {currAddress !== data.owner && currAddress !== data.seller ? (
              <button
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-md shadow-md transition-all duration-300"
                onClick={() => buyNFT(tokenId)}
              >
                Buy this NFT
              </button>
            ) : (
              <div className="text-green-500 text-center font-medium">
                You are the owner of this NFT
              </div>
            )}

            {message && (
              <div className="text-purple-300 text-sm text-center mt-3">
                {message}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
