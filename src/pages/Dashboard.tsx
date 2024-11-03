import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import QRCode from 'react-qr-code';
import { toast } from 'react-hot-toast';
import { Copy, LogOut, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../lib/firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

interface ReferralStats {
  total: number;
  pending: number;
  approved: number;
  cancelled: number;
}

export default function Dashboard() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<ReferralStats>({
    total: 0,
    pending: 0,
    approved: 0,
    cancelled: 0,
  });
  const referralLink = `${window.location.origin}/refer/${currentUser?.uid}`;

  useEffect(() => {
    if (!currentUser) return;

    const q = query(
      collection(db, 'referrals'),
      where('referrerId', '==', currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newStats = {
        total: snapshot.size,
        pending: 0,
        approved: 0,
        cancelled: 0,
      };

      snapshot.forEach((doc) => {
        const status = doc.data().status;
        if (status === 'pending') newStats.pending++;
        if (status === 'approved') newStats.approved++;
        if (status === 'cancelled') newStats.cancelled++;
      });

      setStats(newStats);
    });

    return () => unsubscribe();
  }, [currentUser]);

  async function handleLogout() {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      toast.error('Erro ao sair. Tente novamente.');
    }
  }

  function copyLink() {
    navigator.clipboard.writeText(referralLink);
    toast.success('Link copiado!');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">
                Sistema de Indicações
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-sm text-gray-700">
                <User className="h-4 w-4 mr-2" />
                <span>{currentUser?.email}</span>
              </div>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sair
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow rounded-lg mb-8">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
                    <User className="h-6 w-6 text-indigo-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Bem-vindo(a)!
                  </h3>
                  <p className="text-sm text-gray-500">
                    Logado como: {currentUser?.email}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Total de Indicações
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">
                  {stats.total}
                </dd>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Pendentes
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-yellow-600">
                  {stats.pending}
                </dd>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Aprovadas
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-green-600">
                  {stats.approved}
                </dd>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Canceladas
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-red-600">
                  {stats.cancelled}
                </dd>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Seu Link de Indicação
              </h3>
              <div className="mt-5 flex flex-col items-center space-y-4">
                <QRCode value={referralLink} size={200} />
                <div className="w-full max-w-md flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={referralLink}
                    className="flex-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <button
                    onClick={copyLink}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copiar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}