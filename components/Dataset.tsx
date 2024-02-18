import { Search } from "./ui/search";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "./ui/spinner";
import { Button } from "./ui/button";
import { Eye, FileType, Filter, Speech, Video } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { TASKS } from "./helper/constants";

import { DatasetProps, useDatasetFetch } from "./helper/hooks";
import Card from "./Card";

const PER_PAGE = 15;

export const Dataset = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [filterModality, setFilterModality] = useState<string[]>([]);
  const [filterTask, setFilterTask] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const { data, loading } = useDatasetFetch();
  const [filteredData, setFilteredData] = useState<DatasetProps[]>([]);
  const [page, setPage] = useState(1);

  const filterData = (data: DatasetProps[]) => {
    let result = data.filter(
      (d) =>
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.description.toLowerCase().includes(search.toLowerCase())
    );
    if (filterModality.length > 0) {
      result = result.filter((d) =>
        filterModality.every((f) => d.modality.includes(f))
      );
    }
    if (filterTask.length > 0) {
      result = result.filter((d) =>
        filterTask.some((f) => d.tasks.includes(f))
      );
    }
    return result;
  };

  const filterPage = () => {
    const start = (page - 1) * PER_PAGE;
    const end = start + PER_PAGE;

    // Also filter by search
    return filterData(data).slice(start, end);
  };

  useEffect(() => {
    const filtered = filterData(data);
    setFilteredData(filtered);
    setPage(1); // Reset to the first page when search changes
  }, [search, data, filterModality, filterTask]);

  const renderPagination = () => {
    const totalPage = Math.ceil(filteredData.length / PER_PAGE);
    const pageNumbers = [];
    const visiblePages = 4;
    const halfVisible = Math.floor(visiblePages / 2);

    let startPage = Math.max(page - halfVisible, 1);
    let endPage = Math.min(startPage + visiblePages - 1, totalPage);

    if (endPage - startPage + 1 < visiblePages) {
      startPage = Math.max(endPage - visiblePages + 1, 1);
    }

    for (let p = startPage; p <= endPage; p++) {
      pageNumbers.push(
        <PaginationItem key={p} role="button">
          <PaginationLink
            isActive={p === page}
            onClick={() => setPage(p)}
            href="#dataset"
          >
            {p}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return [
      <PaginationPrevious
        role="button"
        key="prev"
        href="#dataset"
        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
      />,
      ...pageNumbers,
      <PaginationNext
        role="button"
        key="next"
        href="#dataset"
        onClick={() => setPage((prev) => Math.min(prev + 1, totalPage))}
      />,
    ];
  };

  return (
    <div id="dataset" className="bg-yellow-50">
      <div className="sticky top-14 py-4 z-20 bg-white shadow-sm">
        <div className="container flex flex-col space-y-1 md:flex-row items-center">
          <div className="text-neutral-400">
            Showing {filteredData.length} dataset, page {page}
          </div>
          <div className="flex flex-1"></div>
          <Search
            placeholder="Search Dataset..."
            className="w-full max-w-[500px]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="container pb-24 sm:pb-32">
        <div className="mb-4 pt-4">
          <Button variant="outline" onClick={() => setShowFilter((v) => !v)}>
            <Filter size={20} className="mr-2" /> Filter
          </Button>

          {showFilter ? (
            <div className="px-4 py-2 mt-2 rounded-md border border-slate-100 bg-slate-50">
              <div className="flex flex-col">
                <div className="flex flex-row items-start mb-2">
                  <div className="text-xs w-16 mr-4 text-right leading-10 mt-2">
                    Modality
                  </div>
                  <div className="p-2 border border-slate-100 rounded-md bg-white flex flex-1">
                    <ToggleGroup
                      type="multiple"
                      className="flex flex-wrap justify-start"
                      value={filterModality}
                      onValueChange={(value) => {
                        setFilterModality(value);
                      }}
                    >
                      <ToggleGroupItem
                        className="text-xs"
                        value="Language"
                        aria-label="Toggle language"
                      >
                        <FileType size={20} className="mr-2 text-amber-500" />{" "}
                        Language
                      </ToggleGroupItem>
                      <ToggleGroupItem
                        className="text-xs"
                        value="Vision"
                        aria-label="Toggle vision"
                      >
                        <Eye size={20} className="mr-2 text-fuchsia-500" />{" "}
                        Vision
                      </ToggleGroupItem>
                      <ToggleGroupItem
                        className="text-xs"
                        value="Speech"
                        aria-label="Toggle speech"
                      >
                        <Speech size={20} className="mr-2 text-green-500" />{" "}
                        Speech
                      </ToggleGroupItem>
                      <ToggleGroupItem
                        className="text-xs"
                        value="Video"
                        aria-label="Toggle video"
                      >
                        <Video size={20} className="mr-2 text-rose-500" /> Video
                      </ToggleGroupItem>
                    </ToggleGroup>
                  </div>
                </div>
                <div className="flex flex-row items-start">
                  <div className="text-xs w-16 mr-4 text-right leading-10 mt-2">
                    Tasks
                  </div>
                  <div className="p-2 border border-slate-100 rounded-md bg-white flex flex-1">
                    <ToggleGroup
                      type="multiple"
                      className="flex flex-wrap justify-start"
                      value={filterTask}
                      onValueChange={(value) => {
                        setFilterTask(value);
                      }}
                    >
                      {TASKS.map((task) => (
                        <ToggleGroupItem
                          value={task}
                          key={task}
                          className="text-xs text-left"
                        >
                          {task}
                        </ToggleGroupItem>
                      ))}
                    </ToggleGroup>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        {loading ? (
          <div className="h-40 flex justify-center items-center">
            <LoadingSpinner />
          </div>
        ) : null}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 sm:block columns-2  lg:columns-3 lg:gap-6 mx-auto space-y-4 lg:space-y-6 mb-8">
          {filterPage().map((item: DatasetProps) => {
            return <Card item={item} key={item.id} />;
          })}
        </div>

        <div>
          <Pagination>
            <PaginationContent>{renderPagination()}</PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
};
