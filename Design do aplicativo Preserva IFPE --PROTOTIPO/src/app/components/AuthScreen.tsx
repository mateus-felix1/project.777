import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Button } from './Button';
import { Input } from './Input';

interface AuthScreenProps {
  onLogin: (email: string) => void;
}

export function AuthScreen({ onLogin }: AuthScreenProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      onLogin(name || email.split('@')[0]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-[#0047AB] to-secondary flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Card */}
        <div className="bg-white dark:bg-card rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-secondary p-8 text-center">
            <div className="w-16 h-16 bg-white rounded-xl mx-auto mb-4 flex items-center justify-center">
              <span className="text-primary font-bold text-3xl">P</span>
            </div>
            <h2 className="text-white font-bold text-2xl mb-1">Preserva IFPE</h2>
            <p className="text-white/90 text-sm">Sistema de Preservação de Materiais</p>
          </div>

          {/* Form */}
          <div className="p-8">
            <div className="flex mb-6 bg-muted rounded-lg p-1">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-2 rounded-md font-medium transition-all ${
                  isLogin
                    ? 'bg-white dark:bg-card text-primary shadow-sm'
                    : 'text-muted-foreground'
                }`}
              >
                Entrar
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-2 rounded-md font-medium transition-all ${
                  !isLogin
                    ? 'bg-white dark:bg-card text-primary shadow-sm'
                    : 'text-muted-foreground'
                }`}
              >
                Cadastrar
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <Input
                    label="Nome completo"
                    placeholder="Digite seu nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </motion.div>
              )}

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  E-mail institucional
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="email"
                    placeholder="seu.nome@aluno.ifpe.edu.br"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-input-background border border-input rounded-lg
                      text-foreground placeholder:text-muted-foreground
                      focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent
                      transition-all duration-200"
                  />
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  Use apenas e-mails @aluno.ifpe.edu.br ou @ifpe.edu.br
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Senha
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-2.5 bg-input-background border border-input rounded-lg
                      text-foreground placeholder:text-muted-foreground
                      focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent
                      transition-all duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {isLogin && (
                <div className="text-right">
                  <button
                    type="button"
                    className="text-sm text-primary hover:text-secondary font-medium transition-colors"
                  >
                    Esqueci minha senha
                  </button>
                </div>
              )}

              <Button type="submit" variant="primary" size="lg" fullWidth>
                {isLogin ? 'Entrar' : 'Criar conta'}
                <ArrowRight className="w-5 h-5" />
              </Button>
            </form>

            {isLogin && (
              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Não tem uma conta?{' '}
                  <button
                    onClick={() => setIsLogin(false)}
                    className="text-primary hover:text-secondary font-medium transition-colors"
                  >
                    Cadastre-se
                  </button>
                </p>
              </div>
            )}
          </div>
        </div>

        <p className="text-center text-white/70 text-xs mt-6">
          © 2026 IFPE Campus Jaboatão - Todos os direitos reservados
        </p>
      </motion.div>
    </div>
  );
}
