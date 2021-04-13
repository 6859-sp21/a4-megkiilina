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
  draw("#svg1",dataEvent_6,"#GDP1","#Year1");
  // draw("#svg2",dataEvent_5);
  // draw("#svg3",dataEvent_4);
  // draw("#svg4",dataEvent_3);
  // draw("#svg5",dataEvent_2);
  // draw("#svg6",dataEvent_1);

  gdpGraph = // draw the SVG here in a div called <div id='gdpGraph'> or whatever id matches what you've been doing, give it the attr display="block"
  timeGraph = // draw the SVG here in a div called <div id='timeGraph'>, give it the attr display="none"
function switchGraph() {
  section = getElementById("section name")
  // if adpGraph has display==="block", set it to display==="none" 
  //     and set timeGraph display==="block"
  // else set adpGraph display==="block" and timeGraph display==="none"
}
toggle.onClick(switchGraph()) 


  function draw(selector,dataEvents,buttonGDP,buttonYEAR){
    var buttonYEAR = buttonYEAR;
    var buttonGDP = buttonGDP;
  // 2. Setting up variables that describe our chart's space.
    var filtered_data = dataEvents;
    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 30, bottom: 30, left: 60},
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;
    //var margin = ({top: 10, right: 20, bottom: 20, left: 60});
    var duration = 250;

    var lineOpacity = "0.25";
    var lineOpacityHover = "0.85";
    var otherLinesOpacityHover = "0.1";
    var lineStroke = "1.0px";
    var lineStrokeHover = "2.5px";

    var circleOpacity = '0.85';
    var circleOpacityOnLineHover = "0.25"
    var circleRadius = 3;
    var circleRadiusHover = 6;

    var svg = d3.select(selector)
      .append("svg")
        .attr("width",  width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");
   

    // group the data: I want to draw one line per group
    var sumstat = d3.nest() // nest function allows to group the calculation per level of a factor
      .key(function(d) { return d.country_name;})
      .entries(filtered_data);


  // draw chart based on the button

    d3.select(buttonGDP).on("click",function(){

      //draw GDP on axis X 

      // Add X axis
      var x = d3.scaleLinear()
        .domain(d3.extent(filtered_data,(function(d) {
            return d.xlrealgdp
       })))
        .range([0, width]);
      svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .append('text')
          .attr('text-anchor', 'end')
          .attr('fill', 'black')
          .attr('font-size', '12px')
          .attr('font-weight', 'bold')
          .attr('x', width - margin.right)
          .attr('y', -10)
          .text('GDP');

     //.call(d3.axisBottom(xScale).ticks(5))

      // Add Y axis
      var y = d3.scaleLog()
        .domain([10, d3.max(filtered_data, function(d) {
            return d.cellphone
       })])
        .range([height,0]);
      svg.append("g")
        .call(d3.axisLeft(y).ticks(10,"~s"))
        .append('text')
            .attr('transform', `translate(20, ${margin.top}) rotate(-90)`)
            .attr('text-anchor', 'end')
            .attr('fill', 'black')
            .attr('font-size', '12px')
            .attr('font-weight', 'bold')
            .text("Cellphone");

      // color palette
      var res = sumstat.map(function(d){ return d.key }) // list of group names
      var color = d3.scaleOrdinal()
        .domain(res)
        .range(['#e41a1c','#377eb8','#4daf4a','#984ea3','#ff7f00','#ffff33','#a65628'])

    // Draw the line
      svg.selectAll(".line")
          .data(sumstat)
          .enter()                     
          .append("path")
            .attr("fill", "none")
            .attr("stroke", function(d){ return color(d.key) })
            //.attr("stroke-width", 1.5)
            .attr("d", function(d){
              return d3.line()
                .x(function(d) { return x(d.xlrealgdp); })
                .y(function(d) { return y(d.cellphone); })
                (d.values)
                })
            .style('opacity', lineOpacity)
            .on("mouseover", function(d) {
                d3.selectAll('.line')
                  .style('opacity', otherLinesOpacityHover);
                d3.select(this)
                  .style('opacity', lineOpacityHover)
                  .style("stroke-width", lineStrokeHover)
                  .style("cursor", "pointer");                     
              })
            .on("mouseout", function(d) {
                d3.selectAll(".line")
                  .style('opacity', lineOpacity);
                d3.select(this)
                  .style("stroke-width", lineStroke)
                  .style("cursor", "none");
              })
    });
            // .on("mouseover", function(d, i) {
            //     svg.append("text")
            //       .attr("class", "title-text")
            //       //.style("fill", "none" })        
            //       .text(d.country_name)
            //       .attr("text-anchor", "middle")
            //       //.attr("x", (width-margin)/2)
            //       //.attr("y", 5);
            //   })
            // .on("mouseout", function(d) {
            //     svg.select(".title-text").remove();
            //   })





    //---------------------//

    d3.select(buttonYEAR).on("click",function(){

      //draw YEAR on axis X 

      var x = d3.scaleLinear()
        .domain(d3.extent(filtered_data,(function(d) {
            return d.year
       })))
        .range([0, width]);
      svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).ticks(10));

      //.call(d3.axisBottom(xScale).ticks(5))

      // Add Y axis

      var y = d3.scaleLog()
        .domain([10, d3.max(filtered_data, function(d) {
            return d.cellphone
       })])
        .range([height,0]);

      svg.append("g")
        .call(d3.axisLeft(y).ticks(10,"~s"));


      // color palette
      var res = sumstat.map(function(d){ return d.key }) // list of group names
      var color = d3.scaleOrdinal()
        .domain(res)
        .range(['#e41a1c','#377eb8','#4daf4a','#984ea3','#ff7f00','#ffff33','#a65628'])

    // Draw the line
      svg.selectAll(".line")
          .data(sumstat)
          .enter()
          .append("path")
            .attr("fill", "none")
            .attr("stroke", function(d){ return color(d.key) })
            .attr("stroke-width", 1.5)
            .attr("d", function(d){
              return d3.line()
                .x(function(d) { return x(d.year); })
                .y(function(d) { return y(d.cellphone); })
                (d.values)
          })
      



    });





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




  





  