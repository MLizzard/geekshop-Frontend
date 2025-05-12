import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage/ProductsPage';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ProductsPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
