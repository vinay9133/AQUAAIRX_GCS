import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoSettings } from "react-icons/io5";
import { PiSquaresFourFill } from "react-icons/pi";
import { IoHome } from "react-icons/io5";
import Modal from './Modal';
import './Topbar.css';

function Topbar() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className='topbar-parent'>
      <span className='aquaairx'>AquaAirX</span>
      <IoHome id = 'mapview'onClick={() => navigate('/')}/>
      <PiSquaresFourFill id='squares' onClick={() => setIsModalOpen(true)} />
      <IoSettings id='settings' onClick={() => navigate('/general')} />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

export default Topbar;
