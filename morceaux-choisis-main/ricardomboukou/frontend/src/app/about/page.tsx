"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import SkillsSection from "@/components/skillsSection/skillsSection";
import Timeline from "@/components/timeline/timeline";
import Link from "next/link";


const About = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  const scrollToTimeline = () => {
    timelineRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  // const scrollToSkills = () => {
  //   skillsRef.current?.scrollIntoView({ block: "end" });
  // };

  const timelineData = [
    {
      year: "2023",
      title: "Master's Degree",
      description: "Computer Science with focus on AI and Machine Learning",
      institution: "Stanford University"
    },
    {
      year: "2021",
      title: "Bachelor's Degree",
      description: "Computer Science and Mathematics",
      institution: "MIT"
    },
    {
      year: "2019",
      title: "Research Internship",
      description: "AI Research Lab",
      institution: "Google Research"
    }
  ];

  interface Skill {
    name: string;
    icon: string;
    category: "frontend" | "backend";
  }

  const frontendSkills: Skill[] = [
    { name: "HTML", icon: "html", category: "frontend" },
    { name: "CSS-3", icon: "css", category: "frontend" },
    { name: "JavaScript", icon: "javascript", category: "frontend" },
    { name: "Bootstrap", icon: "bootstrap", category: "frontend" },
    { name: "TypeScript", icon: "typescript", category: "frontend" },
    { name: "Tailwind", icon: "tailwind", category: "frontend" },
    { name: "Figma", icon: "figma", category: "frontend" },
    { name: "React/Next.js", icon: "react", category: "frontend" },
    { name: "Redux", icon: "redux", category: "frontend" },
    { name: "Codium AI", icon: "codium", category: "frontend" },
  ];

  const backendSkills: Skill[] = [
    { name: "Node.js", icon: "nodejs", category: "backend" },
    { name: "Express.js", icon: "express", category: "backend" },
    { name: "Python", icon: "python", category: "backend" },
    { name: "MongoDB", icon: "mongodb", category: "backend" },
    { name: "GraphQL", icon: "graphql", category: "backend" },
    { name: "Postman", icon: "postman", category: "backend" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 dark:from-background dark:to-background/80">
      <section className="min-h-screen flex flex-col items-center justify-center px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="inline-block px-3 py-1 mb-6 text-sm font-medium bg-primary/10 text-primary rounded-full dark:bg-primary/20">
            Formation & Experience
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight dark:text-white">
            Bonjour, moi c&apos; est Ricardo: Développeur Web Fullstack Passionné
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
            Vous trouverez ici les éléments de mon parcours à travers une chronologie interactive qui illustre mes compétences techniques, mes réalisations et mon expérience professionnelle de manière globale.
          </p>
          <div className='flex items-center justify-center py-12 gap-4'>
              <Button asChild size='lg'>
                <Link href='/projects'>
                  Projects
                  <ArrowRight className='ml-2 h-4 w-2' />
                </Link>
              </Button>
              <Button asChild size='lg'>
                <Link href='/contact'>
                  Contacter
                  <Send className='ml-2 h-4 w-4' />
                </Link>
              </Button>
            </div>
          <Button
            size="lg"
            variant="secondary"
            onClick={scrollToTimeline}
            className="group relative overflow-hidden px-6 py-3 rounded-full bg-primary hover:bg-primary/90 text-white transition-all duration-300"
          >
            C&apos; est par ici
            <ChevronDown className="ml-2 w-4 h-4 inline-block group-hover:animate-bounce" />
          </Button>
        </motion.div>
      </section>

      <div ref={timelineRef}>
        <section className="py-20 px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center dark:text-white">Timeline</h2>
            <Timeline items={timelineData} />
          </div>
        </section>

        <div ref={skillsRef}>
          <section className="py-20 px-4 md:px-6 bg-gray-50 dark:bg-gray-900">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center dark:text-white">Compétences Techniques</h2>
              <div className="space-y-16">
                <div>
                  <h3 className="text-2xl font-semibold mb-8 text-center text-primary dark:text-primary">Dévelopment Frontend</h3>
                  <SkillsSection skills={frontendSkills} />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-8 text-center text-primary dark:text-primary">Dévelopment Backend</h3>
                  <SkillsSection skills={backendSkills} />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;