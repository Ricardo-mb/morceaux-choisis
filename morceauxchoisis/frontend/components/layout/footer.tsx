import { Logo } from '@/components/shared/logo';
import Link from 'next/link';
import { motion } from 'framer-motion';

export function Footer() {
  return (
    <footer className="mt-16 bg-secondary py-8 text-secondary-foreground">
      <div className="container mx-auto px-4 text-center">
        {/* <motion.div> */}
        {/* <Link href="/" className="flex items-center gap-2">
          <Logo />
        </Link> */}
        {/* </motion.div> */}

        <p>&copy; 2024 Your Company. All rights reserved.</p>
      </div>
    </footer>
  );
}
