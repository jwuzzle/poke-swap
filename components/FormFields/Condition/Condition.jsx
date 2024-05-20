import React from 'react'

const cardConditions = ["Near Mint (NM)", "Lightly Played (LP)", "Moderately Played (MP)", "Heavily Played (HP)", "Damaged (DM)"]

const Condition = () => {
  return (
    <>
    <label htmlFor="condition">Card Condition</label>
    <select id="condition" name="condition">
        {cardConditions.map((condition, index) =>( 
            <option key={index}>{condition}</option>
        ))}
    </select>
    </>
  )
}

export default Condition