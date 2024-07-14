import React from 'react'
import './Sidebarsecond.css'
import { useNavigate } from 'react-router-dom';
import Add from './Add'

function Sidebarsecond() {
  const navigate = useNavigate();

  return (
    <div className='sidebarsec-parent'>
    <div className='general'>
        General:
    </div>
    <div className='sidebarsec-options'>
    <li className='opt' onClick={() => navigate('/add')}>Add</li>
    <li  className='opt' onClick={() => navigate('/view-connections')}>View Connections</li>
    </div>
    </div>
  )
}

export default Sidebarsecond