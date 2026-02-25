import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

//Components
import LandingPage from './Components/LandingPage'
import AppLayout from './Components/AppLayout'
import Dashboard from './Components/Dashboard'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />
  },
  {
    path:'/app',
    element:<AppLayout/>,
    children:[
      {
        index:true,
        element: <Navigate to="dashboard" replace />
      },
      {
        path:'dashboard',
        element: <Dashboard/>
      }
    ]
  }
])