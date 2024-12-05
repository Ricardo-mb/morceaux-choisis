import { Button } from '@/components/ui/button';
import { ArrowRight, Send } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="container mx-auto flex items-center justify-center px-4 py-8">
        <section className="flex w-full items-center justify-center space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
          <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
            <h1 className="font-heading text-3xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
              Welcome to my <span className="text-primary">Portfolio</span>
            </h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              Crafting digital experiences with modern technologies. Explore my
              projects and discover how I can help bring your ideas to life.
            </p>
            <div className="flex gap-4">
              <Button size="lg">
                View Projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg">
                Contact Me
                <Send className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

// import Image from 'next/image';

// export default function Home() {
//   return (
//     <div className="min-h-screen bg-background text-foreground">
//       <main className="container mx-auto px-4 py-8">
//         <section className="text-center">
//           <h1 className="mb-4 text-4xl font-bold text-primary">
//             Welcome to my portfolio
//           </h1>
//           <p className="mx-auto mb-8 max-w-2xl text-xl text-muted-foreground">
//             These are amazing projects to showcase my skills.
//           </p>

//           <div className="flex justify-center space-x-4">
//             <a
//               href="/services"
//               className="rounded-lg bg-primary px-6 py-3 text-primary-foreground transition-colors hover:bg-primary/90"
//             >
//               Explore Services
//             </a>
//             <a
//               href="/contact"
//               className="rounded-lg bg-secondary px-6 py-3 text-secondary-foreground transition-colors hover:bg-secondary/90"
//             >
//               Contact Us
//             </a>
//           </div>
//         </section>

//       </main>

//       <footer className="mt-16 bg-secondary py-8 text-secondary-foreground">
//         <div className="container mx-auto px-4 text-center">
//           <p>&copy; 2024 Your Company. All rights reserved.</p>
//         </div>
//       </footer>
//     </div>
//   );
// }
