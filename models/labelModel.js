const { Schema, model } = require("mongoose");
const labelSchema = new Schema({
    
    LabelName:{
        type: String,
        required: true
    },

},
{ timestamps: true }
);

const Label = model("Label", labelSchema);

module.exports = Label;