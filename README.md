# IndoNLP 

The first online catalogue for Indonesian NLP datasets. This catalogue contains 200 datasets with more than 25 metadata annotations for each dataset. You can view the list of all datasets using the link of the webiste [https://indonlp.github.io](https://indonlp.github.io)

> **Title** IndoNLP: Metadata Sourcing for Indonesian and Indonesia Local Languages Data Resources <br>
> Authors:  <br>
> 
>
> **Abstract:** 

## Metadata 

* `No.` dataset number
* `Name` name of the dataset 
* `Subsets` subsets of the datasets
* `Link` direct link to the dataset or instructions on how to download it 
* `License` license of the dataset 
* `Year` year of the publishing the dataset/paper
* `Language` ar or multilingual 
* `Dialect` region ar-LEV: (Arabic(Levant)), country ar-EGY: (Arabic (Egypt)) or type ar-MSA: (Arabic (Modern Standard Arabic))
* `Domain` social media, news articles, reviews, commentary, books, transcribed audio or other
* `Form` text, audio or sign language 
* `Collection style` crawling, crawling and annotation (translation), crawling and annotation (other), machine translation, human translation, human curation or other
* `Description` short statement describing the dataset
* `Volume` the size of the dataset in numbers
* `Unit` unit of the volume, could be tokens, sentences, documents, MB, GB, TB, hours or other
* `Provider` company or university providing the dataset 
* `Related Datasets` any datasets that is related in terms of content to the dataset
* `Paper Title` title of the paper 
* `Paper Link` direct link to the paper pdf 
* `Script` writing system either Arab, Latn, Arab-Latn or other
* `Tokenized` whether the dataset is segmented using morphology: Yes or No 
* `Host` the host website for the data i.e GitHub 
* `Access` the data is either free, upon-request or with-fee.
* `Cost` cost of the data is with-fee. 
* `Test split` does the data contain test split: Yes or No
* `Tasks` the tasks included in the dataset spearated by comma
* `Evaluation Set` the data included in the evaluation suit by BigScience 
* `Venue Title` the venue title i.e ACL
* `Citations` the number of citations 
* `Venue Type` conference, workshop, journal or preprint 
* `Venue Name` full name of the venue i.e Associations of computation linguistics 
* `authors` list of the paper authors separated by comma 
* `affiliations` list of the paper authors' affiliations separated by comma
* `abstract` abstract of the paper 
* `Added by` name of the person who added the entry 
* `Notes` any extra notes on the dataset
 
## Access Data 
You can access the annoated dataset using `datasets`

```python
from datasets import load_dataset 
nusa_catalogue = load_dataset('')
nusa_catalogue['train'][0]
```
which gives the following output 

```

```
## Contribution 
The catalogue will be updated regularly. If you want to add a new dataset, use this [form](https://forms.gle/Hnqm4D7KhpRA59ij8).

## Citation 

```
Will be added
```

