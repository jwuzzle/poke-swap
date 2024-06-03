import React from 'react'

const TradeCards = (props) => {
    return (
        <div className="tradecard">
          <img
            className="tradecard__image"
            src={props.frontimage}
            alt="listed pokemon card picture"
          />
          <div className="tradecard__text-container">
            <p className="tradecard__name">
              {props.name}
            </p>
            <p className="tradecard__username--requester"> Requester: <span className="tradecard__data">{props.requester_name}</span></p>
            <p className="tradecard__username--receiver"> Trade With: <span className="tradecard__data">{props.receiver_name}</span>
            </p>
          </div>
        </div>
      );
    };

export default TradeCards