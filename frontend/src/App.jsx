import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './index.css'
import { AuthLogin } from './Login.jsx'
import BrowseDesigns from './BrowseDesigns.jsx'
import { CreateOrder } from './CreateOrder.jsx'
// import { DesignPage } from './components/DesignCard.jsx'

export default function App() {
  return(
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<AuthLogin/>}/>
          <Route path="/designs" element={<BrowseDesigns/>}/>
          <Route path="/createOrder" element={<Create_order />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}