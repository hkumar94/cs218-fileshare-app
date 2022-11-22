var mongoose = require('mongoose');

const fileSchema = mongoose.Schema({
    uploadDate: String,
    name: String,
    contentType: String,
    md5: String,
    mimetype: String,
    data: Buffer,
    owner: String,
    sharedWith: Array
});

module.exports = fileSchema;