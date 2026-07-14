import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?.id;
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="bg-slate-900 border-b border-purple-900/40 px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-lg tracking-wide">
      {/* Logo / Brand Name */}
      <div className="flex items-center">
        <Link
          to="/"
          className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-violet-400 to-fuchsia-400 hover:opacity-90 transition"
        >
          Cloud Tailor
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex items-center gap-2">
        <Link
          to="/designs"
          className="rounded-lg px-4 py-2 text-base font-medium text-slate-300 transition-all duration-200 hover:bg-purple-950/50 hover:text-purple-300 border border-transparent hover:border-purple-800/30"
        >
          Designs
        </Link>

        {/* Customer Specific Links */}
        {user?.role === 'customer' && (
          <>
            <Link
              to={`/${userId}/my-orders`}
              className="rounded-lg px-4 py-2 text-base font-medium text-slate-300 transition-all duration-200 hover:bg-purple-950/50 hover:text-purple-300 border border-transparent hover:border-purple-800/30"
            >
              My Orders
            </Link>
            <Link
              to="/addresses"
              className="rounded-lg px-4 py-2 text-base font-medium text-slate-300 transition-all duration-200 hover:bg-purple-950/50 hover:text-purple-300 border border-transparent hover:border-purple-800/30"
            >
              My Addresses
            </Link>
            <Link
              to="/my-favourites"
              className="rounded-lg px-4 py-2 text-base font-medium text-slate-300 transition-all duration-200 hover:bg-purple-950/50 hover:text-purple-300 border border-transparent hover:border-purple-800/30"
            >
              Favourites
            </Link>
          </>
        )}

        {/* Tailor Specific Links */}
        {user?.role === 'tailor' && (
          <>
            <Link
              to="/orders"
              className="rounded-lg px-4 py-2 text-base font-medium text-slate-300 transition-all duration-200 hover:bg-purple-950/50 hover:text-purple-300 border border-transparent hover:border-purple-800/30"
            >
              Orders
            </Link>
            <Link
              to="/new-design"
              className="rounded-lg px-4 py-2 text-base font-medium text-slate-300 transition-all duration-200 hover:bg-purple-950/50 hover:text-purple-300 border border-transparent hover:border-purple-800/30"
            >
              Add Design
            </Link>
          </>
        )}
      </div>

      {/* Action Button (Login or Logout) */}
      <div className="flex items-center">
        {!user ? (
          <Link
            to="/login"
            className="rounded-lg bg-gradient-to-r from-purple-600 to-violet-600 px-5 py-2 text-sm font-semibold text-white shadow-md shadow-purple-950/50 transition-all duration-200 hover:from-purple-500 hover:to-violet-500 hover:scale-[1.02]"
          >
            Login
          </Link>
        ) : (
          <button
            onClick={handleLogout}
            className="rounded-lg border border-purple-500/30 bg-purple-950/20 px-5 py-2 text-sm font-semibold text-purple-300 transition-all duration-200 hover:bg-purple-500 hover:text-white hover:border-transparent hover:shadow-lg hover:shadow-purple-500/20"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
