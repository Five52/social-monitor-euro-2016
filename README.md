# Social Monitor Euro 2016

## Short description

This social media sentiment monitor is a Master 2 project at Université de Caen. 
In this project, the goal is to crawl a specific page posts (here [`Equipe de France de Football`](https://www.facebook.com/equipedefrance/) from the semi-finals to the finale of the Euro 2016). 
With these posts, their reactions and the 1000 first comments, we try to analyze the general feeling for a short period of time and create a clear visualization of this data. 

## Technologies
* [`API Graph`](https://developers.facebook.com/tools/explorer/) for Facebook data crawling (with the PHP SDK)
* [`MongoDB`](https://www.mongodb.com/) for the data storage
* [`NodeJS`](https://nodejs.org/en/) and [`Express`](http://expressjs.com/) for the server
* [`D3JS`](https://d3js.org/) for data vizualisation
* [`Pug`](https://pugjs.org/api/getting-started.html) (previously Jade) for html templates
* [`Text Processing`](http://text-processing.com/docs/sentiment.html) for the text analysis
