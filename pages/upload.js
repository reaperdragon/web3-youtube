import React, { useState, useRef } from "react";
import Head from "next/head";
import { Header } from "../components";
import { create } from "ipfs-http-client";
import { ethers } from "ethers";
import ContractABI from "../artifacts/contracts/YouTube.sol/YouTube.json";

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
const projectSecret = process.env.NEXT_PUBLIC_PROJECT_SECRET;

const auth =
  "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

const client = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  apiPath: "/api/v0",
  headers: {
    authorization: auth,
  },
});

const Upload = () => {
  const [details, setDetails] = useState({
    title: "",
    description: "",
    category: "",
    type: "",
    videoThumb: "",
    video: "",
  });

  const videoThumbRef = useRef();
  const videoRef = useRef();

  function triggerOnChangeThumb() {
    videoThumbRef.current.click();
  }

  function triggerOnChange() {
    videoRef.current.click();
  }

  async function handleFileChangeThumb(e) {
    const uploadedFile = e.target.files[0];
    if (!uploadedFile) return;
    setDetails({ ...details, videoThumb: uploadedFile });
  }

  async function handleFileChange(e) {
    const uploadedFile = e.target.files[0];
    if (!uploadedFile) return;
    setDetails({ ...details, video: uploadedFile });
  }

  const getContract = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const signer = provider.getSigner();

    let contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      ContractABI.abi,
      signer
    );
    return contract;
  };

  const handleUpload = async () => {
    const { title, description, category, type, videoThumb, video } = details;

    if (
      title === "" ||
      description === "" ||
      category === "" ||
      type === "" ||
      videoThumb === "" ||
      video === ""
    ) {
      alert("Please Provide All the Details");
      return;
    }
    uploadThumbnail(videoThumb);
  };

  const uploadThumbnail = async (thumb) => {
    try {
      const vThumb = await client.add(thumb);

      console.log(vThumb.path);

      uploadVideo(vThumb.path);
    } catch (error) {
      console.error(error);
    }
  };

  const uploadVideo = async (thumbPath) => {
    try {
      const video = await client.add(details.video);

      console.log(video.path);

      await upload(video.path, thumbPath);
    } catch (error) {
      console.error(error);
    }
  };

  const upload = async (videoPath, thumbPath) => {
    let contract = await getContract();

    let uploadDate = String(new Date());

    await contract.videoUpload(
      thumbPath,
      videoPath,
      details.title,
      details.description,
      details.category,
      details.type,
      uploadDate
    );

    console.log("Uploaded Successfully");
    setDetails({
      title: "",
      description: "",
      category: "",
      type: "",
      videoThumb: "",
      video: "",
    });
  };

  return (
    <div>
      <Head>
        <title>Upload</title>
        <link rel="icon" href="/youtube.png" />
      </Head>
      <Header />
      <div className="grid grid-cols-2 w-full gap-2 md:grid-cols-1">
        <div>
          <div className="sidebar">
            <label className="labels">Title</label>
            <input
              value={details.title}
              placeholder="ex. Holloween Candy"
              onChange={(e) =>
                setDetails({ ...details, title: e.target.value })
              }
              className="px-5 py-3 rounded-xl
               placeholder:text-slate-400"
            />
          </div>

          <div className="sidebar">
            <label className="labels">Description</label>
            <textarea
              placeholder="ex. This Story Start With Little Boy Who Always After Cady
              blah blah blah"
              value={details.description}
              onChange={(e) => {
                setDetails({ ...details, description: e.target.value });
              }}
              rows="10"
              className="px-5 py-3 rounded-xl placeholder:text-slate-400"
            />
          </div>

          <div className="sidebar">
            <label className="labels">Category</label>
            <select
              value={details.category}
              onChange={(e) => {
                setDetails({ ...details, category: e.target.value });
              }}
              name="category"
              className="px-5 py-3 rounded-xl placeholder:text-slate-400"
            >
              <option>Kids</option>
              <option>Science</option>
              <option>CS</option>
              <option>Product Review</option>
              <option>Education</option>
              <option>Challenge</option>
              <option>Q&A</option>
              <option>Movie</option>
              <option>Tv Show</option>
            </select>
          </div>

          <div className="sidebar">
            <label className="labels">Type</label>
            <select
              name="type"
              value={details.type}
              onChange={(e) => {
                setDetails({ ...details, type: e.target.value });
              }}
              className="px-5 py-3 rounded-xl"
            >
              <option>Video</option>
              <option>Short</option>
            </select>
          </div>
        </div>
        {/* Sidebar */}
        <div className="h-full ">
          <div className="sidebar h-1/2 md:h-full">
            <label className="labels">Video Thumbnail</label>
            <div
              className={`bg-[#333333] w-full h-full rounded-xl flex items-center justify-center text-slate-400 border-dashed border-2 border-white cursor-pointer `}
              onClick={triggerOnChangeThumb}
            >
              {details.videoThumb ? (
                <img
                  src={window.URL.createObjectURL(details.videoThumb)}
                  alt="image"
                  ref={details.videoThumb}
                  className="w-[180px] h-fit rounded-lg"
                />
              ) : (
                <p>Select Video Thumbnail For Preview</p>
              )}

              <input
                id="selectImage"
                style={{ display: "none" }}
                type="file"
                onChange={handleFileChangeThumb}
                ref={videoThumbRef}
              />
            </div>
          </div>

          <div className="sidebar h-1/2 md:h-full">
            <label className="labels">Video</label>
            <div
              className={`h-full bg-[#333333]  rounded-xl flex items-center justify-center text-slate-400 border-dashed border-2 border-white cursor-pointer md:mb-8`}
              onClick={triggerOnChange}
            >
              {details.video ? (
                <video
                  controls
                  src={window.URL.createObjectURL(details.video)}
                  className="w-[180px] h-fit rounded-lg"
                />
              ) : (
                <p>Select Video For Preview</p>
              )}

              <input
                id="selectImage"
                style={{ display: "none" }}
                type="file"
                onChange={handleFileChange}
                ref={videoRef}
              />
            </div>
          </div>
        </div>
        {/* RightSidebar */}
      </div>

      <button className="" onClick={handleUpload}>
        Upload
      </button>
    </div>
  );
};

export default Upload;
