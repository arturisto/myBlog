/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import "./card.scss"

export default function ({...props}){
    
    return(

            <div className="card m-auto">
                <img src={ props.img_src } className="card-img-top" alt="..."></img>
                <div className="card-body">
                    <h5 className="card-title">{ props.title}</h5>
                    <p className="card-text">{ props.body}</p>
                    <a href={ props.blog_link} className="btn btn-primary">Go somewhere</a>
                </div>
            </div>
     
    )
}