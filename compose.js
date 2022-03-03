let middlewares = [
  (str) => {
    return str + '1'
  },
  (str) => {
    return str + '2'
  },
  (str) => {
    return str + '3'
  },
  (str) => {
    return str + '4'
  }
]

function compose(arr) {
  return arr.reduce((pre, cur) => {
    return (...args) => {
      return pre(cur(...args));
    }
  })
}
const add = compose(middlewares);
console.log(add('hello')); // hello4321