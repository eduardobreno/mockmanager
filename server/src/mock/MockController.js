var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var forward = require('http-forward');
const querystring = require('querystring');
const url = require('url');


router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

/*Monta rota do banco de dados*/
var Service = require('../service/Service');

router.all('/*', function (req, res) {
    var alreadySent = false;
    var endpoint = req.url;

    console.log(req.method + " " + endpoint);

    var args = endpoint.match(/([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/);
    endpoint = endpoint.replace(/([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/, "***");

    var parsedUrl = url.parse(endpoint);
    var urlParams = querystring.parse(parsedUrl.query);


    Service.find({}, function (err, result) {
        if (err) console.error(err);
        console.log("Searching for: ", endpoint);
        result.forEach(item => {
            item.request.forEach(item2 => {
                if (item2.isOn == "On" && (item.url.indexOf(endpoint) != -1)) {
                    console.log("Found: ", item.url, item2.statusResponse)
                    res.set('Content-Type', 'application/json');
                    var response = JSON.parse(item2.bodyResponse);
                    var body = req.body;
                    if (item2.scriptBefore) {
                        console.log("\n\nStart script\n\n");
                        try {
                            eval(item2.scriptBefore);
                        } catch (e) {
                            console.error("#####Error in script##### \n\n", e)
                        }
                        console.log("\n\nEnd script\n\n");
                    } else {
                        console.log("\n\nSem script\n\n");
                    }
                    res.status(item2.statusResponse).send(response);
                    alreadySent = true;
                }
            });
        });
    });
    setTimeout(() => {
        if (!alreadySent) {
            console.log("NotFound: ", endpoint);
            req.forward = { target: 'http://192.168.0.126:8776' }
            forward(req, res, () => { });
            // res.status(404).send("Rota não encontrada (" + endpoint + ") depois de 2s, acho q deve redirecionar pra outro lugar !! 404");
        }
    }, 2000);

});

module.exports = router;