const initialState={
    userDetails:'',
    viewTicket:false
}
const reducer = (state=initialState,action)=>{
    if(action.type==="userDetails"){
        return{
            ...state,
            userDetails:action.value
        }
    }
    
    if(action.type==="viewTickets"){
        console.log(state.viewTicket)
        console.log(action.value);
        return{
            ...state,
            viewTicket:action.value
        }
    }
    return state
}
export default reducer;