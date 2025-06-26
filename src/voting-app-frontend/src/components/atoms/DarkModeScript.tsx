"use client";

// This component prevents flash of wrong theme
export default function DarkModeScript() {
  const script = `
    (function() {
      try {
        var darkMode = localStorage.getItem('darkMode');
        if (darkMode !== null) {
          var isDark = JSON.parse(darkMode);
          if (isDark) {
            document.documentElement.classList.add('dark');
          }
        } else {
          var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          if (prefersDark) {
            document.documentElement.classList.add('dark');
          }
        }
      } catch (e) {
        console.error('Error applying dark mode:', e);
      }
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
