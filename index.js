const url = "https://sheets.googleapis.com/v4/spreadsheets/17o83IvWxmtGLYridZis0nEprHhsZIMeFtHGtXV35h6M?key=AIzaSyADKxcHRnRPiouvJurFmZd1Zz7VdrL-46Q&includeGridData=true";

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
    values = lang.split(',')
    for (let i=0; i < values.length; i++){
        const lower = values[i].toLowerCase().trim();
        values[i] = (lang_alt[lower] != undefined) ?  lang_alt[lower] : '';
    }
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
            if (response.data.sheets[i].properties.title == 'All'){
                rowData = response.data.sheets[i].data[0].rowData
                break;
            }
        }
        let headers = []
        let headersWhiteList = ['No.', 'Name', 'Link', 'Year', 'Language', 'Volume', 'Unit', 'Paper Link', 'Collection Style', 'Tasks', 'Tags']
        $('.loading-spinner').hide()
    
        // Grabbing header's index's to help us to get value's of just by header index 
        var headers_dict = new Object();
        rowData[1].values.filter(header => header.formattedValue != undefined).forEach((header, headerIndex) => {
            headers_dict[header.formattedValue] = headerIndex;
            if (headersWhiteList.includes(header.formattedValue)){
                headers.push({
                    index: headerIndex,
                    title: header.formattedValue
                });
            }
        })

        let tempRows = []
        rowData.filter(row => {
            tempRows.push(row.values)
        })
        
        // Grabbing row's values
        let rows = []
        for (let index = 2; index < tempRows.length; index++) {
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


        previous_id = -1
        for (let index = 0; index < rows.length; index++) {
            const row = rows[index];
            const hf_link = row[headers_dict['HF Link']].formattedValue ? row[headers_dict['HF Link']].formattedValue : ''
            const data_link = row[headers_dict['Link']].formattedValue ? row[headers_dict['Link']].formattedValue : ''
            const data_icon = data_link.includes("github") ? "github" : "download"
            const pr_text = row[headers_dict['Paper Title']].formattedValue ? row[headers_dict['Paper Title']].formattedValue : ''
            const pr_link = row[headers_dict['Paper Link']].formattedValue ? row[headers_dict['Paper Link']].formattedValue : ''
            
           

            let id = row[headers[0].index].formattedValue
            
            if(id == previous_id) {
                
            } else {
                dataset.push({
                    0: row[headers[0].index].formattedValue,
                    1: linkuize(row[headers[1].index].formattedValue, `card.html?${id}`),
                    2: (data_link.includes("https") ? linkuize(getIcon(data_icon),  data_link) : "") +  
                       (hf_link.includes("huggingface") ? linkuize(getIcon('hf'), hf_link) : ""),
                    3: row[headers[3].index].formattedValue ? row[headers[3].index].formattedValue : '',
                    4: lang_format(row[headers[4].index].formattedValue ? row[headers[4].index].formattedValue: ''),
                    5: row[headers[5].index].formattedValue ? row[headers[5].index].formattedValue : '',
                    6: row[headers[6].index].formattedValue ? row[headers[6].index].formattedValue : '',
                    7: linkuize(row[headers[7].index - 1].formattedValue, row[headers[7].index].formattedValue),
                    8: badgeRender(row[headers[8].index].formattedValue ? row[headers[8].index].formattedValue : ''),
                    9: itemize(row[headers[9].index].formattedValue ? row[headers[9].index].formattedValue : ''),
                    10: lang_tag(row[headers[4].index].formattedValue ? row[headers[4].index].formattedValue: '')
                })

                if (row[headers[4].index].formattedValue)
                    langs = row[headers[4].index].formattedValue.split(",")
                    for (let i=0; i < values.length; i++)
                        lang_filter.add(langs[i].trim().toLowerCase())
                    

                if (row[headers[9].index].formattedValue)
                    task_filter.add(row[headers[9].index].formattedValue)
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


            for (let task of Array.from(task_filter).sort()) {
                $("#taskfilter").append(
                    '<label class="badge bg-secondary btn"> <input class="badge" type="checkbox" name="task" value="' + 
                    task.replaceAll(' ','-') + '"> ' + 
                    task + "</label> " 
                    );
            }
            
            for (let lang of Array.from(lang_filter).sort()) {
                lang_txt = lang
                if (lang_alt[lang] != undefined)
                    lang_txt = lang_alt[lang] + " - " + lang;    

                $("#langfilter").append(
                    '<label class="badge bg-secondary btn"> <input class="badge" type="checkbox" name="lang" value="' + 
                    lang + '"> ' + 
                    lang_txt + "</label> " 
                    );
            }

	$('label.btn').on('click','input', function(e){
	  e.stopPropagation();
	  $(this).attr('checked', !$(this).attr('checked'));
	  $(e.target).closest('label').toggleClass('bg-secondary');
	  $(e.target).closest('label').toggleClass('bg-success');
	});

            
            // task filter
            $.fn.dataTable.ext.search.push(
                function( settings, searchData, index, rowData, counter ) {
                  var filters = $('input:checkbox[name="task"]:checked').map(function() {
                    return this.value.toLowerCase();
                  }).get();
                  
                  if (filters.length === 0) {
                    return true;
                  }
                  
                  for (let filter of filters)
                    if (searchData[9].toLowerCase().includes(filter)) {
                      return true;
                    }
                  
                  return false;
                }
            );

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

            var table = $('#table').DataTable({
                data: dataset,
                columns: headers,
                "lengthMenu": [10, 25, 50, 75, 100, 250],
                scrollCollapse: true,
                paging: true,
                "pagingType": "numbers",
                "bInfo": false,
                'createdRow': function(row, data, dataIndex){
                    $('td:eq(10)', row).css('min-width', '200px');
                 },
                columnDefs: [
                    {
                        targets: [10], 
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