export type Page = 'home' | 'settings';

class NavigationManager {
  private currentPage: Page = 'home';
  private pageChangeCallbacks: ((page: Page) => void)[] = [];

  public navigateTo(page: Page): void {
    if (this.currentPage !== page) {
      this.currentPage = page;

      // Update browser history
      history.pushState({ page }, '', `#${page}`);

      this.pageChangeCallbacks.forEach(callback => callback(page));
    }
  }

  public getCurrentPage(): Page {
    return this.currentPage;
  }

  public onPageChange(callback: (page: Page) => void): void {
    this.pageChangeCallbacks.push(callback);
  }
}

export const navigationManager = new NavigationManager();

window.addEventListener('popstate', event => {
  const state = event.state as { page: Page };
  if (state?.page) {
    navigationManager.navigateTo(state.page);
  }
});
