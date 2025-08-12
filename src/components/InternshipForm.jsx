import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import InputMask from 'react-input-mask';
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

const InternshipForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
        completedCourses: []
    }
  });
  
  const showOtherCourseInput = watch('completedCourses')?.includes('Outros');

  const onSubmit = async (data) => {
    try {
      // Adiciona a data de criação ao objeto de dados
      const submissionData = {
        ...data,
        createdAt: serverTimestamp() 
      };

      await addDoc(collection(db, 'inscricoes'), submissionData);
      
      toast.success('Inscrição enviada com sucesso! Boa sorte!');
      reset(); // Limpa o formulário após o envio
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

        {/* Telefone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Telefone (com DDD)</label>
          <InputMask
            mask="(99) 99999-9999"
            id="phone"
            {...register('phone', { required: 'O telefone é obrigatório.' })}
          >
            {(inputProps) => <input {...inputProps} type="tel" className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />}
          </InputMask>
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
                <input id="Outros" type="checkbox" value="Outros" {...register('completedCourses')} className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"/>
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