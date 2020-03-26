class Complie {
  constructor(vm, root) {
    this.vm = vm;
    this.init(root);
  }

  init(root) {
    const vm = this.vm;
    const that = this;
    const nodes = root.children;
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      if (node.length) {
        complie(vm, node);
      }

      if (node.hasAttribute('v-click')) {
        node.onclick = (function () {
          const attrVal = node.getAttribute('v-click');
          return vm.$methods[attrVal].bind(vm.$data);
        })();
      }

      if (node.hasAttribute('v-model') && (node.tagName == 'INPUT' || node.tagName == 'TEXT')) {
        node.addEventListener('input', (function () {
          const attrVal = node.getAttribute('v-model');
          that.updateDom(node, 'value')(vm.$data[attrVal], '');
          new Watcher(
            vm,
            attrVal,
            that.updateDom(node, 'value')
          )

          return function (e) {
            vm.$data[attrVal] = e.target.value;
          }
        })());
      }

      if (node.hasAttribute('v-text')) {
        const attrVal = node.getAttribute('v-text');
        that.updateDom(node, 'textContent')(vm.$data[attrVal], '');
        new Watcher(
          vm,
          attrVal,
          that.updateDom(node, 'textContent')
        )
      }
    }
  }

  updateDom(node, attr) {
    return function (value, oldValue) {
      if (value === oldValue) {
        return;
      }
      node[attr] = value;
    }
  }

}

function complie(vm, root) {
  return new Complie(vm, root);
}
