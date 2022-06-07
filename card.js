const url = "https://sheets.googleapis.com/v4/spreadsheets/17o83IvWxmtGLYridZis0nEprHhsZIMeFtHGtXV35h6M?key=AIzaSyADKxcHRnRPiouvJurFmZd1Zz7VdrL-46Q&includeGridData=true";
function linkuize(text, link) {
    return `<a href = "${link}" target="_blank"> ${text}</a>`
}

function ethicalBadge(text) {
    text = text.toLowerCase();
    if (text == "low") return '<span class="badge bg-success">Low</span>';
    else if (text == "medium") return '<span class="badge bg-warning">Medium</span>';
    else return '<span class="badge bg-danger text-light">High</span>';
}

function createSubsets(subsetsValue) {
    let result = '<table><tbody>'
    subsetsValue.forEach(subset => {
        result += `<tr><td><b>${subset.country}</b></td><td>${subset.volume}</td></tr>`
    })
    result += '</tbody></table>'
    return result
}

axios.get(url, ).then(function(response) {
        let rowData = null;
        for (let i=0; i < response.data.sheets.length; i++){
            if (response.data.sheets[i].properties.title == 'All'){
                rowData = response.data.sheets[i].data[0].rowData;
                break;
            }
        }

        let headers = []

        // If you disable display name don't remove it from "headersWhiteList" becuase we use this as index key to push subsets to his row 
        let headersWhiteList = ['Name','Link', 'HF Link', 'Year', 'Volume', 'Unit', 'Paper Title', 'Paper Link', 'Access', 'Tasks', 'License', 'Language', 'Dialect', 'Domain', 'Form', 'Collection Style', 'Ethical Risks', 'Provider', 'Derived From', 'Test Split', 'Subsets']
        
        $('.loading-spinner').hide()

        function getIndex() {
            let idx = document.URL.indexOf('?');
            let index = document.URL.substring(idx + 1, document.URL.length)
            return index
        }
        const idx = getIndex();

        // Grabbing header's index's to help us to get value's of just by header index
        rowData[1].values.filter(header => header.formattedValue != undefined).forEach((header, headerIndex) => {
            if (headersWhiteList.includes(header.formattedValue)){
                headers.push({
                    index: headerIndex,
                    title: header.formattedValue
                })
            }
        })

        console.log(rowData)

        let subsets = []
        rowData.filter(row => row.values[0].formattedValue == idx).forEach((row, rowIndex) => {
            console.log(row)
            subsets.push(row.values)
        })
        
        let dataset = []
        // For each on "headersWhiteList" to display data with defult sort
        var link = "";
        var paper_title = "";
        headersWhiteList.forEach(element => {
            let value = subsets[0][headers.filter(h => h.title == element)[0].index].formattedValue
            value = value ? value : ''
            if (element == 'Ethical Risks') {
                value = ethicalBadge(value) // calling "ethicalBadge" function to put some style to the value 
            }
            else if (element == 'Paper Link'){
                element = 'Publication';
                value = linkuize(paper_title, value)
            }
            else if (element == 'HF Link'){
                element = 'Dataset Link';
                if (value != '-') {
                    value = linkuize('[Original Link]', link) + ' | ' + linkuize('[Hugging Face Link]', value);
                } else {
                    value = linkuize('[Original Link]', link);
                }
            }
                else if (element == 'Subsets') {
                let subsetsData = []
                for(let i = 1; i < subsets.length; i++) {
                    subsetsData.push({
                        country: subsets[i][headers.filter(h => h.title == "Subsets")[0].index].formattedValue,
                        volume: subsets[i][headers.filter(h => h.title == "Volume")[0].index].formattedValue + " " + subsets[i][headers.filter(h => h.title == "Unit")[0].index].formattedValue
                    })
                }
                value = createSubsets(subsetsData)
            }
        
            if (element == 'Link'){
                link = value;
            } else if (element == 'Paper Title') {
                paper_title = value;
            } else {
                dataset.push({
                    0: element,
                    1: value
                })
            }
        });

        $(document).ready(function() {
            $('#table_card').DataTable({
                data: dataset,
                columns: [{
                        title: "Attribute"
                    },
                    {
                        title: "Value"
                    },
                ],
                "lengthMenu": [10, 25, 50, 75, 100, 250],
                scrollCollapse: true,
                // scrollY: "720px",
                scrollCollapse: true,
                paging: false,
                "order": [],
                "bInfo": false
            });
        });
    })
    .catch(function(error) {
        console.log(error);
    });