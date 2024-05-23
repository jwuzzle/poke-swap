import React from 'react'

const Quantity = (props) => {
  return (
    <>
    <label htmlFor="trade_quantity">Quantity for Trade:</label>
    <input type="integer" id="trade_quantity" name="trade_quantity" value={props.quantity} onChange={props.update} />
    </>
    )
}

export default Quantity