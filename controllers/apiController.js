
// const apiModel = require('../models/apiModel');
// const apiController = {};

// apiController.list = (req, res) => {
//     let data = req.body;
//     // res.send(req.body.password)
//     apiModel.list(data)
//         .then(result => {
//             console.log("ALL OK: (apiController.list)")
//             res.status(result.status_code ? result.status_code : 200).send(result.content);
//         })
//         .catch(err => {
//             res.send("error apiController.list");
//         });
// }

// apiController.users = (req, res) => {
//     apiModel.users(req, res)
//     .then(result => {
//         console.log("ALL OK: (apiController.list)")
//         res.send(result);
//     })
//     .catch(err => {
//         console.log(err);
//         res.send("error apiController.list");
//     });
// }


module.exports = apiController;