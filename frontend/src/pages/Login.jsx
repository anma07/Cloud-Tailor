import AuthExternal from '../components/AuthExternal.jsx';
import LoginForm from '../components/LoginForm.jsx';

export default function AuthLogin() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <p>Choose a way to sign in: </p>
      <AuthExternal />
      <LoginForm />
      <p>Don't have an account?</p>
      <a
        className="inline-block align-baseline font-bold text-m text-blue-800 hover:text-blue-500 hover:underline"
        href="#"
      >
        Create Account
      </a>
    </div>
  );
}
