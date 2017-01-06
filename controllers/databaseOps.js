mongoose = require('mongoose'),
require('../models/documentModel');
Promise = require('node-promise').Promise;
defer = require("node-promise").defer;
documentModel = mongoose.model('excelData');
module.exports = {
    saveDoctoDb: function (promise,Owner) {
        var self = this;
        var deferred = defer();
        promise.then(function onSuccess(parsedXldata) {
        	console.log("promise");
        	console.log(parsedXldata);
            self.persistXlData(parsedXldata,Owner).then(function (id) {
                deferred.resolve(id);
            }, function (err) {
                deferred.reject(err);
            });

        }, function onError(error) {
            console.error(error);
            deferred.reject(parsedXldata);
        })
        return deferred.promise;
    },
    persistXlData: function (parsedXlData,fileData) {
        var deferred = defer();
        try {
            if (parsedXlData) {
                var saved_data = "";
                var doc_id;
console.log("persist")
                console.log(JSON.stringify(fileData));
                saved_data = new documentModel({ exceldata: parsedXlData, dateUploaded: +new Date(),excelOwner:fileData.user_id,fileName:fileData.filename });
                saved_data.save(function (err, data) {
                    if (err) {
                        console.log(err);
                        deferred.reject(err);
                        throw err;
                    } else {
                        console.log("document with id :" + data._id + " persisted successfully");
                        doc_id = data._id;
                        //console.log(doc_id);
                        deferred.resolve(doc_id);
                    }
                })

                
            }
        }
        catch (err) {
            conole.error(err);
        }
        return deferred.promise;

    }

}