import React from 'react'

const Quantity = (props) => {

  const handleChange = (event) => {
    props.setQuantity(event.target.value);
  }

  return (
    <>
    <label htmlFor="trade_quantity">Quantity for Trade:</label>
    <input type="number" id="trade_quantity" name="trade_quantity" value={props.quantity} onChange={handleChange} />
    </>
    )
}

export default Quantity