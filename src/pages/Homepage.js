import React from 'react'
import { useNavigate } from 'react-router-dom';
import Topbar from '../components/Topbar';
import Googlemaps from '../components/Googlemaps';

function Homepage() {
    const navigate = useNavigate();
  return (
    <div>
    <Topbar />
    <Googlemaps />
    </div>
  )
}

export default Homepage