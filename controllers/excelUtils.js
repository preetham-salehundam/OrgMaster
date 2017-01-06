var excel2Json = require('node-excel-to-json');
var json2xls = require('json2xls');
var fs = require('fs');
Promise = require('node-promise').Promise;
defer = require("node-promise").defer;
module.exports = {
    convertXltoJson: function (filePath,callback) {
        try{
            console.log(filePath);
            excel2Json(filePath, function (err, output) {
            if (err) {
                console.error(err);
                throw("Error : "+err); 
            } else {
               console.log(output);
                var return_val=JSON.stringify(output)?JSON.stringify(output):output;
                return callback(null,return_val);

            }


        })


        }catch(e){
            return callback("Error: "+e)
        }

        
    },
   startConversion:function(relFilePath) {
        var deferred = defer();

        this.convertXltoJson(relFilePath, function (err, response) {
            var parsedXlData = "";
            if (err) {
                console.error(err);
                deferred.reject(err);
            } else {
                parsedXlData = response;
                console.log("parsedXLdata");
                console.log(parsedXlData);
                deferred.resolve(parsedXlData);
            }
        });

        return deferred.promise;
    },

    isFile  : function(relFilePath){
        var realfilePath=relFilePath.replace(/\.\.\//g,"");
        console.log("realfilePath "+realfilePath);
            fs.stat(realfilePath,function(err,stat){
                if(err){
                    console.error(err);
                    return false;
                }else{
                    if(!stat.isFile(realfilePath)){
                        console.error("not a file");
                        return false;
                    }
                }
                 console.error("is a file");
                
            })
            return true;
    }

}