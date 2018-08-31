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
    var endpoint = req.path;
    var originalEndpoint = req.path;

    console.log(req.method + " " + req.url);

    // var cpfRegex = /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/;
    // var args = endpoint.match(cpfRegex);
    // endpoint = endpoint.replace(cpfRegex, "***");
    var parsedUrl = url.parse(req.url);
    var urlParams = querystring.parse(parsedUrl.query);

    doMagic(endpoint).then(newUrl => {
        console.log("Searching for: ", newUrl);
        endpoint = newUrl;
        var found = false;
        var response = "init";
        var statusResponse = "init";
        Service.find({}, function (err, result) {
            if (err) console.error(err);
            result.forEach(item => {
                item.request.forEach(item2 => {
                    if (item2.isOn == "On" && (item.url.indexOf(endpoint) != -1)) {
                        console.log("Found: ", item.url, item2.statusResponse)
                        res.set('Content-Type', 'application/json');
                        response = JSON.parse(item2.bodyResponse);
                        statusResponse = item2.statusResponse;
                        var body = req.body;
                        if (item2.scriptBefore) {
                            console.log("__________BEGIN SCRIPT__________\n\n");
                            try {
                                eval(item2.scriptBefore);
                            } catch (e) {
                                console.error("__________Error in script__________ \n\n", e)
                            }
                            console.log("\n__________END SCRIPT__________\n\n");
                        } else {
                            console.log("\n\nSem script\n\n");
                        }
                        found = true;
                    }
                });
            });
            if (found) {
                res.status(statusResponse).send(response);
            } else {
                console.log("NotFound: ", endpoint);
                console.log("Redirecting: ", originalEndpoint);
                req.forward = { target: 'http://192.168.0.126:8776' }
                forward(req, res, () => { });
            }
        });
    }).catch(err => {
        console.log("NotFound: ", endpoint);
        console.log("Redirecting: ", originalEndpoint);
        req.forward = { target: 'http://192.168.0.126:8776' }
        forward(req, res, () => { });
    });
});

var args = [];
doMagic = (endpoint) => {
    var urlArr = endpoint.split("/");
    var urlBanco;
    args = [];

    return new Promise((resolve, reject) => {
        Service.find({}, function (err, result) {
            if (err) console.error(err);
            result.forEach(item => {
                if (urlArr.length == item.url.split("/").length) {
                    urlBanco = item.url;
                }
            });

            if (!urlBanco) {
                reject("NotFound");
            }
            urlBanco = urlBanco.split("/");
            for (var i = 0; i < urlArr.length; i++) {
                if (urlBanco[i] == "***") {
                    args.push(urlArr[i]);
                    urlArr[i] = "***";
                }
            }
            resolve(urlArr.join("/"));
        });
    });
}

module.exports = router;