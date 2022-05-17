import React, { useState, useEffect } from "react";
import Home from "./Home";
import Permissions from "./Permissions"
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import ActivityDetails from "./ActivityDetails";
import NavBar from "./NavBar"
import MyActivities from "./MyActivities"
import MySufferScores from "./MySufferScores"

function App() {
  

  
  return (
   <Router>
   <div className="app">
    
     

     <Switch>

       <Route path="/exchange_token" >
           <NavBar active="home"/>
           <Permissions Notredirect/>
         </Route>

         <Route path="/activity/:id" >
           <Permissions/>
           <NavBar active="act"/>
           <ActivityDetails/>
           
         </Route>

         <Route path="/myactivities" >
           <Permissions/>
           <NavBar active="act"/>
           <MyActivities/>

         </Route>

         <Route path="/mysufferscores" >
           <Permissions/>
           <NavBar active="suf"/>
           <MySufferScores/>
         </Route>



       <Route path="/" >
           <Home/>
         </Route>

         
         
       
     </Switch>

      
     

      
  
    </div>
   
   </Router>
    
    
  )
}

export default App;
