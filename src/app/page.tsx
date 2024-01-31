"use client";

import { Header } from "~/app/components/Header";
import { Messages } from "~/app/components/Messages";
import { Footer } from "~/app/components/Footer";

import "./index.css"

export default function Home() {
  
  return (
    <main>
      <Header />
      <Messages />
      <Footer />
    </main>
  );
}
