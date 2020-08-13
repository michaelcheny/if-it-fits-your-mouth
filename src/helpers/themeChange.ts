export const setTheme = (theme: string) => {
  document.documentElement.className = "";
  document.documentElement.classList.add(theme);
};
