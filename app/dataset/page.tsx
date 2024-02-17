"use client";

import Card from "@/components/Card";
import { Navbar } from "@/components/Navbar";
import { useDatasetFetch } from "@/components/helper/hooks";
import { LoadingSpinner } from "@/components/ui/spinner";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const DatasetCard = () => {
  const searchParams = useSearchParams();
  const { data } = useDatasetFetch();
  const item = data.find((d) => d.id === searchParams.get("id"));
  return (
    <div className="container py-24 sm:py-32 !pt-20">
      <div className="w-full max-w-[800px] mx-auto">
        {item ? <Card item={item} showDetail /> : <LoadingSpinner />}
      </div>
    </div>
  );
};

export default function Page() {
  return (
    <div className="bg-yellow-50 min-h-svh">
      <Navbar />
      <Suspense fallback={<LoadingSpinner />}>
        <DatasetCard />
      </Suspense>
    </div>
  );
}
