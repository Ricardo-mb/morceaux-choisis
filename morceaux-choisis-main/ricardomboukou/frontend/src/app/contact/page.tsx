"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Send, Mail, Github, Linkedin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">
            Contact
          </h1>
          
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            {/* Contact Form */}
            <Card className="p-6">
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Nom</label>
                  <input
                    type="text"
                    className="w-full p-2 rounded-md border bg-background"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full p-2 rounded-md border bg-background"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    className="w-full p-2 rounded-md border bg-background h-32"
                    required
                  />
                </div>
                <Button className="w-full">
                  Envoyer
                  <Send className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </Card>

            {/* Contact Info */}
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-6">Contact Direct</h2>
              <div className="space-y-4">
                <a href="mailto:contact@example.com" className="flex items-center gap-3 hover:text-primary transition-colors">
                  <Mail className="h-5 w-5" />
                  contact@example.com
                </a>
                <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-primary transition-colors">
                  <Github className="h-5 w-5" />
                  Github
                </a>
                <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-primary transition-colors">
                  <Linkedin className="h-5 w-5" />
                  LinkedIn
                </a>
              </div>
            </Card>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
