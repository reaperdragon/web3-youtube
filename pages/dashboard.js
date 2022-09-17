import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { Header } from "../components";

const Dashboard = () => {
  return (
    <div>
      <Head>
        <title>YouTube Dashboard</title>
        <link rel="icon" href="/youtube.png" />
      </Head>
      <Header />
      
    </div>
  );
};

export default Dashboard;
