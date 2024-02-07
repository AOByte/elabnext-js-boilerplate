import fs from 'fs';

export const createHTMLDocument = (file = 'index.html') => {
  const element = fs.readFileSync(`tests/html/${file}`, 'utf-8');

  document.documentElement.innerHTML = element;
};

export const appendToRoot = (element) => {
  document.getElementById('root').innerHTML = element;
};
