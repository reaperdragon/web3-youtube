import React from "react";
import Player from "./Player";
import moment from "moment";
import { data } from "autoprefixer";

const truncateRegex = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/;

const truncateEthAddress = (addr) => {
  const match = addr?.match(truncateRegex);
  if (!match) return addr;
  return `${match[1]}…${match[2]}`;
};

export default function VideoComponent({ video }) {
  console.log(video.user);
  return (
    <div>
      <Player hash={video.videohash} />
      <div className="flex justify-between flex-row py-4">
        <div>
          <h3 className="text-2xl dark:text-white">{video.title}</h3>
          <p className="text-gray-500 mt-1 text-xl">{video.description}</p>
          <p>
            Owner :{" "}
            <span className="text-sky-500">
              {truncateEthAddress(video.user)}
            </span>
          </p>
          <p className="text-gray-500 mt-1">
            {video.category} • {moment(video.date).fromNow()}
          </p>
        </div>
      </div>
    </div>
  );
}
