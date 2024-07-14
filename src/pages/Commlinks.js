import React from 'react';
import './Commlinks.css';
import Sidebarone from '../components/Sidebarone';
import Sidebarsecond from '../components/Sidebarsecond';
import { useNavigate } from 'react-router-dom';
import Add from '../components/Add';
import Viewconnections from '../components/Viewconnections';
import Topbar from '../components/Topbar';


function Commlinks() {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className='commlinks-parent'>
      <Topbar />
      <Add />
    </div>
  );
}

export default Commlinks;
