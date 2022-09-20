import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GlobalState } from '../../../GlobalState'
import './PharmacyDrugsList.css'

const PharmacyDrugsList = () => {
  const state = useContext(GlobalState)
  const [userDetails] = state.userAPI.userDetails
  const [drugs, setDrugs] = useState([]);
  console.log("🚀 ~ file: PharmacyDrugsList.js ~ line 10 ~ PharmacyDrugsList ~ drugs", drugs)

  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [callback, setCallback] = useState(true);
  const [search, setSearch] = useState('');
  console.log("🚀 ~ file: Questions.js ~ line 17 ~ Questions ~ search", search)
  const [showBtn, setShowButton] = useState(false)

  const handleSearch = (e) => {
    setSearch(e.target.value)
    setShowButton(true)
  }

  const handleResetSearch = (e) => {
    setSearch(e.target.value = '')
    setShowButton(false)
    setCallback(true)
  }


  const handleOnClickSearch = () => {
    setCallback(true)
  }


  useEffect(() => {

    const getAllDrugs = async () => {
      await axios.get(`http://localhost:8080/api/drugs/`).then((res) => {
        console.log(res);
        setDrugs(res.data.allDrugs);
      }).catch((err) => {
        alert(err.massage);
      })

    }

    getAllDrugs();

  }, [])


  const navigateToCreateQuestion = () => {
    navigate('/createQuestion')
  }
  return (
    <div>
      <div className='Qbody'>
        <div className='QTop'>
          <div className='QRow1'><input onChange={handleSearch} className="inputs" value={search} type="text" name="search" placeholder='Search' />
            <button className="btnOrange" onClick={handleOnClickSearch} >Search</button>
            {
              showBtn && <button onClick={handleResetSearch} className="btnRed"  >Reset</button>
            }

          </div>
          <div className='QRow2 QAlingLeft'> <button className="btnGreen">Get Report</button>
          </div>
        </div>
        <div>
          <div>
            <center>
          <div className="PhTBody">
            <table id="PhTable">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Drug Name</th>
                  <th>Quantity</th>
                  <th>Drug price</th>
                  <th>       </th>



                </tr>
              </thead>
              <tbody>
                {drugs.map(drugs => (
                  <tr key={drugs.id}>
                    <td>{drugs._id}</td>
                    <td>{drugs.DrugName}</td>
                    <td>{drugs.DrugQuantity}</td>
                    <td>{drugs.DrugPrice}</td>
                    <td>
                      <button className="btnOrange">Edited</button>
                      <button className="cancelBtn">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          </center>
          </div>
        </div>

      </div>
    </div>
  )
}

export default PharmacyDrugsList