import Navbar from "./Navbar";
import NFTTile from "./NFTTile";
// import { useState } from "react";

export default function Marketplace() {
  const sampleData = [
    {
      name: "NFT#1",
      description: "Alchemy's First NFT",
      website: "http://axieinfinity.io",
      audioUrl: "https://gateway.pinata.cloud/ipfs/QmNVnJoZEB4rSyEWZCmRsqgcMTMzGhpsBJyRauk3Q421Jx",
      image:
        "https://gateway.pinata.cloud/ipfs/QmTsRJX7r5gyubjkdmzFrKQhHv74p5wT9LdeF1m3RTqrE5",
      price: "0.03ETH",
      currentlySelling: "True",
      address: "0xe81Bf5A757CB4f7F82a2F23b1e59bE45c33c5b13",
    },
    {
      name: "NFT#2",
      description: "Alchemy's Second NFT",
      website: "http://axieinfinity.io",
      audioUrl: "https://gateway.pinata.cloud/ipfs/QmNVnJoZEB4rSyEWZCmRsqgcMTMzGhpsBJyRauk3Q421Jx",
      image:
        "https://gateway.pinata.cloud/ipfs/QmdhoL9K8my2vi3fej97foiqGmJ389SMs55oC5EdkrxF2M",
      price: "0.03ETH",
      currentlySelling: "True",
      address: "0xe81Bf5A757C4f7F82a2F23b1e59bE45c33c5b13",
    },
    {
      name: "NFT#3",
      description: "Alchemy's Third NFT",
      website: "http://axieinfinity.io",
      audioUrl: "https://gateway.pinata.cloud/ipfs/QmNVnJoZEB4rSyEWZCmRsqgcMTMzGhpsBJyRauk3Q421Jx",
      image:
        "https://gateway.pinata.cloud/ipfs/QmTsRJX7r5gyubjkdmzFrKQhHv74p5wT9LdeF1m3RTqrE5",
      price: "0.03ETH",
      currentlySelling: "True",
      address: "0xe81Bf5A757C4f7F82a2F23b1e59bE45c33c5b13",
    },
  ];
  // const [data, updateData] = useState(sampleData);

  return (
    <div className="min-h-screen bg-darkblue text-white font-poppins">
      <Navbar />
      <div className="flex flex-col items-center mt-20 px-4">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-500">
          Top NFTs
        </h1>
        <div className="w-full flex flex-col md:flex-row justify-center gap-6 mt-10">
          {sampleData.map((value, index) => (
            <NFTTile data={value} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
