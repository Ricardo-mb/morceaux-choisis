"use client"


import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import Image from "next/image";
// import {
//   Code,
//   FileCode,
//   Palette,
//   LayoutGrid,
//   Boxes,
//   Component,
//   Figma,
//   Binary,
//   Database,
//   Terminal,
//   Cloud,
//   Server,
//   Send,
//   Webhook,
//   MonitorSmartphone
// } from "lucide-react";


interface Skill {
  name: string;
  // level: number;
  icon: string;
  category: 'frontend' | 'backend';
}

interface SkillsSectionProps {
  skills: Skill[];
}


const getIcon = (type: string) => {
  const iconMap: { [key: string]: string } = {
    html: '/icons/html.svg',
    css: '/icons/css.svg',
    tailwind: '/icons/tailwind.svg',
    javascript: '/icons/javascript.svg',
    typescript: '/icons/typescript.svg',
    bootstrap: '/icons/bootstrap.svg',
    materialui: '/icons/material-ui.svg',
    shadcn: '/icons/shadcn.svg',
    figma: '/icons/figma.svg',
    react: '/icons/react.svg',
    next: '/icons/nextjs.svg',
    redux: '/icons/redux.svg',
    codium: '/icons/codium.svg',
    nodejs: '/icons/nodejs.svg',
    express: '/icons/express.svg',
    python: '/icons/python.svg',
    mongodb: '/icons/mongodb.svg',
    graphql: '/icons/graphql.svg',
    postman: '/icons/postman.svg',
    mysql: '/icons/mysql.svg',
    docker: '/icons/docker.svg',
  };

  return (
    <Image 
      src={iconMap[type.toLowerCase()] || '/icons/code.svg'}
      priority={true}
      alt={type}
      width={48}
      height={48}
      className="w-12 h-12"
    />
  );
};

// const getIcon = (type: string) => {
//   switch (type) {
//     case "html":
//       return <FileCode className="w-12 h-12" />;
//     case "css":
//       return <Palette className="w-12 h-12" />;
//     case "javascript":
//       return <Binary className="w-12 h-12" />;
//     case "bootstrap":
//       return <LayoutGrid className="w-12 h-12" />;
//     case "materialui":
//       return <Component className="w-12 h-12" />;
//     case "shadcn":
//       return <Boxes className="w-12 h-12" />;
//     case "figma":
//       return <Figma className="w-12 h-12" />;
//     case "react":
//       return <Code className="w-12 h-12" />;
//     case "redux":
//       return <MonitorSmartphone className="w-12 h-12" />;
//     case "nodejs":
//       return <Terminal className="w-12 h-12" />;
//     case "express":
//       return <Cloud className="w-12 h-12" />;
//     case "python":
//       return <Code className="w-12 h-12" />;
//     case "mongodb":
//       return <Database className="w-12 h-12" />;
//     case "graphql":
//       return <Webhook className="w-12 h-12" />;
//     case "postman":
//       return <Send className="w-12 h-12" />;
//     default:
//       return <Server className="w-12 h-12" />;
//   }
// };


const SkillsSection = ({ skills }: SkillsSectionProps) => {
  const frontendSkills = skills.filter(skill => skill.category === 'frontend');
  const backendSkills = skills.filter(skill => skill.category === 'backend');

  return (
    <div className="container mx-auto px-2 py-8">
      <div className="space-y-4">
        {/* Frontend Section */}
        <div>
          {/* <h2 className="text-xl font-bold mb-8">Frontend Development</h2> */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {frontendSkills.map((skill, index) => (
              <SkillCard key={index} skill={skill} index={index} />
            ))}
          </div>
        </div>

        {/* Backend Section */}
        <div>
          {/* <h2 className="text-xl font-bold mb-8">Backend Development</h2> */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {backendSkills.map((skill, index) => (
              <SkillCard key={index} skill={skill} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const SkillCard = ({ skill, index }: { skill: Skill; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true }}
  >
    <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
      <motion.div
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
        className="flex flex-col items-center gap-4"
      >
        <motion.div
          animate={{
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="text-primary"
        >
          {getIcon(skill.icon.toLowerCase())}
        </motion.div>
        <div className="text-center">
          <h3 className="font-medium mb-2">{skill.name}</h3>
          <div className="skill-bar">
            <motion.div
              className="skill-progress bg-primary"
              initial={{ width: 0 }}
              //  whileInView={{ width: `${skill.level}%` }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true }}
            />
          </div>
          {/* <span className="text-sm text-gray-500 mt-2">{skill.level}%</span> */}
        </div>
      </motion.div>
    </Card>
  </motion.div>
);

export default SkillsSection;
