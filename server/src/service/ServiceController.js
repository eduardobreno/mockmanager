var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var Service = require('./Service');
var jsonResult = {
    success: false,
    msg: ""
};
router.post('/', function (req, res) {
    let service = req.body;

    Service.create(service,
        function (err, user) {
            if (err) {
                console.log(err);
                jsonResult.msg = "Error Ocurred."
                return res.status(500).json(jsonResult);
            }
            jsonResult.success = true;
            jsonResult.msg = "Salvo com sucesso!"
            return res.status(200).json(jsonResult);
        });
});

router.put('/', function (req, res) {
    let service = req.body;
    let id = service._id;
    delete service._id;
    // console.log(service)
    Service.findByIdAndUpdate(id, service, {new: true},
        function (err, user) {
            if (err) {
                console.log(err);
                jsonResult.msg = "Error Ocurred."
                return res.status(500).json(jsonResult);
            }
            jsonResult.success = true;
            jsonResult.msg = "Salvo com sucesso!"
            return res.status(200).json(jsonResult);
        });
});

router.get('/', function (req, res) {
    Service.find({}, function (err, result) {
        if (err) {
            console.log(err);
            jsonResult.msg = "Error Ocurred."
            return res.status(500).json(jsonResult);
        }
        jsonResult.success = true;
        jsonResult.data = result;
        return res.status(200).json(jsonResult)
    });
});

router.delete('/:id', function (req, res) {
    Service.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) {
            jsonResult.msg = "Error Ocurred."
            return res.status(500).json(jsonResult);
        }
        jsonResult.success = true;
        Service.find({}, function (err, result) {
            jsonResult.msg = "Removido!"
            jsonResult.data = result;
            res.status(200).json(jsonResult)
        });
    });
});

// router.get('/:id', function (req, res) {
//     User.findById(req.params.id, function (err, user) {
//         if (err) return res.status(500).send("There was a problem finding the user.");
//         if (!user) return res.status(404).send("No user found.");
//         res.status(200).send(user);
//     });
// });



// // UPDATES A SINGLE USER IN THE DATABASE
// router.put('/:id', function (req, res) {
//     User.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
//         if (err) return res.status(500).send("There was a problem updating the user.");
//         res.status(200).send(user);
//     });
// });


module.exports = router;