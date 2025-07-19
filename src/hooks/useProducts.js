import React, { useState, useEffect } from 'react';
import { products as localProducts } from '@/data/products';

export const useProducts = (options = {}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Simular carga para mejor UX
      await new Promise(resolve => setTimeout(resolve, 300));
      
      let filteredProducts = localProducts;
      
      // Filtrar por categoría si se especifica
      if (options.category) {
        filteredProducts = filteredProducts.filter(
          product => product.category.toLowerCase().includes(options.category.toLowerCase())
        );
      }
      
      // Filtrar por búsqueda si se especifica
      if (options.search) {
        filteredProducts = filteredProducts.filter(
          product => 
            product.name.toLowerCase().includes(options.search.toLowerCase()) ||
            product.description.toLowerCase().includes(options.search.toLowerCase())
        );
      }
      
      setProducts(filteredProducts);
    } catch (err) {
      console.error('Error loading products:', err);
      setError('Error al cargar productos');
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => {
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, [options.category, options.search]);

  return { products, loading, error, refetch };
};

export const useProductById = (id) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Simular carga
        await new Promise(resolve => setTimeout(resolve, 200));
        
        const foundProduct = localProducts.find(p => p.id === id);
        
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          setError('Producto no encontrado');
        }
      } catch (err) {
        console.error('Error loading product:', err);
        setError('Error al cargar producto');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  return { product, loading, error };
};