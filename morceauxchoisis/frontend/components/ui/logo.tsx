import { motion } from 'framer-motion';

export const Logo = () => {
  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <div className="flex items-center justify-center overflow-hidden rounded-lg bg-black p-0.5 transition-shadow duration-300 hover:shadow-lg">
        <div className="rounded-lg px-4 py-2">
          <span className="bg-gradient-to-r from-white to-secondary bg-clip-text text-2xl font-bold text-transparent">
            MBK
          </span>
        </div>
      </div>
    </motion.div>
  );
};
