import React from 'react'
import { useActionData, useNavigate } from 'react-router-dom'
import Sidebarone from './Sidebarone'
import './Mavlinkstatus.css'
import Topbar from '../components/Topbar';

function Mavlinkstatus() {
  const navigate = useNavigate()
  return (
    <div className='mavlinkstatus-parent'>
    <Topbar />
    <div className='mavlinkstatus-child'>
    <Sidebarone />
      <div className='sidebarsec-options'>
          <li className='groundstation1' onClick={() => navigate('/groundstation')}>Ground Station</li>
          <li  className='mavlink-status1' onClick={() => navigate('/mavlinkstatus')}>Mavlink Link Status</li>
          <li className='savedlogfiles1' onClick={() => navigate('/savedlogfiles')}>Savedlog files</li>
      </div>
      <div className='mavlink-child'>
      <h1>Mavlink Link Status(Current Vehicle)</h1>
        <div className='message-parent'>
          <div className='messages'>
          <div className='msg1'>
          <span>Total messages sent(computed)  <h4>Not Connected</h4></span>
          </div>
          <div className='msg2'>
          <span>Total messages received <h4>Not Connected</h4> </span>
          </div>
          <div className='msg3'>
          <span>Total messages Loss <h4>Not Connected</h4> </span>
          </div>
          <div className='msg4'>
          <span>Loss Rate <h4>Not Connected</h4> </span>
          </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Mavlinkstatus