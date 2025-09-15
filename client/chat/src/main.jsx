import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from "react";
import ReactDom from "react-dom";
import App from './App.jsx'
import {CssBaseline} from "@mui/material";

createRoot(document.getElementById('root')).render(
  <>
    <CssBaseline />
    <App />
  </>,
)
