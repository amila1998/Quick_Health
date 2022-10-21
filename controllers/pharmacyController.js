const Pharmacy = require("../models/pharmacyModel");
const pharmacyController={
    addPharmacy:async(req,res)=>{
        try {
            const {UserID,PharmacyName,StreetAddress,City,State,number,OpenTime, CloseTime} = req.body;
            // let date_ob = new Date();
            const newPharmacy = new Pharmacy({
                UserID,PharmacyName,StreetAddress,City,State,number,OpenTime, CloseTime
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
    editPharmacy : async ( req , res ) => {
        try {

            let PharmacyId = req.params.id ;
            const {UserID,PharmacyName,StreetAddress,City,State,number,OpenTime, CloseTime } = req.body;

            const newEditPharmacy = {
                UserID,PharmacyName,StreetAddress,City,State,number,OpenTime, CloseTime
            };

            const fetch = await Pharmacy.findByIdAndUpdate(PharmacyId,newEditPharmacy);

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
    
    getAll:async(req,res)=>{
        try {
            let PharmacyId = req.params.id ;
            const AllPharmacy = await Pharmacy.findOne({"_id":PharmacyId});
            res.status(200).json({ 
                AllPharmacy,
                success: true
            })                
        } catch (error) {
            res.status(500).json({ 
                msg: error.message ,
                success: false
            }); 
        }
    },
    getAllPharmacy:async(req,res)=>{
        try {
            // let PharmacyId = req.params.id ;
            const AllPharmacy = await Pharmacy.find();
            res.status(200).json({ 
                AllPharmacy,
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
            const pharmacy = await Pharmacy.find({"UserID":req.params.id});
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
    // getOnePharmacy:async(req,res)=>{
    //     try {
    //         const OnePharmacy = await Pharmacy.find({"_id":req.params.id});
    //         res.status(200).json({ 
    //             OnePharmacy,
    //             success: true
    //         })                
    //     } catch (error) {
    //         res.status(500).json({ 
    //             msg: error.message ,
    //             success: false
    //         }); 
    //     }
    // },
    deletePharmacy : async (req, res) => {
        try {
            const fetch = await Pharmacy.findByIdAndDelete(req.params.id);


            res.status(200).json({
                msg: "Pharmacy Deleted Success ! ",
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
module.exports = pharmacyController;