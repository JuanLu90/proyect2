var express = require('express');
var router = express.Router();
var md5 = require('md5');
var jwt = require("jsonwebtoken");
var mongo = require("mongodb");

router.get('/', (req, res) =>
    res.send("Responde with a resource")
);


router.post("/auth", (request, response) => {
    const query = global.dbo.collection("users").find({
        username: request.body.username,
        password: md5(request.body.password)
    });

    query.toArray().then(documents => {
        if (documents.length > 0) {
            var token = jwt.sign({
                id: documents[0]._id,
                username: documents[0].username,
                isAdmin: documents[0].isAdmin ? true : false
            },
                "mysecret", {
                    expiresIn: 3600
                }
            );
            response.send(token);
        } else {
            response.status(400).send("Invalid credentials");
        }
    });
});


router.get('/users', (req, res) => {
    return new Promise((resolve, reject) => {
        // const token = req.headers.authorization.replace("Bearer ", "");
        try {
            // const payload = jwt.verify(token, "mysecret");
            // if (!payload.isAdmin) {
            //     global.dbo.collection("users").find({}, { projection: { username: 1,  email: 1, isAdmin: 1} }).toArray(function (err, result) {
            //         if (err) reject(err);
            //         else {
            //             res.send(result)
            //         }
            //     })
            // } else {
            //     global.dbo.collection("users").find({}, { projection: { username: 1, email: 1, isAdmin: 1 } }).toArray(function (err, result) {
            //         if (err) reject(err);
            //         else {
            //             res.send(result)
            //         }
            //     })
            // }

            global.dbo.collection("users").find({}, { projection: { username: 1, email: 1, isAdmin: 1 } }).toArray(function (err, result) {
                if (err) reject(err);
                else {
                    res.send(result)
                }
            })


        } catch (error) {
            reject(error);
        }
    })
});

//Show user by Id
router.get('/users/:id', (req, res) => {
    const id = req.params.id;
    if (id) {
        global.dbo.collection("users").find({
            _id: new mongo.ObjectID(id)
        }, { projection: { _id: 0, username: 1, email: 1 } }).toArray().then((documents) => {
            res.send(documents[0]);
        })
    }
});

//Create a new user
router.post('/users', (req, response) => {
    try {
        let myObj = {
            username: req.body.username,
            password: md5(req.body.password),
            isAdmin: req.body.isAdmin,
            email: req.body.email
        };
        global.dbo.collection("users").insertOne(myObj, function (err, res) {
            if (err) throw err;
            response.status(201).send(res.ops[0]);
            console.log("1 document inserted");
        });
    } catch{
        response.status(400).send();
    }
});


//Edit a user
router.put("/users/:id", (request, response) => {
    const id = request.params.id;
    const myquery = {
        _id: new mongo.ObjectID(id)
    };
    const newvalues = {
        $set: {
            username: request.body.username,
            email: request.body.email,
            isAdmin: request.body.isAdmin,
            password: md5(request.body.password)

        }
    };
    global.dbo.collection("users").updateOne(myquery, newvalues);
    global.dbo.collection("users").find(myquery).toArray().then(documents => {
        response.status(200).send(documents[0]);
    });


});



//Delete a user
router.delete('/users/:id', (req, response) => {
    const id = req.params.id;
    const myQuery = {
        _id: new mongo.ObjectID(id)
    };
    global.dbo.collection("users").deleteOne(myQuery, function (err, res) {
        if (err) throw err;
        response.send();
    });
});



module.exports = router;
