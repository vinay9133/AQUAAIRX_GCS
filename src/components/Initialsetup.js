import React, { useState } from "react";
import "./Initialsetup.css";
import { Card, CardContent, Typography, Grid, CardMedia } from "@mui/material";
import { BsFillCloudDownloadFill } from "react-icons/bs";
import { BsCloudUploadFill } from "react-icons/bs";

const cardData = [
  {
    title: "Quad Copter (x)",
    description: "Download or Upload Firmware",
    image:
      "https://www.premiumbeat.com/blog/wp-content/uploads/2021/04/DJI_Air2s_Featured.jpg?w=875&h=490&crop=1",
    downloadLink: "https://firmware.ardupilot.org/Copter/2024-06/2024-06-01-00:06/PixPilot-V6/arducopter.apj",
  },
  {
    title: "Quad Copter (H)",
    description: "Download or Upload Firmware",
    image:
      "https://fbi.cults3d.com/uploaders/13759045/illustration-file/cdb771f1-4858-4853-8065-c4bbbb79e52f/DSC00626_display_large.jpg",
    downloadLink: "http://example.com/firmware2",
  },
  {
    title: "ROV Underwater",
    description: "Download or Upload Firmware",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM5bU6LWiW59ftGBdM0ivvQadS_d7y3J6PBQ&s",
    downloadLink: "http://example.com/firmware3",
  },
  {
    title: "Quad Copter (+)",
    description: "Download or Upload Firmware.",
    image: "https://argos-support.s3.eu-west-2.amazonaws.com/images/square/6773386.jpg",
    downloadLink: "http://example.com/firmware4",
  },
];

const Cards = ({ handleUploadClick, handleFileChange }) => (
  <Grid container spacing={2} className="cards-container">
    {cardData.map((card, index) => (
      <Grid item xs={12} sm={6} md={3} key={index}>
        <Card className="setup-cards">
          <CardMedia
            component="img"
            height="150"
            image={card.image}
            alt={card.title}
          />
          <CardContent className="carddesc">
            <Typography gutterBottom variant="h5" component="div">
              {card.title}
            </Typography>
            <Typography variant="body2" component="div">{card.description}</Typography>
            <div className="card-actions">
              <a
                href={card.downloadLink}
                className="download"
                target="_blank" rel="noopener noreferrer">
                <BsFillCloudDownloadFill />
              </a>
              <button
                className="upload"
                onClick={() => handleUploadClick(index)}
              >
                <BsCloudUploadFill />
              </button>
              <input
                id={`upload-input-${index}`}
                type="file"
                style={{ display: "none" }}
                onChange={(event) => handleFileChange(event, index)}
              />
            </div>
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
);

function Initialsetup() {
  const [text, setText] = useState("Disconnected");

  const handleChangeText = () => {
    setText((prevText) =>
      prevText === "Disconnected" ? "Connected" : "Disconnected"
    );
  };

  const handleUploadClick = (index) => {
    document.getElementById(`upload-input-${index}`).click();
  };

  const handleFileChange = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      console.log(`File selected for card ${index}:`, file);
    }
  };

  return (
    <div className="fullpage">

      <div className="cards-container">
        <Cards handleUploadClick={handleUploadClick} handleFileChange={handleFileChange} />
      </div>
    </div>
  );
}

export default Initialsetup;
