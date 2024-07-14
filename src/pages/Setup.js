import React from 'react'
import { useNavigate } from 'react-router-dom'
import Initialsetup from '../components/Initialsetup'
import Topbar from '../components/Topbar';
import './Setup.css'

function Setup() {
  const navigate = useNavigate();
  return (
    <div className='setup-parent'>
    <Topbar />
    <Initialsetup />
    </div>
  )
}

export default Setup