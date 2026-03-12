import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

//Components
import LandingPage from './Components/LandingPage'
import AppLayout from './Components/AppLayout'
import Dashboard from './Components/MainNavChildren/Dashboard'
import Jobs from './Components/MainNavChildren/Jobs'
import Interview from './Components/MainNavChildren/Interview'
import SavedResume from './Components/MainNavChildren/SavedResume'
import SurveyRequest from './Components/MainNavChildren/SurveyRequest'
import Events from './Components/MainNavChildren/Events'
import ReportAnExit from './Components/MainNavChildren/ReportAnExit'
import Settings from './Components/MainNavChildren/Settings'
import Profile from './Components/MainNavChildren/Profile'

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
      },
      {
        path:'jobs',
        element: <Jobs/>
      },
      {
        path:'interview',
        element: <Interview/>
      },
      {
        path:'saved-resume',
        element: <SavedResume/>
      },
      {
        path:'survey-request',
        element: <SurveyRequest/>
      },
      {
        path:'events',
        element: <Events/>
      },
      {
        path:'report-an-exit',
        element: <ReportAnExit/>
      },
      {
        path:'settings',
        element: <Settings/>
      },
      {
        path:'profile',
        element: <Profile/>
      },
    ]
  }
])