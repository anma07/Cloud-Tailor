import { useState } from 'react'
import './index.css'
import { AuthLogin } from './Login.jsx'
import BrowseDesigns from './BrowseDesigns.jsx'
import { CreateOrder } from './CreateOrder.jsx'

export default function App() {
  return(
    <>
      <CreateOrder />
    </>
  );
}