import receitasData from '../receitas.json';

export const getReceitas = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(receitasData);
    }, 500);
  });
};

export const getReceitaById = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const receita = receitasData.find(r => r.id === id);
      resolve(receita);
    }, 500);
  });
};

export const addReceita = (novaReceita) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      receitasData.push({ ...novaReceita, id: receitasData.length + 1 });
      resolve(novaReceita);
    }, 500);
  });
};
