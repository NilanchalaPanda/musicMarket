// SkeletonLoading.js
import React from "react";

const SkeletonLoading = () => {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-10 p-10">
      {/* Skeleton for NFT Image */}
      <div className="w-full md:w-2/5 h-64 bg-gray-700 rounded-2xl shadow-lg animate-pulse"></div>

      {/* Skeleton for NFT Details */}
      <div className="text-base md:text-lg bg-[#101624] border border-[#1a1f2e] shadow-2xl rounded-2xl p-6 space-y-6 w-full max-w-xl animate-pulse">
        <div className="h-6 bg-gray-700 rounded"></div>
        <div className="h-4 bg-gray-700 rounded w-3/4"></div>
        <div className="h-4 bg-gray-700 rounded w-1/2"></div>
        <div className="h-4 bg-gray-700 rounded"></div>
        <div className="h-4 bg-gray-700 rounded w-3/4"></div>
        <div className="h-10 bg-gray-700 rounded"></div>
      </div>
    </div>
  );
};

export default SkeletonLoading;
