class Vue {
  constructor(options) {
    this.initVue(options);
  }

  initVue(options) {
    this.$options = options;
    this.$el = document.querySelector(options.el);
    this.$data = options.data;
    this.$methods = options.methods;
    observer(this.$data);
    complie(this, this.$el);
  }
}