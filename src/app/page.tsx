"use client";

import { Header } from "@/component/Header";
import { Messages } from "@/component/Messages";
import { Footer } from "@/component/ui/Footer";

export default function Home() {
  return (
    <main>
      <Header />
      <Messages />
      <Footer />
    </main>
  );
}
