import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import toast from 'react-hot-toast';
import Spinner from '../components/Spinner';
import SubmissionModal from '../components/SubmissionModal';
import { FiExternalLink, FiLogOut } from 'react-icons/fi'; // 1. Importe o ícone de logout

const DashboardPage = () => {
  const [submissions, setSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  // 2. Crie a função de logout
  const handleLogout = () => {
    sessionStorage.removeItem('dashboard_auth'); // Remove a chave de autenticação
    toast.success('Você saiu com segurança!');
    navigate('/'); // Redireciona para a página inicial
  };

  const handleOpenModal = (submission) => {
    setSelectedSubmission(submission);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSubmission(null);
  };
  
  useEffect(() => {
    const isAuth = sessionStorage.getItem('dashboard_auth');
    if (!isAuth) {
      const password = prompt('Digite a senha para acessar o dashboard:');
      if (password === 'eaula.2025') {
        sessionStorage.setItem('dashboard_auth', 'true');
      } else {
        alert('Senha incorreta!');
        navigate('/');
      }
    }
  }, [navigate]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      setIsLoading(true);
      try {
        const q = query(collection(db, 'inscricoes'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const submissionsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setSubmissions(submissionsData);
      } catch (error) {
        console.error("Erro ao buscar dados: ", error);
        toast.error("Não foi possível carregar os dados do Firebase.");
      } finally {
        setIsLoading(false);
      }
    };
    if (sessionStorage.getItem('dashboard_auth')) {
        fetchSubmissions();
    }
  }, []);

  const formatDate = (timestamp) => {
    if (!timestamp) return 'Data indisponível';
    return new Date(timestamp.seconds * 1000).toLocaleDateString('pt-BR', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner /> <span className="ml-4 text-xl">Carregando inscrições...</span>
      </div>
    );
  }

  return (
    <>
      <div className="bg-gray-100 min-h-screen p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* 3. Adicione o botão no cabeçalho */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-display font-bold text-gray-800">Dashboard de Inscrições</h1>
            <button
              onClick={handleLogout}
              className="cursor-pointer flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-white border border-red-200 rounded-lg hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
            >
              <FiLogOut />
              Sair
            </button>
          </div>

          {submissions.length === 0 ? (
            <p className="text-center text-gray-500 mt-12">Nenhuma inscrição encontrada.</p>
          ) : (
            <div className="bg-white shadow-lg rounded-lg overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome Completo</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Telefone</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Disponibilidade (Estágio)</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data de Inscrição</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {submissions.map(sub => (
                    <tr 
                      key={sub.id} 
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleOpenModal(sub)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{sub.fullName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        <a 
                          href={`https://wa.me/55${sub.phone}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-2 hover:text-primary"
                        >
                          {formatPhoneNumber(sub.phone)}
                          <FiExternalLink />
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{sub.internshipAvailability}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{formatDate(sub.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <SubmissionModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        submissionData={selectedSubmission} 
      />
    </>
  );
};

const formatPhoneNumber = (value) => {
  if (!value) return "";
  value = value.replace(/\D/g, '');
  if (value.length > 10) {
    return value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }
  return value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
};

export default DashboardPage;
