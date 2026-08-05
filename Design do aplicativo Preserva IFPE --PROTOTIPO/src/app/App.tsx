import { useState } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { AuthScreen } from './components/AuthScreen';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { Dashboard } from './components/Dashboard';
import { MaterialsScreen } from './components/MaterialsScreen';
import { CamerasScreen } from './components/CamerasScreen';
import { RoomMapScreen } from './components/RoomMapScreen';
import { RewardsScreen } from './components/RewardsScreen';
import { AlertsScreen } from './components/AlertsScreen';
import { CampaignsScreen } from './components/CampaignsScreen';
import { InspectionScreen } from './components/InspectionScreen';
import { ParentalMonitoringScreen } from './components/ParentalMonitoringScreen';
import { LoanFlowScreen } from './components/LoanFlowScreen';
import { LoanApprovalScreen } from './components/LoanApprovalScreen';
import { Home, BookOpen, Camera, MapPin, Award, Bell, Megaphone, ClipboardCheck, Users, PackageSearch } from 'lucide-react';

type Screen =
  | 'splash'
  | 'auth'
  | 'home'
  | 'materials'
  | 'cameras'
  | 'map'
  | 'rewards'
  | 'alerts'
  | 'campaigns'
  | 'inspection'
  | 'parental'
  | 'loans'
  | 'loan-approval';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [userName, setUserName] = useState('');
  const [activeTab, setActiveTab] = useState('home');

  const handleSplashComplete = () => {
    setCurrentScreen('auth');
  };

  const handleLogin = (name: string) => {
    setUserName(name);
    setCurrentScreen('home');
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    switch (tab) {
      case 'home':
        setCurrentScreen('home');
        break;
      case 'materials':
        setCurrentScreen('materials');
        break;
      case 'cameras':
        setCurrentScreen('cameras');
        break;
      case 'rewards':
        setCurrentScreen('rewards');
        break;
      case 'alerts':
        setCurrentScreen('alerts');
        break;
      case 'loans':
        setCurrentScreen('loans');
        break;
    }
  };

  // Splash Screen
  if (currentScreen === 'splash') {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  // Auth Screen
  if (currentScreen === 'auth') {
    return <AuthScreen onLogin={handleLogin} />;
  }

  // Main App
  return (
    <div className="min-h-screen bg-background">
      <Header userName={userName} notificationCount={2} />

      {/* Desktop Sidebar */}
      <div className="hidden md:block fixed left-0 top-16 bottom-0 w-64 bg-card border-r border-border overflow-y-auto">
        <nav className="p-4 space-y-1">
          {[
            { id: 'home', label: 'Início', icon: Home, screen: 'home' },
            { id: 'materials', label: 'Meus Materiais', icon: BookOpen, screen: 'materials' },
            { id: 'cameras', label: 'Câmeras', icon: Camera, screen: 'cameras' },
            { id: 'map', label: 'Mapa de Salas', icon: MapPin, screen: 'map' },
            { id: 'rewards', label: 'Prêmios', icon: Award, screen: 'rewards' },
            { id: 'alerts', label: 'Avisos', icon: Bell, screen: 'alerts' },
            { id: 'campaigns', label: 'Campanhas', icon: Megaphone, screen: 'campaigns' },
            { id: 'inspection', label: 'Fiscalização', icon: ClipboardCheck, screen: 'inspection' },
            { id: 'parental', label: 'Monitoria Parental', icon: Users, screen: 'parental' },
            { id: 'loans', label: 'Empréstimos', icon: PackageSearch, screen: 'loans' }
          ].map(({ id, label, icon: Icon, screen }) => (
            <button
              key={id}
              onClick={() => setCurrentScreen(screen as Screen)}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all
                ${currentScreen === screen
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }
              `}
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <main className="md:ml-64 pt-0">
        <div className="max-w-[1600px] mx-auto">
          {currentScreen === 'home' && <Dashboard />}
          {currentScreen === 'materials' && <MaterialsScreen />}
          {currentScreen === 'cameras' && <CamerasScreen />}
          {currentScreen === 'map' && <RoomMapScreen />}
          {currentScreen === 'rewards' && <RewardsScreen />}
          {currentScreen === 'alerts' && <AlertsScreen />}
          {currentScreen === 'campaigns' && <CampaignsScreen />}
          {currentScreen === 'inspection' && (
            <InspectionScreen onNavigateToApproval={() => setCurrentScreen('loan-approval')} />
          )}
          {currentScreen === 'parental' && <ParentalMonitoringScreen />}
          {currentScreen === 'loans' && <LoanFlowScreen />}
          {currentScreen === 'loan-approval' && <LoanApprovalScreen />}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
}