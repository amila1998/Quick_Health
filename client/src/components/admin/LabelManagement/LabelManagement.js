import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './labelManagement.css'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    borderRadius: "50px",
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};


const LabelManagement = () => {
    const [callBack, setCallBack] = useState(true)
    const [labels, setLabels] = useState([])

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setLabelName('')
    }

    const [LabelName, setLabelName] = useState('')

    const handleOnChange = (e) => {
        setLabelName(e.target.value)
    }

    const handleOnClickAddLble = () => {
        handleOpen()
    }



    useEffect(() => {
        const getAllLabels = async () => {
            if (callBack) {
                try {
                    const res = await axios.get("/api/label/")
                    console.log(res)
                    setLabels(res.data.AllLabel)
                    setCallBack(false)
                } catch (error) {
                    console.log(error)
                }
            }
        }
        getAllLabels()

    }, [callBack])

    const handleCreate =async(e)=>{
        e.preventDefault();
        try {
            const res = await axios.post('/api/label/add',{LabelName})
            toast.success(res.data.msg, {
                
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            handleClose();
            setCallBack(true)
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.msg, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

    }

    const handlePClose = ()=>{
        handleClose();
    }

    return (
        <div>
            <ToastContainer />
            <div className='labelBody'>
                <div className='labelSearch'>
                    <div className='labelSearch2'>
                        <input className='inputs' placeholder='Search Label...'></input>
                        <button className='btnOrange'>Search</button>
                    </div>
                    <div>
                        <button onClick={handleOnClickAddLble} className='btnGreen'>Add Label</button>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <h3 className='brand-title'>Create Label</h3>
                                <hr />

                                <input className='inputs' onChange={handleOnChange} placeholder='Enter Lable Name'/>
                                <br/> <br/>
                                <div className='ADLBtn'><button onClick={handleCreate} className='btnGreen'>Create</button>
                                <button onClick={handlePClose} className='btnRed'>Cancel</button></div>
                                


                            </Box>
                        </Modal>
                    </div>
                </div>

                <br />

                <div>
                    <h3>You have {labels.length} labels</h3>
                    <br />
                    <table id="customers">
                        <tr>
                            <th>Label ID</th>
                            <th>LabelName</th>
                            <th>Date Created</th>
                            <th>Date Updated</th>
                            <th></th>
                        </tr>

                        {
                            labels.map(lb => (
                                <tr key={lb._id}>
                                    <td>{lb._id}</td>
                                    <td>{lb.LabelName}</td>
                                    <td>{lb.createdAt}</td>
                                    <td>{lb.updatedAt}</td>
                                    <td> <div className='labelBtnEdit'><button className='btnOrange'>Edit</button>
                                        <button className='btnRed'>Delete</button>
                                    </div>
                                    </td>
                                </tr>
                            ))
                        }




                    </table>
                </div>

            </div>
        </div>
    )
}

export default LabelManagement