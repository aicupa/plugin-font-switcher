(function () {
  const FONT_PRESETS = {
    system: {
      font: "system-ui, -apple-system, sans-serif",
    },

    pingfang: {
      font: "'PingFang SC', 'Hiragino Sans GB', sans-serif",
    },

    yahei: {
      font: "'Microsoft YaHei', sans-serif",
    },

    kaiti: {
      font: "'KaiTi', 'STKaiti', serif",
      letterSpacing: "0.02em",
      lineHeight: "1.8",
    },

    songti: {
      font: "'STSong', 'SimSun', serif",
      lineHeight: "1.7",
    },

    dengxian: {
      font: "'DengXian', sans-serif",
    },

    mono: {
      font: "'SF Mono', 'JetBrains Mono', monospace",
      numeric: true,
    },

    notebook: {
      font: "'KaiTi', serif",
      letterSpacing: "0.03em",
      lineHeight: "1.9",
    },

    cyber: {
      font: "'Arial', sans-serif",
      letterSpacing: "1px",
      textShadow: "0 0 1px currentColor",
    },

    minimal: {
      font: "'Helvetica Neue', Arial, sans-serif",
      letterSpacing: "-0.01em",
    },
  };

  function getPreset() {
    return localStorage.getItem("active_font_preset") || "system";
  }

  function applyPreset() {
    const preset = FONT_PRESETS[getPreset()] || FONT_PRESETS.system;

    let style = document.getElementById("font-switch-style");

    if (!style) {
      style = document.createElement("style");
      style.id = "font-switch-style";
      document.head.appendChild(style);
    }

    style.textContent = `
      * {
        font-family: ${preset.font} !important;
        letter-spacing: ${preset.letterSpacing || "normal"};
        line-height: ${preset.lineHeight || "normal"};
        text-shadow: ${preset.textShadow || "none"};

        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      ${
        preset.numeric
          ? `
      .todo-counter,
      [class*=count],
      [class*=date],
      [class*=time]{
        font-variant-numeric: tabular-nums;
      }
      `
          : ""
      }

      pre,
      code,
      textarea,
      [class*=editor] {
        font-family:
          "SF Mono",
          "JetBrains Mono",
          monospace !important;
      }
    `;

    console.log("[FontSwitcher] Applied:", getPreset());
  }

  applyPreset();

  window.addEventListener("storage", (e) => {
    if (e.key === "active_font_preset") {
      applyPreset();
    }
  });
})();
