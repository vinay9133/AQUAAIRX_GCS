import React from 'react'
import Sidebarone from '../components/Sidebarone'
import { useNavigate } from 'react-router-dom';
import Topbar from '../components/Topbar';

function Console() {
    const navigate = useNavigate();
  return (
    <div>
    <Topbar />
    <Sidebarone /> 
    </div>
  )
}

export default Console