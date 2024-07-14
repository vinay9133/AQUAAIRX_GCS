import React from 'react'
import './Savedlogfiles.css'
import Sidebarone from './Sidebarone'
import Topbar from '../components/Topbar';
import { useNavigate } from 'react-router-dom'

function Savedlogfiles() {
    const navigate = useNavigate()
  return (
    <div className='savedlogfiles-parent'>
    <Topbar />
    <div className='savedlogfile'>
    <Sidebarone/>
    <div className='sidebarsec-options'>
          <li className='groundstation2' onClick={() => navigate('/groundstation')}>Ground Station</li>
          <li  className='mavlink-status2' onClick={() => navigate('/mavlinkstatus')}>Mavlink Link Status</li>
          <li className='savedlogfiles2' onClick={() => navigate('/savedlogfiles')}>Savedlog files</li>
    </div>
    <div className='savedlogfiles-child'>
      <h4 id='saved'>Saved Log Files</h4>
      <div className='files'></div>
        <div className='check-btns'>
            <button className='check-btn'>Check All</button>
            <button className='check-btn'>Check None</button>
            <button className='check-btn'>Delete Selected</button>
            <button className='check-btn'>Upload Selected</button>
        </div>  
      </div>
      </div>
    </div>
  )
}

export default Savedlogfiles