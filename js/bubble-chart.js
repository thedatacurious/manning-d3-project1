const metrics = ['total_album_consumption_millions', 'album_sales_millions', 'song_sales', 'on_demand_audio_streams_millions', 'on_demand_video_streams_millions'];
let artists = [];
// let data = [];
d3.csv('../data/top_albums.csv').then(d => {
  createBubbleChart(d);
})

function createBubbleChart(data){
   // data.push(data)
   data.forEach(datum => {
         metrics.forEach(metric => {
            datum[metric] = parseFloat(datum[metric]); // Convert strings to numbers
         });
       })
   artists.push(data.artist)
   console.log(data)

//// Chart dimensions
let dimensions = {
    width:  window.innerWidth * 0.9,
    height: 400,
    margin: {
      top: 10,
      right: 10,
      bottom: 50,
      left: 50,
    },
  }
  dimensions.boundedWidth = dimensions.width
    - dimensions.margin.left
    - dimensions.margin.right
  dimensions.boundedHeight = dimensions.height
    - dimensions.margin.top
    - dimensions.margin.bottom

const wrapper = d3.select('#bubble-chart')
.append('svg')
.attr('width', dimensions.width)
.attr('height', dimensions.height)

const bubbleChart = wrapper.append("g")
.style("transform", `translate(${dimensions.margin.left}px,${dimensions.margin.top}px)`)

//// Add scales

// For x-axis
const audioStreamsScale = d3.scaleLinear()
.domain([0,d3.max(data.map(d=> d.on_demand_audio_streams_millions))])
.range([0,dimensions.boundedWidth])


// For y-axis
const videoStreamsScale = d3.scaleLinear()
.domain([0,d3.max(data.map(d=> d.on_demand_video_streams_millions))*1.5])
.range([dimensions.boundedHeight,0])

// For bubble size
const maxRadius = 20

const bubblesAreaScale = d3.scaleLinear()
.domain([0,d3.max(data.map(d=> d.album_sales_millions))])
.range([(maxRadius/2)**2,maxRadius**2])

// For color of bubbles
const colorScale = d3.scaleOrdinal()
.domain(artists)
.range(d3.schemeTableau10)

//// Add axes
const xAxisGenerator = d3.axisBottom().scale(audioStreamsScale)

const xAxis = bubbleChart.append("g")
.style("transform", `translateY(${dimensions.boundedHeight}px)`)
.call(xAxisGenerator)

xAxis.append("text")
.attr("x", dimensions.boundedWidth/2)
.attr("y", (dimensions.margin.bottom *0.8))
.style("fill", "#aaa")
.attr("class", "label label-title")
.text("On-demand Audio Streams (millions)")

const yAxisGenerator = d3.axisLeft().scale(videoStreamsScale)

const yAxis = bubbleChart.append("g")
.call(yAxisGenerator)

yAxis.append("text")
.attr("x", 5)
.attr("y", 0)
.style("fill", "#aaa")
.attr("class", "label label-title")
.text("On-demand Video Streams (millions)")
.style("text-anchor", "start")

// Draw bubbles
bubbleChart.selectAll("circle")
.data(data)
.join("circle")
.attr("cx", d => audioStreamsScale(d.on_demand_audio_streams_millions))
.attr("cy", d => videoStreamsScale(d.on_demand_video_streams_millions))
.attr("r",  d => Math.sqrt(bubblesAreaScale(d.album_sales_millions)))
.style("fill", d => colorScale(d.artist))

console.log(data)

var colorLegend = d3.select("div.legend-color")

var entries = colorLegend.append('ul')
.selectAll('li')
.data(data)
.join('li')

entries.append('span')
.attr("class","legend-circle")
.style("background-color", d => colorScale(d.artist))

entries.append('span')
.attr("class", "label label-value")
.html(d => d.artist)









d3.select(".legend-area")
.append('svg')
.attr('width', dimensions.width/2)
.attr('height', dimensions.height/2)
}
