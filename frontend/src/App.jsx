import { useState } from 'react'
import './index.css'
import { AuthButtons, LoginForm } from './login.jsx'

function App() {
}

export default function AuthLogin() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <p>Choose a way to sign in: </p>
      <AuthButtons />
      <LoginForm />
      <p>Don't have an account?</p>
      <a className="inline-block align-baseline font-bold text-m text-blue-800 hover:text-blue-500 hover:underline" href="#">
            Create Account
      </a>
    </div>
  );
}
