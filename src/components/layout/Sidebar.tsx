import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  MapPin, 
  Users, 
  Car, 
  Clock, 
  CheckCircle,
  XCircle,
  BarChart3,
  Settings 
} from 'lucide-react';
import { cn } from '../../lib/utils';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: MapPin, label: 'Duraklar', path: '/stations' },
  { icon: Users, label: 'Şoförler', path: '/drivers' },
  { icon: Clock, label: 'Bekleyen İşler', path: '/trips/pending' },
  { icon: Car, label: 'Aktif İşler', path: '/trips/active' },
  { icon: CheckCircle, label: 'Tamamlanan İşler', path: '/trips/completed' },
  { icon: XCircle, label: 'İptal Edilen İşler', path: '/trips/cancelled' },
  { icon: BarChart3, label: 'Raporlar', path: '/reports' },
  { icon: Settings, label: 'Ayarlar', path: '/settings' },
];

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-73px)]">
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                    isActive
                      ? 'bg-blue-50 text-blue-600 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  )
                }
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;