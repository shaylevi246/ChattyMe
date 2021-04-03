import React, { useState, useCallback, Fragment } from "react";
import ReactDOM from "react-dom";
import Cropper from "react-easy-crop";
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { addAvatar } from "../../Auth/loginSlicer";

import Typography from "@material-ui/core/Typography";
// import { withStyles } from '@material-ui/core/styles'
import { getCroppedImg } from "./canvasUtils";
import "./Cropper.css";
import { IconButton } from "@material-ui/core";
import { sendCroppedImg } from "../chatSlicer";
import { useDispatch } from "react-redux";
import { dataURLtoFile } from "./dataURLtoFile";

const CropperImg = (props) => {
  const dispatch = useDispatch();
  const modalDoor = false;
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const canvas = await getCroppedImg(imageSrc, croppedAreaPixels);
      const canvasDataUrl = canvas.toDataURL("image/jpeg");
      if (props.from === "chatroom") {
        dispatch(sendCroppedImg(canvasDataUrl));
      }
      if (props.from === "userAvatar") {
        const convertedUrlToFile = dataURLtoFile(
          canvasDataUrl,
          "croppedImage.jpeg"
        );

        const formData = new FormData();
        formData.append("avatar", convertedUrlToFile);

        dispatch(addAvatar(formData));
      }

      return props.modal(modalDoor);
    } catch (e) {
      console.error(e);
    }
  }, [imageSrc, croppedAreaPixels]);

  const onFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      let imageDataUrl = await readFile(file);
      setImageSrc(imageDataUrl);
    }
  };

  return (
    <div>
      {imageSrc ? (
        <Fragment>
          <div>
            <div className="cropContainer">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1 / 1}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>
            <div className="controls">
              <div className="sliderContainer">
                <Typography variant="overline">Zoom</Typography>
                <Slider
                  className="slider"
                  value={zoom}
                  min={1}
                  max={3}
                  step={0.1}
                  aria-labelledby="Zoom"
                  onChange={(e, zoom) => setZoom(zoom)}
                />
              </div>
              <Button
                onClick={showCroppedImage}
                variant="contained"
                color="primary"
              >
                UPDATE
              </Button>
            </div>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <div className="cameraLogo">
            <input
              type="file"
              onChange={onFileChange}
              accept="image/*"
              id="icon-button-file"
            />
            <label htmlFor="icon-button-file">
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <PhotoCamera
                  style={{ width: "30vw", height: "40vh", objectFit: "fit" }}
                />
              </IconButton>
            </label>
          </div>
        </Fragment>
      )}
    </div>
  );
};

function readFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result), false);
    reader.readAsDataURL(file);
  });
}

export default CropperImg;
