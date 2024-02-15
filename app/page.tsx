"use client";

import { Dataset } from "@/components/Dataset";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Dataset />
    </>
  );
}
