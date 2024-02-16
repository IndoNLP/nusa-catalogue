import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import {
  Bot,
  Database,
  Eye,
  FileType,
  Filter,
  FolderCheck,
  Globe,
  ScrollText,
  Speech,
  Video,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface DatasetProps {
  name: string;
  description: string;
  datasetLink: string;
  paperTitle: string;
  paperLink: string;
  language: string;
  modality: string;
  hfLink: string;
  tasks: string;
}

const PER_PAGE = 15;
const TASKS = [
  "Wordnet",
  "Machine Translation",
  "Readibility Assessment",
  "Automatic Speech Recognition",
  "Question Answering",
  "Image-to-Text Generation",
  "Language Modeling",
  "Text-to-Image Generation",
  "Visual Storytelling",
  "Image Captioning",
  "Speech Emotion Recognition",
  "Aspect Based Sentiment Analysis",
  "Text Retrieval",
  "Text-To-Speech Synthesis",
  "Optical Character Recognition",
  "Commonsense Reasoning",
  "Dialogue System",
  "Abstractive Summarization",
  "Sentiment Analysis",
  "Speech-to-text translation",
  "Emotion Classification",
  "Hate Speech Detection",
  "Error Spelling Correction",
  "Text Classification",
  "Code-switching Identification",
  "Summarization",
  "Relation Extraction",
  "Named Entiy Recognition",
  "Spoken Language Identification",
  "Language Identification",
  "Video-to-Text Retrieval",
  "Video Captioning",
  "Chatbot",
  "Paraphrasing",
  "Constituency Parsing",
  "Short Answer Grading",
  "Coreference Resolution",
  "POS Tagging",
  "Token-level language identification",
  "Abstract Meaning Representation",
  "Legal Classification",
  "Next Tweet Prediction",
  "Tweet Ordering",
  "Hoax Detection",
  "Clickbait Detection",
  "Topic Classification",
  "Stance Detection",
  "Semantic Role Labeling",
  "Intent Classification",
  "Slot Filling",
  "Abusive Language Detection",
];

const FETCH_URL = [
  `https://sewacrowd.sonnylazuardi.workers.dev/`,
  `https://opensheet.elk.sh/1ibbywsC1tQ_sLPX8bUAjC-vrTrUqZgZA46W_sxWw4Ss/Approved+Datasheets+(Monitor)`,
];

export const Dataset = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [filterModality, setFilterModality] = useState<string[]>([]);
  const [filterTask, setFilterTask] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [data, setData] = useState<DatasetProps[]>([]);
  const [filteredData, setFilteredData] = useState<DatasetProps[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      let result, json;
      try {
        result = await fetch(FETCH_URL[0]);
        json = await result.json();
      } catch (e) {
        result = await fetch(FETCH_URL[1]);
        json = await result.json();
      }
      const dataset = json.map((item: any) => ({
        name: item["Dataset name"],
        description: item["Dataset description"],
        datasetLink: item["Dataset URL"],
        paperTitle: item["Dataset paper title"],
        paperLink: item["Dataset paper URL"],
        language: item["Dataset language(s)"],
        modality: item["Dataset modality"],
        hfLink: item["HuggingFace URL"],
        tasks: item["Dataset task(s)"],
      }));
      setData(dataset);
      setLoading(false);
    };
    load();
  }, []);

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

  const formatNewline = (text: string) => {
    return (text || "").split("\r\n").join(", ").split("\n").join(", ");
  };

  return (
    <TooltipProvider>
      <section id="dataset" className="container py-24 sm:py-32 !pt-20">
        <div className="flex flex-col md:flex-row mb-2">
          <div className="text-neutral-400 mb-2">
            Showing {filteredData.length} dataset, page {page}
          </div>
          <div className="flex flex-1"></div>
          <Search
            placeholder="Search Dataset..."
            className="w-full max-w-96"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="mb-4">
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
            const {
              name,
              description,
              datasetLink,
              paperLink,
              paperTitle,
              language,
              modality,
              hfLink,
              tasks,
            } = item;

            const renderModalityIcon = (modality: string) => {
              switch (modality) {
                case "Language":
                  return <FileType size={20} className="text-amber-500" />;
                case "Vision":
                  return <Eye size={20} className="text-fuchsia-500" />;
                case "Speech":
                  return <Speech size={20} className="text-green-500" />;
                case "Video":
                  return <Video size={20} className="text-rose-500" />;
              }
            };

            const renderLine = () => {
              return (
                <div className="absolute bottom-0 left-0 right-0 h-2 flex flex-row">
                  {modality.split("\n").map((modality) => {
                    switch (modality) {
                      case "Language":
                        return <div className="flex flex-1 bg-amber-500" />;
                      case "Vision":
                        return <div className="flex flex-1 bg-fuchsia-500" />;
                      case "Speech":
                        return <div className="flex flex-1 bg-green-500" />;
                      case "Video":
                        return <div className="flex flex-1 bg-rose-500" />;
                    }
                  })}
                </div>
              );
            };

            const renderModality = () => {
              return (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex flex-row space-x-1">
                      {modality
                        .split("\n")
                        .map((modality) => renderModalityIcon(modality))}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    {modality.split("\n").join(", ")}
                  </TooltipContent>
                </Tooltip>
              );
            };
            return (
              <Card
                key={name}
                className="max-w-md md:break-inside-avoid overflow-hidden relative"
              >
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <div className="flex flex-col">
                    <a href={datasetLink}>
                      <CardTitle className="text-lg">{name}</CardTitle>
                    </a>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="line-clamp-3">{description}</div>
                  {language ? (
                    <div className="flex flex-row items-center text-neutral-400 text-sm mt-2">
                      <div className="w-5 mr-2">
                        <Globe size={20} />
                      </div>
                      <div className="line-clamp-2">
                        {formatNewline(language)}
                      </div>
                    </div>
                  ) : null}

                  {tasks ? (
                    <div className="flex flex-row items-center text-neutral-400 text-sm mt-2">
                      <div className="w-5 mr-2">
                        <FolderCheck size={20} />
                      </div>
                      <div className="line-clamp-2">{formatNewline(tasks)}</div>
                    </div>
                  ) : null}
                </CardContent>

                <CardFooter className="flex space-x-2 mt-4">
                  {renderModality()}

                  <div className="flex flex-1"></div>
                  {hfLink ? (
                    <a href={hfLink}>
                      <Button variant="outline" size="sm">
                        <Bot size={20} />
                        <span className="hidden md:block ml-2">HF</span>
                      </Button>
                    </a>
                  ) : null}

                  {paperLink ? (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <a href={paperLink}>
                          <Button variant="outline" size="sm">
                            <ScrollText size={20} />
                            <span className="hidden md:block ml-2">Paper</span>
                          </Button>
                        </a>
                      </TooltipTrigger>
                      <TooltipContent>{paperTitle}</TooltipContent>
                    </Tooltip>
                  ) : null}

                  {datasetLink ? (
                    <a href={datasetLink}>
                      <Button size="sm">
                        <Database size={20} className="mr-2" /> Data
                      </Button>
                    </a>
                  ) : null}
                </CardFooter>

                {renderLine()}
              </Card>
            );
          })}
        </div>

        <div>
          <Pagination>
            <PaginationContent>{renderPagination()}</PaginationContent>
          </Pagination>
        </div>
      </section>
    </TooltipProvider>
  );
};
