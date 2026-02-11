import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { plans, getUpgradePrice } from '@/data/modules';

export type PlanType = 'iniciante' | 'fanatico' | 'pro' | null;
export type ObjectiveType = 'afiliado' | 'gestor' | 'both' | null;

interface UserState {
  isLoggedIn: boolean;
  name: string;
  email: string;
  plan: PlanType;
  objective: ObjectiveType;
  completedTasks: number[];
  moduleProgress: Record<number, number>;
  hasOnboarded: boolean;
}

interface AppContextType {
  user: UserState;
  setUser: React.Dispatch<React.SetStateAction<UserState>>;
  isDark: boolean;
  toggleTheme: () => void;
  login: (name: string, email: string, plan: PlanType) => void;
  logout: () => void;
  setObjective: (obj: ObjectiveType) => void;
  toggleTask: (taskId: number) => void;
  updateModuleProgress: (moduleId: number, progress: number) => void;
  upgradePlan: (newPlan: 'fanatico' | 'pro') => void;
  getPlanInfo: () => { name: string; price: number; modules: number[]; daysPlan: number } | null;
  canAccessModule: (moduleId: number) => boolean;
}

const defaultUser: UserState = {
  isLoggedIn: false,
  name: '',
  email: '',
  plan: null,
  objective: null,
  completedTasks: [],
  moduleProgress: {},
  hasOnboarded: false,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isDark, setIsDark] = useState(false);
  const [user, setUser] = useState<UserState>(defaultUser);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  const toggleTheme = () => setIsDark(p => !p);

  const login = (name: string, email: string, plan: PlanType) => {
    setUser(prev => ({ ...prev, isLoggedIn: true, name, email, plan, completedTasks: [], moduleProgress: {} }));
  };

  const logout = () => setUser(defaultUser);

  const setObjective = (obj: ObjectiveType) => {
    setUser(prev => ({ ...prev, objective: obj, hasOnboarded: true }));
  };

  const toggleTask = (taskId: number) => {
    setUser(prev => ({
      ...prev,
      completedTasks: prev.completedTasks.includes(taskId)
        ? prev.completedTasks.filter(t => t !== taskId)
        : [...prev.completedTasks, taskId],
    }));
  };

  const updateModuleProgress = (moduleId: number, progress: number) => {
    setUser(prev => ({
      ...prev,
      moduleProgress: { ...prev.moduleProgress, [moduleId]: Math.min(100, progress) },
    }));
  };

  const upgradePlan = (newPlan: 'fanatico' | 'pro') => {
    setUser(prev => ({ ...prev, plan: newPlan }));
  };

  const getPlanInfo = () => {
    if (!user.plan) return null;
    const plan = plans.find(p => p.id === user.plan);
    return plan ? { name: plan.name, price: plan.price, modules: plan.modules, daysPlan: plan.daysPlan } : null;
  };

  const canAccessModule = (moduleId: number) => {
    if (!user.plan) return false;
    const plan = plans.find(p => p.id === user.plan);
    return plan ? plan.modules.includes(moduleId) : false;
  };

  return (
    <AppContext.Provider value={{ user, setUser, isDark, toggleTheme, login, logout, setObjective, toggleTask, updateModuleProgress, upgradePlan, getPlanInfo, canAccessModule }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be inside AppProvider');
  return ctx;
};
