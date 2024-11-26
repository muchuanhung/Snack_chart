import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

const ProductPage = lazy(() => import('./pages/ProductPage'));

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/products" element={<ProductPage />} />
      </Routes>
    </Suspense>
  );
};

export default App;
