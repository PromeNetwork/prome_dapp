import {useEffect ,useMemo, useState,useReducer} from "react";


interface ConnectProps {
    mobileMenuOpen: boolean;
}

const state ={
    mobileMenuOpen:false,
}

function ConnectReducer(state:ConnectProps, action:any) {
    console.log("useMobileMenus")
    switch (action.type) {
        case 'setMobileMenuOpen':
            return {...state, mobileMenuOpen: action.payload}
        default:
            return state
    }
}

export function useMobileMenus(){

    const [connectState, connectDispatch]= useReducer(ConnectReducer,state)
    const setMobileMenuOpen=(arg0:boolean)=>connectDispatch({type:'setMobileMenuOpen', payload:arg0})
    return {
        mobileMenuOpen:connectState.mobileMenuOpen, 
        setMobileMenuOpen:setMobileMenuOpen,
    }
}