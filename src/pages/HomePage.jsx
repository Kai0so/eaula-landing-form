import { motion } from 'framer-motion';
import Header from '../components/Header';
import InternshipForm from '../components/InternshipForm';
// Importando os ícones que vamos usar
import { FiDollarSign, FiTruck, FiCoffee, FiUsers, FiClock } from 'react-icons/fi';

// Componente de Benefício redesenhado para melhor UI
const BenefitItem = ({ icon, title, delay }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay }}
    className="flex items-start gap-4"
  >
    {/* Círculo de destaque para o ícone */}
    <div className="flex-shrink-0 bg-[#ff304c]/10 p-3 rounded-full">
      {icon}
    </div>
    <div>
      <h4 className="font-semibold text-gray-800">{title}</h4>
    </div>
  </motion.div>
);

function HomePage() {
  return (
    <>
      <Header />
      <main className="overflow-hidden"> {/* Evita barras de rolagem durante a animação */}
        <div className="container mx-auto px-6 lg:px-8 py-20 sm:py-28">
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-16 lg:gap-x-20 items-center">
            
            {/* Seção de Informações (Esquerda) */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="text-center md:text-left"
            >
              <h1 className="font-display text-4xl font-extrabold tracking-tight text-[#2d005d] sm:text-5xl">
                Dê o primeiro passo na sua carreira.
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Estamos buscando estudantes talentosos e motivados para se juntarem à nossa equipe. Oferecemos um ambiente de aprendizado dinâmico, projetos desafiadores e a chance de crescer profissionalmente.
              </p>

              {/* Lista de Benefícios com Ícones */}
              <div className="mt-10 space-y-6">
                <BenefitItem 
                  delay={0.2}
                  icon={<FiDollarSign className="w-6 h-6 text-[#ff304c]" />} 
                  title="Bolsa-auxílio compatível com o mercado" 
                />
                <BenefitItem 
                  delay={0.3}
                  icon={<FiTruck className="w-6 h-6 text-[#ff304c]" />} 
                  title="Vale-transporte" 
                />
                <BenefitItem 
                  delay={0.4}
                  icon={<FiCoffee className="w-6 h-6 text-[#ff304c]" />} 
                  title="Lanche no local" 
                />
                <BenefitItem 
                  delay={0.5}
                  icon={<FiUsers className="w-6 h-6 text-[#ff304c]" />} 
                  title="Mentoria com profissionais experientes" 
                />
                 <BenefitItem 
                  delay={0.6}
                  icon={<FiClock className="w-6 h-6 text-[#ff304c]" />} 
                  title="Horário flexível" 
                />
              </div>

              {/* Seção "Como se inscrever" adicionada de volta */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="mt-10 pt-8 border-t border-gray-200"
              >
                <h3 className="font-display text-2xl font-bold text-[#2d005d]">
                  Como se inscrever
                </h3>
                <p className="mt-4 text-gray-600">
                  Preencha o formulário ao lado com atenção. Entraremos em contato com os candidatos selecionados para a próxima fase do processo seletivo. Boa sorte!
                </p>
              </motion.div>

            </motion.div>

            {/* Formulário (Direita) */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            >
              <InternshipForm />
            </motion.div>
          </div>
        </div>
      </main>
    </>
  );
}

export default HomePage;
