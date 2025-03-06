"use client";

import { useState, useContext, useCallback } from "react";
import { gql, useMutation } from '@apollo/client';
import { AuthContext } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { REGISTER_MUTATION } from "@/graphql/mutations/user";


// const REGISTER_MUTATION = gql`
//   mutation RegisterMutation($input: UserInput!) {
//     registerMutation(input: $input) {
//       token
//       user {
//         id
//         name
//         email
//         role
//         isAdmin
//       }
//     }
//   }
// `;


const RegisterMutation = () => {
  const { register } = useContext(AuthContext);
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    isAdmin: false,
    role:"USER"
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value.trim() }));
    setErrorMessage(""); // Clear error message on input change
  }, []);

  const validateForm = () => {
    if (!formData.name || formData.name.length < 2) {
      setErrorMessage('Le nom doit contenir au moins 2 caractères');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage('Format d\'email invalide');
      return false;
    }

    if (formData.password.length < 8) {
      setErrorMessage('Le mot de passe doit contenir au moins 8 caractères');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Les mots de passe ne correspondent pas');
      return false;
    }

    return true;
  };


  const ERROR_MESSAGES = {
  'Invalid credentials': 'Email ou mot de passe incorrect',
  'User not found': 'Aucun compte trouvé avec cet email',
  'Network error': 'Problème de connexion au serveur',
  'Email format invalid': 'Format d\'email invalide',
  'Password required': 'Le mot de passe est requis',
  'Email required': 'L\'email est requis',
  'Email already exists': 'Cet email est déjà utilisé',
  'Name required': 'Le nom est requis',
  'Password too short': 'Le mot de passe doit contenir au moins 8 caractères',
  default: 'Une erreur est survenue lors de l\'inscription'
};

interface Role{
  role: "ADMIN" | "USER" | "GUEST"
}

// const validateRoles: Role[] = [
//   { role: "ADMIN" },
//   { role: "USER" }
// ]
// interface RegisterUserData {
//   email: string;
//   password: string;
//   username: string;
//   isAdmin: boolean;
//   role: Role['role'];
// }

  const [registerMutation, { loading }] = useMutation(REGISTER_MUTATION, {
    onCompleted: (data) => {
      const { token, user } = data.registerMutation;
      register(token, user);
      toast.success('Inscription réussie !');
      router.push('/logout');
    },
    onError: (error) => {
      console.error('Registration error:', error);

        // More robust error handling:
        const graphQLErrors = error.graphQLErrors;
        if (graphQLErrors) {
          graphQLErrors.forEach(err => {
            const message = ERROR_MESSAGES[err.message as keyof typeof ERROR_MESSAGES] || ERROR_MESSAGES.default;
            toast.error(message); // Display error message using toast
          });        } else if (error.networkError) {
          toast.error(ERROR_MESSAGES['Network error']); // Handle network errors
        } else {
          toast.error(ERROR_MESSAGES.default); // Generic error message
        }
      setErrorMessage(""); // Clear the internal error message so it doesn't linger
    }
  });

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      await registerMutation({
        variables: {
          input: {
            name: formData.name.trim(),
            email: formData.email.toLowerCase(),
            password: formData.password,
            isAdmin: false,
            role: "USER"
          }
        }
      });
    } catch (error) {
      console.error('Registration error(handleSubmit):', error);
    }
  }, [formData, registerMutation, validateForm]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <main className="w-full max-w-md px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="w-full max-w-xl p-8 space-y-6">
            <div className="space-y-2 text-center">
              <h2 className="text-3xl font-bold">Pas encore de compte</h2>
              <p className="text-muted-foreground">Créez un compte pour commencer</p>
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
              <Input
                type="text"
                placeholder="Full Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="hover:border-primary/50 transition-colors"
                required
                minLength={2}
                autoComplete="username"
              />
              <Input
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="hover:border-primary/50 transition-colors"
                required
                autoComplete="email"
              />
              <Input
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="hover:border-primary/50 transition-colors"
                required
                minLength={8}
                autoComplete="new-password"
              />
              <Input
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="hover:border-primary/50 transition-colors"
                required
                minLength={8}
                autoComplete="new-password"
              />
              <Button 
                type="submit" 
                className="w-full"
                disabled={loading}
              >
                {loading ? 'Création...' : 'Créer un compte'}
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </form>

            <div className="text-center text-sm">
              <span className="text-muted-foreground">Vous avez déja un compte? </span>
              <Link href="/login" className="text-primary hover:underline font-medium">
                Connectez-vous
              </Link>
            </div>
          </Card>
        </motion.div>
      </main>
    </div>
  );
};
export default RegisterMutation;
