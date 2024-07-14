
import React from 'react';
import { FaScrewdriverWrench } from "react-icons/fa6";
import { MdHelp } from "react-icons/md";
import { GrDocumentConfig } from "react-icons/gr";
import { GrNotes } from "react-icons/gr";
import './Modal.css';
import { useNavigate } from 'react-router-dom';

function Modal({ isOpen, onClose }) {
    const navigate = useNavigate();
  if (!isOpen) return null;

  
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        <div className="square-box">
          <button className="square-button" onClick={() => navigate('/setup')}><FaScrewdriverWrench className='screw'/><span className='setup'>Setup</span></button>
          <button className="square-button"><GrNotes className='notes'/><span className='tools'>Analyze Tools</span></button>
          <button className="square-button"><GrDocumentConfig className='set' /><span className='config'>Config</span></button>
          <button className="square-button"><MdHelp className='questionmark'/><span className='help'>Help</span></button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
