import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Viewconnections.css';
import Sidebarone from './Sidebarone';
import Sidebarsecond from './Sidebarsecond';
import Topbar from './Topbar';

function ViewConnections({ connections, deleteConnection }) {
  const navigate = useNavigate();

  const handleEdit = (connection) => {
    navigate('/add', { state: { connection } });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this connection?')) {
      deleteConnection(id);
    }
  };

  return (
    <div className='view-connections-parent'>
    <Topbar />
    <div className='view-connections-child'>
    <Sidebarone />
    <Sidebarsecond />
    <div className='view-connnection-box'>
    
      {connections.length === 0 ? (
        <p id=''>No connections available</p>) :
        (<div className='connections-list'>
          {connections.map((conn) => (
            <div key={conn.id} className='connection-item'>
              <h2>{conn.name}</h2>
              <p>Type: {conn.type}</p>
              <p>Serial Port: {conn.serialPort}</p>
              <p>Baud Rate: {conn.baudRate}</p>
              <div className='btn-list'>
              <button  className="Btn1" onClick={() => handleEdit(conn)}>Edit</button>
              <button className="Btn2" onClick={() => handleDelete(conn.id)}>Delete</button>
              <button className="Btn3" onClick={() => alert('Connect functionality not implemented')}>Connect</button>
              <button className="Btn4" onClick={() => alert('Disconnect functionality not implemented')}>Disconnect</button>
              </div>
              </div>
          ))}
        </div>
      )}
      </div>
      </div>
    </div>
  );
}

export default ViewConnections;
