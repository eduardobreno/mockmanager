var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var forward = require('http-forward');
const querystring = require('querystring');
const url = require('url');

var rawBodySaver = function (req, res, buf, encoding) {
    if (buf && buf.length) {
        req.rawBody = buf.toString(encoding || 'utf8');
    }
}

router.use(bodyParser.json({ verify: rawBodySaver }));
router.use(bodyParser.urlencoded({ verify: rawBodySaver, extended: true }));
router.use(bodyParser.raw({ verify: rawBodySaver, type: '*/*' }));

/*Monta rota do banco de dados*/
var Service = require('../service/Service');

router.all('/*', function (req, res) {
    var parsedUrl = url.parse(req.url);
    var endpoint = parsedUrl.pathname;
    var originalEndpoint = req.url;

    console.log(req.method + " " + req.url);

    var urlParams = querystring.parse(parsedUrl.query);
    var __PDF__ = __dirname + "/../../static/pdf.pdf";

    doMagic(endpoint).then(newUrl => {
        console.log("Searching for: ", newUrl);
        endpoint = newUrl;
        var ignoreResponse = false;
        var response;
        var statusResponse = "";
        Service.findOne({ 'url': endpoint }, function (err, result) {
            if (err) console.error(err);
            if (!result) {
                console.log("NotFound: ", endpoint);
                return res.status(404).send("NotFound in dynamic route");
            }

            let item = result
            for (let j = 0; j < item.response.length; j++) {
                let item2 = item.response[j];
                if (item2.isOn == "On") {
                    console.log("Found: ", item.url, item2.statusResponse)
                    var body = {};
                    res.set('Content-Type', 'application/json');
                    statusResponse = item2.statusResponse;
                    if (item2.bodyResponse)
                        response = JSON.parse(item2.bodyResponse);

                    if (req.rawBody) {
                        body = JSON.parse(req.rawBody);
                    }

                    if (item2.scriptBefore) {
                        console.log("__________BEGIN SCRIPT__________\n\n");
                        try {
                            eval(item2.scriptBefore);
                        } catch (e) {
                            console.error("__________Error in script__________ \n\n", e)
                        }
                        console.log("\n__________END SCRIPT__________\n\n");
                    } else {
                        console.log("No script\n\n");
                    }
                    updateRequest(req, result._id);
                    // console.log("Response: ", response)
                    if (!ignoreResponse) {
                        if (response) {
                            return res.status(statusResponse).send(response);
                        } else {
                            return res.status(statusResponse).send();
                        }
                    } else {
                        return;
                    }
                }
            };

            console.log("NotFound: ", endpoint);
            Redirect(req, res);


        });
    }).catch(err => {
        console.log("[Catch] NotFound: ", endpoint);
        Redirect(req, res);
    });
});

Redirect = (req, res) => {
    req.forward = { target: 'http://192.168.0.126:8776' }
    console.log("Redirecting forward: ", req.forward);
    forward(req, res, () => { });
}
updateRequest = (req, id) => {
    let body;
    if (req.rawBody) {
        body = JSON.stringify(req.rawBody);
    }
    let s = {
        "request": {
            "header": JSON.stringify(req.headers),
            "method": req.method,
            "body": body
        }
    }
    Service.findByIdAndUpdate(id, s, { new: true },
        function (err, user) {
            // console.log(err);
            if (err)
                console.log("________ERROR ON UPDATE REQUEST________", err);
        });
}
var args = [];
doMagic = (endpoint) => {
    var urlArr = endpoint.split("/");
    var urlBanco;
    args = [];
    console.log("Preparing: ", endpoint, urlArr);
    return new Promise((resolve, reject) => {
        Service.find({}, function (err, result) {
            try {
                if (err) console.error(err);
                result.forEach(item => {
                    if (urlArr.length == item.url.split("/").length) {
                        urlBanco = item.url;
                    }
                });

                if (!urlBanco) {
                    return reject("NotFound");
                }

                var urlBancoParsed = url.parse(urlBanco);
                urlBanco = urlBancoParsed.pathname.split("/");
                for (var i = 0; i < urlArr.length; i++) {
                    if (urlBanco[i] == "***") {
                        args.push(urlArr[i]);
                        urlArr[i] = "***";
                    }
                }
                return resolve(urlArr.join("/"));
            } catch (err) {
                console.log("__________ERROR - doMagic__________");
                console.log(err);
            }
        });
    });

}

module.exports = router;