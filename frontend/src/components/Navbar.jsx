import { Link } from 'react-router-dom';

export default function Navbar() {
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user.id;
  return (
    <nav>
      <Link
        to="/designs"
        className="rounded-md px-3 py-2 text-2xl transition hover:bg-purple-100"
      >
        Designs
      </Link>
      {!user && (
        <Link
          to="/login"
          className="rounded-md px-3 py-2 text-2xl transition hover:bg-purple-100"
        >
          Login
        </Link>
      )}
      {user?.role === 'customer' && (
        <>
          <Link
            to={`${userId}/my-orders`}
            className="rounded-md px-3 py-2 text-2xl transition hover:bg-purple-100"
          >
            My Orders
          </Link>
          <Link
            to="/addresses"
            className="rounded-md px-3 py-2 text-2xl transition hover:bg-purple-100"
          >
            My Addresses
          </Link>
          <Link
            to="/my-favourites"
            className="rounded-md px-3 py-2 text-2xl transition hover:bg-purple-100"
          >
            Favourites
          </Link>
        </>
      )}
      {user?.role === 'tailor' && (
        <>
          <Link
            to="/orders"
            className="rounded-md px-3 py-2 text-2xl transition hover:bg-purple-100"
          >
            Orders
          </Link>
          <Link
            to="/new-design"
            className="rounded-md px-3 py-2 text-2xl transition hover:bg-purple-100"
          >
            Add Design
          </Link>
        </>
      )}
    </nav>
  );
}
