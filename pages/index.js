import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import Dashboard from "./dashboard";

export default function Home() {
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const router = useRouter();

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Please Install Metamask");
        return;
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setIsWalletConnected(true);
      localStorage.setItem("walletAddress", accounts[0]);
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Head>
        <title>YouTube</title>
        <link rel="icon" href="/youtube.png" />
      </Head>
      {isWalletConnected && localStorage.getItem("walletAddress") ? (
        <Dashboard />
      ) : (
        <div className="flex h-screen items-center justify-center flex-col gap-5 font-body ">
          <img
            src="/youtube_main.png"
            alt="logo"
            className="h-[160px] animate-bounce"
          />
          <h1 className="text-7xl font-semibold ">
            Web 3.0{" "}
            <span className="semibold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-600">
              {" "}
              YouTube
            </span>
          </h1>
          <p className="text-neutral-400">
            Web 3.0 YouTube made with Next Js, IPFS, The Graph Protocol and with
            Tailwind CSS
          </p>
          <span className="semibold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-600">
            Please Select Polygon Mumbai For Test{" "}
            <a
              href="https://wiki.polygon.technology/docs/develop/metamask/config-polygon-on-metamask/"
              rel="noopener noreferrer"
              target="_blank"
              className="text-sky-800 font-medium"
            >
              Link
            </a>
          </span>
          <button
            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 
            dark:focus:ring-blue-800 font-medium rounded-full text-sm px-8 py-5 text-center mr-2 mb-2 transition-all ease-in-out delay-150 duration-150
            hover:translate-y-1 text-1xl hover:shadow-lg hover:shadow-blue-500/80"
            onClick={connectWallet}
          >
            Connect Wallet
          </button>
        </div>
      )}
    </div>
  );
}
