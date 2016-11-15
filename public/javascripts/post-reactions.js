var width = 500,
    height = 350,
    radius = Math.min(width, height) / 2;

// Color of each reaction
var reactionColor = d3.scale.ordinal()
    // red (angry), yellow (haha), pink (love), blue (sad), green (wow)
    .range(['#CE0000', '#EFE015', '#F95AD9', '#3378ED', '#02CD09']);
 
// Definition of the arc of the "donuts"
var arc = d3.svg.arc()
    .innerRadius(radius - 100)
    .outerRadius(radius - 40);

var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d; });

// Header section, to print the post message
var header = d3.select("body").append("h2")

// Global content creation
var globalContent = d3.select("body").append("section")
        .attr("class", "global-content");

// JSON for reactions on the post
d3.json('/api/post/'+post[0].id, function(error, data) {
    if (error) throw error;
    // Post date + message print in header
    var postMessage = data[0].message;
    var postDate = toDateFormat(data[0].date);
    var message = header.text(postDate + " - " + postMessage);
   
    // Storage of all reactions of the post
    const reactions = {
        angry: data[0].angry,
        haha: data[0].haha,
        love: data[0].love,
        sad: data[0].sad,
        wow: data[0].wow,
    };

    // for (let key in reactions) {
    //     console.log(reactions[key]);
    // }

    // Creation of an array with the values corresponding to the number of each reaction
    let reactionValues = new Array();
    // Put some values in the array
    for (let key in reactions) {
        if (reactions.hasOwnProperty(key)) {
            reactionValues.push(reactions[key]);
        }
    }
    
    // Reactions content creation (for its donuts + legends)
    var reactionsContent = globalContent.append("div")
            .attr("class", "reactions-content");

    // Div to put the color code of reactions
    var reactionsCode = reactionsContent.append("div")
        .attr("class", "reactions-code");

    // Append of all color code for each reaction
    reactionsCode.append("p")
        .text("love: " + reactions.love)
        .style("color", "#F95AD9");
    reactionsCode.append("p")
        .text("wow: " + reactions.wow)
        .style("color", "#02CD09");
    reactionsCode.append("p")
        .text("haha: " + reactions.haha)
        .style("color", "#EFE015");
    reactionsCode.append("p")
        .text("sad: " + reactions.sad)
        .style("color", "#3378ED");
    reactionsCode.append("p")
        .text("angry: " + reactions.angry)
        .style("color", "#CE0000");

    // Creation of the global SVG for reactions
    var svg = reactionsContent.append("svg")
            .attr("width", width)
            .attr("height", height)
        .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    // Creation of the reactions donut
    let g = svg.selectAll(".arc")
        .data(pie(reactionValues))
        .enter().append("g")
            .attr("class", "arc");
    
    // Creation of each part of the donut with the corresponding background color
    g.append("path")
        .attr("d", arc)
        .style("fill", function(d, i) { return reactionColor(i); });
        
});

// JSON pour les réaction dans les commentaires du post
d3.json('/api/post/'+post[0].id, function(error, data) {
    if (error) throw error;

    // To avoid to rewrite this too much
    let dataComments = data[0].comments.data;

    // Initializing of sentiments sums
    let sumPos = 0;
    let sumNeutral = 0;
    let sumNeg = 0;
    
    // Incrementation of sentiments sums
    for (let i = 0; i < dataComments.length; i++) {
        if (typeof dataComments[i].sentiments === 'undefined') {
            return;
        }
        sumPos += dataComments[i].sentiments.pos;
        sumNeutral += dataComments[i].sentiments.neutral;
        sumNeg += dataComments[i].sentiments.neg;
    }
    
    const sentiments = {
        pos: sumPos,
        neutral: sumNeutral,
        neg: sumNeg,
    }

    // for (let key in sentiments) {
    //     console.log(sentiments[key]);
    // }
     
    // Creation of an array with the values corresponding to the number of each sentiment
    let sentimentValues = new Array();
    // Put some values in the array
    for (let key in sentiments) {
        if (sentiments.hasOwnProperty(key)) {
            sentimentValues.push(sentiments[key]);
        }
    }

    // Color of each sentiment
    var sentimentColor = d3.scale.ordinal()
        // green (pos), yellow (neutral), red (neg)
        .range(['#02CD09', '#EFE015', '#CE0000']);

    // Sentiments content creation (for its donut + legends)
    var sentimentsContent = globalContent.append("div")
            .attr("class", "sentiments-content");

    // Div to put the color code of sentiments
    var sentimentsCode = sentimentsContent.append("div")
        .attr("class", "sentiments-code");

    // Append of all color code for each sentiment
    let totalSum = sentiments.pos + sentiments.neutral + sentiments.neg;
    let pcPos = Math.round(sentiments.pos / totalSum * 100 * 100) / 100;
    let pcNeutral = Math.round(sentiments.neutral / totalSum * 100 * 100) / 100;
    let pcNeg = Math.round(sentiments.neg / totalSum * 100 * 100) / 100;

    sentimentsCode.append("p")
        .text("positive: " + pcPos + "%")
        .style("color", "#02CD09");

    sentimentsCode.append("p")
        .text("neutral: " + pcNeutral + "%")
        .style("color", "#EFE015");

    sentimentsCode.append("p")
        .text("negative: " + pcNeg + "%")
        .style("color", "#CE0000");

    var svg2 = sentimentsContent.append("svg")
            .attr("width", width)
            .attr("height", height)
        .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    // Creation of the sentiments donut
    let g = svg2.selectAll(".arc")
        .data(pie(sentimentValues))
        .enter().append("g")
            .attr("class", "arc");

    // Creation of each part of the donut with the corresponding background color
    g.append("path")
        .attr("d", arc)
        .style("fill", function(d, i) { return sentimentColor(i); });
});

// Function for the date parsing
function toDateFormat(date) {
    let formatedString = date.split('T');
    let formatedDate = formatedString[0].split('-');
    let formatedTime = formatedString[1].split('+');

    let newDate = formatedDate[2] + '-' + formatedDate[1] + '-' + formatedDate[0];

    return newDate + ' at ' + formatedTime[0];
}
