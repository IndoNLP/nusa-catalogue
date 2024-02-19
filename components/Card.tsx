import { DatasetProps } from "./helper/hooks";
import {
  Card as CardComponent,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Bot,
  Building,
  Database,
  Eye,
  FileType,
  FolderCheck,
  Globe,
  Scale,
  ScrollText,
  Speech,
  User,
  Video,
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import Link from "next/link";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const Card = ({
  item,
  showDetail = false,
}: {
  item: DatasetProps;
  showDetail?: boolean;
}) => {
  const {
    id,
    name,
    description,
    datasetLink,
    paperTitle,
    language,
    modality,
    tasks,
    license,
    author,
    provider,
  } = item;
  let { paperLink, hfLink } = item;

  if (paperLink === "-") paperLink = "";
  if (hfLink === "-") hfLink = "";

  const formatNewline = (text: string) => {
    return (text || "").split("\r\n").join(", ").split("\n").join(", ");
  };

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
        <TooltipContent>{modality.split("\n").join(", ")}</TooltipContent>
      </Tooltip>
    );
  };

  return (
    <CardComponent
      key={name}
      className={cn(
        "md:break-inside-avoid overflow-hidden relative bg-white",
        showDetail ? "w-full" : "max-w-md"
      )}
    >
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <div className="flex flex-col">
          <Link target="_blank" href={`/dataset?id=${id}`}>
            <CardTitle className="text-lg">{name}</CardTitle>
          </Link>
        </div>
      </CardHeader>

      <CardContent>
        <div className={cn(!showDetail && "line-clamp-3")}>{description}</div>

        {showDetail && paperTitle ? (
          <div className="flex flex-row items-center text-neutral-400 text-sm mt-2">
            <div className="w-5 mr-2 self-start">
              <Tooltip>
                <TooltipTrigger asChild>
                  <ScrollText size={20} />
                </TooltipTrigger>
                <TooltipContent>Paper Title</TooltipContent>
              </Tooltip>
            </div>
            <div className={cn(!showDetail && "line-clamp-2")}>
              {paperTitle}
            </div>
          </div>
        ) : null}

        {showDetail && author.trim() ? (
          <div className="flex flex-row items-center text-neutral-400 text-sm mt-2">
            <div className="w-5 mr-2 self-start">
              <Tooltip>
                <TooltipTrigger asChild>
                  <User size={20} />
                </TooltipTrigger>
                <TooltipContent>Author</TooltipContent>
              </Tooltip>
            </div>
            <div>{author}</div>
          </div>
        ) : null}

        {showDetail && provider ? (
          <div className="flex flex-row items-center text-neutral-400 text-sm mt-2">
            <div className="w-5 mr-2 self-start">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Building size={20} />
                </TooltipTrigger>
                <TooltipContent>Provider</TooltipContent>
              </Tooltip>
            </div>
            <div>{provider}</div>
          </div>
        ) : null}

        {language ? (
          <div className="flex flex-row items-center text-neutral-400 text-sm mt-2">
            <div className="w-5 mr-2 self-start">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Globe size={20} />
                </TooltipTrigger>
                <TooltipContent>Language</TooltipContent>
              </Tooltip>
            </div>
            <div className={cn(!showDetail && "line-clamp-3")}>
              {formatNewline(language)}
            </div>
          </div>
        ) : null}

        {tasks ? (
          <div className="flex flex-row items-center text-neutral-400 text-sm mt-2">
            <div className="w-5 mr-2 self-start">
              <Tooltip>
                <TooltipTrigger asChild>
                  <FolderCheck size={20} />
                </TooltipTrigger>
                <TooltipContent>Tasks</TooltipContent>
              </Tooltip>
            </div>
            <div className={cn(!showDetail && "line-clamp-2")}>
              {formatNewline(tasks)}
            </div>
          </div>
        ) : null}

        {license ? (
          <div className="flex flex-row items-center text-neutral-400 text-sm mt-2">
            <div className="w-5 mr-2 self-start">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Scale size={20} />
                </TooltipTrigger>
                <TooltipContent>License</TooltipContent>
              </Tooltip>
            </div>
            <div className={cn(!showDetail && "line-clamp-2")}>{license}</div>
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
    </CardComponent>
  );
};

export default Card;
