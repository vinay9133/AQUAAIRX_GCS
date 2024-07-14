import React from 'react'
import './Sidebarone.css'
import { RiArrowGoBackFill } from "react-icons/ri";
import { Navigate,useNavigate } from 'react-router-dom';
function Sidebarone() {
  const navigate = useNavigate();
  return (
    <div className='sidebar-parent'>
        <div className="back-btn">
        <RiArrowGoBackFill className='settings' onClick={()=> navigate('/')}/> Site Settings
        </div>
        <div className='sidebar-options'>
            <li className='options' onClick={()=> navigate('/general')}>General</li>
            <li className='options' onClick={() => navigate('/add')}>Commlinks</li>
            <li className='options' onClick={() => navigate('/offlinemaps')}>Offline Maps</li>
            <li className='options' onClick={() => navigate('/groundstation')}>Mav Link</li>
            <li className='options' onClick={() => navigate('/console')}>Console</li>
        </div>
    </div>
  )
}

export default Sidebarone