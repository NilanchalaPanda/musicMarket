import Navbar from "./Navbar";
import { useLocation, useParams } from "react-router-dom";
import MarketplaceJSON from "../Marketplace.json";
import axios from "axios";
import { useState } from "react";
import NFTTile from "./NFTTile";

export default function Profile() {
  const [data, updateData] = useState([]);
  const [address, updateAddress] = useState("0x");
  const [totalPrice, updateTotalPrice] = useState("0");

  return (
    <div className="min-h-screen bg-darkblue font-poppins text-white overflow-x-hidden">
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
