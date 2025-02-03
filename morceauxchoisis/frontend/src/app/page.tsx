"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Send } from "lucide-react";
import Link from "next/link";
import Timeline from "@/components/timeline/timeline";
import SkillsSection from "@/components/skillsSection/skillsSection";
import { skills as skillsData } from "@/data/skills";
import { items  as itemsData} from "@/data/items";

interface Skill {
  name: string;
  level: number;
  icon: string;
  category: 'frontend' | 'backend';
}
 interface Item {
  year: string;
  title: string;
  description: string;
  institution: string;
}
const skills: Skill[] = skillsData as Skill[];

const items: Item[] = itemsData as Item[];
export default function Home() {
  return (
    <div className='flex min-h-screen flex-col bg-background'>
      <main className='container mx-auto flex items-center justify-center px-4 py-8'>
        <section className='flex w-full items-center justify-center space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32'>
          <div className='container flex max-w-[64rem] flex-col items-center gap-4 text-center'>
            <h1 className='font-heading text-3xl font-bold sm:text-5xl md:text-6xl lg:text-7xl'>
              Salut moi c'est <span className='text-primary'>Ricardo!</span>
            </h1>
            <p className='max-w-[45rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8'>
              Je suis un développeur web passionné et créatif, prêt à transformer vos idées en réalité.
              Mon objectif est de vous offrir une expérience utilisateur exceptionnelle et de répondre à vos besoins spécifiques.
            </p>
            <div className='flex gap-4'>
              <Button asChild size='lg'>
                <Link href='/projects'>
                  Projects
                  <ArrowRight className='ml-2 h-4 w-2' />
                </Link>
              </Button>
              <Button asChild variant='outline' size='lg'>
                <Link href='/contact'>
                  Contacter
                  <Send className='ml-2 h-4 w-4' />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <main className='container mx-auto flex items-center justify-center px-4 py-8'>
        <section className='flex w-full items-center justify-center space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32'>
          <div className='container flex max-w-[64rem] flex-col items-center gap-4 text-center'>
            <h5 className='font-heading text-l font-bold sm:text-3xl md:text-4xl lg:text-5xl'>
              Mes Technos et mes outils
            </h5>
            <SkillsSection skills={skills} />
          </div>
        </section>
      </main>
      <main className='container mx-auto flex items-center justify-center px-4 py-8'>
        <section className='flex w-full items-center justify-center space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32'>
          <div className='container flex max-w-[64rem] flex-col items-center gap-4 text-center'>
            <h5 className='font-heading text-l font-bold sm:text-3xl md:text-4xl lg:text-5xl'>
              Parcours
            </h5>
            <Timeline items={items} />
          </div>
        </section>
      </main>
    </div>
  );
}

  
