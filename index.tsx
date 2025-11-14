
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';

console.log('Index.tsx loaded');

const rootElement = document.getElementById('root');
console.log('Root element:', rootElement);

if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

console.log('Creating React root...');
const root = ReactDOM.createRoot(rootElement);

console.log('Rendering App...');
try {
  root.render(
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>
  );
  console.log('App rendered!');
} catch (error) {
  console.error('Error rendering app:', error);
  document.body.innerHTML = `<div style="padding: 20px; background: red; color: white;"><h1>Error!</h1><pre>${error}</pre></div>`;
}
