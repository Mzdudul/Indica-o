import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Chrome, Lock, Mail, ShieldCheck } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const { login, register, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      if (isLogin) {
        await login(email, password);
        if (email === 'admin@gmail.com' && password === 'admin3758') {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      } else {
        await register(email, password);
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error('Erro ao autenticar. Tente novamente.');
    }
  }

  async function handleGoogleSignIn() {
    try {
      await signInWithGoogle();
      navigate('/dashboard');
    } catch (error) {
      toast.error('Erro ao autenticar com Google. Tente novamente.');
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            {showAdminLogin ? 'Acesso Administrativo' : isLogin ? 'Entrar' : 'Criar Conta'}
          </h2>
          {showAdminLogin && (
            <p className="mt-2 text-sm text-gray-600">
              Entre com suas credenciais de administrador
            </p>
          )}
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder={showAdminLogin ? 'Email do administrador' : 'Email'}
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Senha
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder={showAdminLogin ? 'Senha do administrador' : 'Senha'}
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {showAdminLogin ? 'Entrar como Administrador' : isLogin ? 'Entrar' : 'Cadastrar'}
            </button>
          </div>

          {!showAdminLogin && (
            <>
              <div className="flex items-center justify-center">
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  <Chrome className="w-5 h-5 mr-2" />
                  Continuar com Google
                </button>
              </div>

              <div className="text-center space-y-2">
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-sm text-indigo-600 hover:text-indigo-500"
                >
                  {isLogin
                    ? 'Não tem uma conta? Cadastre-se'
                    : 'Já tem uma conta? Entre'}
                </button>
              </div>
            </>
          )}

          <div className="text-center">
            <button
              type="button"
              onClick={() => {
                setShowAdminLogin(!showAdminLogin);
                setEmail('');
                setPassword('');
              }}
              className="text-sm text-gray-500 hover:text-gray-700 flex items-center justify-center mx-auto"
            >
              <ShieldCheck className="h-4 w-4 mr-1" />
              {showAdminLogin ? 'Voltar ao login normal' : 'Acesso Administrativo'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}