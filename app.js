/**
 * Created by leven on 15/11/6.
 */
    var express=require("express")
var app=express()
app.use(function (req, res, next) {
    console.log('Time:', Date.now());
    next();
});
app.get("/",function(req,res){
    data=["afsd","asdf"]
    return res.send(data)
})
app.listen(9999,function(){
    console.log("server runing")
})