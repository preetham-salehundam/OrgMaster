var excel2Json = require('node-excel-to-json');
var fs = require('fs');
var mongoose = require('mongoose');
var json2xls = require('json2xls');
// var excelUtils = require('./excelUtils.js');
var express = require('express');
var Promise = require('node-promise').Promise;
var defer = require("node-promise").defer;
var Excel = require('exceljs');
//var convertExcel = require('excel-as-json').processFile;
var app = express();

var workbook = new Excel.Workbook();
// workbook.xlsx.readFile('./Workbook1.xlsx').then(function(){
//    // console.log(workbook._worksheets[1]._rows[0]._worksheet);
//    // console.log(workbook._worksheets[1]);
// })


// console.log(convertExcel('./Workbook1.xlsx',null,true));