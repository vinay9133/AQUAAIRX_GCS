import React, { useState, useEffect } from 'react';
import Sidebarsecond from './Sidebarsecond';
import Sidebarone from './Sidebarone';
import './Add.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { BiSolidErrorAlt } from "react-icons/bi";
import Topbar from './Topbar';

function Add({ addConnection, updateConnection }) {
  const [id, setId] = useState(null);
  const [name, setName] = useState('');
  const [autoConnect, setAutoConnect] = useState(false);
  const [highLatency, setHighLatency] = useState(false);
  const [advancedSettings, setAdvancedSettings] = useState(false);
  const [flowControl, setFlowControl] = useState(false);
  const [type, setType] = useState('Serial');
  const [serialPort, setSerialPort] = useState('COM3');
  const [baudRate, setBaudRate] = useState('57600');
  const [parity, setParity] = useState('None');
  const [dataBits, setDataBits] = useState('8');
  const [stopBits, setStopBits] = useState('1');
  const [showNotification, setShowNotification] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.connection) {
      const { id, name, autoConnect, highLatency, advancedSettings, flowControl, type, serialPort, baudRate, parity, dataBits, stopBits } = location.state.connection;
      setId(id);
      setName(name);
      setAutoConnect(autoConnect);
      setHighLatency(highLatency);
      setAdvancedSettings(advancedSettings);
      setFlowControl(flowControl);
      setType(type);
      setSerialPort(serialPort);
      setBaudRate(baudRate);
      setParity(parity);
      setDataBits(dataBits);
      setStopBits(stopBits);
    }
  }, [location.state]);

  const handleSave = () => {
    if (!name.trim()) {
      setError('Name is required.');
      return;
    }

    const newConnection = {
      id: id ?? Date.now(),
      name,
      autoConnect,
      highLatency,
      type,
      serialPort,
      baudRate,
      advancedSettings,
      flowControl,
      parity,
      dataBits,
      stopBits,
    };

    if (id) {
      updateConnection(newConnection);
    } else {
      addConnection(newConnection);
    }

    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
    setError(''); // Clear the error message after successful save
  };

  return (
    <div className='add-parent'>
      <Topbar />
      <div className='add-parent-child'>
        <Sidebarone />
        <Sidebarsecond />
        <div className='add-box'>
          <h3>{id ? 'Edit Link Configuration' : 'Create New Link Configuration'}</h3>
          {showNotification && <div className='notification'>Connection {id ? 'updated' : 'created'} successfully!</div>}
          <div className='name'>
            <span>Name</span>
            <input
              type='text'
              placeholder='Enter Name'
              className='name-input' 
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (e.target.value.trim()) {
                  setError('');
                }
              }} />
              {error && <div className='error'> {error}</div>}
          </div>
          
          <div className='create'>
            <div className='check-option1'>
              <input
                type='checkbox'
                className='checkbox'
                checked={autoConnect}
                onChange={() => setAutoConnect(!autoConnect)}
              />
              <span className='acs'>Automatically Connect to Start</span>
            </div>
            <div className='check-option2'>
              <input
                type='checkbox'
                className='checkbox'
                checked={highLatency}
                onChange={() => setHighLatency(!highLatency)}
              />
              <span className='acs'>High Latency</span>
            </div>
          </div>
          <div className='selection'>
            <div className='dropdown-type'>
              <div className='type-dropdown'>
                Type
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option>Serial</option>
                  <option>UDP</option>
                  <option>TCP</option>
                  <option>Log Replay</option>
                </select>
              </div>
              <div className='port-dropdown'>
                Serial Port
                <select
                  value={serialPort}
                  onChange={(e) => setSerialPort(e.target.value)}
                >
                  <option>COM3</option>
                  <option>COM4</option>
                  <option>COM6</option>
                  <option>COM7</option>
                  <option>COM8</option>
                  <option>COM9</option>
                </select>
              </div>
              <div className='baud-dropdown'>
                Baud Rate
                <select
                  value={baudRate}
                  onChange={(e) => setBaudRate(e.target.value)}
                >
                  <option>57600</option>
                  <option>2400</option>
                  <option>4800</option>
                  <option>9600</option>
                  <option>14400</option>
                  <option>19200</option>
                  <option>38400</option>
                  <option>56000</option>
                  <option>115200</option>
                  <option>128000</option>
                  <option>230400</option>
                  <option>256000</option>
                  <option>460800</option>
                  <option>500000</option>
                  <option>921600</option>
                </select>
              </div>
            </div>
          </div>
          <div className='check-option3'>
            <input
              type='checkbox'
              className='checkbox3'
              checked={advancedSettings}
              onChange={() => setAdvancedSettings(!advancedSettings)}
            />
            <span className='acs'>Advanced Settings</span>
          </div>
          <div className='check-option4'>
            <input
              type='checkbox'
              className='checkbox4'
              checked={flowControl}
              onChange={() => setFlowControl(!flowControl)}
              disabled={!advancedSettings} // Disabled if advanced settings is not checked
            />
            <span className='acs'>Enable Flow Control</span>
          </div>
          <div className='selection'>
            <div className='dropdown-type'>
              <div className='parity-dropdown'>
                Parity
                <select
                  value={parity}
                  onChange={(e) => setParity(e.target.value)}
                  disabled={!advancedSettings} // Disabled if advanced settings is not checked
                >
                  <option>None</option>
                  <option>Even</option>
                  <option>Odd</option>
                </select>
              </div>
              <div className='data-dropdown'>
                Data Bits
                <select
                  value={dataBits}
                  onChange={(e) => setDataBits(e.target.value)}
                  disabled={!advancedSettings} // Disabled if advanced settings is not checked
                >
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                </select>
              </div>
              <div className='stop-dropdown'>
                Stop Bits
                <select
                  value={stopBits}
                  onChange={(e) => setStopBits(e.target.value)}
                  disabled={!advancedSettings} // Disabled if advanced settings is not checked
                >
                  <option>1</option>
                  <option>2</option>
                </select>
              </div>
            </div>
          </div>
          <div className='save'>
            <button className='ok' onClick={handleSave}>OK</button>
            <button className='cancel' onClick={() => navigate('/')}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Add;
