import React from 'react'
import { useNavigate } from 'react-router-dom';
import Sidebarone from '../components/Sidebarone';
import './Offlinemaps.css'
import Topbar from '../components/Topbar';

function Offlinemaps() {
  return (
    <div className='offlinemaps-parent'>
    <Topbar />
    <div className='offlinemaps-child'>
      <Sidebarone />
    </div>
    </div>
  )
}

export default Offlinemaps