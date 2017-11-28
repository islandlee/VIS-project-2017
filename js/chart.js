function drawChart(dataset) {    
    //画布大小
    var width = 800;
    var height = 400;

    //在 body 里添加一个 SVG 画布   
    var chart = d3.select("#charts")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("class", "hidden");

    //画布周边的空白
    var padding = {left:30, right:30, top:20, bottom:20};
        
    //x轴的比例尺
    var xScale = d3.scale.ordinal()
        .domain(d3.range(1997, 2017))
        .rangeRoundBands([0, width - padding.left - padding.right]);
    //y轴的比例尺
    var yScale = d3.scale.linear()
        .domain([0,d3.max(dataset)])
        .range([height - padding.top - padding.bottom, 0]);

    //定义x轴
    var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom")
        .ticks(20)
        .tickValues(d3.range(1997,2017));
        
    //定义y轴
    var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left");

    //矩形之间的空白
    var rectPadding = 4;

    //添加矩形元素
    var rects = chart.selectAll(".MyRect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("class","MyRect")
        .attr("transform","translate(" + padding.left + "," + padding.top + ")")
        .attr("x", function(d,i){
            return xScale(i) + rectPadding/2;
        } )
        .attr("y",function(d){
            return yScale(d);
        })
        .attr("width", xScale.rangeBand() - rectPadding )
        .attr("height", function(d){
            return height - padding.top - padding.bottom - yScale(d);
        });

    //添加文字元素
    var texts = chart.selectAll(".MyText")
        .data(dataset)
        .enter()
        .append("text")
        .attr("class","MyText")
        .attr("transform","translate(" + padding.left + "," + padding.top + ")")
        .attr("x", function(d,i){
            return xScale(i+1997) + rectPadding/2;
        } )
        .attr("y",function(d){
            return yScale(d);
        })
        .attr("dx",function(){
            return (xScale.rangeBand() - rectPadding)/2;
        })
        .attr("dy",function(d){
            return 20;
        })
        .text(function(d){
            return d;
        });

    //添加x轴
    chart.append("g")
        .attr("class","axis")
        .attr("transform","translate(" + padding.left + "," + (height - padding.bottom) + ")")
        .call(xAxis); 
        
    //添加y轴
    chart.append("g")
        .attr("class","axis")
        .attr("transform","translate(" + padding.left + "," + padding.top + ")")
        .call(yAxis);

    return chart;
}