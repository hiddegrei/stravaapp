import React,{useEffect, useState} from 'react'
import "../css/Activity.css";
import {useHistory} from "react-router-dom"
 import 'leaflet/dist/leaflet.css';
 import L, { LatLngExpression } from "leaflet";
// import  "https://unpkg.com/leaflet@1.7.1/dist/leaflet.js";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import polyUtil from "polyline-encoded"


function Activity({counter, data,accesToken}) {
    const[athleteId,setAtheleteId]=useState(data.athlete.id)
    const [authAthleteData,setAuthAthleteData]=useState()
    const history=useHistory()
  
   useEffect(()=>{
     console.log(counter)
    
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

      if(data.type === "Ride" || data.type === "Run"){
      let newCoordinates=[[51.47832, 3.526]]
      var mymap = L.map(`map${counter}`).setView(newCoordinates[0], 13);
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
   },[])
    return (
        <div onClick={()=>history.push(`/activity/${data.id}`)} className="act">
            
            <div className="act_header">
                <img className="act_header_img" src={authAthleteData?.profile_medium}></img>
                <p className="act_header_name">{authAthleteData?.firstname}</p>
                

            </div>
            <div className="act_body">
                <h1>{data.name}</h1>
                <div className="act_body_info">
                    <div className="act_body_info_container">
                        <div className="act_body_info_container_option_light">Distance</div>
                        <div className="act_body_info_container_option"> {Math.round(data.distance/1000)}km</div>
                    </div>

                    <div className="act_body_info_container">
                        <div className="act_body_info_container_option_light">average speed</div>
                        <div className="act_body_info_container_option"> {Math.round((data.average_speed*60*60)/1000)}km/h</div>
                    </div>
                   
                </div>

                <div onClick={(e)=>e.stopPropagation()} className="act_body_map">
                    <div id={`map${counter}`} className="map"></div>
                    
                    {/* <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
  <TileLayer
    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Marker position={[51.505, -0.09]}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker>
</MapContainer> */}
                    
                </div>


            </div>
            <div className="act_footer">kudos: {data.kudos_count}</div>
            
            {/* <p>average_heartrate: {data.average_heartrate}</p>
            <p>moving_time: {data.moving_time}</p>
            {(data.type==="Ride")&&<div>
                <p>average_watts: {data.average_watts}</p>
            <p>weighted_average_watts: {data.weighted_average_watts}</p>
            </div>
            }
            <p>suffer_score: {data.suffer_score}</p> */}
            
        </div>
    )
}

export default Activity
