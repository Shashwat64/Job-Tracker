import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

//Components
import LandingPage from './Components/LandingPage'
import AppLayout, { loader as appLayoutLoader}  from './Components/AppLayout'
import SignIn, { loader as signInLoader } from './Components/SignIn'
import SignUp from './Components/SignUp'
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
    path: '/signin',
    element: <SignIn />,
    loader: signInLoader
  },
  {
    path: '/signup',
    element: <SignUp />
  },
  {
    path:'/app',
    element: <AppLayout />,
    loader: appLayoutLoader,
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