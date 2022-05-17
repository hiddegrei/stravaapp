export const initialState={
    accesToken:null,expires_at:null,refresh_token:null
    
    
}


const reducer=(state,action)=>{
    // console.log(action)
    switch(action.type){
        
            case 'SET_ACCESTOKEN':
             return{
                ...state,accesToken:action.accesToken,expires_at:action.expires_at,refresh_token:action.refresh_token
                 }
                
                 
                    default:return state;     
                
    }
}
export default reducer