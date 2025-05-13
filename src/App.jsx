import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage/ProductsPage';
import CategoriesPage from './pages/CategoriesPage/CategoriesPage';
import ProductDetailsPage from './pages/ProductDetailsPage/ProductDetailsPage'
import Header from './components/Header/Header';

function App() {
    return (
        <BrowserRouter>
            <Header />
            <main style={{ marginTop: '20px' }}/> 
            <Routes>
                <Route path="/" element={<ProductsPage />} />
                <Route path="/categories" element={<CategoriesPage />} />
                <Route path="/products/:id" element={<ProductDetailsPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
