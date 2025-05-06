import {Route, Routes} from 'react-router-dom'
import HomePage from './pages/HomePage'
import FormPage from './pages/FormPage'
import NotFound from './pages/NotFound'
import ProductList from './pages/ProductList'
import NavBar from './components/NavBar'
import { ProductContextProvider } from './context/ProductProvider'

function App() {
  return (
    <ProductContextProvider>
      <NavBar />
      <Routes>
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