import { gql, useApolloClient, useQuery } from "@apollo/client";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { Header, VideoCard } from "../components";

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

const Dashboard = () => {
  const [videos, setVideos] = useState([]);

  const clientApollo = useApolloClient();

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
      <div className="mt-8">
        <div className="grid grid-cols-5 gap-6 h-max md:grid-cols-2 sm:grid-cols-1 px-[28px] sm:px-1 sm:gap-1 md:gap-y-1 max-w-[1440px] my-0 mx-auto">
          {videos &&
            videos?.videos?.map((data) => (
              <VideoCard key={data.id} data={data} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
