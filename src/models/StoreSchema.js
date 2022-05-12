const mongoose = require('mongoose');

//or const { Schema } = mongoose const varname = new Schema({})
const StoreSchema = mongoose.Schema({
    storeName: String,
    storeAddress: String,
    storeNotes: Array,
    profitList: Array,
    position: Object,
    storeId: String,
    lastVisited: Number,
    tillRed: Number,
    tillYellow: Number,
    markerColor: String,
});

//The name on this can either be Stores or StoreSchema when imported? I think?
module.exports = mongoose.model('Stores', StoreSchema);