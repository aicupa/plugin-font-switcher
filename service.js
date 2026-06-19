/**
 * @param {import('@aicupa/api').PluginApi} api
 * @returns {import('@aicupa/api').Plugin}
 */
module.exports = (api) => {
  return {
    // 供前端 view 调用：保存选中的字体并刷新主应用
    async relaunchToUpdate() {
      // 刷新主应用使注入脚本生效
      api.relaunch();
    },
  };
};
