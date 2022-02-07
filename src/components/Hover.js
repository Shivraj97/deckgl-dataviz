import React from "react";
import { tooltipStyle } from "../style";

const Hover = ({ hover }) => {
  return (
    <div
      style={{
        ...tooltipStyle,
        transform: `translate(${hover.x}px, ${hover.y}px)`,
      }}
    >
      <div class="tooltip-details">
        <div class="area-name">
          {hover.hoveredObject.name ? hover.hoveredObject.name : ""}
        </div>{" "}
        <div class="label">
          Pincode:{" "}
          <span>
            {hover.hoveredObject.pin_code ? hover.hoveredObject.pin_code : "NA"}{" "}
          </span>{" "}
        </div>{" "}
        <div class="label">
          {" "}
          Total users:
          <span>
            {hover.hoveredObject.users ? hover.hoveredObject.users : "NA"}
          </span>{" "}
        </div>{" "}
        <div class="label">
          Male users:{" "}
          <span>
            {hover.hoveredObject.maleUsers
              ? hover.hoveredObject.maleUsers
              : "NA"}{" "}
          </span>
          👦{" "}
        </div>{" "}
        <div class="label">
          Female uesrs:{" "}
          <span>
            {hover.hoveredObject.femaleUsers
              ? hover.hoveredObject.femaleUsers
              : "NA"}
          </span>{" "}
          👧
        </div>
        <div class="label">
          Paid users:{" "}
          <span>
            {hover.hoveredObject.proUsers ? hover.hoveredObject.proUsers : "NA"}
          </span>{" "}
          💲
        </div>
      </div>
    </div>
  );
};

export default Hover;
