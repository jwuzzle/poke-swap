import React from 'react'

const PokemonCardWeaknessDetails = (props) => {
  return (
    <>
    <div>Weakness:</div>
        <p>Type: {props.weaknesstype}</p>
        <p>Value: {props.weaknessvalue}</p>
        </>
  )
}


export default PokemonCardWeaknessDetails