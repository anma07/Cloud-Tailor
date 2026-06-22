import './index.css';
import AdminOrders from './pages/AdminOrders.jsx';
import BrowseDesigns from './pages/BrowseDesigns.jsx';
import CreateOrder from './pages/CreateOrder.jsx';
import DesignPage from './pages/DesignPage.jsx';
import AuthLogin from './pages/Login.jsx';
import NewAddress from './pages/NewAddress.jsx';
import OrderPage from './pages/OrderPage.jsx';
import OrderPageCard from './pages/OrderPageCard.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<AuthLogin />} />{' '}
          <Route path="/designs" element={<BrowseDesigns />} />
          <Route path="/designs/:id" element={<DesignPage />} />
          <Route path="/designs/:id/create-order" element={<CreateOrder />} />
          <Route path="/order-placed/:id" element={<OrderPage />} />
          <Route path="/new-address" element={<NewAddress />} />
          <Route path="/orders" element={<AdminOrders />} />
          <Route path="/orders/:id" element={<OrderPageCard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
