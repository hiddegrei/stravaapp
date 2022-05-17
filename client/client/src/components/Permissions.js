import React,{useEffect,useState} from 'react';
import "../css/Permissions.css";
import NavBar from "./NavBar";
import {useStateValue} from "../Stateprovider";
import {useHistory} from "react-router-dom"



function Permissions({Notredirect}) {
   const[{accesToken,expires_at,refresh_token},dispatch]=useStateValue();
   const [scopesArr,setScopesArr]=useState([])
   const history=useHistory()
    
    
   useEffect(()=>{
     
       
       
     
       if(accesToken === null && Notredirect){
        let path =window.location.search

       let code1= path.split('&')
       let code2=code1[1].split('=')
       let code=code2[1]
       let scopes=code1[2]
       
       setScopesArr(scopes.split("=")[1].split(","))
       

       console.log("code:",code)


       const data2 = { data: code };

        fetch("/accestoken", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data2),
    })
      .then((response) => response.json())
      .then((data) => {
        //console.log("Success:", data);
        if(data.accesToken != "invalid"){
          console.log(data)
         dispatch({
          type:'SET_ACCESTOKEN',
          accesToken:data.accesToken,
          expires_at:data.expires_at,
          refresh_token:data.refresh_token
        })
        }
        

      })
      .catch((error) => {
        console.error("Error:", error);
      });
    }
    else if(Date.now()/1000 >= expires_at && expires_at != null){
      console.log(Date.now()/1000 , expires_at)
      const data3 = { data: refresh_token };
      fetch("/refreshtoken", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data3),
    })
      .then((response) => response.json())
      .then((data) => {
        //console.log("Success:", data);
        if(data.accesToken != "invalid"){
          console.log(data)
         dispatch({
          type:'SET_ACCESTOKEN',
          accesToken:data.accesToken,
          expires_at:data.expires_at,
          refresh_token:data.refresh_token
        })
        }
        

      })
      .catch((error) => {
        console.error("Error:", error);
      });
      


    }

   },[])
   
    return (
        <div>
           

            {/* <div onClick={()=>listActivities()}>Get my activities</div> */}
            
            


            {/* {activities&&<div className="activities">
              {activities.map((doc,index)=>(
                <Activity data={doc} key={index}/>
              ))}
            </div>} */}
            
        </div>
    )
}

export default Permissions
