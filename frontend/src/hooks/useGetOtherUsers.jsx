import axios from 'axios'
import React, { useEffect } from 'react'
import { setOtherUsers } from '../redux/userSlice';
import { useDispatch } from 'react-redux';
import {BASE_URL} from '../config';

const useGetOtherUsers = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchOtherUsers  = async () =>{
            try {
                axios.defaults.withCredentials=true;
                const res=await axios.get(`${BASE_URL}/api/v1/user/`);
                // store
                console.log("other user -> ",res);
                dispatch(setOtherUsers(res.data));
                
            } catch (error) {
                console.log(error)
            }
        }
        fetchOtherUsers();
    }, [])
    
}

export default useGetOtherUsers
