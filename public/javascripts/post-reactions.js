var width = 500,
    height = 350,
    radius = Math.min(width, height) / 2;

var color = d3.scale.ordinal()
    // Rouge (angry), jaune (haha), rose(love), bleu(sad), vert (wow)
    .range(['#CE0000', '#EFE015', '#F95AD9', '#3378ED', '#02CD09']);

    
var arc = d3.svg.arc()
    .innerRadius(radius - 100)
    .outerRadius(radius - 40);

var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d; });

var content = d3.select("body").append("div")
        .attr("class", "content")

var code = content.append("div")
        .attr("class", "code");

code.append("p")
        .text("love")
        .style("color", "#F95AD9")
code.append("p")
        .text("wow")
        .style("color", "#02CD09")
code.append("p")
        .text("haha")
        .style("color", "#EFE015")
code.append("p")
        .text("sad")
        .style("color", "#3378ED")
code.append("p")
        .text("angry")
        .style("color", "#CE0000");

var svg = content.append("svg")
        .attr("width", width)
        .attr("height", height)
    .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

d3.json("sample/reactions", function(error, data) {
    if (error) throw error;

    console.log(data);
    
    const reactions = {
        angry: data[0].angry,
        haha: data[0].haha,
        love: data[0].love,
        sad: data[0].sad,
        wow: data[0].wow,
    };

    for (let key in reactions) {
        console.log(reactions[key]);
    }

    var values = new Array();
    for (let key in reactions) {
        if (reactions.hasOwnProperty(key)) {
            values.push(reactions[key]);
        }
    }
    
    var g = svg.selectAll(".arc")
        .data(pie(values))
        .enter().append("g")
            .attr("class", "arc");

    g.append("path")
        .attr("d", arc)
        .style("fill", function(d, i) { return color(i); });
        
});
