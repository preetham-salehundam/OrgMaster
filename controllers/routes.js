var fileUpload = require('express-fileupload');
var bodyParser = require('body-parser');


module.exports = function (app) {
    var docOps = require('../controllers/docOps');
    app.use(fileUpload());
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.post('/uploadDoc', docOps.upload);
    app.post('/parseUpload', docOps.parseUpload);
    app.get('/docs', docOps.findAll);
    app.get('/doc', docOps.findById);
    app.post('/doc', docOps.add);
    app.put('/doc/:id', docOps.update);
    app.delete('/doc/:id', docOps.delete);
    app.get('/records', docOps.fetchUserRelatedData);
    app.get('/records_all', docOps.fetchDocData);
    app.post('/records',docOps.updateUserData);
    app.get('/uploadedDocs',docOps.getAllDocsForUser)
}