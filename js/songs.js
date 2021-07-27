const topRockSongs = [
   { artist: "Fleetwod Mac", title: "Dreams", sales_and_streams: 1882000 },
   { artist: "AJR", title: "Bang!", sales_and_streams: 1627000 },
   { artist: "Imagine Dragons", title: "Believer", sales_and_streams: 1571000 },
   { artist: "Journey", title: "Don't Stop Believin'", sales_and_streams: 1497000 },
   { artist: "Eagles", title: "Hotel California", sales_and_streams: 1393000 }
];

const topSongsSection = d3.select("#top-songs").append("h3").text("Top Rock Songs")

// Chart dimensions
const chartWidth = 500;
const chartHeight = 130;

const circlesChart = topSongsSection.append("svg")
.attr('width', chartWidth)
.attr('height', chartHeight);


// Add scale
const maxRadius = 32

const circleScale = d3.scaleLinear()
.domain(d3.extent(topRockSongs.map(d=> d.sales_and_streams)))
.range([(maxRadius/4*3)**2,maxRadius**2])
console.log(circleScale(1882000))

// Add mid-line
circlesChart.append("line")
.attr('x1', 0)
.attr('y1', chartHeight/2)
.attr('x2', chartWidth)
.attr('y2', chartHeight/2)
.attr('stroke-width', 2)
.attr('stroke', '#333')

// Add circles
let circlesChartGroup = circlesChart.selectAll("g").data(topRockSongs).join("g")


circlesChartGroup.append("circle")
.attr("cx",(d,i)=> 10 + maxRadius + i * 2 * (maxRadius+20))
.attr("cy",chartHeight/2)
.attr("r", d => Math.sqrt(circleScale(d.sales_and_streams)))
.attr("fill", '#A0CFD3')

circlesChartGroup.append("text")
.attr('class','label label-value')
.attr("x",(d,i)=> 10 + maxRadius + i * 2 * (maxRadius+20))
.attr("y", maxRadius*.8)
.text(d => d3.format(".2f")(d.sales_and_streams/1000000) + 'M')
.style("text-anchor", "middle")

circlesChartGroup.append("text")
.attr('class','label label-title')
.attr("x",(d,i)=> 10 + maxRadius + i * 2 * (maxRadius+20))
.attr("y", 3.5*maxRadius)
.text(d => d.title)
.style("text-anchor", "middle")
