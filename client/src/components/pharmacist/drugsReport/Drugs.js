import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react'
import { GlobalState } from '../../../GlobalState'

function Drugs() {
    const params = useParams();
    const pharmacyId = params.pid;
    console.log("🚀 ~ file: Drugs.js ~ line 11 ~ Drugs ~ pharmacyId", pharmacyId)
    const navigate = useNavigate();
  return (
    <div>Drugs</div>
  )
}

export default Drugs