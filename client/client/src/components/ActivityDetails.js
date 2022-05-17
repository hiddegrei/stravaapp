import React,{useState,useEffect} from 'react';
import {useStateValue} from "../Stateprovider";
import {useHistory, useParams} from "react-router-dom"
import "../css/Activity.css"
import L, { LatLngExpression } from "leaflet";
import polyUtil from "polyline-encoded"

function ActivityDetails() {
    const[{accesToken},dispatch]=useStateValue();
    const {id}=useParams();
    const [authAthleteData,setAuthAthleteData]=useState()
    const [data,setData]=useState(false)

    useEffect(()=>{

        const data = { token: accesToken,id:id };
    fetch("/getactivity", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
       body: JSON.stringify(data),
      
    })
      .then((response) => response.json())
      .then((data) => {
        //console.log("Success, Data:", data);
        //console.log(data.data[0])
      
        setData(data.data)
        
        }).catch((error) => {
        console.error("Error:", error);
      });

    
    const data2 = { data: accesToken };
    fetch("/getauthathlete", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
       body: JSON.stringify(data2),
      
    })
      .then((response) => response.json())
      .then((data) => {
        //console.log("Success, Data:", data);
        //console.log(data.data[0])
      
        setAuthAthleteData(data.data)
        }).catch((error) => {
        console.error("Error:", error);
      });

     

   },[])

   useEffect(()=>{
      if(data && (data.type === "Ride" || data.type === "Run" || data.type === "Walk")){
           

         let newCoordinates=[[51.47832, 3.526]]
      var mymap = L.map("mape").setView(newCoordinates[0], 13);
      L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoicGlldGcxMjM0IiwiYSI6ImNrd2RocDFidzQ0eHUzMHJveGNmY2UyYnAifQ.r2rclJ70-a9SMFZRZQ8H8w'
}).addTo(mymap);

//console.log(data.summary_polyline)
var coordinates = polyUtil.decode(data.map.summary_polyline)


for(let i=0;i<coordinates.length;i++){
newCoordinates[i]={lat:coordinates[i][0], lng:coordinates[i][1]}
}
//console.log(newCoordinates)

L.polyline(newCoordinates,{
    color:"red",
    weight:5,
    opacity:.7,
    lineJoin: "round"
}).addTo(mymap)

      }
   },[data])

    return (
        <div  className="act">
            <div className="act_header">
                <img className="act_header_img" src={authAthleteData?.profile_medium}></img>
                <p className="act_header_name">{authAthleteData?.firstname}</p>
                

            </div>
            <div className="act_body">
                <h1>{data.name}</h1>
                

                <div className="act_body_map">
                    <div id="mape" className="map"></div>
                </div>


            </div>
            <div className="act_footer">kudos: {data.kudos_count}</div>

            <div className="act_body_info">
                     
                    <div className="act_body_info_container">
                        <div className="act_body_info_container_option_light">Distance</div>
                        <div className="act_body_info_container_option"> {Math.round(data.distance)/1000}km</div>
                    </div>

                    <div className="act_body_info_container">
                        <div className="act_body_info_container_option_light">Average speed</div>
                        <div className="act_body_info_container_option"> {Math.round((data.average_speed*60*60)/1000)}km/h</div>
                    </div>

                    <div className="act_body_info_container">
                        <div className="act_body_info_container_option_light">average heartrate</div>
                        <div className="act_body_info_container_option"> {data.average_heartrate}bpm</div>
                    </div>

                    <div className="act_body_info_container">
                        <div className="act_body_info_container_option_light">average speed</div>
                        <div className="act_body_info_container_option"> {Math.round((data.average_speed*60*60)/1000)}km/h</div>
                    </div>

                    <div className="act_body_info_container">
                        <div className="act_body_info_container_option_light">moving time</div>
                        <div className="act_body_info_container_option"> {data.moving_time/60}minutes</div>
                    </div>

                     <div className="act_body_info_container">
                        <div className="act_body_info_container_option_light">moving time</div>
                        <div className="act_body_info_container_option"> {data.moving_time/60}minutes</div>
                    </div>
            </div>

            <div className="act_body_info">
              {(data.type==="Ride")&&<div className="act_body_info_container">
                        <div className="act_body_info_container_option_light">average watts</div>
                        <div className="act_body_info_container_option"> {data.average_watts}w</div>
                    </div>}
               {(data.type==="Ride")&&<div className="act_body_info_container">
                        <div className="act_body_info_container_option_light">weighted average watts</div>
                        <div className="act_body_info_container_option"> {data.weighted_average_watts}w</div>
                    </div>}     

            </div>
            <div className="act_body_info">
              <div className="act_body_info_container">
                        <div className="act_body_info_container_option_light">suffer score</div>
                        <div className="act_body_info_container_option"> {data.suffer_score}</div>
                    </div>
            </div>
            
            
            
            
            
            
        </div>
    )
}

export default ActivityDetails
