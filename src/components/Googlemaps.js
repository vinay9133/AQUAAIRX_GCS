import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMapEvents, Popup } from 'react-leaflet';
import L from 'leaflet';
import SonarView from '../SonarView';
import 'leaflet/dist/leaflet.css';
import { FaMapMarkerAlt, FaUndo, FaTrash, FaFlag, FaRoute } from 'react-icons/fa';
import { BsRocketTakeoffFill, BsFillCameraReelsFill } from 'react-icons/bs';
import { PiAirplaneLandingFill } from 'react-icons/pi';
import './GoogleMaps.css';

const droneIcon = new L.Icon({
  iconUrl: 'https://cdn.icon-icons.com/icons2/1738/PNG/512/iconfinder-technologymachineelectronicdevice06-4026454_113332.png',
  iconSize: [35, 35],
});

const markerIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/256/3425/3425073.png',
  iconSize: [25, 25],
});

const Googlemaps = () => {
  const initialPosition = [13.1366912, 77.594624];
  const [dronePosition, setDronePosition] = useState(initialPosition);
  const [path, setPath] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [showPlan, setShowPlan] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [waypoints, setWaypoints] = useState([]);
  const [currentWaypointIndex, setCurrentWaypointIndex] = useState(0);
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);

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

  const handleVideoClick = async () => {
    setIsVideoVisible(!isVideoVisible);
    if (!isVideoVisible) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing webcam: ", err);
      }
    } else {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
        setStream(null);
      }
    }
  };

  return (
    <div className="map-container">
      <MapContainer center={dronePosition} zoom={15} style={{ width: '100%', height: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
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
      <div className="sonar">
        <SonarView />
      </div>
      <div className="right-options">
        <button className="card return" onClick={handleReturnClick}>
          <PiAirplaneLandingFill className="symbol" />
          <span className="label">Return</span>
        </button>
        <button className="card plan" onClick={() => setShowPlan(!showPlan)}>
          <FaRoute className="symbol" />
          <span className="label">Plan</span>
        </button>
        <button className="card takeoff" onClick={() => { setCurrentWaypointIndex(0); setIsMoving(true); }}>
          <BsRocketTakeoffFill className="symbol" />
          <span className="label">Take Off</span>
        </button>
        <button className="card video" onClick={handleVideoClick}>
          <BsFillCameraReelsFill className="symbol" />
          <span className="label">Live</span>
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
            <button className="circle-card takeoff" onClick={() => { setCurrentWaypointIndex(0); setIsMoving(true); }}>
              <FaFlag className="symbol" />
              <span className="label">Take Off</span>
            </button>
          </div>
        )}
      </div>
      {isVideoVisible && (
        <div className="video-overlay">
          <video ref={videoRef} width="100%"  autoPlay muted></video>
        </div>
      )}
    </div>
  );
};

export default Googlemaps;
