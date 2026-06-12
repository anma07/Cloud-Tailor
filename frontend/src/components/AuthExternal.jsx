import appleLogo from '../assets/logos/apple-logo.png';
import googleLogo from '../assets/logos/google.png';

export default function AuthExternal(){
  return (
    <>
      <button type="button" className="w-full max-w-xs block border bg-transparent hover:bg-black hover:text-white py-2 px-8 rounded">
        <img src={googleLogo} alt="Apple Logo" className="w-5 h-5 mr-2 inline hover:white"/>
        Continue with Google
      </button>
      <button type="button" className="w-full max-w-xs block border bg-transparent hover:bg-black hover:text-white py-2 px-8 rounded">
        <img src={appleLogo} alt="Apple Logo" className="w-5 h-5 mr-2 inline hover:white"/>
        Continue with Apple
      </button>
    </>
  );
}
