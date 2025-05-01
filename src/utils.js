// export const GetIpfsUrlFromPinata = (pinataUrl) => {
//     var IPFSUrl = pinataUrl.split("/");
//     const lastIndex = IPFSUrl.length;
//     IPFSUrl = "https://ipfs.io/ipfs/"+IPFSUrl[lastIndex-1];
//     return IPFSUrl;
// };

//Updated code
export const GetIpfsUrlFromPinata = (pinataUrl) => {
    if (!pinataUrl || typeof pinataUrl !== "string") {
        console.warn("Invalid pinataUrl provided:", pinataUrl);
        return ""; // return a default fallback URL
    }

    const parts = pinataUrl.split("/");
    return "https://ipfs.io/ipfs/" + parts[parts.length - 1];
};
