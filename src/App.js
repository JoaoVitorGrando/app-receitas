import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ListaReceitas from './components/ListaReceitas';
import DetalhesReceita from './components/DetalhesReceita';
import AdicionarReceita from './components/AdicionarReceita';
import './styles/App.css';

const App = () => {
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
            <Route path="/" element={<ListaReceitas />} />
            <Route path="/receita/:id" element={<DetalhesReceita />} />
            <Route path="/nova-receita" element={<AdicionarReceita />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
