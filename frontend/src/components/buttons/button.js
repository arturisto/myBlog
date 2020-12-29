/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable import/no-anonymous-default-export */
import React,{Fragment} from 'react';


export default function ({title,link, type}){


    return(
            <Fragment>
                <a 
                herf = {link}
                className = {type}
                >{title}
                </a>
            </Fragment>
    )
}