"use client";

import { motion } from "framer-motion";
import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { LOGIN_MUTATION } from '@/graphql/mutations/user';



const LoginMutation = () => {
  const router = useRouter();
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [attempts, setAttempts] = useState(0);
  const MAX_ATTEMPTS = 3;

  const resetForm = useCallback(() => {
    setFormData({ email: "", password: "" });
    setErrorMessage("");
  }, []);

  // Clear form data when component unmounts
  useEffect(() => {
    return () => {
      resetForm();
    };
  }, []);

  const ERROR_MESSAGES = {
    'Invalid credentials': 'Email ou mot de passe incorrect',
    'User not found': 'Aucun compte trouvé avec cet email',
    'Network error': 'Problème de connexion au serveur',
    'Email format invalid': 'Format d\'email invalide',
    'Password required': 'Le mot de passe est requis',
    'Email required': 'L\'email est requis',
    default: 'Une erreur est survenue lors de la connexion'
  };

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value.trim() }));
    setErrorMessage(""); // clear error when user types
  }, []);

  const [loginMutation, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {
      const { token, user, role } = data.loginMutation;
      login(token, user);
      router.push(role === 'admin' ? '/admin/dashboard' : '/');
      resetForm();
    },
    onError: (error) => {
      setAttempts(prev => prev + 1);
      const errorKey = Object.keys(ERROR_MESSAGES).find(key => 
        error.message.includes(key)
      );
      setErrorMessage(
        errorKey ? 
        ERROR_MESSAGES[errorKey as keyof typeof ERROR_MESSAGES] : 
        ERROR_MESSAGES.default
      );
    }
  });

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (attempts >= MAX_ATTEMPTS) {
      setErrorMessage('Trop de tentatives. Veuillez réessayer plus tard.');
      return;
    }

    const { email, password } = formData;

    // Enhanced validation
    if (!email || !password) {
      setErrorMessage(!email ? ERROR_MESSAGES['Email required'] : ERROR_MESSAGES['Password required']);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage(ERROR_MESSAGES['Email format invalid']);
      return;
    }

    try {
      await loginMutation({ 
        variables: { 
          email: email.toLowerCase(), 
          password 
        } 
      });
    } catch (error) {
      console.error('Error logging in:', error);
      setErrorMessage(ERROR_MESSAGES['Invalid credentials']);
    }
  }, [formData, loginMutation, attempts, MAX_ATTEMPTS, ERROR_MESSAGES, setErrorMessage]);
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <main className="w-full max-w-md px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="w-full max-w-md p-8 space-y-6">
            <div className="space-y-2 text-center">
              <h2 className="text-3xl font-bold">Bienvenue</h2>
              <p className="text-muted-foreground">Connectez-vous</p>
            </div>
            
            {errorMessage && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-500 text-sm text-center"
              >
                {errorMessage}
              </motion.p>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="hover:border-primary/50 transition-colors"
                  autoComplete="email"
                />
              </div>
              <div className="space-y-2">
                <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="hover:border-primary/50 transition-colors"
                  autoComplete="current-password"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full" 
                disabled={loading}
              >
                {loading ? 'Connexion...' : 'Connexion'}
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </form>

            <div className="text-center text-sm">
              <span className="text-muted-foreground">Vous n'avez pas de compte? </span>
              <Link href="/register" className="text-primary hover:underline font-medium">
                S'inscrire
              </Link>
            </div>
          </Card>
        </motion.div>
      </main>
    </div>
  );
};

export default LoginMutation;


