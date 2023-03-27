import React from "react";
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onPictureSubmit }) => {
    return (
		<div className="ma3">
			<p className="f3">The Magic Brain will detect faces in your pictures. Give it a try!</p>
			<div className="flex justify-center">
				<div className="form outline pa4 br3 shadow-5 f4">
					<input className="w-70 pa2" type='text' onChange={onInputChange}/>
					<button className="w-30 grow pa2 white bg-light-purple" onClick={onPictureSubmit}>Detect</button>
				</div>
			</div>
		</div>
    );
}

export default ImageLinkForm;