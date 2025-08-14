import { motion, AnimatePresence } from 'framer-motion';
import { FaSchool } from "react-icons/fa";
import { FiX, FiUser, FiPhone, FiClock, FiBriefcase, FiAward, FiCalendar } from 'react-icons/fi';

// Função para formatar o timestamp do Firebase para uma data legível
const formatDate = (timestamp) => {
  if (!timestamp) return 'Data indisível';
  return new Date(timestamp.seconds * 1000).toLocaleString('pt-BR');
};

// Função para formatar o telefone
const formatPhoneNumber = (value) => {
  if (!value) return "";
  value = value.replace(/\D/g, '');
  if (value.length > 10) {
    return value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }
  return value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
};

// Componente auxiliar para exibir um detalhe
const DetailItem = ({ icon, label, children }) => (
  <div className="flex items-start text-sm">
    <div className="flex-shrink-0 w-6 mt-0.5 text-gray-500">{icon}</div>
    <div className="flex-1">
      <p className="font-semibold text-gray-800">{label}</p>
      <div className="text-gray-600">{children}</div>
    </div>
  </div>
);

const SubmissionModal = ({ isOpen, onClose, submissionData }) => {
  if (!isOpen || !submissionData) return null;

  const {
    fullName, phone, schoolName, courseSchedule, completedCourses,
    otherCourseName, internshipAvailability, createdAt
  } = submissionData;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-5 border-b sticky top-0 bg-white">
              <h2 className="text-xl font-display font-bold text-gray-900">Detalhes da Inscrição</h2>
              <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100">
                <FiX className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              <DetailItem icon={<FiUser />} label="Nome Completo">
                <p>{fullName}</p>
              </DetailItem>

              <DetailItem icon={<FiPhone />} label="Telefone">
                <p>{formatPhoneNumber(phone)}</p>
              </DetailItem>

              <DetailItem icon={<FaSchool />} label="Instituição de Ensino">
                <p>{schoolName}</p>
              </DetailItem>

              <DetailItem icon={<FiCalendar />} label="Horário do Curso">
                {Object.keys(courseSchedule).length > 0 ? (
                  <ul className="list-disc list-inside">
                    {Object.entries(courseSchedule).map(([day, time]) => (
                      <li key={day}><strong>{day}:</strong> {time}</li>
                    ))}
                  </ul>
                ) : <p>Não informado.</p>}
              </DetailItem>

              <DetailItem icon={<FiAward />} label="Cursos Concluídos">
                {completedCourses && completedCourses.length > 0 ? (
                  <div className="flex flex-wrap gap-2 mt-1">
                    {completedCourses.map(course => (
                      <span key={course} className="bg-primary/10 text-primary text-xs font-semibold px-2.5 py-0.5 rounded-full">{course}</span>
                    ))}
                    {otherCourseName && (
                      <span className="bg-gray-100 text-gray-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">{otherCourseName}</span>
                    )}
                  </div>
                ) : <p>Nenhum curso informado.</p>}
              </DetailItem>

              <DetailItem icon={<FiBriefcase />} label="Disponibilidade para Estágio">
                <p>{internshipAvailability}</p>
              </DetailItem>

              <DetailItem icon={<FiClock />} label="Data da Inscrição">
                <p>{formatDate(createdAt)}</p>
              </DetailItem>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SubmissionModal;

