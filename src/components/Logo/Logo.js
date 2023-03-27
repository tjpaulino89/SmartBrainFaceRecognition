import React from "react";
import './Logo.css';
import Tilt from 'react-parallax-tilt';
import Logo from './brainIcon.svg';

const Navigation = () => {
    return (
		<div className="ma4 mt0">
			<Tilt className="Tilt br2 shadow-2" tiltMaxAngleX={45} tiltMaxAngleY={45} style={{ height: '150px', width: '150px'}}>
				<div className="pa3" style={{ }}>
					<img alt="logo" src={Logo} />
				</div>
    		</Tilt>
		</div>

    );
}

export default Navigation;