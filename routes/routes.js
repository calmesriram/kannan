var controllers = require('../controllers/controllers')
module.exports = (app) =>{

    app.get('/',controllers.initial);
    app.get('/template',controllers.template);
    app.post('/',controllers.upload);
}



    // app.get('/', function (req, res) {
//   res.sendFile(__dirname + '/index.html');
// });


// app.get('/template', template.get);
// app.post('/', upload.post);