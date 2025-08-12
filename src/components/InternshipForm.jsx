import { useForm, Controller } from 'react-hook-form'; // Importe o Controller
import { motion } from 'framer-motion';
// import InputMask from 'react-input-mask'; // REMOVIDO
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import toast from 'react-hot-toast';
import Spinner from './Spinner';

const coursesOptions = [
  'Informática',
  'Excel',
  'Power BI',
  'Design Gráfico',
  'Programação',
];

// Função auxiliar para formatar o número de telefone
const formatPhoneNumber = (value) => {
  if (!value) return "";
  // Remove tudo que não for dígito
  value = value.replace(/\D/g, '');
  // Aplica a máscara (99) 99999-9999
  value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
  value = value.replace(/(\d{5})(\d)/, '$1-$2');
  // Limita o tamanho máximo
  return value.slice(0, 15); 
};


const InternshipForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    control, // Adicione o control
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      completedCourses: [],
      phone: ''
    }
  });

  const showOtherCourseInput = watch('completedCourses')?.includes('Outros');

  const onSubmit = async (data) => {
    try {
      const submissionData = {
        ...data,
        // Remove a máscara antes de salvar no banco para ter apenas os números
        phone: data.phone.replace(/\D/g, ''),
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
      <h3 className="font-display text-2xl font-bold text-gray-900 mb-6">
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
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            )}
          />
          {errors.phone && <p className="text-red-600 text-xs mt-1">{errors.phone.message}</p>}
        </div>

        {/* Dia e Horário do Curso */}
        <div>
          <label htmlFor="courseSchedule" className="block text-sm font-medium text-gray-700 mb-1">Dia e horário do seu curso</label>
          <input
            id="courseSchedule"
            type="text"
            placeholder="Ex: Segunda a Sexta, 19h - 22h"
            {...register('courseSchedule', { required: 'Esta informação é obrigatória.' })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.courseSchedule && <p className="text-red-600 text-xs mt-1">{errors.courseSchedule.message}</p>}
        </div>

        {/* Nome da Escola */}
        <div>
          <label htmlFor="schoolName" className="block text-sm font-medium text-gray-700 mb-1">Nome da Escola/Faculdade</label>
          <input
            id="schoolName"
            type="text"
            {...register('schoolName', { required: 'O nome da escola é obrigatório.' })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.schoolName && <p className="text-red-600 text-xs mt-1">{errors.schoolName.message}</p>}
        </div>

        {/* Cursos que já fez */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Cursos que já fez (selecione múltiplos)</label>
          <div className="grid grid-cols-2 gap-2">
            {coursesOptions.map(course => (
              <div key={course} className="flex items-center">
                <input
                  id={course}
                  type="checkbox"
                  value={course}
                  {...register('completedCourses')}
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <label htmlFor={course} className="ml-2 block text-sm text-gray-900">{course}</label>
              </div>
            ))}
            <div className="flex items-center">
              <input id="Outros" type="checkbox" value="Outros" {...register('completedCourses')} className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
              <label htmlFor="Outros" className="ml-2 block text-sm text-gray-900">Outros</label>
            </div>
          </div>
          {showOtherCourseInput && (
            <div className="mt-3">
              <input
                type="text"
                placeholder="Qual outro curso?"
                {...register('otherCourseName')}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          )}
        </div>

        {/* Horário Disponível para Estágio */}
        <div>
          <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-1">Horário disponível para estagiar</label>
          <select
            id="availability"
            {...register('availability', { required: 'Selecione uma opção.' })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Selecione...</option>
            <option value="Manhã (08h-12h)">Manhã (08h-12h)</option>
            <option value="Tarde (13h-18h)">Tarde (13h-18h)</option>
            <option value="Manhã e Tarde">Manhã e Tarde</option>
            <option value="Flexível">Flexível</option>
          </select>
          {errors.availability && <p className="text-red-600 text-xs mt-1">{errors.availability.message}</p>}
        </div>

        {/* Botão de Envio */}
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Spinner />
                Enviando...
              </>
            ) : (
              'Enviar Inscrição'
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default InternshipForm;
