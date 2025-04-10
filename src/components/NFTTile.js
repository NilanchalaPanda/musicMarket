import axie from "../tile.jpeg";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { GetIpfsUrlFromPinata } from "../utils";

function NFTTile(data) {
  const newTo = {
    pathname: "/nftPage/" + data.data.tokenId,
  };

  const IPFSUrl = GetIpfsUrlFromPinata(data.data.image);

  return (
    <Link className="w-96" to={newTo}>
      <div className="mt-5 flex flex-col items-center rounded-2xl shadow-2xl border border-[#1a1f2e] bg-[#0d111c] transition-transform hover:scale-105 hover:shadow-purple-500/30">
        {/* Cover Image */}
        <img
          src={IPFSUrl}
          alt="NFT Cover"
          className="w-full h-60 object-cover rounded-t-2xl"
        />

        {/* Audio & Info */}
        <div className="text-white w-full p-4 bg-blue-900/30 rounded-b-2xl flex flex-col gap-3">
          {/* Name */}
          <strong className="text-lg sm:text-xl text-purple-400 text-center">
            {data.data.name}
          </strong>

          {/* Description */}
          <p className="text-sm text-center text-gray-300">
            {data.data.description}
          </p>

          {/* Audio Player */}
          <audio
            controls
            src={data.data.audioUrl}
            className="w-full mt-2 rounded-md bg-[#1a1f2e] outline-none focus:ring-2 focus:ring-purple-500"
          >
            Your browser does not support the audio element.
          </audio>
        </div>
      </div>
    </Link>
  );
}

export default NFTTile;
