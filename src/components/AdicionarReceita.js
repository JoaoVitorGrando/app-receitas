import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addReceita } from '../services/api';
import '../styles/App.css';

const AdicionarReceita = () => {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const novaReceita = {
      id: Date.now(), // Gera um ID único
      title,
      ingredients: ingredients.split('\n').map(ingrediente => ingrediente.trim()).filter(ingrediente => ingrediente),
      instructions,
    };

    //  aiciona a nova receita na API (ou localStorage)
    await addReceita(novaReceita);

    //Atualiza as receitas no localStorage
    const receitasSalvas = JSON.parse(localStorage.getItem('receitas')) || [];
    const novasReceitas = [...receitasSalvas, novaReceita];
    localStorage.setItem('receitas', JSON.stringify(novasReceitas));

    navigate('/');
  };

  return (
    <div className="container">
      <h1>Adicionar Nova Receita</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Título:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label>
          Ingredientes (um por linha):
          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
          />
        </label>
        <label>
          Modo de Preparo:
          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            required
          />
        </label>
        <button type="submit">Adicionar Receita</button>
      </form>
    </div>
  );
};

export default AdicionarReceita;
