import React, { useState } from "react";
import Head from "next/head";
import { Header } from "../components";

const Upload = () => {
  const [details, setDetails] = useState({
    title: "",
    description: "",
    category: "",
    type: "",
    videoThumb: "",
    video: "",
  });

  return (
    <div>
      <Head>
        <title>Upload</title>
        <link rel="icon" href="/youtube.png" />
      </Head>
      <Header />
      <div className="grid grid-cols-2 w-full gap-2 ">
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
        <div>
          <div>
            <label>Video Thumbnail</label>
            <div>Select Video Thumbnail For Preview</div>
          </div>

          <div>
            <label>Video</label>
            <div>Select Video For Preview</div>
          </div>
        </div>
        {/* RightSidebar */}
      </div>
    </div>
  );
};

export default Upload;
