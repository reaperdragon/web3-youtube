import React from "react";
import { useRouter } from "next/router";

const ipfsURI = "https://ipfs.io/ipfs/";

const VideoCard = ({ data }) => {
  const router = useRouter();
  return (
    <div
      key={data.id}
      className="w-full h-max sm:h-[25%] font-body mt-2 cursor-pointer"
      onClick={() => router.push(`/video/${data.id}`)}
    >
      <div className="h-[186px] w-full">
        <img
          src={ipfsURI + data.videothumbhash}
          alt={data.title}
          className="rounded-lg h-full w-full"
        />
      </div>
      <h3 className="text-lg font-semibold">{data.title}</h3>
    </div>
  );
};

export default VideoCard;
