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
      <div className="mt-5 flex flex-col items-center rounded-2xl shadow-2xl border border-[#1a1f2e] bg-[#0d111c] transition-transform hover:scale-105">
        <img
          src={IPFSUrl}
          alt=""
          className="w-72 rounded-t-2xl object-fill"
        />
        <div className="text-white w-full p-4 bg-gradient-to-t from-[#1a1f2e] to-transparent rounded-b-2xl -mt-10">
          <strong className="text-xl block mb-1">{data.data.name}</strong>
          <p className="text-sm text-center text-gray-300">{data.data.description}</p>
        </div>
      </div>
    </Link>
  );
}

export default NFTTile;
