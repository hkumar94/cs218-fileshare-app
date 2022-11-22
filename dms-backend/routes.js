const express = require("express")
const fileUpload = require('express-fileupload');
var mongoose = require('mongoose');

const router = express.Router()
const userSchema = require('./user');
const fileSchema = require('./files');
var user = mongoose.model("users.users", userSchema);
var files = mongoose.model("files.files", fileSchema);

const { ObjectId } = require("mongodb");

let crypto = require('crypto');

const HASH_ALG = 'sha256';

// middleware
router.use(express.json());

router.use(fileUpload({
    createParentPath: true
}))

router.get("/healthCheck", function (req, res) {
    console.log("App is alive!");
    return res.send('OK');
});

router.post("/signup", (req, res) => {
    console.log("Sign Up Request!");
    var reqBody = req.body;

    return user.find({ "username": reqBody.username }).lean()
        .then((_res) => {
            if (_res && _res.length) throw { 'message': 'Username already exists!' };
            reqBody.password = hash(reqBody.password);
            return user.create(reqBody);
        })
        .then((_res) => {
            delete _res._doc['password'];
            return res.send(_res);
        })
        .catch(e => {
            return res.status(400).send(e);
        })
});

router.post("/login", (req, res) => {
    console.log("Login Request!");
    var reqBody = req.body;
    reqBody.password = hash(reqBody.password);
    var project = {
        "_id": 1,
        "username": 1
    }
    return user.find({ "username": reqBody.username, "password": reqBody.password }, project).lean()
        .then((_res) => {
            if (_res && _res.length)
                return res.send(_res);
            return res.status(401).json({ 'message': 'Username or password wrong!' });
        });
});

router.post("/file/upload", (req, res) => {
    console.log("Upload Request!");
    var file = req.files.file;
    var owner = req.headers.username;
    file.owner = owner;
    
    return files.find({ 'md5': file.md5, 'owner': owner }).lean()
        .then((_res) => {
            if (_res && _res.length) return null;
            return files.create(file)
        })
        .then((_res) => {
            if (_res) {
                var resp = {
                    _id: _res._id,
                    md5: _res.md5,
                    owner: _res.owner,
                    sharedWith: _res.sharedWith,
                    name: _res.name
                }
                return res.send(resp);
            }
            return res.status(400).json({ 'message': 'File already exists for this user!' });
        });
});

router.get("/file/download", (req, res) => {
    console.log("Download file request!");
    var id = req.headers._id;
    var owner = req.headers.username;
    return files.find({ _id: ObjectId(id), owner: owner }).lean()
        .then((_res) => {
            if (_res && _res.length)
                return res.send(_res)
            return res.status(400).json({ 'message': 'File does not exist!' });
        });
});

router.delete("/file", (req, res) => {
    console.log("Delete file request!");
    var id = req.headers._id;
    var user = req.headers.username;

    return files.find({ _id: ObjectId(id), owner: user }).lean()
        .then((_res) => {
            if (_res && _res.length)
                return files.deleteOne({ _id: ObjectId(id) })
            throw { 'message': 'File does not exist!' }
        })
        .then((_res) => {
            if (_res) return res.send('OK');
        })
        .catch(e => {
            return res.status(400).send(e);
        });
});

router.post("/file/share", (req, res) => {
    console.log("File share request!");
    var body = req.body;
    var owner = req.headers.username;

    var shareWith = body.shareWith;
    var id = body._id;

    var query = { _id: ObjectId(id), owner: owner };
    var update = {
        $addToSet: {
            sharedWith: shareWith
        }
    }

    return user.find({ username: shareWith }).lean()
        .then((_res) => {
            console.log(_res)
            if (_res && _res.length)
                return files.findOneAndUpdate(query, update).lean()
            throw { 'message': 'User does not exist!' }
        })
        .then((_res) => {
            if (_res) return res.send('OK')
            throw { 'message': 'File does not exist!' };
        })
        .catch(e => {
            return res.status(400).send(e);
        })
});

router.get("/file", (req, res) => {
    console.log("File get request!");

    var owner = req.headers.username;
    var query = {
        $or: [
            {
                owner: owner
            },
            {
                sharedWith: {
                    $in : [ owner ]
                }
            }
        ]
    }

    var project = {
        "_id" : 1, 
        "md5" : 1, 
        "mimetype" : 1, 
        "owner" : 1, 
        "sharedWith" : 1,
        "name": 1
    }

    return user.find({username: owner}).lean()
    .then((_res) => {
        if (_res && _res.length) return files.find(query, project).lean()
        throw { 'message': 'User not found!' }
    })
    .then((_res) => {
        if (_res && _res.length)
        return res.send(_res);
    })
    .catch(e => {
        return res.status(400).send(e);
    });
})

function hash(s) {
    return crypto.createHash(HASH_ALG).update(s).digest('hex');
}

module.exports = router;