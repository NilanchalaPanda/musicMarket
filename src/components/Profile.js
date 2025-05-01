import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import MarketplaceJSON from "../Marketplace.json";
import axios from "axios";
import { useEffect, useState } from "react";
import NFTTile from "./NFTTile";

export default function Profile() {
  const [data, updateData] = useState([]);
  const [dataFetched, updateFetched] = useState(false);
  const [address, updateAddress] = useState("0x");
  const [totalPrice, updateTotalPrice] = useState("0");

  useEffect(() => {
    async function getAddress() {
      const ethers = require("ethers");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const addr = await signer.getAddress();
      updateAddress(addr);
    }

    getAddress();
  }, []);

  async function getNFTData(tokenId) {
    const ethers = require("ethers");
    let sumPrice = 0;
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
    let transaction = await contract.getMyNFTs();

    /*
     * Below function takes the metadata from tokenURI and the data returned by getMyNFTs() contract function
     * and creates an object of information that is to be displayed
     */

    const items = await Promise.all(
      transaction.map(async (i) => {
        const tokenURI = await contract.tokenURI(i.tokenId);
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
        sumPrice += Number(price);
        return item;
      })
    );

    updateData(items);
    updateFetched(true);
    updateAddress(addr);
    updateTotalPrice(sumPrice.toPrecision(3));
  }

  const params = useParams();
  const tokenId = params.tokenId;
  if (!dataFetched) getNFTData(tokenId);

  return (
    <div className="min-h-screen pb-15 bg-darkblue font-poppins text-white overflow-x-hidden">
      <Navbar />

      <div className="flex flex-col items-center px-4 mt-12">
        <div className="text-center mb-10">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-purple-400 mb-2">
            Wallet Address
          </h2>
          <p className="break-all">{address}</p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-10 text-center text-lg sm:text-xl md:text-2xl mb-10">
          <div>
            <h2 className="font-bold text-purple-400 mb-1">No. of NFTs</h2>
            {data.length}
          </div>
          <div>
            <h2 className="font-bold text-purple-400 mb-1">Total Value</h2>
            {totalPrice} ETH
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-purple-400 mb-6">
            Your NFTs
          </h2>
          <div className="flex justify-center flex-wrap gap-6 max-w-screen-xl">
            {data.map((value, index) => (
              <NFTTile data={value} key={index} />
            ))}
          </div>

          {data.length === 0 && (
            <div className="mt-10 text-purple-400 text-lg sm:text-xl">
              Oops, No NFT data to display (Are you logged in?)
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
