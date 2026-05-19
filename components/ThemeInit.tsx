export function ThemeInit() {
  const script = `
    (function () {
      try {
        var theme = localStorage.getItem("concert-cost-theme");
        if (theme) document.documentElement.setAttribute("data-theme", theme);
      } catch (e) {}
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
