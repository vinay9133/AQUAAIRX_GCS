import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMapEvents, Popup } from 'react-leaflet';
import L from 'leaflet';
import SonarView from '../SonarView';
import 'leaflet/dist/leaflet.css';
import { FaRoute } from 'react-icons/fa';
import { BsRocketTakeoffFill, BsFillCameraReelsFill } from 'react-icons/bs';
import { PiAirplaneLandingFill } from 'react-icons/pi';
import { LiaTachometerAltSolid } from "react-icons/lia";
import { GiRadarSweep } from "react-icons/gi";
import { GiPathDistance } from "react-icons/gi";
import { IoMdSpeedometer } from "react-icons/io";
import { MdOutlineTimer } from "react-icons/md";
import { RxHeight } from "react-icons/rx";
import { FaBatteryFull } from "react-icons/fa6";
import { BsWater } from "react-icons/bs";
import './GoogleMaps.css';
import { useNavigate } from 'react-router-dom';

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
  const [isRadarVisible, setIsRadarVisible] = useState(false);
  const [isMetrics, setIsMetrics] = useState(false);
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

  const handleReturnClick = () => {
    const confirmed = window.confirm('Are you sure you want to come back to Home?');
    if (confirmed) {
      setDronePosition(initialPosition);
      setPath([]);
      setCurrentWaypointIndex(0);
      setIsMoving(false);
    }
  };

  const handleMetricsclick = () =>{
    setIsMetrics(!isMetrics);
  }

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

  const handleRadarClick = () => {
    setIsRadarVisible(!isRadarVisible);
  };

  const navigate = useNavigate();

  return (
    <div className="map-container">
      <MapContainer id="map" center={dronePosition} zoom={15} style={{ width: '100%', height: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
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
      {isRadarVisible && (
        <div className="sonar">
          <SonarView />
        </div>
      )}
      <div className="right-options">
        <button className="card return" onClick={handleReturnClick}>
          <PiAirplaneLandingFill className="symbol" />
          <span className="label">Return</span>
        </button>
        <button className="card plan" onClick={() => navigate('/plan')}>
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
        <button className="card radar" onClick={handleRadarClick}>
          <GiRadarSweep className="symbol" />
          <span className="label">Radar</span>
        </button>
        <button className="card meter" onClick={handleMetricsclick}>
          <LiaTachometerAltSolid className="symbol" />
          <span className="label">Metrics</span>
        </button>
      </div>
      {isVideoVisible && (
        <div className="video-overlay">
          <video ref={videoRef} width="100%" autoPlay muted></video>
        </div>
      )}
      {isMetrics && (
      <div className='metrics'>
        <span className='metrics-child'><GiPathDistance /></span>
        <span className='metrics-child'><IoMdSpeedometer /></span>
        <span className='metrics-child'><MdOutlineTimer /></span>
        <span className='metrics-child'><BsWater /></span>
        <span className='metrics-child'><RxHeight /></span>
        <span className='metrics-child'><FaBatteryFull /></span>
      </div>
    )}
    </div>
  );
};

export default Googlemaps;
