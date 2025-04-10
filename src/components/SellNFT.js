// import Navbar from "./Navbar";
// import { useState } from "react";
// import { uploadFileToIPFS, uploadJSONToIPFS } from "../pinata";
// import Marketplace from "../Marketplace.json";
// import { ethers } from "ethers";

// export default function SellNFT() {
//   const [formParams, updateFormParams] = useState({
//     name: "",
//     description: "",
//     price: "",
//   });
//   const [fileURL, setFileURL] = useState(null);
//   const [message, updateMessage] = useState("");

//   // Upload image to IPFS (Pinata)
//   const onFileChange = async (e) => {
//     const file = e.target.files[0];

//     try {
//       const response = await uploadFileToIPFS(file);
//       if (response.success) {
//         console.log("✅ Image uploaded to Pinata:", response.pinataURL);
//         setFileURL(response.pinataURL);
//         console.log("File URL - ", fileURL);
//       }
//     } catch (err) {
//       console.error("❌ Error uploading file to Pinata:", err);
//     }
//   };

//   // Upload metadata to IPFS
//   const uploadMetadataToIPFS = async () => {
//     const { name, description, price } = formParams;

//     if (!name || !description || !price || !fileURL) {
//       alert("Please fill all fields and upload an image.");
//       return null;
//     }

//     const nftData = {
//       name,
//       description,
//       price,
//       image: fileURL,
//     };

//     try {
//       const response = await uploadJSONToIPFS(nftData);
//       console.log(response.pinataURL);
//       if (response.success) {
//         console.log("✅ Metadata uploaded to Pinata:", response.pinataURL);
//         return response.pinataURL;
//       }
//     } catch (err) {
//       console.error("❌ Error uploading metadata:", err);
//     }

//     return null;
//   };

//   // Mint and list the NFT
//   const listNFT = async (e) => {
//     e.preventDefault();

//     try {
//       const metadataURL = await uploadMetadataToIPFS();
//       console.log(metadataURL);
//       if (!metadataURL) return;

//       updateMessage("⏳ Uploading... (can take up to 5 minutes)");

//       const provider = new ethers.providers.Web3Provider(window.ethereum);
//       const signer = provider.getSigner();

//       const contract = new ethers.Contract(
//         Marketplace.address,
//         Marketplace.abi,
//         signer
//       );

//       const price = ethers.utils.parseUnits(formParams.price, "ether");
//       const listingPrice = (await contract.getListPrice()).toString();

//       const transaction = await contract.createToken(metadataURL, price, {
//         value: listingPrice,
//       });

//       await transaction.wait();

//       alert("✅ Your NFT has been listed!");
//       updateMessage("");

//       updateFormParams({
//         name: "",
//         description: "",
//         price: "",
//       });
//       setFileURL(null);

//       window.location.replace("/");
//     } catch (err) {
//       console.error("❌ Error listing NFT:", err);
//       updateMessage("Something went wrong. Please try again.");
//     }
//   };

//   return (
//     <div className="">
//       <Navbar></Navbar>
//       <div className="flex flex-col place-items-center mt-10" id="nftForm">
//         <form className="bg-white shadow-md rounded px-8 pt-4 pb-8 mb-4">
//           <h3 className="text-center font-bold text-purple-500 mb-8">
//             Upload your NFT to the marketplace
//           </h3>
//           <div className="mb-4">
//             <label
//               className="block text-purple-500 text-sm font-bold mb-2"
//               htmlFor="name"
//             >
//               NFT Name
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               id="name"
//               type="text"
//               placeholder="Axie#4563"
//               onChange={(e) =>
//                 updateFormParams({ ...formParams, name: e.target.value })
//               }
//               value={formParams.name}
//             ></input>
//           </div>
//           <div className="mb-6">
//             <label
//               className="block text-purple-500 text-sm font-bold mb-2"
//               htmlFor="description"
//             >
//               NFT Description
//             </label>
//             <textarea
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               cols="40"
//               rows="5"
//               id="description"
//               type="text"
//               placeholder="Axie Infinity Collection"
//               value={formParams.description}
//               onChange={(e) =>
//                 updateFormParams({ ...formParams, description: e.target.value })
//               }
//             ></textarea>
//           </div>
//           <div className="mb-6">
//             <label
//               className="block text-purple-500 text-sm font-bold mb-2"
//               htmlFor="price"
//             >
//               Price (in ETH)
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               type="number"
//               placeholder="Min 0.01 ETH"
//               step="0.01"
//               value={formParams.price}
//               onChange={(e) =>
//                 updateFormParams({ ...formParams, price: e.target.value })
//               }
//             ></input>
//           </div>
//           <div>
//             <label
//               className="block text-purple-500 text-sm font-bold mb-2"
//               htmlFor="image"
//             >
//               Upload Image (&lt;500 KB)
//             </label>
//             <input type={"file"} onChange={onFileChange}></input>
//           </div>
//           <br></br>
//           <div className="text-red-500 text-center">{message}</div>
//           <button
//             disabled={!fileURL}
//             onClick={listNFT}
//             className={`font-bold mt-10 w-full rounded p-2 shadow-lg ${
//               !fileURL
//                 ? "bg-purple-500/60 text-white cursor-not-allowed"
//                 : "bg-purple-500 text-white"
//             }`}
//             id="list-button"
//           >
//             List NFT
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

import Navbar from "./Navbar";
import { useState } from "react";
import { uploadFileToIPFS, uploadJSONToIPFS } from "../pinata";
import Marketplace from "../Marketplace.json";
import { useLocation } from "react-router";
import { ethers } from "ethers";

export default function SellNFT() {
  const [formParams, updateFormParams] = useState({
    name: "",
    description: "",
    price: "",
  });
  const [fileURL, setFileURL] = useState(null);
  const [message, updateMessage] = useState("");
  const location = useLocation();

  // Upload audio file to IPFS (Pinata)
  const onFileChange = async (e) => {
    const file = e.target.files[0];

    try {
      const response = await uploadFileToIPFS(file);
      if (response.success) {
        console.log("✅ Audio uploaded to Pinata:", response.pinataURL);
        setFileURL(response.pinataURL);
        console.log("File URL - ", response.pinataURL);
      }
    } catch (err) {
      console.error("❌ Error uploading audio to Pinata:", err);
    }
  };

  // Upload metadata to IPFS
  const uploadMetadataToIPFS = async () => {
    const { name, description, price } = formParams;

    if (!name || !description || !price || !fileURL) {
      alert("Please fill all fields and upload an audio file.");
      return null;
    }

    const nftData = {
      name,
      description,
      price,
      audio: fileURL, // changed from image to audio for clarity
    };

    try {
      const response = await uploadJSONToIPFS(nftData);
      console.log(response.pinataURL);
      if (response.success) {
        console.log("✅ Metadata uploaded to Pinata:", response.pinataURL);
        return response.pinataURL;
      }
    } catch (err) {
      console.error("❌ Error uploading metadata:", err);
    }

    return null;
  };

  // Mint and list the NFT
  const listNFT = async (e) => {
    e.preventDefault();

    try {
      const metadataURL = await uploadMetadataToIPFS();
      if (!metadataURL) return;

      updateMessage("⏳ Uploading... (can take up to 5 minutes)");

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(
        Marketplace.address,
        Marketplace.abi,
        signer
      );

      const price = ethers.utils.parseUnits(formParams.price, "ether");
      const listingPrice = (await contract.getListPrice()).toString();

      const transaction = await contract.createToken(metadataURL, price, {
        value: listingPrice,
      });

      await transaction.wait();

      alert("✅ Your NFT has been listed!");
      updateMessage("");

      updateFormParams({
        name: "",
        description: "",
        price: "",
      });
      setFileURL(null);

      window.location.replace("/");
    } catch (err) {
      console.error("❌ Error listing NFT:", err);
      updateMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-darkblue font-poppins text-white">
      <Navbar />
      <div className="flex flex-col items-center mt-10" id="nftForm">
        <form className="bg-blue-900/30 shadow-xl rounded-2xl px-8 pt-6 pb-8 mb-10 w-[90%] max-w-xl border border-[#1a1f2e]">
          <h3 className="text-center font-bold text-purple-400 text-xl mb-8">
            Upload your Audio NFT to the marketplace
          </h3>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-purple-400 mb-2">
              NFT Name
            </label>
            <input
              className="bg-darkblue text-white border border-gray-600 rounded-md w-full py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              type="text"
              placeholder="Track #001"
              onChange={(e) =>
                updateFormParams({ ...formParams, name: e.target.value })
              }
              value={formParams.name}
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-purple-400 mb-2">
              NFT Description
            </label>
            <textarea
              className="bg-darkblue text-white border border-gray-600 rounded-md w-full py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              cols="40"
              rows="4"
              placeholder="Your awesome audio description"
              value={formParams.description}
              onChange={(e) =>
                updateFormParams({
                  ...formParams,
                  description: e.target.value,
                })
              }
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-purple-400 mb-2">
              Price (in ETH)
            </label>
            <input
              className="bg-darkblue text-white border border-gray-600 rounded-md w-full py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              type="number"
              step="0.01"
              placeholder="Min 0.01 ETH"
              value={formParams.price}
              onChange={(e) =>
                updateFormParams({ ...formParams, price: e.target.value })
              }
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-purple-400 mb-2">
              Upload Audio File
            </label>
            <input
              type="file"
              accept="audio/*"
              onChange={onFileChange}
              className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700"
            />
          </div>

          <div className="text-red-500 text-center mb-2">{message}</div>

          <button
            disabled={!fileURL}
            onClick={listNFT}
            className={`font-bold w-full rounded-md p-3 mt-4 shadow-md transition-all duration-300 ${
              !fileURL
                ? "bg-purple-500/60 text-white cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700 text-white"
            }`}
            id="list-button"
          >
            List NFT
          </button>
        </form>
      </div>
    </div>
  );
}
