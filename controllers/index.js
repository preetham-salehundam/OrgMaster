var excel2Json = require('node-excel-to-json');
var fs = require('fs');
 mongoose = require('mongoose');
var json2xls = require('json2xls');
var excelUtils = require('./excelUtils.js');
var express = require('express');
var Promise = require('node-promise').Promise;
var defer = require("node-promise").defer;
var Excel = require('exceljs');
var app = express();
var dbOps=require('./databaseOps')
require('../models/documentModel');

require('./routes')(app);
require('./fileUploadUtils');

try {

    mongoose.connect('mongodb://localhost/test');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'))
    db.once('open', function () {
        console.log("conn successfull");
    })

    //var documentModel=mongoose.model('excelData');
    // var relFilePath = "../../../public/assests/excelStore/Workbook1.xls";

    // var completeConversion = excelUtils.startConversion(relFilePath);
    // console.log("completeConversion");
    // console.log(completeConversion);

    // //dbOps.saveDoctoDb(completeConversion);


    // documentModel.find({ _id: "586a1fe5efaa9d197083a275" }, function (err, data) {
    //     if (err) {
    //         return console.error(err);
    //     } else {
    //         console.log("fetchedData : " + data);
    //         for (var i in data) {
    //             console.log("+++++")
    //             console.log(data[i].exceldata);
    //             var dataObj = JSON.parse(data[i].exceldata);
    //             console.log(dataObj["Sheet1"][0]);
    //              var xls = json2xls(dataObj["Sheet1"]);
    //             fs.writeFileSync('data.xlsx', xls, 'binary');

    //             console.log("------")
    //         }
    //        // process.exit(0);
    //     }
    // })

    // console.log(excel2Json);

} catch (e) {
    console.error(e);
    //process.exit(0);
}
app.listen(3000);

console.log('Listening on port 3000...');