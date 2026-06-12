import appleLogo from './assets/logos/apple-logo.png';
import googleLogo from './assets/logos/google.png';

export function AuthButtons(){
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

export function LoginForm(){
    return (
    <div className="w-full max-w-xs">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-black text-sm font-bold mb-2" for="email">
            Email Address
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="abc@gmail.com" />
        </div>
        <div className="mb-6">
          <label className="block text-black text-sm font-bold mb-2" for="password">
            Password
          </label>
          <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />
          <p className="text-red-500 text-xs italic">Please choose a password.</p>
        </div>
        <div className="flex items-center justify-between">
          <button className="bg-transparent hover:bg-black text-black font-semibold hover:text-white py-2 px-4 border border-black hover:border-transparent rounded" type="button">
            Sign In
          </button>
          <a className="inline-block align-baseline font-bold text-sm text-black hover:text-blue-800 hover:underline" href="#">
            Forgot Password?
          </a>
        </div>
      </form>
    </div>
    );
}

export function AuthLogin() {
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
