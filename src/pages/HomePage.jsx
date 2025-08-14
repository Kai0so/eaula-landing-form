import Header from '../components/Header';
import InternshipForm from '../components/InternshipForm';
// Importando os ícones que vamos usar
import { FiDollarSign, FiTruck, FiCoffee, FiUsers, /* FiClock */ } from 'react-icons/fi';

// Componente para um item da lista de benefícios, para evitar repetição
const BenefitItem = ({ icon, children }) => (
  <li className="flex items-start gap-3">
    <div className="flex-shrink-0 mt-1">
      {icon}
    </div>
    <span>{children}</span>
  </li>
);

function HomePage() {

  return (
    <>
      <Header />

      <main className="container mx-auto px-4 py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Seção de Informações */}
          <div className="prose lg:prose-lg max-w-none">
            <h2 className="font-display text-3xl font-bold text-[#2d005d]">
              Sobre a Oportunidade
            </h2>
            <p>
              Estamos buscando estudantes talentosos e motivados para se juntarem à nossa equipe. Oferecemos um ambiente de aprendizado dinâmico, projetos desafiadores e a chance de crescer profissionalmente.
            </p>

            {/* Lista de Benefícios com Ícones */}
            <h3 className="font-display text-2xl font-bold text-[#2d005d] mt-8">Benefícios:</h3>
            <ul className="space-y-4 not-prose list-none p-0">
              <BenefitItem icon={<FiDollarSign className="w-5 h-5 text-[#ff304c]" />}>
                Bolsa-auxílio compatível com o mercado
              </BenefitItem>
              <BenefitItem icon={<FiTruck className="w-5 h-5 text-[#ff304c]" />}>
                Vale-transporte
              </BenefitItem>
              <BenefitItem icon={<FiCoffee className="w-5 h-5 text-[#ff304c]" />}>
                Lanche no local
              </BenefitItem>
              <BenefitItem icon={<FiUsers className="w-5 h-5 text-[#ff304c]" />}>
                Mentoria com profissionais experientes
              </BenefitItem>
              {/* <BenefitItem icon={<FiClock className="w-5 h-5 text-[#ff304c]" />}>
                Horário flexível
              </BenefitItem> */}
            </ul>

            <h3 className="font-display text-2xl font-bold text-[#2d005d] mt-8">Como se inscrever:</h3>
            <p>
              Preencha o formulário ao lado com atenção. Entraremos em contato com os candidatos selecionados para a próxima fase do processo seletivo. Boa sorte!
            </p>
          </div>

          {/* Formulário */}
          <InternshipForm />
        </div>
      </main>
    </>
  );
}

export default HomePage;