import { gql, useApolloClient, useQuery } from "@apollo/client";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Header } from "../components";

const FETCH_VIDEOS = gql`
  query videos($orderBy: String!, $orderDirection: String!) {
    videos(orderBy: $orderBy, orderDirection: $orderDirection) {
      id
      videothumbhash
      videohash
      title
      user
      description
      date
      category
      videotype
      createdAt
    }
  }
`;

const ipfsURI = "https://ipfs.io/ipfs/";

const Dashboard = () => {
  const [videos, setVideos] = useState([]);

  const clientApollo = useApolloClient();

  const router = useRouter();

  // Main Approach ---------------------

  // const { loading, error, data } = useQuery(FETCH_VIDEOS, {
  //   variables: {
  //     orderBy: "createdAt",
  //     orderDirection: "desc",
  //   },
  //   fetchPolicy: "network-only",
  //   nextFetchPolicy: "cache-first",
  // });

  // Another Approach --------------------

  const getVideos = async () => {
    clientApollo
      .query({
        query: FETCH_VIDEOS,
        variables: {
          orderBy: "createdAt",
          orderDirection: "desc",
        },
        fetchPolicy: "network-only",
      })
      .then(({ data }) => {
        setVideos(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getVideos();
  }, [videos]);

  console.log(videos);

  return (
    <div>
      <Head>
        <title>YouTube Dashboard</title>
        <link rel="icon" href="/youtube.png" />
      </Head>
      <Header />
      <div className="grid grid-cols-5 gap-6 h-max md:grid-cols-2 sm:grid-cols-1 px-[28px] sm:px-1 sm:gap-1 md:gap-y-1 max-w-[1440px] my-0 mx-auto">
        {videos &&
          videos?.videos?.map((data) => (
            <div
              key={data.id}
              className="w-full  h-max sm:h-[25%] font-body mt-2 cursor-pointer"
              onClick={() => router.push(`/video/${data.id}`)}
            >
              <img
                src={ipfsURI + data.videothumbhash}
                alt={data.title}
                className="rounded-lg"
              />
              <h3 className="text-lg font-semibold">{data.title}</h3>
              <p className="text-slate-400"> {data.description}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
