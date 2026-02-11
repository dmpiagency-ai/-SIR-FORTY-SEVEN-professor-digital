import { Outlet } from 'react-router-dom';
import Header from './Header';
import BottomNav from './BottomNav';

const AppLayout = () => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-1 bottom-nav-safe md:pb-0">
      <Outlet />
    </main>
    <BottomNav />
  </div>
);

export default AppLayout;
