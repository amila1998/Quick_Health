import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './qANDaReports.css'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import generatePDF from './Report/Services/reportGenerator';
import QuestionsByLabelComponent from './Report/QuestionsByLabelComponent';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    borderRadius: "50px",
    transform: 'translate(-50%, -50%)',
    width: '100%',
    height: '100%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const QandAReports = () => {
    const [allLabels, setAllLabels] = useState([])
    const [allQuestions, setAllQuestions] = useState([])
    const [filterQuestions, setFilterQuestions] = useState([])
    const [open, setOpen] = useState(false)
    const [currentLabelName, setCurrentLabelName] = useState('')
    let questions = []

    useEffect(() => {
        const getAllLabels = async () => {
            try {
                const res = await axios.get("/api/label/")
                setAllLabels(res.data.AllLabel)
                console.log(res)
            } catch (error) {
                console.log(error)
            }
        }
        getAllLabels()

    }, [])

    useEffect(() => {
        const getAllQuestions = async () => {
            try {
                const res = await axios.get("/api/questions/AllQuestions")
                setAllQuestions(res.data.questions)

            } catch (error) {
                console.log(error);
            }
        }
        getAllQuestions()
    }, [])

    const genarateReport = async (LabelName) => {
        setCurrentLabelName(LabelName)
        for (const q of allQuestions) {
            for (const l of q.lables) {
                for (const z of l.value) {
                    if (LabelName === z) {
                        await questions.push(q)
                    }
                }
            }
        }
        await setFilterQuestions(questions)
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false);
        questions = []
        setFilterQuestions([])
    }

    const questionsObject = {
        filterQuestions, 
        currentLabelName
    }
    return (
        <div>
            <div className='qacard-body'>
                {
                    allLabels?.map(label => {
                        return <>
                            <div className='qa-card-btn'>
                                <button onClick={() => { genarateReport(label.LabelName) }} className='qa-card'>{label.LabelName}</button>

                            </div>

                        </>
                    })
                }
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <h3 className='brand-title'>{currentLabelName + "  Report"}</h3>
                    <hr />

                    <div>
                        <div className="rBody">
                            <div className="rRow">

                                <button
                                    className="btnOrange"
                                    onClick={() => generatePDF(questionsObject)}
                                >
                                    Generate Report
                                </button>

                            </div>
                        </div>
                        <QuestionsByLabelComponent questionsObject = {questionsObject}></QuestionsByLabelComponent>
                    </div>
                    <br /> <br />
                    <div className='ADLBtn'>
                        <button onClick={handleClose} className='btnRed'>Close</button></div>



                </Box>
            </Modal>
        </div>
    )
}


export default QandAReports