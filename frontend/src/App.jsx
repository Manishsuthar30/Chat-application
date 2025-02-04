import Signup from './components/Signup'
import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom" 
import HomePage from './components/HomePage'
import Login from './components/Login'
import io from "socket.io-client"; 
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { setSocket } from './redux/socketSlice'
import { setOnlineUsers } from './redux/userSlice'
import {BASE_URL} from './config'

const router = createBrowserRouter([
  {
    path:"/",
    element:<HomePage/>
  },
  {
    path:"/signup",
    element:<Signup/>
  },
  {
    path:"/login",
    element:<Login/>
  },
])

function App() {
  const {authUser}= useSelector(store=>store.user);
  const {socket}= useSelector(store=>store.socket);

  const dispatch = useDispatch();
  useEffect(()=>{
    if(authUser){
      const socket = io(`${BASE_URL}`,{
        query:{userId:authUser._id}
      });
      dispatch(setSocket(socket))

      socket?.on('getOnlineUsers',(onlineUsers)=>{
        dispatch(setOnlineUsers(onlineUsers))
      })
      return ()=> socket.close();
    }else{
      if(socket){
        socket.close();
        dispatch(setSocket(null));
      }
    }
  },[authUser]);
  return (
    <div className='p-4 h-screen flex items-center justify-center'>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
