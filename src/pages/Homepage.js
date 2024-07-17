import React from 'react'
import { useNavigate } from 'react-router-dom';
import Topbar from '../components/Topbar';
import Googlemaps from '../components/Googlemaps';
import Mainpageside from '../components/Mainpageside';

function Homepage() {
    const navigate = useNavigate();
  return (
    <div>
     <Topbar />
     <Googlemaps />
     <Mainpageside />
    </div>
  )
}

export default Homepage