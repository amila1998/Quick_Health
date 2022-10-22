const Label = require("../models/labelModel");
const labelController={
    addLabel:async(req,res)=>{
        try {
            const {LabelName} = req.body;
            // let date_ob = new Date();
            const newLabel = new Label({
                LabelName
            })
           const submitNew = await newLabel.save();  
            res.status(200).json({ 
                msg:"Label Created Successfully" ,
                success: true
            })     
        } catch (error) {
            res.status(500).json({ 
                msg: error.message ,
                success: false
            });
        }
    },

    editLabel : async ( req , res ) => {
        try {

            let LabelId = req.params.id ;
            const { LabelName} = req.body;

            const neweditLabel = {
                LabelName
            };

            const fetch = await Label.findByIdAndUpdate(LabelId , neweditLabel);

            res.status(200).json({ 
                msg: "Updated successfully" ,
                fetch : fetch    
            });

        } catch (error) {
            res.status(500).json({
                msg: error.message,
                success: false
            });
        }
    } ,

    deleteLabel : async (req, res) => {
        try {
            const fetch = await Label.findByIdAndDelete(req.params.id);


            res.status(200).json({
                msg: "Label Deleted Successfully! ",
                success: true,
            });

        } catch (error) {
            res.status(500).json({
                msg: error.message,
                success: false
            });
        }
    },

    getAll:async(req,res)=>{
        try {
            const AllLabel = await Label.find();
            res.status(200).json({ 
                AllLabel,
                success: true
            })                
        } catch (error) {
            res.status(500).json({ 
                msg: error.message ,
                success: false
            }); 
        }
    },
}
    module.exports = labelController;