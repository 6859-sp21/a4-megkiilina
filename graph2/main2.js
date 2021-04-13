let climate_daly_data = [
        {region: "Low-and-middle-income countries of the African Region", deaths: 57},
        {region: "Low-and-middle-income countries of the Americas", deaths: 2},
        {region: "Low-and-middle-income countries of the Eastern Mediterranean Region", deaths: 20},
         {region: "Low-and-middle-income countries of the European Region", deaths: 0.67},
         {region: "Low-and-middle-income countries of the South-East Asia Region", deaths: 58},
        {region: "Low-and-middle-income countries of the Western Pacific Region", deaths: 4},
        {region: "High income countries", deaths: 0.23}
 ];


//--------Parsing Data ---------------------//
var dataset = d3.dsv(",", "Data2.csv", function(d) {
  return {
    country_name: d.Country, 
    year: new Date(+d.Year, 0, 1).getFullYear(), // convert "Year" column to Date and formats it to only year.
    cellphone: +d.Cellphone, 
    internetuser: +d.Internetuser, 
    telephone: +d.Telephone,
    radio: d.Radio, 
    tv: +d.TV, 
    xlPopulation: +d.Xlpopulation, 
    xlrealgdp: +d.Xlrealgdp 
  };
}).then(function(data) {
  
  //------filtering & creating datasets for each chart------//

  viz_countries = ["China","Germany","India","Japan","Russia","United States","MEDIAN"]
  const dataEvent_1 = data.filter((d,i) => d.year >= 1920 && d.year <= 2000 && viz_countries.indexOf(d.country_name) >=0)
  const dataEvent_2 = data.filter((d,i) => d.year >= 1876 && d.year <= 2000 && viz_countries.indexOf(d.country_name) >=0)
  const dataEvent_3 = data.filter((d,i) => d.year >= 1980 && d.year <= 2000 && viz_countries.indexOf(d.country_name) >=0)
  const dataEvent_4 = data.filter((d,i) => d.year >= 1990 && d.year <= 2000 && viz_countries.indexOf(d.country_name) >=0)
  const dataEvent_5 = data.filter((d,i) => d.year >= 1960 && d.year <= 2000 && viz_countries.indexOf(d.country_name) >=0)
  const dataEvent_6 = data.filter((d,i) => d.year >= 1992 && d.year <= 2003 && viz_countries.indexOf(d.country_name) >=0)
  console.log(dataEvent_1);
  console.log(dataEvent_2);
  console.log(dataEvent_3);
  console.log(dataEvent_4);
  console.log(dataEvent_5);
  console.log(dataEvent_6);

//------filtering & creating datasets for each chart------//
  draw("#svg1",dataEvent_6);
  draw("#svg2",dataEvent_5);
  draw("#svg3",dataEvent_4);
  draw("#svg4",dataEvent_3);
  draw("#svg5",dataEvent_2);
  draw("#svg6",dataEvent_1);


  function draw(selector,dataEvents){
  
  // 2. Setting up variables that describe our chart's space.
    var filtered_data = dataEvents;
    var height = 400;
    var width = 500;;
    //var margin = ({top: 10, right: 20, bottom: 20, left: 60});

    var svg = d3.select(selector)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    var xScale = d3.scalePoint()
      .domain(filtered_data.map(function(d) {
          return d.xlrealgdp
      }))
      .range([50, width - 50])
      .padding(0.5);

    var yScale = d3.scaleLinear()
      .domain([0, d3.max(filtered_data, function(d) {
          return d.cellphone
      }) * 1.1])
      .range([height - 20, 6]);

    var line = d3.line()
      .x(function(d){ return xScale(d.xlrealgdp)})
      .y(function(d){ return yScale(d.cellphone)});
  
    svg.append("path")
      .attr("d", line(filtered_data))
      .attr("stroke", "teal")
      .attr("stroke-width", "2")
      .attr("fill", "none");

    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);

    svg.append("g").attr("transform", "translate(0,380)")
      .attr("class", "xAxis")
      .call(xAxis);

    svg.append("g")
      .attr("transform", "translate(50,0)")
      .attr("class", "yAxis")
      .call(yAxis);

  }

  });
//console.log(dataEvent_1);

  // // 3. Create a SVG we will use to make our chart.
  // // See https://developer.mozilla.org/en-US/docs/Web/SVG for more on SVGs.
  // const svg = d3.create('svg')
  //   .attr('width', width)
  //   .attr('height', height)
  //   .style("overflow","visible");

  // // 4. Setting up scales.
  // const xScale = d3.scaleLinear()
  //   .domain([1, d3.max(dataEvent_1, d => d.xlrealgdp)])
  //   .range([margin.left, width - margin.right])
  //   .nice();
      
  // const yScale = d3.scaleLinear()
  //   .domain([1, d3.max(dataEvent_1, d => d.telephone)])
  //   .range([height - margin.bottom, margin.top])
  //   .nice();

  // const colorScale = d3.scaleOrdinal()
  //   .domain(dataEvent_1.map(d => d.cluster))
  //   .range(d3.schemeTableau10); // try other schemes, too!

  // //console.log(yScale.domain);

  // //-----drawing-----//

  //       //6. Drawing our x-axis
  // svg.append('g')
  //   .attr('transform', `translate(1, ${height - margin.bottom})`)
  //   .call(d3.axisBottom(xScale))
  //       // Add x-axis title 'text' element.
  //     .append('text')
  //     .attr('text-anchor', 'end')
  //     .attr('fill', 'black')
  //     .attr('font-size', '12px')
  //     .attr('font-weight', 'bold')
  //     .attr('x', width - margin.right)
  //     .attr('y', -10)
  //     .text('GDP');

  // //7. Drawing our y-axis
  // svg.append('g')
  //   .attr('transform', `translate(${margin.left}, 1)`)
  //   .call(d3.axisLeft(yScale))
  //         // Add y-axis title 'text' element.
  //   .append('text')
  //   .attr('transform', `translate(20, ${margin.top}) rotate(-90)`)
  //   .attr('text-anchor', 'end')
  //   .attr('fill', 'black')
  //   .attr('font-size', '12px')
  //   .attr('font-weight', 'bold')
  //   .text('Technology');


  //       // 5. Drawing our points
  // line = d3.line()
  //     .defined(d => !isNaN(d))
  //     .x(d => x(d.xlrealgdp))
  //     .y(d => y(d.telephone))

  // svg.append("g")
  //     .attr('transform', d => `translate(${margin.left}, ${margin.top})`)
  //     .selectAll('path') // d3-shape functions (like d3.symbol) generate attributes for SVG <path> elements
  //     .data(dataEvent_1)
  //     .join('path')
  //     .attr('transform', d => `translate(${xScale(d.xlrealgdp)}, ${yScale(d.telephone)})`)
  //     .attr('fill', d => colorScale(d.cluster))
  //     .attr('d', d => d3.line()
  //           .x(d => x(d.xlrealgdp))
  //           .y(d => y(d.telephone))); // Notice, the output of the d3.symbol is wired up to the "d" attribute.
    
  //   //svg.call(hover,path);    
 


  // document.getElementById("chart").appendChild(svg.node());
            
        // //8.  Adding a background label for the year.
        // const yearLabel = svg.append('text')
        //   .attr('x', 40)
        //   .attr('y', height - margin.bottom - 20)
        //   .attr('fill', '#ccc')
        //   .attr('font-family', 'Helvetica Neue, Arial')
        //   .attr('font-weight', 500)
        //   .attr('font-size', 80)
        //   .text(year);

        //document.getElementById("chart").appendChild(svg.node());  





  


//console.log(data);

//-----------------------------------------//

// let datasetSelection = d3.select("#chart").selectAll("div");

// datasetSelection
//     .data(dataset)
//     .enter()
//     .append("div")
//     .attr("class","bar")
//     .style("width",function(d){return d.deaths * 8 + "px";})
//     .text((d)=>{return d.year;});

  //console.log(dataset.year);


let toggleClass = (i,toggle) => {
   d3.select("#viz div:nth-child("+ i +")").classed("highlightBar",toggle);
   d3.select("#legend li:nth-child("+ i +")").classed("highlightText",toggle);
};

let divSelection = d3.select("#chart").selectAll("div")
;

divSelection
  .data(dataset)
  .enter()
  .append("div")
  .attr("class","bar")
  .style("width",function(d){return d.cellphone * 8 + "px";})
  .on("mouseover",(d,i) =>{toggleClass(++i,true);})
  .on("mouseout",(d,i) =>{toggleClass(++i,false);});
  
let listSelection = d3.select("#legend").selectAll("li");


listSelection
  .data(climate_daly_data)
  .enter()
  .append("li")
  .text(function(d){return d.region + ": "+ d.deaths +" deaths";})
  .on("mouseover",(d,i)=>{toggleClass(++i,true);})
  .on("mouseout",(d,i) =>{toggleClass(++i,false);});




  





  