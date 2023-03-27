import React from "react";
import './FaceRecognition.css'

const FaceRecognition = ({ imageUrl, boundingBoxes }) => {

  return (
    <div className="relative flex justify-center">
      <div className = "absolute ma3 mw6">
        <img id='inputimage' alt='' src={imageUrl} />
        {
          boundingBoxes.map((box, i) => {
            return <div className="bounding-box" key={i} 
              style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
          })
        }
      </div>
    </div>
  );
}

export default FaceRecognition;