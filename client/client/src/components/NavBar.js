import React,{useEffect,useState} from 'react';
import "../css/NavBar.css";


import {useStateValue} from "../Stateprovider";
import {useHistory} from "react-router-dom"

function NavBar({ active}) {
     const[{accesToken},dispatch]=useStateValue();
   
   
    const history=useHistory()

   

   

  

   //console.log(intenPoints)
   
   

    return (
        <div className="navbar_com">
        <div className="navbar">
            
            <div onClick={()=>history.push("/")} className={`navbar_element ${active==="home"&&'navbar_element_active' }`}>Home</div>
            <div onClick={()=>history.push("/myactivities")} className={`navbar_element ${active==="act"&&'navbar_element_active' }`}>my activities</div>

           
            <div onClick={()=>history.push("/mysufferscores")} className={`navbar_element ${active==="suf"&&'navbar_element_active' }`}>weekly intensity chart</div>

            

            
        </div>
        


        
        {/* {intenPoints.map((doc)=>(
            <div>{console.log(doc)}</div>
        ))} */}

            
        </div>
    )
}

export default NavBar
