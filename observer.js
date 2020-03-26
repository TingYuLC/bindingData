class Observer {
  constructor(value) {
    this.value = value;
    this.walk(value);
  }

  walk(obj) {
    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i]);
    }
  }
}

function defineReactive(obj, key, val) {
  if (arguments.length === 2) {
    val = obj[key];
  }
  if (typeof val === 'object') {
    observer(val);
  }
  const depInstance = dep();
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get() {
      depInstance.depend();
      return val;
    },
    set(newVal) {
      if (val === newVal) {
        return
      }
      val = newVal;
      depInstance.notify();
    }
  })
}

function observer(value) {
  return new Observer(value);
}
