import Head from "next/head";
import Image from "next/image";
import Sidebar from "../components/Sidebar";
export default function Home() {
  return (
    <div>
      <Head>
        <title>WhatsApp 2.0</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Sidebar />
    </div>
  );
}
