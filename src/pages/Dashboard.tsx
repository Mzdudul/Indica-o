import React, { useState } from 'react';
import { QrCode, Copy, Users, Clock, CheckCircle, XCircle } from 'lucide-react';
import QRCode from 'react-qr-code';
import { useAuth } from '../contexts/AuthContext';

const mockUsers = [
  { id: 1, name: 'João Silva', phone: '(11) 98765-4321', email: 'joao@email.com', status: 'aprovado' },
  { id: 2, name: 'Maria Santos', phone: '(11) 91234-5678', email: 'maria@email.com', status: 'pendente' },
  { id: 3, name: 'Pedro Oliveira', phone: '(11) 99876-5432', email: 'pedro@email.com', status: 'cancelado' },
];

export default function Dashboard() {
  const { logout } = useAuth();
  const [shareLink] = useState('https://meusite.com/indicacao/123');

  const stats = {
    total: mockUsers.length,
    pending: mockUsers.filter(u => u.status === 'pendente').length,
    approved: mockUsers.filter(u => u.status === 'aprovado').length,
    canceled: mockUsers.filter(u => u.status === 'cancelado').length,
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareLink);
    alert('Link copiado!');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'aprovado': return 'text-green-600 bg-green-100';
      case 'pendente': return 'text-yellow-600 bg-yellow-100';
      case 'cancelado': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">Sistema de Indicações</h1>
            </div>
            <div className="flex items-center">
              <button
                onClick={logout}
                className="ml-4 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* QR Code Section */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center mb-4">
                  <QrCode className="h-6 w-6 text-blue-500 mr-2" />
                  <h3 className="text-lg font-medium text-gray-900">Compartilhar Indicação</h3>
                </div>
                <div className="flex flex-col items-center space-y-4">
                  <QRCode value={shareLink} size={200} />
                  <div className="w-full flex items-center space-x-2">
                    <input
                      type="text"
                      value={shareLink}
                      readOnly
                      className="flex-1 p-2 border rounded-md text-sm text-gray-500"
                    />
                    <button
                      onClick={copyToClipboard}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-md"
                    >
                      <Copy className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Statistics Section */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center mb-4">
                  <Users className="h-6 w-6 text-blue-500 mr-2" />
                  <h3 className="text-lg font-medium text-gray-900">Estatísticas</h3>
                </div>
                <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="px-4 py-5 bg-gray-50 rounded-lg overflow-hidden">
                    <dt className="text-sm font-medium text-gray-500 truncate">Total de Usuários</dt>
                    <dd className="mt-1 text-3xl font-semibold text-gray-900">{stats.total}</dd>
                  </div>
                  <div className="px-4 py-5 bg-yellow-50 rounded-lg overflow-hidden">
                    <dt className="text-sm font-medium text-yellow-600 truncate">Pendentes</dt>
                    <dd className="mt-1 text-3xl font-semibold text-yellow-700">{stats.pending}</dd>
                  </div>
                  <div className="px-4 py-5 bg-green-50 rounded-lg overflow-hidden">
                    <dt className="text-sm font-medium text-green-600 truncate">Aprovados</dt>
                    <dd className="mt-1 text-3xl font-semibold text-green-700">{stats.approved}</dd>
                  </div>
                  <div className="px-4 py-5 bg-red-50 rounded-lg overflow-hidden">
                    <dt className="text-sm font-medium text-red-600 truncate">Cancelados</dt>
                    <dd className="mt-1 text-3xl font-semibold text-red-700">{stats.canceled}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>

          {/* Users Table */}
          <div className="mt-6 bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center mb-4">
                <Users className="h-6 w-6 text-blue-500 mr-2" />
                <h3 className="text-lg font-medium text-gray-900">Lista de Usuários</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nome
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Telefone
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mockUsers.map((user) => (
                      <tr key={user.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {user.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.phone}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(user.status)}`}>
                            {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}