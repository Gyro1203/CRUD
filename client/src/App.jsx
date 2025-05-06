import {Route, Routes} from 'react-router-dom'
import HomePage from './pages/HomePage'
import FormPage from './pages/FormPage'
import NotFound from './pages/NotFound'
import ProductList from './pages/ProductList'
import NavBar from './components/NavBar'
import Login from './pages/Login';
import Dashboard from './components/Dashboard'
import { ProductContextProvider } from './context/ProductProvider'
import PrivateRoute from './components/PrivateRoute'
import { useState } from 'react';


function App() {
  
  const [role, setRole] = useState(null);

  return (
    <ProductContextProvider>
      <NavBar />
      <Routes>

        <Route path="/login" element={<Login setRole={setRole} />} />
        <Route
            path="/dashboard"
            element={
              role ? (
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              ) : null
            }
          />


        <Route path="/" element={<HomePage/>} />
        <Route path="/form" element={<FormPage/>} />
        <Route path="/edit/:id" element={<FormPage/>} />
        <Route path="/list" element={<ProductList/>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </ProductContextProvider>
  )
}

export default App