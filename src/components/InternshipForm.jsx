import { useForm, Controller } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import toast from 'react-hot-toast';
import Spinner from './Spinner';

// --- OPÇÕES E CONSTANTES ---
const coursesOptions = [
  'Informática',
  'Digitação',
  'Windows',
  'Administração',
  'Office',
  'Excel Avançado',
  'Design Gráfico',
  'Robótica',
  'Programação',
];

const weekdays = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];

// --- FUNÇÕES AUXILIARES ---
const formatPhoneNumber = (value) => {
  if (!value) return "";
  value = value.replace(/\D/g, '');
  value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
  value = value.replace(/(\d{5})(\d)/, '$1-$2');
  return value.slice(0, 15); 
};

// --- COMPONENTE PRINCIPAL ---
const InternshipForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      completedCourses: [],
      phone: '',
      courseScheduleDays: [], // Novo campo para os dias selecionados
      scheduleTimes: {},      // Novo campo para os horários
    }
  });

  // Observa quais checkboxes estão marcados
  const watchedWeekdays = watch('courseScheduleDays', []);
  const showOtherCourseInput = watch('completedCourses')?.includes('Outros');

  const onSubmit = async (data) => {
    try {
      // 1. Formata o horário do curso para enviar ao Firebase
      const finalCourseSchedule = data.courseScheduleDays.reduce((acc, day) => {
        const times = data.scheduleTimes[day];
        if (times && times.from && times.to) {
          acc[day] = `${times.from} - ${times.to}`;
        }
        return acc;
      }, {});

      // 2. Monta o objeto final para o banco de dados
      const submissionData = {
        fullName: data.fullName,
        phone: data.phone.replace(/\D/g, ''),
        schoolName: data.schoolName,
        completedCourses: data.completedCourses,
        otherCourseName: data.otherCourseName || '',
        internshipAvailability: data.internshipAvailability,
        courseSchedule: finalCourseSchedule, // Objeto com os horários formatados
        createdAt: serverTimestamp()
      };

      await addDoc(collection(db, 'inscricoes'), submissionData);

      toast.success('Inscrição enviada com sucesso! Boa sorte!');
      reset();
    } catch (error) {
      console.error("Erro ao enviar inscrição: ", error);
      toast.error('Houve um erro ao enviar sua inscrição. Tente novamente.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2 }}
      className="bg-white p-8 rounded-xl shadow-lg w-full"
    >
      <h3 className="font-display text-2xl font-bold text-[#2d005d] mb-6">
        Formulário de Inscrição
      </h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Nome Completo */}
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
          <input
            id="fullName"
            type="text"
            {...register('fullName', { required: 'O nome completo é obrigatório.' })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
          />
          {errors.fullName && <p className="text-red-600 text-xs mt-1">{errors.fullName.message}</p>}
        </div>

        {/* Telefone com Controller */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Telefone (com DDD)</label>
          <Controller
            name="phone"
            control={control}
            rules={{ required: 'O telefone é obrigatório.' }}
            render={({ field }) => (
              <input
                {...field}
                id="phone"
                type="tel"
                onChange={(e) => field.onChange(formatPhoneNumber(e.target.value))}
                placeholder="(99) 99999-9999"
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
              />
            )}
          />
          {errors.phone && <p className="text-red-600 text-xs mt-1">{errors.phone.message}</p>}
        </div>

        {/* Dia e Horário do Curso (NOVA SEÇÃO) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Dia e horário do seu curso</label>
          <div className="space-y-4">
            {weekdays.map((day) => (
              <div key={day}>
                <div className="flex items-center">
                  <input
                    id={`day-${day}`}
                    type="checkbox"
                    value={day}
                    {...register('courseScheduleDays')}
                    className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <label htmlFor={`day-${day}`} className="ml-3 block text-sm font-medium text-gray-800">{day}</label>
                </div>
                <AnimatePresence>
                  {watchedWeekdays.includes(day) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: 'auto', marginTop: '8px' }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center gap-2 ml-7"
                    >
                      <input
                        type="time"
                        {...register(`scheduleTimes.${day}.from`, { required: 'Obrigatório' })}
                        className="w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary text-sm"
                      />
                      <span className="text-gray-500">até</span>
                      <input
                        type="time"
                        {...register(`scheduleTimes.${day}.to`, { required: 'Obrigatório' })}
                        className="w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary text-sm"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* Nome da Escola */}
        <div>
          <label htmlFor="schoolName" className="block text-sm font-medium text-gray-700 mb-1">Nome da Escola/Faculdade</label>
          <input
            id="schoolName"
            type="text"
            {...register('schoolName', { required: 'O nome da escola é obrigatório.' })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
          />
          {errors.schoolName && <p className="text-red-600 text-xs mt-1">{errors.schoolName.message}</p>}
        </div>

        {/* Cursos que já fez */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Cursos que já fez</label>
          <div className="grid grid-cols-2 gap-2">
            {coursesOptions.map(course => (
              <div key={course} className="flex items-center">
                <input
                  id={course}
                  type="checkbox"
                  value={course}
                  {...register('completedCourses')}
                  className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <label htmlFor={course} className="ml-2 block text-sm text-gray-900">{course}</label>
              </div>
            ))}
            <div className="flex items-center">
              <input id="Outros" type="checkbox" value="Outros" {...register('completedCourses')} className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary" />
              <label htmlFor="Outros" className="ml-2 block text-sm text-gray-900">Outros</label>
            </div>
          </div>
          {showOtherCourseInput && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3">
              <input
                type="text"
                placeholder="Qual outro curso?"
                {...register('otherCourseName')}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
              />
            </motion.div>
          )}
        </div>

        {/* Horário Disponível para Estágio */}
        <div>
          <label htmlFor="internshipAvailability" className="block text-sm font-medium text-gray-700 mb-1">Horário disponível para estagiar</label>
          <select
            id="internshipAvailability"
            {...register('internshipAvailability', { required: 'Selecione uma opção.' })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
          >
            <option value="">Selecione...</option>
            <option value="Manhã">Manhã</option>
            <option value="Tarde">Tarde</option>
          </select>
          {errors.internshipAvailability && <p className="text-red-600 text-xs mt-1">{errors.internshipAvailability.message}</p>}
        </div>

        {/* Botão de Envio */}
        <div>
          <motion.button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium cursor-pointer text-white bg-[#2d005d] hover:bg-white transition-all hover:text-[#2d005d] focus:outline-none focus:ring-2 hover:border-[#2d005d] focus:ring-offset-2 focus:ring-primary disabled:bg-opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.00 }}
            whileTap={{ scale: 0.98 }}
          >
            {isSubmitting ? (
              <>
                <Spinner />
                Enviando...
              </>
            ) : (
              'Enviar Inscrição'
            )}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default InternshipForm;
