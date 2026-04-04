import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Product from './pages/Product'
import Wholesale from './pages/Wholesale'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import About from './pages/About'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import Privacy  from './pages/policies/Privacy'
import Terms    from './pages/policies/Terms'
import Delivery from './pages/policies/Delivery'
import Cookies  from './pages/policies/Cookies'
import CookieBanner from './components/ui/CookieBanner'

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index          element={<Home />} />
          <Route path="shop"    element={<Shop />} />
          <Route path="shop/:slug" element={<Product />} />
          <Route path="wholesale" element={<Wholesale />} />
          <Route path="cart"    element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="about"   element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="policies/privacy"  element={<Privacy />} />
          <Route path="policies/terms"    element={<Terms />} />
          <Route path="policies/delivery" element={<Delivery />} />
          <Route path="policies/cookies"  element={<Cookies />} />
          <Route path="*"       element={<NotFound />} />
        </Route>
      </Routes>
      <CookieBanner />
    </>
  )
}
