import { gql, useApolloClient, useLazyQuery } from "@apollo/client";
import Head from "next/head";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Header, VideoCard } from "../components";

const Search = () => {
  const [searchFilter, setSearchFilter] = useState("");

  const [videos, setVideos] = useState([]);

  const clientApollo = useApolloClient();

  const SEARCH_VIDEO = useMemo(
    () => gql`
      query videos(
        $orderBy: Video_orderBy
        $orderDirection: OrderDirection
        $where: Video_filter
      ) {
        videos(
          orderBy: $orderBy
          orderDirection: $orderDirection
          where: $where
        ) {
          id
          videothumbhash
          videohash
          title
        }
      }
    `,
    []
  );

  const getVideos = useCallback(async () => {
    clientApollo
      .query({
        query: SEARCH_VIDEO,
        variables: {
          orderBy: "createdAt",
          orderDirection: "desc",
          where: {
            ...(searchFilter && {
              title_contains_nocase: searchFilter,
            }),
          },
        },
        fetchPolicy: "network-only",
      })
      .then(({ data }) => {
        console.log(data);
        setVideos(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [SEARCH_VIDEO, clientApollo, searchFilter]);

  useEffect(() => {
    getVideos();
  }, [searchFilter, getVideos]);

  return (
    <div>
      <Head>
        <title>YouTube Search</title>
        <link rel="icon" href="/youtube.png" />
      </Head>
      <Header />
      <input
        placeholder="Search Video"
        value={searchFilter}
        onChange={(e) => setSearchFilter(e.target.value)}
      />

      {searchFilter ? (
        <div className="grid grid-cols-5 gap-6 h-max md:grid-cols-2 sm:grid-cols-1 px-[28px] sm:px-1 sm:gap-1 md:gap-y-1 max-w-[1440px] my-0 mx-auto">
          {videos &&
            videos?.videos?.map((data) => (
              <VideoCard key={data.id} data={data} />
            ))}
        </div>
      ) : (
        <h1>Search Video</h1>
      )}
    </div>
  );
};

export default Search;
