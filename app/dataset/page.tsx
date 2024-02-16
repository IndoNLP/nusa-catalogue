"use client";

import Card from "@/components/Card";
import { Navbar } from "@/components/Navbar";
import { useDatasetFetch } from "@/components/helper/hooks";
import { LoadingSpinner } from "@/components/ui/spinner";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const { data } = useDatasetFetch();
  const item = data.find((d) => d.id === searchParams.get("id"));
  return (
    <>
      <Navbar />
      <section className="container py-24 sm:py-32 !pt-20">
        <div className="w-full max-w-[800px] mx-auto">
          {item ? <Card item={item} showDetail /> : <LoadingSpinner />}
        </div>
      </section>
    </>
  );
}
