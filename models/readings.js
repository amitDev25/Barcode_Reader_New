const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/barcode_database");

const readingSchema = mongoose.Schema({
    
    barcode_data: String,
    extracted_text: String,
    timestamp: String,
    snapshot_path: String
})

module.exports = mongoose.model('reading', readingSchema);