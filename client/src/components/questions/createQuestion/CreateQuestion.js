import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { GlobalState } from '../../../GlobalState'
import './createQuestion.css'

const CreateQuestion = () => {
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const navigate = useNavigate();


  return (
    <div>CreateQuestion</div>
  )
}

export default CreateQuestion