import './App.css';
import {Route, Routes, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import FormPage from './pages/FormPage'
import NotFound from './pages/NotFound'
import ProductList from './pages/ProductList'
import NavBar from './components/Navbar'
import Login from './pages/Login';
import { ProductContextProvider } from './context/ProductProvider'
//import PrivateRoute from './components/PrivateRoute'
import { useState } from 'react';

  function App() {
    
    const [role, setRole] = useState(null);

    return (
      <ProductContextProvider>
        {role && <NavBar />}
        <Routes>

          <Route path="/login" element={<Login setRole={setRole} />} />

          <Route 
          path="/" 
          element={role ? <HomePage/> : <Navigate to="/login" />}
          />
          <Route
          path="/form"
          element={role ? <FormPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/edit/:id"
            element={role ? <FormPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/list"
            element={role ? <ProductList /> : <Navigate to="/login" />}
          />
            <Route path="*" element={<NotFound/>} />
          </Routes>
      </ProductContextProvider>
    )
  }

  export default App