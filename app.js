/**
 * Created by leven on 15/11/6.
 */
var express=require("express")
var app=express()
var AV = require('avoscloud-sdk'); 
 var read = require('node-read');
 var request = require('request');
var EventProxy = require('eventproxy');
AV.initialize('bX5lMtnHXB9tOoKbFeh4apKu', 'csM77O8ju8uN8sNR5PvagCNw');

// var ep = new EventProxy();
// ep.after('read_after', function (article) {
//   	 console.log(article.display_url)
// 	 		// 	read(article.display_url, function(err, cc, res) {
	 				 
	 				 
// 				// 	   //article.html=cc.content;
// 				// 	 article.save();
// 				// })
	   
// });

var ep = EventProxy.create('article',   function (article) {
  // TODO
   console.log(article.display_url)
});
var cate=["__all__","news_society", "news_tech", "news_sports", "news_finance", "news_military", "news_world", "news_game", "news_travel", "news_history", "news_food", "news_baby", "news_regimen", "news_story", "news_essay", "news_discovery", "news_fashion", "news_car", "news_entertainment", "news_hot",
]
 

app.use(function (req, res, next) {
    console.log('Time:', Date.now());
    next();
});
 var Article = AV.Object.extend("article");
app.get("/",function(req,res){
    

   data=[];
    return res.send(data)
})
var spide=function(cate){
var Baseurl = "http://toutiao.com/api/article/recent/?source=2&count=20&category="+cate
console.log(Baseurl)
request(Baseurl, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	    var data = JSON.parse(body);
	    data=data.data
	   
	    for(var i=0;i<data.length;i++){
	    	 var o=data[i]
	    	 var b={
	    	 	"abstract":o.abstract,
	    	 	"img_list":o.img_list,
	    	 	"datatime":o.datatime,
	    	 	"keywords":o.keywords,
	    	 	"display_url":o.display_url,
	    	 	"title":o.title,
	    	 	"data":o

	    	 }
	    	
	    	readablity(b)
	    	 
	    	 
	    	
	    	//console.log("Got a response: ", article);
	    	//article.extend(data[i])
	    	
	    }
	     //console.log("Got a response: ", data[2]);
	    
		    
		   
	  } else {
	    console.log("Got an error: ", error, ", status code: ", response.statusCode);
	  }
	});

}
var readablity=function(b){
	console.log(b.display_url)
			read(b.display_url, function(err, cc, res) {
	 				 
	 				 if(cc){
	 				 	 b.html=cc.content;
						 var article=  Article.new(b);
						 console.log(b.title)
						article.save(); 
	 				 }
					 
				})
}
var main=function(){
	for(var i=0;i<cate.length;i++){
		 
		spide(cate[i])
	}
}
main();
 
// app.listen(9999,function(){
//     console.log("server runing")
// })