import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './labelManagement.css'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import moment from 'moment'

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
    const [LabelName, setLabelName] = useState('')
    const [label, setLabel] = useState('')
    console.log(LabelName)

    const [open, setOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [OpenDelete, setOpenDelete] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setLabelName('');
    }

    const handleEditOpen = (lb) => {setEditOpen(true);setLabel(lb);setLabelName(lb.LabelName)}
    const handleEditClose = () => {
        setEditOpen(false);
        setLabel('');
        setLabelName('');
    }

    const handleOpenDelete = (lb) => {setOpenDelete(true);setLabel(lb)}
    const handleDeleteClose = () => {
        setOpenDelete(false);
        setLabel('');
    }
   


    const handleOnChange = (e) => {
        setLabelName(e.target.value)
    }
    const handleOnEditChange = (e) => {
        setLabel(...label,{LabelName:e.target.value})
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

    const handleUpdateLabel =async(e)=>{
        e.preventDefault()
        try {
            const res = await axios.put(`/api/label/update/${label._id}`,{LabelName})
            toast.success(res.data.msg, {
                
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            handleEditClose();
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
    const handleDeleteLabel =async(e)=>{
        e.preventDefault()
        try {
            const res = await axios.delete(`/api/label/delete/${label._id}`)
            toast.success(res.data.msg, {
                
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            handleDeleteClose();
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
    const [searchTerm, setSearchTerm] = useState('');
    const [search, setSearch] = useState('');
    const handleSearch = (e) => {
        setSearch(e.target.value)
    }
    const handleOnSearch = () => {
        setSearchTerm(search)
    }
    const filteredLabels = labels.filter(label => {
        return (label.LabelName.includes(searchTerm))
    
    })
    return (
        <div>
            <ToastContainer />
            <div className='labelBody'>
                <div className='labelSearch'>
                    <div className='labelSearch2'>
                        <input className='inputs' placeholder='Search Label...' onChange={(e)=>handleSearch(e)}></input>
                        <button className='btnOrange' onClick={()=>handleOnSearch()}>Search</button>
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
                            filteredLabels.map(lb => (
                                <tr key={lb._id}>
                                    <td>{lb._id}</td>
                                    <td>{lb.LabelName}</td>
                                    <td>{moment(lb.createdAt).format("MMM Do YY")}</td>
                                    <td>{moment(lb.updatedAt).format("MMM Do YY")}</td>
                                    <td> <div className='labelBtnEdit'><button onClick={()=>handleEditOpen(lb)} className='btnOrange'>Edit</button>
                                    
                                        <button onClick={()=>handleOpenDelete(lb)} className='btnRed'>Delete</button>
                                    </div>
                                    </td>
                                </tr>
                            ))
                        }




                    </table>
                    <Modal
                            open={editOpen}
                            onClose={handleEditClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <h3 className='brand-title'>Edit Label</h3>
                                <hr />

                                <input value={LabelName} className='inputs' onChange={handleOnChange} placeholder='Enter Lable Name'/>
                                <br/> <br/>
                                <div className='ADLBtn'><button onClick={handleUpdateLabel} className='btnGreen'>Edit</button>
                                <button onClick={handleEditClose} className='btnRed'>Cancel</button></div>
                                


                            </Box>
                        </Modal>

                        <Modal
                            open={OpenDelete}
                            onClose={handleDeleteClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <h3 className='brand-title'>Delete Label</h3>
                                <hr />
                                <h5>Do you want to delete this label?</h5>
                                <br/> <br/>
                                <div className='ADLBtn'><button onClick={handleDeleteLabel} className='btnGreen'>Yes</button>
                                <button onClick={handleDeleteClose} className='btnRed'>No</button></div>
                                


                            </Box>
                        </Modal>
                </div>

            </div>
        </div>
    )
}

export default LabelManagement