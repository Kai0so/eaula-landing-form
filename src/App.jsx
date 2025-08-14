import { Toaster } from 'react-hot-toast';
import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <div className="bg-gray-50 min-h-screen text-gray-800 font-sans">
      {/* Componente para exibir as notificações (sucesso/erro) */}
      <Toaster position="top-center" reverseOrder={false} />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<DashboardPage />} />
      </Routes>

      <footer className="text-center py-6 text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} eaula. Todos os direitos reservados. | <Link to="/admin" className="hover:text-[#ff304c] underline">Admin</Link></p>
      </footer>
    </div>
  );
}

export default App;
