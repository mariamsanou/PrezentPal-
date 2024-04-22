import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {  Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import WelcomUser from './Welcomepage';

const root = ReactDOM.createRoot(document.getElementById('root'));

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
