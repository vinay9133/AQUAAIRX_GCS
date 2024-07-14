import React from 'react'
import Sidebarone from '../components/Sidebarone'
import { useNavigate } from 'react-router-dom';
import './Mavlink.css'


function Mavlink() {
  const navigate = useNavigate();
  return (
    <div className='mavlink-parent'>
    
    <Sidebarone />
        <div className='sidebarsec-options'>
            <li className='groundstation' onClick={() => navigate('/groundstation')}>Ground Station</li>
            <li  className='mavlink-status' onClick={() => navigate('/mavlinkstatus')}>Mavlink Link Status</li>
        </div>
    </div>
  )
}

export default Mavlink