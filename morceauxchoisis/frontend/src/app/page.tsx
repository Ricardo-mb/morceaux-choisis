import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, Code, Briefcase, Send } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="flex-1">
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
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

        <section className="container space-y-6 py-8 md:py-12 lg:py-24">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <div className="flex gap-4">
              <Code className="h-6 w-6 text-primary" />
              <Briefcase className="h-6 w-6 text-primary" />
            </div>
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
              Featured Projects
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              These are amazing projects to showcase my skills in web
              development, design, and problem-solving.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
