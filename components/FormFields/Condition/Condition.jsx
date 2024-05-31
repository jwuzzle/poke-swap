import React from "react";
import { useState } from "react";

const cardConditions = [
  { name: "Near Mint (NM)", value: "Near Mint (NM)" },
  { name: "Lightly Played (LP)", value: "Lightly Played (LP)" },
  { name: "Moderately Played (MP)", value: "Moderately Played (MP)" },
  { name: "Heavily Played (HP)", value: "Heavily Played (HP)" },
  { name: "Damaged (DM)", value: "Damaged (DM)" },
];

const Condition = (props) => {

  return (
    <div className="selector">
      <label htmlFor="condition">Card Condition</label>
      {props.value === "" ? (
        <div className="selector__field">
          <select
            id="condition"
            name="condition"
            required
            value={props.value}
            onChange={props.onchange}
          >
            <option hidden value="">
              Please select
            </option>
            {cardConditions.map((condition, index) => (
              <option key={index} value={condition.value}>
                {condition.name}
              </option>
            ))}
            ;
          </select>
        </div>
      ) : (
        <div className="selector">
          <select
            id="condition"
            name="condition"
            required
            value={props.value}
            onChange={props.onchange}
          >
            <option hidden value="">
              Please select
            </option>
            {cardConditions.map((condition, index) => (
              <option key={index} value={condition.value}>
                {condition.name}
              </option>
            ))}
            ;
          </select>
        </div>
      )}
    </div>
  );
};

export default Condition;
