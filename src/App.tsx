// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Root } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
