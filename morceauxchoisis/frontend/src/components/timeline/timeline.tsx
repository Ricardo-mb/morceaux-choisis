import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  institution: string;
}

interface TimelineProps {
  items: TimelineItem[];
}

const Timeline = ({ items }: TimelineProps) => {
  return (
    <div className="space-y-8">
      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          viewport={{ once: true }}
          className="timeline-item"
        >
          <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
            <span className="inline-block px-3 py-1 mb-3 text-sm font-medium bg-primary/10 text-primary rounded-full">
              {item.year}
            </span>
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-600 mb-2">{item.description}</p>
            <p className="text-sm text-gray-500">{item.institution}</p>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default Timeline;