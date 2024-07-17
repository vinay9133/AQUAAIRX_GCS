import React, { useState, useEffect, useRef } from 'react';
import './Mainpageside.css'
import SonarView from '../SonarView';

function Mainpageside() {
    const [isRadarVisible, setIsRadarVisible] = useState(false);
    const [isVideoVisible, setIsVideoVisible] = useState(false);
    const [stream, setStream] = useState(null);
    const videoRef = useRef(null);

    const handleRadarClick = () => {
        setIsRadarVisible(!isRadarVisible);
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
    <div className='mainpageside-parent'>
        <div className='metrics'>

        </div>
        <div className='camera'>
        {isVideoVisible && (
            <div className="video-overlay">
              <video ref={videoRef} width="100%" autoPlay muted></video>
            </div>
          )}
        </div>
    </div>
  )
}

export default Mainpageside