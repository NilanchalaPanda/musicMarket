import fullLogo from "../full_logo.png";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";

function Navbar() {
  const [connected, toggleConnect] = useState(false);
  const [currAddress, updateAddress] = useState("0x");
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  async function getAddress() {
    const ethers = require("ethers");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const addr = await signer.getAddress();
    updateAddress(addr);
    toggleConnect(true);
  }

  async function connectWebsite() {
    const chainId = await window.ethereum.request({ method: "eth_chainId" });
    if (chainId !== "0x5") {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x5" }],
      });
    }
    await window.ethereum.request({ method: "eth_requestAccounts" });
    getAddress();
  }

  useEffect(() => {
    if (window.ethereum === undefined) return;
    if (window.ethereum.isConnected()) {
      getAddress();
    }
    window.ethereum.on("accountsChanged", () => {
      window.location.reload();
    });
  }, []);

  const navLinks = [
    { name: "Marketplace", path: "/" },
    { name: "List My NFT", path: "/sellNFT" },
    { name: "Profile", path: "/profile" },
  ];

  return (
    <header className="font-poppins text-white shadow-md">
      <div className="w-screen flex px-6 py-4 justify-between items-center">
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3">
          {/* <img src={fullLogo} alt="NFT Logo" className="w-10 h-10" /> */}
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
            MusicMarket
          </span>
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex gap-8 font-semibold text-lg">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`transition-all duration-200 hover:text-purple-400 ${
                location.pathname === link.path
                  ? "text-purple-500"
                  : ""
              }`}
            >
              {link.name}
            </Link>
          ))}
          <button
            onClick={connectWebsite}
            className={`${
              connected
                ? "bg-green-500 hover:bg-green-600"
                : "bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
            } text-white px-5 py-2 rounded-full text-sm font-semibold shadow-md transition-all duration-300`}
          >
            {connected ? "Connected" : "Connect Wallet"}
          </button>
        </nav>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="lg:hidden px-6 pb-4 flex flex-col gap-4 bg-[#0d111c]">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={`text-lg font-medium ${
                location.pathname === link.path
                  ? "text-purple-400"
                  : "hover:text-purple-300"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <button
            onClick={connectWebsite}
            className={`${
              connected
                ? "bg-green-500 hover:bg-green-600"
                : "bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
            } text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md`}
          >
            {connected ? "Connected" : "Connect Wallet"}
          </button>
        </div>
      )}

      {/* Address Display */}
      <div className="text-sm text-gray-400 text-right pr-6">
        {currAddress !== "0x"
          ? `Connected to ${currAddress.substring(0, 15)}...`
          : "Not Connected. Please login to view NFTs"}
      </div>
    </header>
  );
}

export default Navbar;
