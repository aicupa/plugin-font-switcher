/**
 * @param {import('@aicupa/api').PluginApi} api
 * @returns {import('@aicupa/api').Plugin}
 */
module.exports = (api) => {
  const getConfigFile = () => {
    const homedir = api.os.homedir();
    return api.path.join(homedir, ".todo_font_config.json");
  };

  return {
    // 供前端 view 调用：保存选中的字体并刷新主应用
    async updateSystemFont(params) {
      if (!params.fontFamily) {
        return { ok: false, error: "Font family selection is required" };
      }

      try {
        const configPath = getConfigFile();
        const configData = {
          fontFamily: params.fontFamily,
          fontUrl: params.fontUrl || "",
        };

        // 安全写入用户目录
        await api.writeFile(configPath, JSON.stringify(configData, null, 2));

        // 刷新主应用使注入脚本生效
        api.relaunch();

        return { ok: true };
      } catch (err) {
        return { ok: false, error: `Failed to save font: ${err.message}` };
      }
    },
  };
};
