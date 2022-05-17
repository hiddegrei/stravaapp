import React,{useEffect, useState} from 'react'
import {useStateValue} from "../Stateprovider";
import Chart from "react-google-charts";
import "../css/MySufferScores.css"

function MySufferScores() {
    const[{accesToken}]=useStateValue();
    const [intenPoints,setIntenPoints]=useState([])
    const [length,setLength]=useState()
    const [showChart,setShowChart]=useState(false)

    
 
    useEffect(()=>{

    
       console.log(accesToken)
    const data2 = { data: accesToken };
    fetch("/listactivities", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data2),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success, Data:", data);
        console.log(data)
        let currentEndWeek=new Date()
        //console.log(currentEndWeek)
        let day=currentEndWeek.getDay()
        
        if(day === 0){
            currentEndWeek = (Date.now()/1000) - 604800
        }else{
            currentEndWeek= new Date(currentEndWeek.setDate(currentEndWeek.getDate() + (7-day)-6));
            //console.log(currentEndWeek)
            currentEndWeek= currentEndWeek.getTime()/1000 
        }

        let currentWeekScore=0
        let currentWeekIndex =0
        
        for (let i=0;i<data.data.length;i++){
            //console.log(data.data[i])
            let date= new Date(data.data[i].start_date_local).getTime()/1000;
           
            
            //console.log(currentEndWeek, date)
            //console.log(data.data[i].suffer_score)
            
            if(date>=currentEndWeek){
               currentWeekScore += data.data[i].suffer_score
               //console.log(currentWeekScore)

            }
            if(date< currentEndWeek || i === data.data.length-1) {
                //console.log("endscore:",currentWeekScore)
               setIntenPoints((doc)=>{
              let oldData=doc;
              let newData=[currentWeekIndex ,currentWeekScore]
              return [...oldData,newData]
          })
          currentWeekIndex += 1
          currentEndWeek= currentEndWeek - 604800
          currentWeekScore = data.data[i].suffer_score
            }
            
        }
        setLength(currentWeekIndex)
         
        
        }).catch((error) => {
        console.error("Error:", error);
      });
      },[])

      

   

   useEffect(()=>{
      
     if(intenPoints.length === length){
         console.log(intenPoints)
         let newArr=[["time", "suffer score"]]
         let counter=1
        for (let i=intenPoints.length-1;i>=0;i--){
            newArr[counter] = [counter-1,intenPoints[i][1]]
            counter +=1
        }
        console.log(newArr)
        setIntenPoints(newArr)
        setShowChart(true)
     }
  },[length,intenPoints])
    return (
        <div className="suffer">

           {showChart&&
            <Chart
          width={"600px"}
          height={"500px"}
          chartType="LineChart"
          loader={<div>Loading Chart</div>}
          data={intenPoints
            
           
          }
          options={{
            title: "Suffer scores",
            hAxis: { title: "time", titleTextStyle: { color: "#333" } },
            vAxis: { minValue: 0, maxValue: 200 },

            // For the legend to fit, we make the chart area smaller
            //chartArea: { width: '50%', height: '70%' },
            // lineWidth: 25
          }}
        />}
            
        </div>
    )}


export default MySufferScores
