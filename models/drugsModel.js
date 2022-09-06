const { Schema, model } = require("mongoose");
const drugsSchema=({
    UserID:{
        type: String,
        required: true
    },
    PharmacyID:{
        type: String,
        required: true
    },
    DrugName:{
        type: String,
        required: true
    },
    DrugQuantity:{
        type: String,
        required: true
    },
    Description:{
        type: String,
        required: true
    },
    DrugPrice:{
        type: String,
        required: true
    },
    DrugImage:{
        type: String,
        required: true
    }

});
const Drugs = model("Drugs", drugsSchema);

module.exports = Drugs;