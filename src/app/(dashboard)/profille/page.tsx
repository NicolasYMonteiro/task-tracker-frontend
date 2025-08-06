'use client';

import { useEffect, useState } from 'react';
import { FiUser, FiMail, FiCalendar, FiCheckCircle, FiClock, FiList, FiTrendingUp, FiAlertTriangle } from 'react-icons/fi';
import { TaskStatus } from '@sharedTypes/task';
import StatCard from '@components/card/statCard';
import { getUserProfile } from '@actions/user/user.actions'; 
import type { UserProfile } from '@sharedTypes/user';

const ProfilePage = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getUserProfile();
        setProfile(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to load profile:', error);
      }
    };
    loadProfile();
  }, []);
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Erro ao carregar perfil</h2>
          <p className="text-gray-600">Não foi possível carregar as informações do seu perfil.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900">Meu Perfil</h1>
          <p className="mt-2 text-lg text-gray-600">Gerencie suas informações e visualize seu progresso</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna 1: Informações do usuário */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <FiUser className="text-5xl text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">{profile.name}</h2>
                <p className="text-gray-600 mb-6">{profile.email}</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <FiMail className="text-gray-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{profile.email}</p>
                  </div>
                </div>

                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <FiCalendar className="text-gray-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Membro desde</p>
                    <p className="font-medium">
                      {new Date(profile.createdAt).toLocaleDateString('pt-BR', {
                        year: 'numeric',
                        month: 'long',
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Coluna 2: Estatísticas */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Estatísticas de Produtividade</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <StatCard
                  icon={<FiList className="text-blue-600" />}
                  title="Total de Tarefas"
                  value={profile.taskStats.total}
                  color="bg-blue-50"
                />
                <StatCard
                  icon={<FiCheckCircle className="text-green-600" />}
                  title="Concluídas"
                  value={profile.taskStats.completed}
                  percentage={Math.round((profile.taskStats.completed / profile.taskStats.total) * 100)}
                  color="bg-green-50"
                />
                <StatCard
                  icon={<FiClock className="text-yellow-600" />}
                  title="Pendentes"
                  value={profile.taskStats.pending}
                  color="bg-yellow-50"
                />
                <StatCard
                  icon={<FiAlertTriangle className="text-red-600" />}
                  title="Atrasadas"
                  value={profile.taskStats.overdue}
                  color="bg-red-50"
                />
                <StatCard
                  icon={<FiTrendingUp className="text-purple-600" />}
                  title="Prioritárias"
                  value={profile.taskStats.highPriority}
                  color="bg-purple-50"
                />
                <StatCard
                  icon={<FiClock className="text-indigo-600" />}
                  title="Média de conclusão"
                  value={`${profile.taskStats.averageCompletionTime} dias`}
                  color="bg-indigo-50"
                />
              </div>
            </div>

            {/* Tarefas recentes */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Tarefas Recentes</h2>

              {profile.recentTasks.length > 0 ? (
                <div className="space-y-4">
                  {profile.recentTasks.map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full mr-3 ${task.status === 'COMPLETED' ? 'bg-green-500' :
                          task.status === 'PENDING' ? 'bg-yellow-500' : 'bg-red-500'
                          }`}></div>
                        <div>
                          <h3 className="font-medium">{task.title}</h3>
                          <p className="text-sm text-gray-500">
                            {new Date(task.date).toLocaleDateString('pt-BR', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${task.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                        task.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                        }`}>
                        {task.status === 'COMPLETED' ? 'Concluída' :
                          task.status === 'PENDING' ? 'Pendente' : 'Atrasada'}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">Nenhuma tarefa recente encontrada</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default ProfilePage;