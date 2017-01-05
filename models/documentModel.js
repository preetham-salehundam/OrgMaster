var mongoose = require('mongoose');
Schema = mongoose.Schema;

 var excelDataSchema = mongoose.Schema({
        exceldata  : String,
        excelOwner : String,
        dateUploaded : Date,
        lastUpdatedBy : String,
        lastUpdatedDate : Date,
        fileName:String
    });
mongoose.model('excelData', excelDataSchema);