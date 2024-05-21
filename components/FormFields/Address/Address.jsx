import React from "react";

const states = [ "AK", "AL", "AR", "AS", "AZ", "CA", "CO", "CT", "DC", "DE", "FL", "GA", "GU", "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MN", "MO", "MP", "MS", "MT", "NC", "ND", "NE", "NH", "NJ", "NM", "NV", "NY", "OH", "OK", "OR", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UM", "UT", "VA", "VI", "VT", "WA", "WI", "WV", "WY" ]

const Address = () => {

  return (
    <div className="address">
      <div className="address__street">
        <label className="address__label">Street Address</label>
        <input type="text" name="street_address" />
        <label className="address__label">Street Address2</label>
        <input type="text" name="street_address2" />
      </div>
      <div className="address__city-state-zip">
        <label className="address__label">City</label>
        <input type="text" name="city" />
        <label className="address__label">State</label>
        <select id="state" name="state">
        {states.map((state, index) =>( 
            <option key={index}>{state}</option>
        ))}
    </select>
    <label className="address__label">Zipcode</label>
        <input type="text" name="zipcode" />
      </div>
    </div>
  );
};

export default Address;
