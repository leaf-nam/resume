// 진행률 + PDF 버튼 (portfolio main.js의 최소판)
(function () {
  const bar = document.getElementById("progress-bar");
  window.addEventListener(
    "scroll",
    () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      const p = max > 0 ? (scrollY / max) * 100 : 0;
      if (bar) bar.style.width = p + "%";
    },
    { passive: true },
  );
  document
    .getElementById("btn-print")
    ?.addEventListener("click", () => window.print());
})();
