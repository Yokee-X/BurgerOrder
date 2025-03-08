"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _easycom_SButton2 = common_vendor.resolveComponent("SButton");
  _easycom_SButton2();
}
const _easycom_SButton = () => "../../components/SButton/SButton.js";
if (!Math) {
  _easycom_SButton();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const jump = (p) => {
      common_vendor.index.switchTab({
        url: "/pages/menu/index?takeout=" + p
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0,
        b: common_vendor.o(($event) => jump(0)),
        c: common_vendor.o(($event) => jump(1))
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4978fed5"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/home/index.js.map
