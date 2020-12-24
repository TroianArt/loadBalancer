const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const request = require('request');
const Schema = mongoose.Schema;
const Request = require('request');
const session = require('express-session');
var https = require('https');

app.use(bodyParser.urlencoded({ extended: true }));
const urlencodedParser = bodyParser.urlencoded({extended: false});

mongoose.connect("mongodb://localhost:27017/DB_task_balancer", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});
const taskScheme = new Schema({
  _id: mongoose.Types.ObjectId,
  user_id: Schema.Types.ObjectId,
  number: Number,
  power: Number,
  progress:{ type: Number, default: 0 },
  result: { type: Number, default: 0 }
});


const Task = mongoose.model("Task", taskScheme);

const serversSheme = new Schema({
  server_index: Number,
  task_id: Schema.Types.ObjectId,
  number: Number,
  power: Number,
  progress:{ type: Number, default: 0 },
  result: { type: Number, default: 0 }
});

const ServerNow= mongoose.model("Server", serversSheme);


function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}


app.post("/solve",async function (request, response) {
    let taskId= request.query.taskId;
    solve(taskId);
});

async function solve(IDtask) {
   let result=1;
   let progress_task=0;
   console.log("taskId: ", IDtask); 
    let t= await Task.findOne({ _id : IDtask.toString()});   
    if(typeof t !== 'undefined'){
          console.log(" number:",t.number," power:",t.power); 
          for (let i = 0; i < Number(t.power); i++) {
          result=result*Number(t.number);
          progress_task=progress_task+100/Number(t.power);
          t.progress=progress_task.toString();
          let ifExist= await Task.findOne({ _id : IDtask.toString()});
          if(!ifExist)break;
          if(i==Number(t.power)-1) {
            t.progress=100;
            progress_task=100;
            t.result=result;
          await Task.updateOne({ _id : IDtask.toString() }, {
          progress: progress_task,
          result: result
          }); 
          await ServerNow.updateOne({ server_index : 2 }, {
          progress: 0,
          result: 0,
          task_id:  mongoose.Types.ObjectId('1111111111111111111111a1'),
          number: 0,
          power: 0,
          }); 
          }

          else{
          await Task.updateOne({ _id : IDtask.toString() }, {
          progress: progress_task
          }); 
            await ServerNow.updateOne({ server_index : 2 }, {
          progress: progress_task,
        result: result,
        task_id: t._id,
        number: t.number,
        power: t.power,
          });
        }
          sleep(2000)        
           }
     }
     /*
     var options = {
  host: 'www.google.com',
  port: 443,
  path: '/upload',
  method: 'POST'
};
        https.request(options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
          console.log('BODY: ' + chunk);
        });
      });

      // write data to request body
      req.write('data\n');
      req.write('data\n');
      req.end();
  */
    Request.post({url: 'http://127.0.0.1:8005/finishSolve?index=2'}, (err, res, body) => {
          if(err)return res.status(500).send({message: err});
          if (res.body != "OK"){
            //console.log("res.body:",res.body,"----");
          let res_task_id=JSON.parse(res.body);
          res_task_id=res_task_id.taskId;
           //console.log("res_task_id1: ",res_task_id)
           solve(res_task_id);
         }
          });
        //response.send(200);
    //console.log("res_task_id2: ",res_task_id)
    //response.redirect("http://127.0.0.1:8001/solve?taskId="+res_task_id.toString());
}

app.listen(8003);


console.log("Server running at http://127.0.0.1:8003/");