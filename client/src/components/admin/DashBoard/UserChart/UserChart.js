import React, { useContext, useEffect, useState } from 'react'
import axios from "axios";
import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts'
import { GlobalState } from '../../../../GlobalState';
import './chart.css'

const UserChart = () => {
    const state = useContext(GlobalState)
    const [token] = state.token



  const [allUsers, setAllUsers] = useState();
  console.log("🚀 ~ file: UsersCharts.jsx ~ line 9 ~ UsersCharts ~ allUsers", allUsers)

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const res = await axios.get('/api/admin/getAllUsers',{
            headers: { Authorization: token }
        })
        console.log("🚀 ~ file: UserChart.js ~ line 20 ~ getAllUsers ~ res", res)
        setAllUsers(res.data.users)
      } catch (error) {
        console.log("🚀 ~ file: UsersCharts.jsx ~ line 14 ~ getAllUsers ~ error", error)

      }
    }
    getAllUsers();
  }, [token])

  let aCount = 0;
  let stdCount = 0;
  let sCount = 0;
   let cCount = 0;

  for (let index = 0; index < allUsers?.length; index++) {

    if (allUsers[index].role === 'admin') {
      aCount++
    } else if (allUsers[index].role === 'normalUser') {
      stdCount++
    } else if (allUsers[index].role === 'doctor') {
      sCount++
    } else if (allUsers[index].role === 'pharmacist') {
      cCount++
    }
  }

  const data = [
    {
      "name": "Admins",
      "count": aCount,

    },
    {
      "name": "Normal Users",
      "count": stdCount,

    },
    {
      "name": "Pharmacists",
      "count": cCount,

    },
    {
      "name": "Doctors",
      "count": sCount,

    },

  ];



  
  
    
    
 



  return (
    <>
   <div className='chartBody'>
   <div className='chartHead'>Users Chart : Registered Users Count is {allUsers?.length}</div><br/>
      <BarChart width={730} height={250} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#f7904a" />
      </BarChart>
   </div>
    </>
  )
}

export default UserChart

