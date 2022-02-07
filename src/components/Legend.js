import React from "react";

const Legend = () => {
  return (
    <>
      <div className="legend-title">Users</div>
      <div className="legend-scatter">
        <div className="color1 legend-item">Paid Users</div>
        <div className="color2 legend-item">Regular Users</div>
      </div>
      <div className="legend-geojson ">
        <div className="color1 legend-item">{">200"}</div>
        <div className="color2 legend-item">{"150-200"}</div>
        <div className="color3 legend-item">{"100-150"}</div>
        <div className="color4 legend-item">{"50-100"}</div>
        <div className="color5 legend-item">{"0-50"}</div>
        <div className="color6 legend-item">{"No data"}</div>
      </div>
    </>
  );
};

export default Legend;
