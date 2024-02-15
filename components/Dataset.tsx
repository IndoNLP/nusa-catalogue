import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Search } from "./ui/search";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";
import { use, useEffect, useState } from "react";
import { LoadingSpinner } from "./ui/spinner";
import { Button } from "./ui/button";
import { Database } from "lucide-react";

interface DatasetProps {
  name: string;
  description: string;
  datasetLink: string;
}

const PER_PAGE = 15;

export const Dataset = () => {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [data, setData] = useState<DatasetProps[]>([]);
  const [filteredData, setFilteredData] = useState<DatasetProps[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const result = await fetch(
        `https://opensheet.elk.sh/1ibbywsC1tQ_sLPX8bUAjC-vrTrUqZgZA46W_sxWw4Ss/Approved+Datasheets+(Monitor)`
      );
      const json = await result.json();
      const dataset = json.map((item: any) => ({
        name: item["Dataset name"],
        description: item["Dataset description"],
        datasetLink: item["Dataset URL"],
      }));
      setData(dataset);
      setLoading(false);
    };
    load();
  }, []);

  const filterPage = () => {
    const start = (page - 1) * PER_PAGE;
    const end = start + PER_PAGE;

    // Also filter by search
    return data
      .filter(
        (d) =>
          d.name.toLowerCase().includes(search.toLowerCase()) ||
          d.description.toLowerCase().includes(search.toLowerCase())
      )
      .slice(start, end);
  };

  useEffect(() => {
    const filtered = data.filter(
      (d) =>
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.description.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredData(filtered);
    setPage(1); // Reset to the first page when search changes
  }, [search, data]);

  const renderPagination = () => {
    const totalPage = Math.ceil(filteredData.length / PER_PAGE);
    const pageNumbers = [];
    const visiblePages = 5;
    const halfVisible = Math.floor(visiblePages / 2);

    let startPage = Math.max(page - halfVisible, 1);
    let endPage = Math.min(startPage + visiblePages - 1, totalPage);

    if (endPage - startPage + 1 < visiblePages) {
      startPage = Math.max(endPage - visiblePages + 1, 1);
    }

    for (let p = startPage; p <= endPage; p++) {
      pageNumbers.push(
        <PaginationItem key={p}>
          <PaginationLink isActive={p === page} onClick={() => setPage(p)}>
            {p}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return [
      <PaginationPrevious
        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
      />,
      ...pageNumbers,
      <PaginationNext
        onClick={() => setPage((prev) => Math.min(prev + 1, totalPage))}
      />,
    ];
  };

  return (
    <section id="dataset" className="container py-24 sm:py-32 !pt-0">
      <div className="flex flex-row justify-end mb-8">
        <Search
          placeholder="Search Dataset..."
          className="w-full max-w-96"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="h-40 flex justify-center items-center">
          <LoadingSpinner />
        </div>
      ) : null}

      <div className="grid md:grid-cols-2 lg:grid-cols-4 sm:block columns-2  lg:columns-3 lg:gap-6 mx-auto space-y-4 lg:space-y-6 mb-8">
        {filterPage().map(
          ({ name, description, datasetLink }: DatasetProps) => (
            <Card
              key={name}
              className="max-w-md md:break-inside-avoid overflow-hidden"
            >
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <div className="flex flex-col">
                  <CardTitle className="text-lg">{name}</CardTitle>
                  {/* <CardDescription>{userName}</CardDescription> */}
                </div>
              </CardHeader>

              <CardContent>
                <div className="line-clamp-3">{description}</div>
              </CardContent>

              <CardFooter className="flex justify-end">
                <a href={datasetLink}>
                  <Button>
                    <Database className="mr-2" /> Dataset
                  </Button>
                </a>
              </CardFooter>
            </Card>
          )
        )}
      </div>

      <div>
        <Pagination>
          <PaginationContent>{renderPagination()}</PaginationContent>
        </Pagination>
      </div>
    </section>
  );
};
