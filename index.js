var read = require('node-read');

read('http://toutiao.com/a6213926716847931650/', function(err, article, res) {

  // Main Article.
  console.log(article.content);

  // Title
  console.log(article.title);

  // HTML 
  //console.log(article.html);

  // DOM
  //console.log(article.dom);

});