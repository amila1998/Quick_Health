const Pharmacy = require("../models/pharmacyModel");
const pharmacyController={
    addPharmacy:async(req,res)=>{
        try {
            const {UserID,PharmacyName,StreetAddress,City,State,OpenTime, CloseTime} = req.body;
            // let date_ob = new Date();
            const newPharmacy = new Pharmacy({
                UserID,PharmacyName,StreetAddress,City,State,OpenTime, CloseTime
            })
           const submitNew = await newPharmacy.save();  
            res.status(200).json({ 
                msg:"pharmacy Registration Successfully " ,
                success: true
            })     
        } catch (error) {
            res.status(500).json({ 
                msg: error.message ,
                success: false
            });
        }
    }, 
    
    getAll:async(req,res)=>{
        try {
            pharmacy = await Pharmacy.find();
            res.status(200).json({ 
                pharmacy,
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
module.exports = pharmacyController;