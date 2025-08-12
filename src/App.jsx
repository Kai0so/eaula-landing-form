import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import InternshipForm from './components/InternshipForm';

function App() {
  return (
    <div className="bg-gray-50 min-h-screen text-gray-800 font-sans">
      {/* Componente para exibir as notificações (sucesso/erro) */}
      <Toaster position="top-center" reverseOrder={false} />

      <Header />

      <main className="container mx-auto px-4 py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="prose lg:prose-lg">
            <h2 className="font-display text-3xl font-bold text-gray-900">
              Sobre a Oportunidade
            </h2>
            <p>
              Estamos buscando estudantes talentosos e motivados para se juntarem à nossa equipe. Oferecemos um ambiente de aprendizado dinâmico, projetos desafiadores e a chance de crescer profissionalmente.
            </p>
            <h3>Benefícios:</h3>
            <ul>
              <li>Bolsa-auxílio compatível com o mercado</li>
              <li>Vale-transporte e vale-refeição</li>
              <li>Mentoria com profissionais experientes</li>
              <li>Horário flexível</li>
            </ul>
            <h3>Como se inscrever:</h3>
            <p>
              Preencha o formulário ao lado com atenção. Entraremos em contato com os candidatos selecionados para a próxima fase do processo seletivo. Boa sorte!
            </p>
          </div>

          <InternshipForm />
        </div>
      </main>

      <footer className="text-center py-6 text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Sua Empresa. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

export default App;