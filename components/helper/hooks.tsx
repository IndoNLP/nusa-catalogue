import { useEffect, useState } from "react";
import { FETCH_URL } from "./constants";

export interface DatasetProps {
  id: string;
  name: string;
  description: string;
  datasetLink: string;
  paperTitle: string;
  paperLink: string;
  language: string;
  modality: string;
  hfLink: string;
  tasks: string;
  license: string;
  author: string;
  provider: string;
  dataSize: string;
}

export const useDatasetFetch = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<DatasetProps[]>([]);
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
        id: item["No"],
        name: item["Dataset name"],
        description: item["Dataset description"],
        datasetLink: item["Dataset URL"],
        paperTitle: item["Dataset paper title"],
        paperLink: item["Dataset paper URL"],
        language: item["Dataset language(s)"],
        modality: item["Dataset modality"],
        hfLink: item["HuggingFace URL"],
        tasks: item["Dataset task(s)"],
        license: item["Dataset license"],
        author: `${item["First Name"]} ${item["Last Name"]}`,
        provider: item["Dataset provider"],
      }));
      setData(dataset);
      setLoading(false);
    };
    load();
  }, []);

  return { data, setData, loading };
};
