import React from 'react';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext';
import { Header } from './components/Header';
import { CVForm } from './components/CVForm';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main className="container mx-auto py-6 px-4">
          <CVForm />
        </main>
        <Toaster position="bottom-right" />
      </div>
    </ThemeProvider>
  );
}

export default App;