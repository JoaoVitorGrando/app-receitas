import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ListaReceitas from './components/ListaReceitas';
import DetalhesReceita from './components/DetalhesReceita';
import AdicionarReceita from './components/AdicionarReceita';
import './styles/App.css';

const App = () => {
  const [receitas, setReceitas] = useState([]);

  // carregar receitas do localStorage :) 
  useEffect(() => {
    const storedReceitas = localStorage.getItem('receitas');
    if (storedReceitas) {
      setReceitas(JSON.parse(storedReceitas));
    }
  }, []);

  // Salvar receitas no localStorage quando forem atualizadas
  useEffect(() => {
    localStorage.setItem('receitas', JSON.stringify(receitas));
  }, [receitas]);

  const adicionarReceita = (novaReceita) => {
    setReceitas([...receitas, { ...novaReceita, id: receitas.length + 1 }]);
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Aplicativo de Receitas</h1>
          <nav>
            <ul>
              <li><Link className="botao" to="/">Lista de Receitas</Link></li>
              <li><Link className="botao" to="/nova-receita">Adicionar Nova Receita</Link></li>
            </ul>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<ListaReceitas receitas={receitas} />} />
            <Route path="/receita/:id" element={<DetalhesReceita receitas={receitas} />} />
            <Route path="/nova-receita" element={<AdicionarReceita adicionarReceita={adicionarReceita} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
