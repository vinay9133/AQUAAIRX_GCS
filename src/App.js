import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Commlinks from './pages/Commlinks';
import Add from './components/Add';
import ViewConnections from './components/Viewconnections';
import Sidebarone from './components/Sidebarone';
import Sidebarsecond from './components/Sidebarsecond';
import Offlinemaps from './pages/Offlinemaps';
import Mavlink from './pages/Mavlink';
import Groundstation from './components/Groundstation';
import Mavlinkstatus from './components/Mavlinkstatus';
import Savedlogfiles from './components/Savedlogfiles';
import General from './pages/General';
import Console from './pages/Console';
import Homepage from './pages/Homepage';
import Setup from './pages/Setup'


function App() {
  const [connections, setConnections] = useState([]);

  const addConnection = (connection) => {
    setConnections([...connections, connection]);
  };

  const updateConnection = (updatedConnection) => {
    setConnections(
      connections.map((conn) =>
        conn.id === updatedConnection.id ? updatedConnection : conn
      )
    );
  };

  const deleteConnection = (id) => {
    setConnections(connections.filter((conn) => conn.id !== id));
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path = "/" element={<Homepage />} />
          <Route path="/add"element={<Add addConnection={addConnection} updateConnection={updateConnection} />}/>
          <Route path="/view-connections"element={<ViewConnections connections={connections} deleteConnection={deleteConnection} />}/>
          <Route path="/general" element={<General />}/>
          <Route path="/offlinemaps" element={<Offlinemaps />} />
          <Route path="/mavlink" element={<Groundstation/>} />
          <Route path="/console" element={<Console />} />
          <Route path="/groundstation" element={<Groundstation />} />
          <Route path='/mavlinkstatus' element={<Mavlinkstatus />} />
          <Route path='/savedlogfiles' element={<Savedlogfiles />} />
          <Route path='/setup'  element={<Setup />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
