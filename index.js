import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {  Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));

import WelcomUser from './Welcomepage';



//WelcomUser to be the first page so it allows the user to be saved and allow signing out
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    
     <Route path="/" element={<WelcomUser />} />



     </>
  )
)
root.render(
  <React.StrictMode>
    <RouterProvider router = {router}>
    <App />
    </RouterProvider>
  </React.StrictMode>
);

reportWebVitals();