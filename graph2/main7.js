
//--------Adding functionality to the buttons ---------------------//

function turnOnGDP(number){
  console.log("turnOnGDP");
  var svgStyle1 = document.getElementById("svg"+ number +"GDP").getAttribute("display");
  var svgStyle2 = document.getElementById("svg"+ number +"YEAR").getAttribute("display");

  //console.log(svgStyle1);
  //console.log(svgStyle2);

  if (svgStyle1 == "none"){
      document.getElementById("svg"+ number +"GDP").setAttribute("display", "block");
      document.getElementById("svg"+ number +"YEAR").setAttribute("display", "none");
  }
}

function turnOnYEAR(number){
  console.log("turnOnYEAR");
  var svgStyle1 = document.getElementById("svg"+ number +"GDP").getAttribute("display");
  var svgStyle2 = document.getElementById("svg"+ number +"YEAR").getAttribute("display");

  //console.log(svgStyle1);
  //console.log(svgStyle2);

  if (svgStyle2 == "none"){
      document.getElementById("svg"+ number +"GDP").setAttribute("display", "none");
      document.getElementById("svg"+ number +"YEAR").setAttribute("display", "block");
  }
}

//--------Parsing Data ---------------------//
var dataset = d3.dsv(",", "Historical_Agg_Cleaned.csv", function(d) {
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
  const dataEvent_2 = data.filter((d,i) => d.year >= 1920 && d.year <= 2000 && viz_countries.indexOf(d.country_name) >=0)
  const dataEvent_1 = data.filter((d,i) => d.year >= 1876 && d.year <= 2000 && viz_countries.indexOf(d.country_name) >=0)
  const dataEvent_3 = data.filter((d,i) => d.year >= 1980 && d.year <= 2000 && viz_countries.indexOf(d.country_name) >=0)
  const dataEvent_4 = data.filter((d,i) => d.year >= 1990 && d.year <= 2000 && viz_countries.indexOf(d.country_name) >=0)
  const dataEvent_5 = data.filter((d,i) => d.year >= 1960 && d.year <= 2000 && viz_countries.indexOf(d.country_name) >=0)
  const dataEvent_6 = data.filter((d,i) => d.year >= 1992 && viz_countries.indexOf(d.country_name) >=0)
  console.log(dataEvent_1);
  console.log(dataEvent_2);
  console.log(dataEvent_3);
  console.log(dataEvent_4);
  console.log(dataEvent_5);
  console.log(dataEvent_6);

//------calling the function to create multiple charts per div id ------//

  draw("#svg1",dataEvent_1);
  draw("#svg2",dataEvent_2);
  draw("#svg3",dataEvent_3);
  draw("#svg4",dataEvent_4);
  draw("#svg5",dataEvent_5);
  draw("#svg6",dataEvent_6);

  //Function for adding multiple linecharts based on dom element== selector, and the dataset that we want to visualize

  function draw(selector,dataEvents){

    // Setting up variables that describe our chart's space.
    var filtered_data = dataEvents;
    var margin = {top: 10, right: 30, bottom: 30, left: 60},
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    // Variables for hovering on the lines 
    var lineOpacity = "0.25";
    var lineOpacityHover = "0.85";
    var otherLinesOpacityHover = "0.1";
    var lineStroke = "1.0px";
    var lineStrokeHover = "2.5px";

    // group the data by country : I want to draw one line per group
    var sumstat = d3.nest() // nest function allows to group the calculation per level of a factor
      .key(function(d) { return d.country_name;})
      .entries(filtered_data);

    // color palette
    var res = sumstat.map(function(d){ return d.key }) // list of group names
    var color = d3.scaleOrdinal()
      .domain(res)
      .range(['#e41a1c','#377eb8','#4daf4a','#984ea3','#ff7f00','#ffff33','#a65628'])

//------------ GDP CHART ------------------------------------//

    var svgGDP = d3.select(selector)
      .append("svg")
        .attr("id",selector.slice(1)+"GDP")
        .attr("display","block")
        .attr("width",  width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");
         
    // Add X axis
      var x = d3.scaleLinear()
        .domain(d3.extent(filtered_data,(function(d) {
            return d.xlrealgdp
       })))
        .range([0, width]);
      svgGDP.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .append('text')
          .attr('text-anchor', 'end')
          .attr('fill', 'white')
          .attr('font-size', '12px')
          .attr('font-weight', 'bold')
          .attr('x', width - margin.right)
          .attr('y', -10)
          .text('GDP');
    
    // Add Y axis
      var y = d3.scaleLog()
        .domain([10, d3.max(filtered_data, function(d) {            
                if (filtered_data == dataEvent_1){
                   {return d.telephone}
                }else if (filtered_data == dataEvent_2){
                  { return d.radio}
                }else if (filtered_data == dataEvent_3){
                  { return d.cellphone}
                }else if (filtered_data == dataEvent_4){
                  { return d.internetuser}
                }else if (filtered_data == dataEvent_5){
                  { return d.xlPopulation}
                }else if (filtered_data == dataEvent_5){
                  { return d.internetuser}
                };})])
        .range([height,0]);
      svgGDP.append("g")
        .call(d3.axisLeft(y).ticks(10,"~s"))
        .append('text')
            .attr('transform', `translate(20, ${margin.top}) rotate(-90)`)
            .attr('text-anchor', 'end')
            .attr('fill', 'white')
            .attr('font-size', '12px')
            .attr('font-weight', 'bold')
            .text(function(d) {            
                if (filtered_data == dataEvent_1){
                   {return "Telephone"}
                }else if (filtered_data == dataEvent_2){
                  { return "Radio"}
                }else if (filtered_data == dataEvent_3){
                  { return "Cellphone"}
                }else if (filtered_data == dataEvent_4){
                  { return "Internet Users"}
                }else if (filtered_data == dataEvent_5){
                  { return "Population"}
                }else if (filtered_data == dataEvent_5){
                  { return "Internet Users"}
                };}); 

    //----------GDP Lines -----------------------------//
    // Draw the lines
      svgGDP.selectAll(".line")
          .data(sumstat)
          .enter()                     
          .append("path")
            .attr("fill", "none")
            .attr("stroke", function(d){ return color(d.key) })
            //.attr("stroke-width", 1.5)
            .attr("d", function(d){
              return d3.line()
                .x(function(d) { return x(d.xlrealgdp); })
                .y(function(d) {
                  if (filtered_data == dataEvent_1){
                     {return y(d.telephone)}
                  }else if (filtered_data == dataEvent_2){
                    { return y(d.radio)}
                  }else if (filtered_data == dataEvent_3){
                    { return y(d.cellphone)}
                  }else if (filtered_data == dataEvent_4){
                    { return y(d.internetuser)}
                  }else if (filtered_data == dataEvent_5){
                    { return y(d.xlPopulation);}
                  }else if (filtered_data == dataEvent_5){
                    { return y(d.internetuser)}
                  };})
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

//--------------------YEAR CHART --------------------------------------------//

    var svgYEAR = d3.select(selector)
      .append("svg")
        .attr("id", selector.slice(1)+"YEAR")
        .attr("display","none")
        .attr("width",  width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

      //Add X axis
      var x = d3.scaleLinear()
        .domain(d3.extent(filtered_data,(function(d) {
            return d.year
       })))
        .range([0, width]);
     svgYEAR.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .append('text')
          .attr('text-anchor', 'end')
          .attr('fill', 'white')
          .attr('font-size', '12px')
          .attr('font-weight', 'bold')
          .attr('x', width - margin.right)
          .attr('y', -10)
          .text('YEAR');

        // Add Y axis
        var y = d3.scaleLog()
          .domain([10, d3.max(filtered_data, function(d) {            
                  if (filtered_data == dataEvent_1){
                     {return d.telephone}
                  }else if (filtered_data == dataEvent_2){
                    { return d.radio}
                  }else if (filtered_data == dataEvent_3){
                    { return d.cellphone}
                  }else if (filtered_data == dataEvent_4){
                    { return d.internetuser}
                  }else if (filtered_data == dataEvent_5){
                    { return d.xlPopulation}
                  }else if (filtered_data == dataEvent_5){
                    { return d.internetuser}
                  };})])
          .range([height,0]);
        svgYEAR.append("g")
          .call(d3.axisLeft(y).ticks(10,"~s"))
          .append('text')
              .attr('transform', `translate(20, ${margin.top}) rotate(-90)`)
              .attr('text-anchor', 'end')
              .attr('fill', 'white')
              .attr('font-size', '12px')
              .attr('font-weight', 'bold')
              .text(function(d) {            
                  if (filtered_data == dataEvent_1){
                     {return "Telephone"}
                  }else if (filtered_data == dataEvent_2){
                    { return "Radio"}
                  }else if (filtered_data == dataEvent_3){
                    { return "Cellphone"}
                  }else if (filtered_data == dataEvent_4){
                    { return "Internet Users"}
                  }else if (filtered_data == dataEvent_5){
                    { return "Population"}
                  }else if (filtered_data == dataEvent_5){
                    { return "Internet Users"}
                  };});    

    //----------LINES -----------------------------//
    // Draw the lines
      svgYEAR.selectAll(".line")
        .data(sumstat)
        .enter()                     
        .append("path")
          .attr("fill", "none")
          .attr("stroke", function(d){ return color(d.key) })
          //.attr("stroke-width", 1.5)
          .attr("d", function(d){
            return d3.line()
              .x(function(d) { return x(d.year); })
              
              .y(function(d) {
                  if (filtered_data == dataEvent_1){
                     {return y(d.telephone)}
                  }else if (filtered_data == dataEvent_2){
                    { return y(d.radio)}
                  }else if (filtered_data == dataEvent_3){
                    { return y(d.cellphone)}
                  }else if (filtered_data == dataEvent_4){
                    { return y(d.internetuser)}
                  }else if (filtered_data == dataEvent_5){
                    { return y(d.xlPopulation);}
                  }else if (filtered_data == dataEvent_5){
                    { return y(d.internetuser)}
                  };})
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
  }

  });




  





  