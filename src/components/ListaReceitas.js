// src/components/ListaReceitas.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getReceitas } from '../services/api';
import '../styles/App.css';

const ListaReceitas = () => {
  const [receitas, setReceitas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReceitas = async () => {
      try {
        const data = await getReceitas();
        setReceitas(data);
      } catch (error) {
        console.error('Erro ao buscar receitas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReceitas();
  }, []);

  if (loading) return <div>Carregando...</div>;
  if (receitas.length === 0) return <div>Não há receitas disponíveis.</div>;

  return (
    <div className="container">
      <h1>Lista de Receitas</h1>
      <ul>
        {receitas.map((receita) => (
          <li key={receita.id}>
            <Link to={`/receita/${receita.id}`}>{receita.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaReceitas;
