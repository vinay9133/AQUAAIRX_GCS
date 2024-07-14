import React, { useState } from 'react';
import Sidebarone from './Sidebarone';
import { useNavigate } from 'react-router-dom';
import './Groundstation.css';
import { IoMdWarning } from "react-icons/io";
import Topbar from '../components/Topbar';

function Groundstation() {
  const [isForwardingEnabled, setIsForwardingEnabled] = useState(false);
  const navigate = useNavigate();

  return (
    <div className='groundstation-parent'>
    <Topbar />
    <div className='groundstation-child'>
      <Sidebarone />
      <div className='sidebarsec-options'>
        <li className='groundstation' onClick={() => navigate('/groundstation')}>Ground Station</li>
        <li className='mavlink-status' onClick={() => navigate('/mavlinkstatus')}>Mavlink Link Status</li>
        <li className='savedlogfiles' onClick={() => navigate('/savedlogfiles')}>Savedlog files</li>
        </div>.
      <div className='groundstation-content'>
      <div className='wrapper'>
        <div className='system-id'>
          <span id='mav'>Mavlink System ID</span>
          <input type='text' placeholder='255' />
        </div>
        <div className='check'>
          <div className='emit'>
            <input type='checkbox' className='checkbox1' />
            <span>Emit Heartbeat</span>
          </div>
          <div className='protocol'>
            <input type='checkbox' className='checkbox1' />
            <span>Only accept MAVs with same protocol version</span>
          </div>
          <div className='forwarding'>
            <input
              type='checkbox'
              className='checkbox1'
              checked={isForwardingEnabled}
              onChange={() => setIsForwardingEnabled(!isForwardingEnabled)}
            />
            <span>Enable Mavlink Forwarding</span>
          </div>
        </div>
        <div className='hostname'>
          <span>Host name </span>
          <input type='text' placeholder='localhost' disabled={!isForwardingEnabled} className='local' />
         
        </div>
        <h4><IoMdWarning /> Changing the host name requires restart of application</h4>
      </div>
      </div>
      </div>
    </div>
  );
}

export default Groundstation;
