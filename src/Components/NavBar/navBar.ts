import { Page, navigationManager } from './NavigationManager';
import "./style.css";

interface NavItem {
  icon: string;
  label: string;
  page: string;
}

export class NavBar {
  private container: HTMLElement;
  private navItems: NavItem[];

  constructor(containerId: string, navItems: NavItem[]) {
    const container = document.getElementById(containerId);
    if (!container) {
      throw new Error(`Navbar with ID "${containerId}" not found!`);
    }
    this.container = container;
    this.navItems = navItems;
  }

  public initialize(): void {
    const navBar: HTMLElement = document.createElement('div');
    navBar.className = 'navbar';

    this.navItems.forEach(item => {
      const navItem: HTMLElement = this.createNavItem(item);
      navBar.appendChild(navItem);
    });

    this.container.appendChild(navBar);

    // We do a little bit of active highlighting the active icon
    navigationManager.onPageChange(page => this.highlightActiveItem(page));
    this.highlightActiveItem(navigationManager.getCurrentPage());
  }

  private createNavItem(item: NavItem): HTMLElement {
    const navItem: HTMLElement = document.createElement('div');
    navItem.className = 'nav-item';
    navItem.dataset.page = item.page;

    const icon: HTMLElement = document.createElement('span');
    icon.className = 'icon';
    icon.textContent = item.icon;

    const label: HTMLElement = document.createElement('span');
    label.className = 'label';
    label.textContent = item.label;
    label.style.display = 'none';

    const toggle: HTMLElement = document.createElement('span');
    toggle.className = 'toggle';
    toggle.textContent = '▶';

    toggle.addEventListener('click', () => {
      const isLabelVisible = label.style.display !== 'none';
      label.style.display = isLabelVisible ? 'none' : 'inline';
      toggle.textContent = isLabelVisible ? '▶' : '▼';
    });

    navItem.addEventListener('click', () => {
      navigationManager.navigateTo(item.page as Page);
    });

    navItem.append(icon, toggle, label);
    return navItem;
  }

  private highlightActiveItem(currentPage: string): void {
    const navItems = this.container.querySelectorAll('.nav-item');
    navItems.forEach(item => {
      if (item instanceof HTMLElement) {
        item.classList.toggle('active', item.dataset.page === currentPage);
      }
    });
  }
}

export default NavBar;
