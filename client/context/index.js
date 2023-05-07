import axios from 'axios';
import { useRouter } from 'next/router';

import {  createContext, useReducer, useEffect } from 'react'
import { resolve } from 'styled-jsx/css';


const initialState = {
    user: null,

};

const Context = createContext();

const rootReducer = (state, action) => {
    switch(action.type){
        case "LOGIN":
            return {...state, user: action.payload };
        case "LOGOUT":
            return {...state, user: null};
        default: 
            return state
    }
}


const Provider = ({children}) => {
    
    const router = useRouter();
    const [state, dispatch] = useReducer(rootReducer, initialState)

    useEffect(() => {
        dispatch({
            type:"LOGIN",
            payload: JSON.parse(window.localStorage.getItem('user'))
        })
    }, [])

    axios.interceptors.response.use(
        function(response) {
            return response
        },
        function(error) {
            let res = error.response;
            if(res.status === 401 && res.config && !res.config._isRetryRequest){
                return new Promise((resolve, reject) => {
                    axios.get('/api/logout')
                    .then((data) => {
                        dispatch({type:"LOGOUT"})
                        window.localStorage.removeItem('user')
                        router.push('/login')
                    })
                    .catch(err => {
                        console.log("Axios Interceptors error", err)
                        reject(error)
                    })
                })
            }
            return Promise.reject(error)
        }
    )

    useEffect(() => {
        const getCsrfToken = async () => {
            const { data } = await axios.get("/api/csrf-token")
            console.log("Csurf", data)
            axios.defaults.headers["X-CSRF-TOKEN"] = data.getCsrfToken;
        }

        getCsrfToken();
    }, []);

    return(
        <Context.Provider value = {{ state, dispatch}}>{children}
        </Context.Provider>
    )
}


export {Context, Provider}