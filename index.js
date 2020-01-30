/**JSC.Chart('chartDiv2',{
    type:'pie charts',
    series:[
        {
            name:'Kundi',
            points:[
                {x:'Apples',y:50},
                {x:'Oranges',y:70}
            ]
        },{
            name:'Clayton',
            points:[
                {x:'Apples',y:65},
                {x:'Oranges',y:76},

            ]
        }
    ]
});
**/

//using fetch to fetch data from site

fetch('https://data.cdc.gov/resource/w9j2-ggv5.csv')
.then(
    function(res){
        return res.text();
    })
    .then(function(text){
       let series= csvToSeries(text);
       //call the render function
       renderChart(series);
    })
    .catch(function(error){
        console.log(error)
    });

    function csvToSeries(text){
        const lifeExp='average_life_expectancy';
        let dataAsJson=JSC.csv2Json(text);
        ///console.log(dataAsJson);
        //let male=[],female=[];
        let white=[], black=[];
        dataAsJson.forEach(function(row){
            if(row.sex==='Both Sexes'){
                if(row.race==='Black'){
                    black.push({x:row.year, y:row[lifeExp]});
                }else if(row.race==='White'){
                    white.push({x:row.year,y:row[lifeExp]});
                }
            }
            //console.log(row)
          //  console.log([male,female]);
            
        });
        return [
            {name:'White',points : white},
            {name:'Black',points: black}

        ];
    };

    function renderChart(series){
        //jsc constructor function
        JSC.Chart('chartDiv', {
            title_label_text:'Life Expectancy in the United States',
            //legend_template: '%icon,%name',
            legend_visible: true,
            defaultSeries_lastPoint_label_text: '<b>%seriesName</b>',
            //let’s enable the x axis crosshair combined tooltip to show the male and female life expectancy for any given year
            xAxis: {crosshair: {enabled: true}},
            defaultPoint_tooltip: '%seriesName <b>%yValue</b> years',
            annotations:[{
                label_text: 'Source: National Center for Health Statistics',
			position: 'bottom right'
            }],
           series: series
        });
     }
