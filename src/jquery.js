const { fn } = require('jquery')

window.jQuery = function (selectorOrArray) {
  let elements
  if (typeof selectorOrArray === 'string') {
    elements = document.querySelectorAll(selectorOrArray)
    //jQuery并不返回该元素elements，而是创造一个可以操作对应元素的对象(API)
  } else if (selectorOrArray instanceof Array) {
    elements = selectorOrArray
  }
  return {
    //闭包，函数访问外部变量
    find(selector) {
      let array = []
      for (let i = 0; i < elements.length; i++) {
        const elements2 = Array.from(elements[i].querySelectorAll(selector))
        //先把每一项找到的对应的元素(伪数组)变成数组
        array = array.concat(elements2)
        //再把每次找到的元素添加到array上
      }
      array.oldApi = this
      // this 就是旧 api,也就是 jQuery()
      return jQuery(array)
    },
    oldApi: selectorOrArray.oldApi, // 将oldApi 传出来给 end 使用
    end() {
      return this.oldApi
      // this 是新 api,也就是 jQuery().find()
    },
    each(fn) {
      for (let i = 0; i < elements.length; i++) {
        fn.call(null, elements[i], i)
      }
      return this
    },
    parent() {
      const array = []
      this.each((node) => {
        if (array.indexOf(node.parentNode) === -1) {
          array.push(node.parentNode)
        }
      })
      return jQuery(array)
      // 返回该对象是为了可以继续对爸爸进行操作
    },
    children() {
      const array = []
      this.each((node) => {
        array.push(...node.children)
      })
      return jQuery(array)
    },
    print() {
      console.log(elements)
    },
    addClass(className) {
      for (let i = 0; i < elements.length; i++) {
        elements[i].classList.add(className)
      }
      return this
      //api.addClass('red').addClass('blue')
    },
  }
}

window.$ = window.jQuery
