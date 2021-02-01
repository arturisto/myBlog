/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import "./middleHeadline.scss"

export default function (props){

    return(
        <h1 id={props.id} className="middleHeadline"> {props.text}</h1>
    )
}