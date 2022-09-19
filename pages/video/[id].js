import { gql, useApolloClient } from "@apollo/client";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useParams, useState } from "react";
import { Header, VideoCard, VideoContainer } from "../../components";

const Video = () => {
  const [video, setVideo] = useState(null);

  const [relatedVideos, setRelatedVideos] = useState([]);

  const clientApollo = useApolloClient();

  const router = useRouter();

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
        createdAt
      }
    }
  `;

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
        const related = data.videos.filter(
          (video) => video.id !== router.query.id
        );

        setRelatedVideos(related);

        const v = data?.videos?.find((video) => video.id === router.query.id);

        setVideo(v);
      })
      .catch((error) => {
        console.error("Video Doesn't Exists!", error);
      });
  };

  console.log(video);
  console.log(relatedVideos);

  useEffect(() => {
    getVideos();
  }, [router.query.id]);

  return (
    <div>
      <Head>
        <title>{video?.title} YouTube</title>
        <link rel="icon" href="/youtube.png" />
      </Head>
      <Header />
      <div className="w-full  flex flex-row font-body">
        <div className="flex-1 flex flex-col">
          {video && (
            <div className="flex m-10 justify-between lg:flex-row md:flex-col">
              <div className="w-11/12 md:w-full ">
                <VideoContainer video={video} />
              </div>
              <div className="w-2/6 md:w-full sm:w-full">
                <h4 className="text-md font-bold text-white ml-5 md:ml-0 mb-3">
                  Related Videos
                </h4>
                {relatedVideos.map((video) => (
                  <div
                    onClick={() => {
                      setVideo(video);
                    }}
                    key={video.id}
                    className="mx-4 md:mx-0 w-full"
                  >
                    <VideoCard key={video.id} data={video} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Video;
