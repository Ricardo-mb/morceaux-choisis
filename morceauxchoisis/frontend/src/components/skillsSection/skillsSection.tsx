import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import {
  Html,
  Css,
  Javascript,
  ToggleOn,
  Palette,
  Extension,
  Code,
  Storage,
  Chat,
  Architecture,
  DataObject,
  Cloud,
  Terminal,
  Api,
  Send
} from "@mui/icons-material";
interface Skill {
  name: string;
  level: number;
  icon: string;
}

interface SkillsSectionProps {
  skills: Skill[];
}

const getIcon = (type: string) => {
  switch (type) {
    case "html":
      return <Html className="w-12 h-12" />;
    case "css":
      return <Css className="w-12 h-12" />;
    case "javascript":
      return <Javascript className="w-12 h-12" />;
    case "bootstrap":
      return <ToggleOn className="w-12 h-12" />;
    case "materialui":
      return <Palette className="w-12 h-12" />;
    case "shadcn":
      return <Extension className="w-12 h-12" />;
    case "figma":
      return <Architecture className="w-12 h-12" />;
    case "react":
      return <Code className="w-12 h-12" />;
    case "redux":
      return <DataObject className="w-12 h-12" />;
    case "nodejs":
      return <Terminal className="w-12 h-12" />;
    case "express":
      return <Cloud className="w-12 h-12" />;
    case "python":
      return <Code className="w-12 h-12" />;
    case "mongodb":
      return <Storage className="w-12 h-12" />;
    case "graphql":
      return <Api className="w-12 h-12" />;
    case "postman":
      return <Send className="w-12 h-12" />;
    default:
      return <Code className="w-12 h-12" />;
  }
};

const SkillsSection = ({ skills }: SkillsSectionProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {skills.map((skill, index) => (
        <motion.div
          key={index}
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
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                    viewport={{ once: true }}
                  />
                </div>
                <span className="text-sm text-gray-500 mt-2">{skill.level}%</span>
              </div>
            </motion.div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default SkillsSection;