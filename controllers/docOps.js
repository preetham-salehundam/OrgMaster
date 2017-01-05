var mongoose = require('mongoose');
excelUtils = require('./excelUtils.js');
dbOps = require('./databaseOps')
documentModel = mongoose.model('excelData');
var _ = require('lodash');
var url = require('url');


module.exports = {
    findAll: function (req, res) {
        documentModel.find({}, function (err, results) {
            res.send(results);
        })


    },
    findById: function (req, res) {
        // var url_parts = url.parse(req.url, true);
        // var query = url_parts.query;
       // console.log("quuwert"+JSON.stringify(req.query));
        var doc_id = req.query.id;
        documentModel.find({ "_id": doc_id }, function (err, results) {
            res.send(results);
        })
    },
    add: function (req, res) {

    },
    update: function (req, res) {

    },
    delete: function (req, res) {

    },

    upload: function (req, res) {
        try {
            var doc;
            if (!req.files) {
                res.send('No files were uploaded.');
                return;
            }

            doc = req.files.document;
            var doc_name = req.files.document.name;
            //console.log("doc "+JSON.stringify(doc));
            doc.mv('../excelStore/uploaded/' + doc_name, function (err, result) {
                if (err) {
                    res.status(500).send(err);
                }
                else {
                    console.log('fileuploaded');
                    res.send('File uploaded!');
                }
            })
        } catch (err) {
            console.log(err);
            res.status(500).send(err);
        }

    },
    parseUpload: function (req, res) {
        try {
            var doc;
            var user_id = req.query.user_id;
            if (!req.files) {
                res.send('No files were uploaded.');
                return;
            }

            doc = req.files.file;
            var doc_name = req.files.file.name;
            console.log("doc_name: "+doc_name)
            //console.log("doc "+JSON.stringify(doc));
            doc.mv('../excelStore/uploaded/' + doc_name, function (err, result) {
                if (err) {
                    res.status(500).send(err);
                }
                else {
                    console.log('fileuploaded');
                    var id;
                    var relFilePath = '../../../excelStore/uploaded/' + doc_name;
                    console.log("doc_path :" + relFilePath);
                    var completeConversion = excelUtils.startConversion(relFilePath);
                    dbOps.saveDoctoDb(completeConversion,{"user_id":user_id,"filename":doc_name}).then(function (id) {
                        res.send({ "status": "success", "doc_id": id, "time_stamp": +new Date() });
                    }, function (err) {
                        console.log(err);
                        res.status(500).send(err);
                    });


                }
            })
        } catch (err) {
            console.log(err);
            res.status(500).send(err);
        }

    },
    fetchUserRelatedData: function (req, res) {
        try {
            var user_id = req.query.user_id;
            var doc_id = req.query.doc_id;
            documentModel.find({ "_id": doc_id }, function (err, results) {
                if(results && results instanceof Array && results.length>0){
                      var document = JSON.parse(results[0].exceldata);
                console.log(JSON.stringify(document));
                for (var sheet_index in document) {
                    // if (Object.hasOwnProperty(sheet_index)) {
                    var sheet_data = document[sheet_index];
                    //remove the user data that are not reated
                    _.remove(sheet_data, function (row) {
                        //if (row.Owner instanceof String)
                        return row.Owner.toUpperCase() != user_id.toUpperCase();
                    })
                    // }


                }
                // console.log()
                res.send(document);
                }
              
            })
        } catch (err) {
            console.log(err);
            res.status(500).send(err);
        }



    },
    fetchDocData: function (req, res) {
        try {
            var doc_id = req.query.doc_id;
            documentModel.find({ "_id": doc_id }, function (err, results) {
                var document = JSON.parse(results[0].exceldata);
                res.send(document);
            })
        } catch (err) {
            console.log(err);
            res.status(500).send(err);
        }


    },
    updateUserData: function (req, res) {
        try {
            var user_id = req.query.user_id;
            var doc_id = req.query.doc_id;
            var body = req.body;
            documentModel.findOne({ _id: doc_id }, function (err, doc) {
                doc.exceldata = JSON.stringify(body);
                doc.lastUpdatedBy = user_id;
                doc.lastUpdatedDate = +new Date();
                console.log("body " + JSON.stringify(body))
                doc.save();
                res.send({ "status": "document updated successfully", "updated_doc": doc })
            });
        } catch (err) {
            console.log(err);
            res.status(500).send(err);
        }


    },
    getAllDocsForUser:function(req,res){
        try{
            var user_id = req.query.user_id;
             documentModel.find({excelOwner: {$regex : new RegExp(user_id, "i")}},function(err,docs){
                 res.send({uploaded_docs:docs});
             })
        }catch(err){
             console.log(err);
            res.status(500).send(err);
        }

    }
}