const url = "https://sheets.googleapis.com/v4/spreadsheets/1ibbywsC1tQ_sLPX8bUAjC-vrTrUqZgZA46W_sxWw4Ss?key=AIzaSyCGkxGwoqhEFrFhR9GQnWGslvb6biNIOrg&includeGridData=true";

function linkuize(text, link) {
    if(link != undefined)
        return `<a href = "${link}" target="_blank"> ${text}</a>`
    else
        return ""
}


function getIcon(text){
    const lower = text.toLowerCase()
    if(icons[lower] != undefined)
    {
        return icons[lower]
    }
    else
    {
        return text
    }
}

function itemize(text) {
    tasks = text.split(",")
    output = '<ul class="list-group list-group-flush bg-transparent">'
    for (let i = 0; i < tasks.length; i++) {
        output += '<li class="list-group-item bg-transparent">' + tasks[i].trim().replaceAll(' ','-') + '</li>'
    }
    output += "</ul>"
    return output
}

function badgeRender(text) {
    text = text.toString().toLowerCase();
    if (text.toLowerCase() == "free") return '<span class="badge bg-success">Free</span>'
    else if (text == "upon-request") return '<span class="badge bg-info">Free Upon Request</span>'
    else return '<span class="badge bg-danger">Paid</span>'
}

function reformat_numbers(num) {
    values = num.split(',')
    if (values.length < 2) {
        return num
    } else if (values.length == 2) {
        return values[0] + 'K'
    } else
        return values[0] + 'M'
}

function lang_format(lang){
    values = lang.split(',')
    for (let i=0; i < values.length; i++){
        const lower = values[i].toLowerCase().trim();
        title = (lang_alt[lower] != undefined) ?  lang_alt[lower] : '';
        values[i] = '<span class="badge bg-info">' + 
                    values[i].toLowerCase().trim() + 
                    '</span>';
    }
    return values.join(' ')
}

// expand language name as a hidden tag for better searching
function lang_tag(lang){
    console.log(lang)
    values = lang.split('\n')
    for (let i=0; i < values.length; i++){
        const lower = values[i].toLowerCase().trim();
        // values[i] = (lang_alt[lower] != undefined) ?  lang_alt[lower] : '';
        values[i] = lower
    }
    console.log(values.join(', '))
    return values.join(', ')
}

axios.get(url, {
    // TODO:: Adding a download progress bar. * IT CANNOT BE APPLIED BECAUSE THE SIZE OF THE ENCODING DATA. *
    onDownloadProgress: progressEvent => {
        // const percentage = Math.round(
        //     (progressEvent.loaded * 100) / progressEvent.total
        //   );
        // console.log('download', percentage);        
      }
}).then(function(response) {
        let rowData = null;
        for (let i=0; i < response.data.sheets.length; i++){
            if (response.data.sheets[i].properties.title == 'Approved Datasheets (Monitor)'){
                rowData = response.data.sheets[i].data[0].rowData
                break;
            }
        }
        let headers = []
        let headersWhiteList = ['No', 'Dataset name', 'Dataset paper title', 'Dataset or dataset paper publish year', 'Dataset URL', 'HuggingFace URL', 'Approval Status', 'Dataset paper URL', 'Subset(s)']
        $('.loading-spinner').hide()
        
        let header_map = {
            'Dataset or dataset paper publish year': 'Year',
            'Dataset name': 'Name',
            'Dataset paper title': 'Paper',
            'Subset(s)': 'Language(s)',
            'Dataset paper URL': 'Paper Link',
            'HuggingFace URL': 'HF Link',
            'Dataset paper title': 'Paper Title'
        }

        // Grabbing header's index's to help us to get value's of just by header index 
        var headers_dict = new Object();
        console.log(rowData[0])
        rowData[0].values.forEach((header, headerIndex) => {
            headers_dict[header.formattedValue] = headerIndex;
            if (headersWhiteList.includes(header.formattedValue)){
                // do not put Dataloader and Implemented to table
                title = header.formattedValue
                if (header_map.hasOwnProperty(title)){
                    title = header_map[title]
                }

                headers.push({
                    index: headerIndex,
                    title: title
                });
            }
        })

        let tempRows = []
        rowData.filter(row => {
            tempRows.push(row.values)
        })
        
        // Grabbing row's values
        let rows = []
        for (let index = 1; index < tempRows.length; index++) {
            const fileds = tempRows[index]
            if (fileds != undefined) {
                if (!isNaN(fileds[0].formattedValue)){
                    rows.push(fileds)
                }
            }
            
        }
        
        //  Createing table data
        let dataset = []

        // Creating column filtering
        let task_filter = new Set()
        let lang_filter = new Set()

        console.log(headers)

        previous_id = -1
        console.log('headers_dict' + JSON. stringify(headers_dict));
        for (let index = 0; index < rows.length; index++) {
            const row = rows[index];
            // console.log(row)
            // const hf_link = row[headers_dict['HuggingFace URL']].formattedValue ? row[headers_dict['HuggingFace URL']].formattedValue : ''
            // const data_link = row[headers_dict['Dataset URL']].formattedValue ? row[headers_dict['Dataset URL']].formattedValue : ''
            // const data_icon = data_link.includes("github") ? "github" : "download"
            // const pr_text = row[headers_dict['Dataset paper title']].formattedValue ? row[headers_dict['Dataset paper title']].formattedValue : ''
            // const pr_link = row[headers_dict['Dataset paper URL']].formattedValue ? row[headers_dict['Dataset paper URL']].formattedValue : ''
            const loader_name = row[headers_dict['Dataset name']].formattedValue ? row[headers_dict['Dataset name']].formattedValue : ''
            // const implemented = row[headers_dict['Approval Status']].formattedValue ? row[headers_dict['Approval Status']].formattedValue : ''
        
            // console.log(row)

            let id = row[headers[0].index].formattedValue
            if(id == previous_id) {
                
            } else {
                dataset.push({
                    0: row[headers[0].index].formattedValue,
                    1: linkuize(row[headers[1].index].formattedValue, `card.html?${loader_name}`),
                    // 2: (implemented == '1' ? '<a href="javascript:void(0)" onclick="showUsageBox(\''+loader_name+'\')"> <span class="badge bg-success">Load dataset <i class="fab fa-python"></i></span> </a>': "") +
                    //    (hf_link.includes("huggingface") ? linkuize(getIcon('hf'), hf_link) : "") + 
                    //    (data_link.includes("https") ? linkuize(getIcon(data_icon),  data_link) : ""),
                    // 2: row[headers[2].index].formattedValue ? row[headers[2].index].formattedValue : '', 
                    2: lang_tag(row[headers[2].index].formattedValue ? row[headers[2].index].formattedValue : ''),
                    3: row[headers[3].index].formattedValue ? row[headers[3].index].formattedValue : '',
                    4: row[headers[4].index].formattedValue ? row[headers[4].index].formattedValue: '',
                    5: row[headers[5].index].formattedValue ? row[headers[5].index].formattedValue: '',
                    6: row[headers[6].index].formattedValue ? row[headers[6].index].formattedValue: '',
                    7: row[headers[7].index].formattedValue ? row[headers[7].index].formattedValue: '',
                    8: row[headers[8].index].formattedValue ? row[headers[8].index].formattedValue: '',
                    // 8: row[headers[8].index].formattedValue ? row[headers[8].index].formattedValue: '',
                    // 4: row[headers[5].index].formattedValue ? row[headers[5].index].formattedValue : '',
                    // 5: row[headers[6].index].formattedValue ? row[headers[6].index].formattedValue : '',
                    // 6: row[headers[7].index].formattedValue ? row[headers[7].index].formattedValue : '',
                    // 7: linkuize(pr_text, pr_link)//,
                    // 9: itemize(row[headers[9].index].formattedValue ? row[headers[9].index].formattedValue : ''),
                    // 10: lang_tag(row[headers[4].index].formattedValue ? row[headers[4].index].formattedValue: '')
                })

                // if (row[headers[2].index].formattedValue)
                //     langs = row[headers[2].index].formattedValue.split("\n")
                //     for (let i=0; i < values.length; i++)
                //         lang_filter.add(langs[i].trim().toLowerCase())
                    

                // if (row[headers[9].index].formattedValue)
                //     task_filter.add(row[headers[9].index].formattedValue)
            }
            previous_id = id
        }

        $.extend($.fn.dataTableExt.oSort, {
            "data-custom-pre": function(a) {
                console.log(a)
            }
        });

        $(document).ready(function() {
            document.getElementById("numDatasets").textContent=dataset.length;


            // for (let task of Array.from(task_filter).sort()) {
            //     $("#taskfilter").append(
            //         '<label class="badge bg-secondary btn"> <input class="badge" type="checkbox" name="task" value="' + 
            //         task.replaceAll(' ','-') + '"> ' + 
            //         task + "</label> " 
            //         );
            // }
            
            // for (let lang of Array.from(lang_filter).sort()) {
            //     lang_txt = lang
            //     if (lang_alt[lang] != undefined)
            //         lang_txt = lang_alt[lang] + " - " + lang;    

            //     $("#langfilter").append(
            //         '<label class="badge bg-secondary btn"> <input class="badge" type="checkbox" name="lang" value="' + 
            //         lang + '"> ' + 
            //         lang_txt + "</label> " 
            //         );
            // }

            // $('label.btn').on('click','input', function(e){
            // e.stopPropagation();
            // $(this).attr('checked', !$(this).attr('checked'));
            // $(e.target).closest('label').toggleClass('bg-secondary');
            // $(e.target).closest('label').toggleClass('bg-success');
            // });

            
            // // task filter
            // $.fn.dataTable.ext.search.push(
            //     function( settings, searchData, index, rowData, counter ) {
            //       var filters = $('input:checkbox[name="task"]:checked').map(function() {
            //         return this.value.toLowerCase();
            //       }).get();
                  
            //       if (filters.length === 0) {
            //         return true;
            //       }
                  
            //       for (let filter of filters)
            //         if (searchData[9].toLowerCase().includes(filter)) {
            //           return true;
            //         }
                  
            //       return false;
            //     }
            // );

            // language filter
            $.fn.dataTable.ext.search.push(
                function( settings, searchData, index, rowData, counter ) {
                  var filters = $('input:checkbox[name="lang"]:checked').map(function() {
                    return this.value.toLowerCase();
                  }).get();
                  
                  if (filters.length === 0) {
                    return true;
                  }
                  
                  for (let filter of filters)
                    if (searchData[4].toLowerCase().includes(filter)) {
                      return true;
                    }
                  
                  return false;
                }
            );

            // updated_headers = headers
            // for (let i = 0; i < updated_headers.length; i++) {
            //     h = updated_headers[i].title
            //     // console.log(h)
            //     // console.log(header_map.hasOwnProperty(h))
            //     if (header_map.hasOwnProperty(h)){
            //         updated_headers[i].title = header_map[h]
            //     }
            // }

            var table = $('#table').DataTable({
                data: dataset,
                columns: headers,
                "lengthMenu": [10, 25, 50, 75, 100, 250],
                scrollCollapse: true,
                paging: true,
                "pagingType": "numbers",
                "bInfo": false,
                // 'createdRow': function(row, data, dataIndex){
                //     $('td:eq(10)', row).css('min-width', '200px');
                //  },
                 'createdRow': function(row, data, dataIndex){
                    $('td:eq(8)', row).css('min-width', '200px');
                 },
                columnDefs: [
                    {
                        // targets: [10], 
                        targets: [7], 
                        visible: false
                    },
                 ],
            });

            $('input:checkbox').on('change', function () {
                table.draw();
             });
        });

    })
    .catch(function(error) {
        console.log(error);
    });
