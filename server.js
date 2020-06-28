var express = require("express");
var jsonparser = require("body-parser");
var mongoDB = require("mongodb").MongoClient;
var ObjectId =require("mongodb").ObjectId;
var app = express();

// app.get("/hello",function(req,res){
//     req => Request
//     res => Response
//     res.send({message:"hello"});
// });

app.use(jsonparser.json());
app.use(jsonparser.urlencoded({ extended: false }));
var cnx = (closure) => {
    mongoDB.connect(
        "mongodb://localhost:27017/crudtodo", (err, client) => {
            if (err) console.log(err);
            var db = client.db("crudtodo");
            closure(db);
        })
}
app.post("/hello", function (req, res) {

    cnx(function (db) {
        db.collection("hello").insertOne(req.body,(err, result) => {
            if(err) res.send(err);
            res.send(result);
        })
    })
})
app.delete('/delete/:_id', function (req, res) {
//   var id = req.params.id;
cnx(function (db) {
  db.collection("hello").remove({ "_id": new ObjectId(req.params.id) },(err, result) =>{
    if(err) res.send(err);
            res.send(result);   
  });
})
});
app.put('/update/:_id', function (req, res) {

cnx(function (db) {
  db.collection("hello").update({ "_id": new ObjectId(req.params._id)},{$set:req.body}, (err, result) =>{
    if(err) res.send(err);
            res.send(result);   
  });
})
});
app.get('/get/:_id', function (req, res) {
  
  cnx(function (db) {
    db.collection("hello").findOne({ "_id": new ObjectId(req.params._id)},(err, result) =>{
      if(err) res.send(err);
              res.send(result);   
    });
  })
  });
  app.get('/getall/', function (req, res) {
   
    cnx(function (db) {
      db.collection("hello").find({}).toArray((err, result) =>{
        if(err) res.send(err);
                res.send(result);   
      });
    })
    });
app.listen(3000);