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

  // 인쇄 1장 자동 맞춤: 인쇄 스타일 강제 적용 클론으로 정확히 실측 후 zoom 축소
  // 외곽 여백 = .sheet 패딩(PRINT_MARGIN_MM)과 동일하게 유지 (단위: mm, A4 210x297)
  // 클론은 용지 전체 폭으로 잡고 패딩을 포함해 잰다 (box-sizing: border-box 기준)
  var PRINT_MARGIN_MM = 10;
  var PX_PER_MM = 96 / 25.4;
  function printPageWidth() {
    return Math.floor(210 * PX_PER_MM);
  }
  function printAvailHeight() {
    return Math.floor((297 - PRINT_MARGIN_MM * 2) * PX_PER_MM);
  }
  function measurePrintHeight() {
    var sheet = document.querySelector(".sheet");
    if (!sheet) return 0;
    var root = document.documentElement;
    var prevZoom = root.style.getPropertyValue("--print-zoom");
    root.style.setProperty("--print-zoom", "1");
    root.classList.add("pf");
    var clone = sheet.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    clone.style.cssText =
      "position:fixed;left:-99999px;top:0;width:" +
      printPageWidth() +
      "px;visibility:hidden;pointer-events:none;";
    document.body.appendChild(clone);
    var h = clone.scrollHeight;
    var dbg = "";
    if (location.hash === "#measure") {
      var parts = [];
      var secs = clone.querySelectorAll("header, section");
      for (var i = 0; i < secs.length; i++) {
        parts.push((secs[i].id || "hd") + "=" + secs[i].offsetHeight);
      }
      dbg = "/" + parts.join(",");
    }
    clone.remove();
    root.classList.remove("pf");
    if (prevZoom) root.style.setProperty("--print-zoom", prevZoom);
    else root.style.removeProperty("--print-zoom");
    window.__dbg = dbg;
    return h;
  }
  function fitPrint(leaveClass) {
    var h = measurePrintHeight();
    if (!h) return 1;
    var z = Math.min(1, printAvailHeight() / h);
    document.documentElement.style.setProperty(
      "--print-zoom",
      z.toFixed(3),
    );
    if (leaveClass) document.documentElement.classList.add("pf");
    if (location.hash === "#measure") {
      var fi = "fonts=" + document.fonts.size + "/" + document.fonts.status;
      document.title =
        "MEASURE:" +
        h +
        "/ZOOM:" +
        z.toFixed(3) +
        "/AVAIL:" +
        printAvailHeight() +
        "/" +
        fi +
        (window.__dbg || "");
    }
    return z;
  }
  window.addEventListener("beforeprint", function () {
    fitPrint(true);
  });
  window.addEventListener("afterprint", function () {
    document.documentElement.classList.remove("pf");
  });
  if (document.fonts && document.fonts.ready)
    document.fonts.ready.then(function () {
      fitPrint(false);
    });
  window.addEventListener("load", function () {
    fitPrint(false);
  });
  fitPrint(false);
})();
