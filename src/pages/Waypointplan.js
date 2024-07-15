import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { PiAirplaneLandingFill } from 'react-icons/pi';
import { FaMapMarkerAlt, FaUndo, FaTrash } from 'react-icons/fa';
import { BsRocketTakeoffFill } from 'react-icons/bs';
import './Waypointplan.css'
import Topbar from '../components/Topbar';

function Waypointplan() {
  const droneIcon = new L.Icon({
    iconUrl: 'https://cdn.icon-icons.com/icons2/1738/PNG/512/iconfinder-technologymachineelectronicdevice06-4026454_113332.png',
    iconSize: [35, 35],
  });
  
  const markerIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/256/3425/3425073.png',
    iconSize: [25, 25],
  });

  const initialPosition = [13.1366912, 77.594624];
  const [dronePosition, setDronePosition] = useState(initialPosition);
  const [path, setPath] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [showPlan, setShowPlan] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [waypoints, setWaypoints] = useState([]);
  const [currentWaypointIndex, setCurrentWaypointIndex] = useState(0);

  useEffect(() => {
    let interval;
    if (isMoving) {
      interval = setInterval(() => {
        if (currentWaypointIndex < waypoints.length) {
          setDronePosition(prevPosition => {
            const [lat, lng] = prevPosition;
            const [targetLat, targetLng] = waypoints[currentWaypointIndex];

            const step = 0.0001;
            const newLat = lat < targetLat ? Math.min(lat + step, targetLat) : Math.max(lat - step, targetLat);
            const newLng = lng < targetLng ? Math.min(lng + step, targetLng) : Math.max(lng - step, targetLng);

            if (newLat === targetLat && newLng === targetLng) {
              setCurrentWaypointIndex(index => index + 1);
            }
            setPath(prevPath => [...prevPath, [newLat, newLng]]);
            return [newLat, newLng];
          });
        } else {
          setIsMoving(false);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isMoving, waypoints, currentWaypointIndex]);

  const PlanButton = () => {
    useMapEvents({
      click(e) {
        if (showPlan) {
          setMarkers([...markers, e.latlng]);
          setWaypoints([...waypoints, [e.latlng.lat, e.latlng.lng]]);
        }
      },
    });
    return null;
  };

  const clearWaypoints = () => {
    setMarkers([]);
    setWaypoints([]);
    setPath([]);
    setCurrentWaypointIndex(0);
  };

  const removeLastWaypoint = () => {
    setMarkers(markers.slice(0, -1));
    setWaypoints(waypoints.slice(0, -1));
  };

  const handleReturnClick = () => {
    const confirmed = window.confirm('Are you sure you want to come back to Home?');
    if (confirmed) {
      setDronePosition(initialPosition);
      setPath([]);
      setCurrentWaypointIndex(0);
      setIsMoving(false);
    }
  };

  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; // Earth radius in kilometers
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
  };

  const removeWaypoint = (index) => {
    const newMarkers = markers.filter((_, i) => i !== index);
    const newWaypoints = waypoints.filter((_, i) => i !== index);
    setMarkers(newMarkers);
    setWaypoints(newWaypoints);
  };

  return (
    <div className="map-container">
      <Topbar />
      <MapContainer id="waypoint-map" center={dronePosition} zoom={15} style={{ width: '100%', height: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={dronePosition} icon={droneIcon} />
        <Polyline positions={path} color="blue" />
        {markers.map((marker, index) => (
          <Marker key={index} position={marker} icon={markerIcon}>
            <Popup>Point {index + 1}</Popup>
          </Marker>
        ))}
        {showPlan && <PlanButton />}
        <Polyline positions={waypoints} color="red" />
      </MapContainer>
      <div className="fly-options">
        <button className="card return" onClick={handleReturnClick}>
          <PiAirplaneLandingFill className="symbol" />
          <span className="label">Return</span>
        </button>
        <button className="card plan" onClick={() => setShowPlan(!showPlan)}>
          <FaMapMarkerAlt className="symbol" />
          <span className="label">Mark</span>
        </button>
        <button className="card takeoff" onClick={() => { setCurrentWaypointIndex(0); setIsMoving(true); }}>
          <BsRocketTakeoffFill className="symbol" />
          <span className="label">Take Off</span>
        </button>
        {showPlan && (
          <div className="circle-controls">
            <button className="circle-card mark" onClick={() => setShowPlan(true)}>
              <FaMapMarkerAlt className="symbol" />
              <span className="label">Mark</span>
            </button>
            <button className="circle-card remove" onClick={removeLastWaypoint}>
              <FaUndo className="symbol" />
              <span className="label">Remove</span>
            </button>
            <button className="circle-card clear" onClick={clearWaypoints}>
              <FaTrash className="symbol" />
              <span className="label">Clear</span>
            </button>
          </div>
        )}
      </div>
      {waypoints.length > 0 && (
        <div className="waypoint-table">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Latitude</th>
                <th>Longitude</th>
                <th>Altitude</th>
                <th>Distance (km)</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {waypoints.map((waypoint, index) => {
                const distance = index === 0
                  ? calculateDistance(initialPosition[0], initialPosition[1], waypoint[0], waypoint[1])
                  : calculateDistance(waypoints[index - 1][0], waypoints[index - 1][1], waypoint[0], waypoint[1]);
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{waypoint[0]}</td>
                    <td>{waypoint[1]}</td>
                    <td>{(dronePosition[2] || 0).toFixed(2)}</td>
                    <td>{distance.toFixed(2)}</td>
                    <td>
                      <button onClick={() => removeWaypoint(index)}>X</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Waypointplan;
