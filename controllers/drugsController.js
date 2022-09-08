const drugs = require("../models/drugsModel");
const drugsController={
    addDrugs:async(req,res)=>{
        try {
            const { UserID,PharmacyID,DrugName,DrugQuantity,Description,DrugPrice,DrugImage} = req.body;
            // let date_ob = new Date();
            const newDrugs = new drugs({
                UserID,PharmacyID,DrugName,DrugQuantity,Description,DrugPrice,DrugImage
            })
           const submitNew = await newDrugs.save();  
            res.status(200).json({ 
                msg:"Drug added Successfully " ,
                success: true
            })     
        } catch (error) {
            res.status(500).json({ 
                msg: error.message ,
                success: false
            });
        }
    }, 
    
    getAllDrugs:async(req,res)=>{
        try {
           const allDrugs = await drugs.find();
            res.status(200).json({ 
                allDrugs,
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
module.exports = drugsController;