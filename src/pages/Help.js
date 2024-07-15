import React from "react";
import './Help.css';
import { RiArrowGoBackLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import Topbar from '../components/Topbar';

function Help() {
    const navigate = useNavigate()
    return (
        <div>
        <Topbar />
            <div className="back">
                <button className="b1" onClick={() => navigate('/')}><RiArrowGoBackLine /></button>
                <div className="help_rectangle">
                    <div className="helpcontent">
                    <h1 className="help-title">Welcome to the AquaAirX</h1>
                        <p>XYZ: <a href="link">link</a></p>
                        <p>XYZ: <a href="link">link</a></p>
                        <p>XYZ: <a href="link">link</a></p>
                        <p>
                            Please visit <a href="https://www.aquaairx.com/">https://www.aquaairx.com/</a> for further information.
                        </p>
                        <p>Main Developer: XYZ</p>
                        <p>Design: XYZ</p>
                        <p>
                            Contributions from: XYZ, ABC, DEF and <a href="https://github.com/ArduPilot/MissionPlanner/graphs/contributors">GitHub Contributors</a>
                        </p>
                        <p>
                            Libraries: Gmap.net, Sharpkml, SharpZipLib, IronPython, KMLib, OpenTK, ZedGraph, alglib, BouncyCastle, DotSpatial, LibVLC, netDXF
                        </p>
                        <p>
                            Companies that have contributed to Mission Planner's development: 3D Robotics, Falcon Unmanned, UAV Solutions
                        </p>
                        <h2>Shortcuts:</h2>
                        <h3>Main Screen</h3>
                        <p>F2 - FlightData</p>
                        <p>F3 - FlightPlanner</p>
                        <p>F4 - Tuning</p>
                        <p>F5 - Refresh full param list</p>
                        <p>Control-F - Temp screen</p>
                        <p>Control-T - Blind connect</p>
                        <h3>FlightData</h3>
                        <p>Control-1 - tab 1</p>
                        <p>Control-2 - tab 2</p>
                        <p>Control-3 - tab 3</p>
                        <p>Control-4 - tab 4</p>
                        <p>Control-5 - tab 5</p>
                        <p>Control-6 - tab 6</p>
                        <p>Control-7 - tab 7</p>
                        <p>Control-8 - tab 8</p>
                        <p>Control-9 - tab 9</p>
                        <p>Control-0 - tab 10</p>
                        <h3>FlightPlanner</h3>
                        <p>Control-Z - undo</p>
                        <p>Control-O - open wp file</p>
                        <p>Control-S - save wp file</p>
                        <h3>AutoWP Grid</h3>
                        <p>Control-O - open grid file</p>
                        <p>Control-S - save grid file</p>
                        <button className="b2">Update</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Help;
