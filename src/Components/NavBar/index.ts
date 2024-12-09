import NavBar from './navBar';
import { Page } from './NavigationManager';

document.addEventListener('DOMContentLoaded', () => {
  const navItems = [
    { icon: '🏠', label: 'Home', page: 'home' as Page },
    { icon: '⚙️', label: 'Settings', page: 'settings' as Page },
  ];

  const navBar = new NavBar('navbar', navItems);
  navBar.initialize();
});
