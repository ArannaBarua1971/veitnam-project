import {createSlice} from "@reduxjs/toolkit"

const initialState={
    status:false,
    userData:null
}


export const currentUserSlice= createSlice({
    name:"current_user",
    initialState,
    reducers:{
        login:(state,action)=>{
            state.status=true
            state.userData=action.payload;
            localStorage.setItem('userInfo',JSON.stringify(state.userData))
        },
        logout:(state)=>{
            state.status=false
            state.userData=null
            localStorage.setItem('userInfo',"")
        }
    }
})

export const {login,logout}=currentUserSlice.actions

export default currentUserSlice.reducer