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
    getOne:async(req,res)=>{
        try {
            const pharmacyDrug = await drugs.find({"PharmacyID":req.params.id});
            res.status(200).json({ 
                pharmacyDrug,
                success: true
            })                
        } catch (error) {
            res.status(500).json({ 
                msg: error.message ,
                success: false
            }); 
        }
    },
    editDrug : async ( req , res ) => {
        try {

            let DrugId = req.params.id ;
            const { DrugName , DrugQuantity, Description , DrugPrice , DrugImage } = req.body;

            const newEditDrug = {
                DrugName , DrugQuantity, Description , DrugPrice , DrugImage
            };

            const fetch = await drugs.findByIdAndUpdate(DrugId,newEditDrug);

            res.status(200).json({ 
                msg: "Update success." ,
                fetch : fetch    
            });

        } catch (error) {
            res.status(500).json({
                msg: error.message,
                success: false
            });
        }
    },
    deleteDrug : async (req, res) => {
        try {
            const fetch = await drugs.findByIdAndDelete(req.params.id);


            res.status(200).json({
                msg: "Drug Deleted Success ! ",
                success: true,
            });

        } catch (error) {
            res.status(500).json({
                msg: error.message,
                success: false
            });
        }
    },
 
    

}
module.exports = drugsController;