const { Schema, model } = require("mongoose");
const pharmacySchema=({
    UserID:{
        type: String,
        required: true
    },
    PharmacyName:{
        type: String,
        required: true
    },
    StreetAddress:{
        type: String,
        required: true
    },
    City:{
        type: String,
        required: true
    },
    State:{
        type: String,
        required: true
    },
    number:{
        type: String,
        required: true
    },
    OpenTime:{
        type: String,
        required: true
    },
    CloseTime:{
        type: String,
        required: true
    }

});
const Pharmacy = model("Pharmacy", pharmacySchema);

module.exports = Pharmacy;