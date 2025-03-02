"use strict";
const common_vendor = require("../common/vendor.js");
const useCartStore = common_vendor.defineStore("cart", () => {
  const cart = common_vendor.ref([]);
  const updateCart = (cb) => {
    cart.value = cb(cart.value);
  };
  common_vendor.index.__f__("log", "at stores/cart.js:12", cart.value, "cart");
  return {
    cart,
    updateCart
  };
});
exports.useCartStore = useCartStore;
//# sourceMappingURL=../../.sourcemap/mp-weixin/stores/cart.js.map
