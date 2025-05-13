import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage/ProductsPage';
import ProductDetailsPage from './pages/ProductDetailsPage/ProductDetailsPage'
import Header from './components/Header/Header';

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<ProductsPage />} />
                <Route path="/products/:id" element={<ProductDetailsPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
