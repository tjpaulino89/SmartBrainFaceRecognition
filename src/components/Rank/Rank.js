import React from "react";

const Rank = ({ userName, userEntries}) => {
    const upperCaseName = userName.toUpperCase();
    return (
		<div className="">
            <div className="f3 white">
                {`${upperCaseName} your current entry count is...`}
            </div>
            <div className="f1 white">
                {`#${userEntries}`}
            </div>
		</div>
    );
}

export default Rank;