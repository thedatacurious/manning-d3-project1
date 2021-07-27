const topRockAlbums = [{
    artist: "Queen",
    title: "Greatest Hits",
    eq_albums: 929000
  },
  {
    artist: "Elton John",
    title: "Diamonds",
    eq_albums: 743000
  },
  {
    artist: "Fleetwood Mac",
    title: "Rumours",
    eq_albums: 721000
  },
  {
    artist: "CCR",
    title: "The 20 Greatest Hits",
    eq_albums: 630000
  },
  {
    artist: "Journey",
    title: "Journey's Greatest Hits",
    eq_albums: 561000
  }
];

const topAlbumsSection = d3.select('#top-albums');

topAlbumsSection.append('h3').text('Top Rock Albums')

// Chart dimensions

const barChartWidth = 500;
const barChartHeight = 130;
const barChart = topAlbumsSection.append('svg')
  .attr('viewbox', [0, 0, barChartWidth, barChartHeight])
  .attr('width', barChartWidth)
  .attr('height', barChartHeight);

const marginLeft = 200;
barChart.append('line').attr('x1', marginLeft).attr('y1', 0).attr('x2', marginLeft).attr('y2', barChartHeight).attr('stroke', '#333').attr('stroke-width', 2);
const barThickness = 20;
const barMargin = 5;

// Add scale
const barLengthScale = d3.scaleLinear().domain([0,1000000]).range([0,barChartWidth-marginLeft-100])


// Add bars
barChart.selectAll('rect').data(topRockAlbums).join('rect')
.attr('width', d =>
{console.log(d);
return barLengthScale(d.eq_albums)})
.attr('height',barThickness)
.attr('x', marginLeft + 1)
.attr('y', (d,i)=> barMargin + (barMargin + barThickness)*i)
.attr('fill', '#a6d854')

// Add labels
barChart.selectAll('.label-value')
.data(topRockAlbums)
.join('text')
.attr('class','label label-value')
.attr('x', d => marginLeft + 5 + barLengthScale(d.eq_albums))
.attr('y', (d,i)=> barThickness + (barMargin + barThickness)*i)
.text(d => d3.format(".2f")(d.eq_albums/1000000) + 'M')

barChart.selectAll('.label-title')
.data(topRockAlbums)
.join('text')
.attr('class','label label-title')
.attr('x', marginLeft - 5)
.style('text-anchor', 'end')
.attr('y', (d,i)=> barThickness + (barMargin + barThickness)*i)
.text(d => d.artist + ', ' + d.title);
