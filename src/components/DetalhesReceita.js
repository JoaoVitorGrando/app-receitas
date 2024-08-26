// src/components/DetalhesReceita.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getReceitaById } from '../services/api';
import '../styles/App.css';

const DetalhesReceita = () => {
  const { id } = useParams();
  const [receita, setReceita] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReceita = async () => {
      try {
        // Verifica se as receitas estão armazenadas no localStorage
        const storedReceitas = localStorage.getItem('receitas');
        if (storedReceitas) {
          const receitas = JSON.parse(storedReceitas);
          const foundReceita = receitas.find(r => r.id === parseInt(id));
          if (foundReceita) {
            setReceita(foundReceita);
          } else {
            console.error('Receita não encontrada no localStorage.');
          }
        } else {
          // Caso contrário, busca da API
          const data = await getReceitaById(parseInt(id));
          setReceita(data);
        }
      } catch (error) {
        console.error('Erro ao buscar receita:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReceita();
  }, [id]);

  if (loading) return <div>Carregando...</div>;
  if (!receita) return <div>Receita não encontrada.</div>;

  return (
    <div className="container">
      <h1>{receita.title}</h1>
      {receita.image && <img src={receita.image} alt={receita.title} />}
      <h2>Ingredientes:</h2>
      <ul>
        {receita.ingredients.length > 0 ? (
          receita.ingredients.map((ingrediente, index) => (
            <li key={index}>{ingrediente}</li>
          ))
        ) : (
          <li>Ingredientes não disponíveis.</li>
        )}
      </ul>
      <h2>Modo de Preparo:</h2>
      <p>{receita.instructions || 'Modo de preparo não disponível.'}</p>
    </div>
  );
};

export default DetalhesReceita;
