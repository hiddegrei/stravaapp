import React, { useState } from "react";

import "../css/Home.css"




function Home() {
  
  const [scope, setScope] = useState("profile:read_all,activity:read");
    
  

  function firee() {
    const data2 = { data: scope };
   

    window.open(`https://www.strava.com/oauth/authorize?client_id=74263&redirect_uri=http://localhost:3000/exchange_token&response_type=code&approval_prompt=force&scope=${scope}`,"_self")
    
  }
  return (
    <div className="home">
      <h1 className="home_title">GRETRAINING</h1>

      
    {/* <select onChange={(e)=>setScope(e.target.value)} name="type">
        <option value="read"   >read</option>
  <option value="read_all"  >read_all</option>
  <option value="profile:read_all"   >profile:read_all</option>
  <option value="profile:write"   >profile:write</option>
  <option value="activity:read"   >activity:read</option>
  <option value="activity:read_all"   >activity:read_all</option>
  <option value="activity:write"  >activity:write</option>
  <option value="read,read_all,profile:read_all,profile:write,activity:read,activity:read_all,activity:write"  >all</option>

    </select> */}
    

    <button className="home_login" onClick={()=>firee()} type="submit">log in</button>


    
  
  
  

    </div>
  );
}

export default Home;