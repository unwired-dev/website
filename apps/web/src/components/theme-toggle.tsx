'use client';

const themeStorageKey = 'unwired-theme';

export function ThemeToggle() {
  function toggleTheme() {
    const root = document.documentElement;
    const nextTheme = root.classList.contains('dark') ? 'light' : 'dark';

    root.classList.toggle('dark', nextTheme === 'dark');
    root.classList.toggle('light', nextTheme === 'light');
    root.dataset.theme = nextTheme;
    localStorage.setItem(themeStorageKey, nextTheme);
  }

  return (
    <button
      aria-label="Toggle color theme"
      className="theme-toggle"
      type="button"
      onClick={toggleTheme}>
      <span
        aria-hidden="true"
        className="theme-toggle__track">
        <span className="theme-toggle__sun" />
        <span className="theme-toggle__moon" />
        <span className="theme-toggle__thumb" />
      </span>
    </button>
  );
}
