(function () {
  console.log("Art Font Switcher Inject Script Loaded.");

  function getSavedFont() {
    try {
      return (
        localStorage.getItem("active_system_font") || "system-ui, -apple-system"
      );
    } catch (e) {
      return "system-ui, -apple-system";
    }
  }

  function injectFontStyles() {
    const activeFont = getSavedFont();

    // 1. 定义全套字体的 CDN 注册表
    const fontRegistry = {
      "Press Start 2P":
        "https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap",
      Orbitron:
        "https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap",
      Cinzel:
        "https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&display=swap",
      Sacramento:
        "https://fonts.googleapis.com/css2?family=Sacramento&display=swap",
      "JetBrains Mono":
        "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&display=swap",
      Inter:
        "https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap",
    };

    // 2. 遍历检查并动态注入 <link> 标签到主应用的 head 中
    Object.keys(fontRegistry).forEach((fontName) => {
      if (activeFont.includes(fontName)) {
        const id = `font-cdn-${fontName.toLowerCase().replace(/\s+/g, "-")}`;
        if (!document.getElementById(id)) {
          const link = document.createElement("link");
          link.id = id;
          link.rel = "stylesheet";
          link.href = fontRegistry[fontName];
          document.head.appendChild(link);
        }
      }
    });

    // 3. 创建或获取主应用的全局样式覆盖标签
    let styleTag = document.getElementById("global-custom-font-style");
    if (!styleTag) {
      styleTag = document.createElement("style");
      styleTag.id = "global-custom-font-style";
      document.head.appendChild(styleTag);
    }

    // 4. 【绝对覆盖】不再做复杂的类名猜测，无死角强行全屏替换
    styleTag.innerHTML = `
      /* 对所有常规 HTML 标签及组件内阴影 DOM (如果存在) 彻底清洗字体 */
      *, html, body, div, span, p, li, a, input, button, select, textarea, label {
        font-family: ${activeFont} !important;
        ${activeFont.includes("Orbitron") ? "letter-spacing: 1px !important;" : ""}
        ${activeFont.includes("Press Start 2P") ? "font-size: 96% !important; line-height: 1.5 !important;" : ""}
      }
      
      /* 唯独对编辑器和核心代码区域保留高保真等宽，防止代码排版错乱 */
      pre, code, .code-editor, textarea.code-input, [class*="editor"], [class*="code"] {
        font-family: 'JetBrains Mono', monospace !important;
        letter-spacing: normal !important;
      }
    `;
    console.log(`🎉 Global art font injected and enforced: ${activeFont}`);
  }

  // 5. 增强防护：如果主应用是动态单页应用，在 DOM 发生大范围变化时重新加固样式
  injectFontStyles();

  // 建立一个观察器，防止主应用的内部单页路由切换时把我们的样式给冲掉
  if (window.FontObserverAttached) return;
  window.FontObserverAttached = true;

  const observer = new MutationObserver(() => {
    // 确保 CDN 链接和 Style 标签始终钉在 head 里
    injectFontStyles();
  });
  observer.observe(document.head, { childList: true });
})();
