import './index.css';
import AdminOrders from './pages/AdminOrders.jsx';
import BrowseDesigns from './pages/BrowseDesigns.jsx';
import CreateAccount from './pages/CreateAccount.jsx';
import CreateOrder from './pages/CreateOrder.jsx';
import Dashboard from './pages/Dashboard.jsx';
import DesignPage from './pages/DesignPage.jsx';
import FavouritesPage from './pages/FavouritesPage.jsx';
import AuthLogin from './pages/Login.jsx';
import NewAddress from './pages/NewAddress.jsx';
import NewDesign from './pages/NewDesign.jsx';
import OrderPage from './pages/OrderPage.jsx';
import OrderPageCard from './pages/OrderPageCard.jsx';
import UserOrdersPage from './pages/UserOrdersPage.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<AuthLogin />} />
          <Route path="/designs" element={<BrowseDesigns />} />
          <Route path="/designs/:id" element={<DesignPage />} />
          <Route path="/designs/:id/create-order" element={<CreateOrder />} />
          <Route path="/order-placed/:id" element={<OrderPage />} />
          <Route path="/new-address" element={<NewAddress />} />
          <Route path="/orders" element={<AdminOrders />} />
          <Route path="/orders/:id" element={<OrderPageCard />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/:id/my-orders" element={<UserOrdersPage />} />
          <Route path="/new-design" element={<NewDesign />} />
          <Route path="/my-favourites" element={<FavouritesPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
