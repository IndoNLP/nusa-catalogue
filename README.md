# SEACrowd

The first online catalogue for SEACrowd datasets. This catalogue contains X datasets with more than Y metadata annotations for each dataset. You can view the list of all datasets using the link of the website.

## Metadata

- `No.` dataset number
- `Name` name of the dataset
- `Subsets` subsets of the datasets
- `Link` direct link to the dataset or instructions on how to download it
- `License` license of the dataset
- `Year` year of the publishing the dataset/paper
- `Language` ar or multilingual
- `Dialect` region ar-LEV: (Arabic(Levant)), country ar-EGY: (Arabic (Egypt)) or type ar-MSA: (Arabic (Modern Standard Arabic))
- `Domain` social media, news articles, reviews, commentary, books, transcribed audio or other
- `Form` text, audio or sign language
- `Collection style` crawling, crawling and annotation (translation), crawling and annotation (other), machine translation, human translation, human curation or other
- `Description` short statement describing the dataset
- `Volume` the size of the dataset in numbers
- `Unit` unit of the volume, could be tokens, sentences, documents, MB, GB, TB, hours or other
- `Provider` company or university providing the dataset
- `Related Datasets` any datasets that is related in terms of content to the dataset
- `Paper Title` title of the paper
- `Paper Link` direct link to the paper pdf
- `Script` writing system either Arab, Latn, Arab-Latn or other
- `Tokenized` whether the dataset is segmented using morphology: Yes or No
- `Host` the host website for the data i.e GitHub
- `Access` the data is either free, upon-request or with-fee.
- `Cost` cost of the data is with-fee.
- `Test split` does the data contain test split: Yes or No
- `Tasks` the tasks included in the dataset spearated by comma
- `Evaluation Set` the data included in the evaluation suit by BigScience
- `Venue Title` the venue title i.e ACL
- `Citations` the number of citations
- `Venue Type` conference, workshop, journal or preprint
- `Venue Name` full name of the venue i.e Associations of computation linguistics
- `authors` list of the paper authors separated by comma
- `affiliations` list of the paper authors' affiliations separated by comma
- `abstract` abstract of the paper
- `Added by` name of the person who added the entry
- `Notes` any extra notes on the dataset

## Access Data

You can access the annoated dataset using `datasets`

```python
TO DO
```

which gives the following output

```

```

## Contribution

The catalogue will be updated regularly.

## Development

Prepare dev environment by changing nextjs config (next.config.mjs)

```
  /**
   * Enable static exports for the App Router.
   *
   * @see https://nextjs.org/docs/app/building-your-application/deploying/static-exports
   */
  // output: "export", comment this

  /**
   * Set base path. This is usually the slug of your repository.
   *
   * @see https://nextjs.org/docs/app/api-reference/next-config-js/basePath
   */
  // basePath: "/seacrowd-catalogue", comment this
```

Use nodejs version 20, run following command

```
npm install
npm run dev
```

## Citation

```
Will be added
```
