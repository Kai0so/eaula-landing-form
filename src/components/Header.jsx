import { motion } from 'framer-motion';
import { FiBriefcase } from 'react-icons/fi';
import Logo from '../assets/logo.png';

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
          <img src={Logo} alt="logo" className="h-12"/>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="font-display text-lg text-[#ff304c] font-semibold hidden md:block"
        >
          O primeiro passo para sua carreira de sucesso.
        </motion.p>
      </div>
    </header>
  );
};

export default Header;