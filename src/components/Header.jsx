import { motion } from 'framer-motion';
import { FiBriefcase } from 'react-icons/fi';

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3"
        >
          <FiBriefcase className="w-8 h-8 text-indigo-600" />
          <span className="font-display text-2xl font-bold text-gray-900">EstágioDev</span>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="font-display text-lg text-indigo-600 font-semibold hidden md:block"
        >
          O primeiro passo para sua carreira de sucesso.
        </motion.p>
      </div>
    </header>
  );
};

export default Header;