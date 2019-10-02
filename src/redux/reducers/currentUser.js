const defaultState = {logged:false,user:{},loaded:false,lang:"en"};

function reducer(state =defaultState, {type, payload}){
    switch(type){

        case 'findCurrentUser':{
            if(Object.keys(payload).length > 0){
                const ob = {... state,logged:true,user:payload,loaded:true};
                return  ob;
            }else{
                return  {... state,user:payload,loaded:true};
            }
            
        }
        case 'closeCurrentUser':{
            return {...defaultState,loaded:true};
        }

        default:
            return state;
    }
}


export default reducer;