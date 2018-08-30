var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

/*Monta rota do banco de dados*/
var Service = require('../service/Service');

router.get('/*', function (req, res) {
    var alreadySent = false;
    var endpoint = req.params[0];
    Service.find({}, function (err, result) {
        if (err) console.error(err);
        console.log("Searching for: ", endpoint);
        result.forEach(item => {
            item.request.forEach(item2 => {
                if (item2.isOn == "On" && (item.url.indexOf(endpoint) != -1)) {
                    console.log("Found: ", item.url, item2.statusResponse)
                    res.set('Content-Type', 'application/json');
                    res.status(item2.statusResponse).send(item2.bodyResponse);
                    alreadySent = true;
                }
            });
        });
    });
    setTimeout(() => {
        if (!alreadySent) {
            res.status(404).send("Rota não encontrada (" + endpoint + ") depois de 2s, acho q deve redirecionar pra outro lugar !! 404");
        }
    }, 2000);

});

module.exports = router;