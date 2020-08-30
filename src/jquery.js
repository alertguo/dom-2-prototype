// const { fn } = require('jquery')

window.$ = window.jQuery = function (selectorOrArrayOrTemplate) {
  let elements
  if (typeof selectorOrArrayOrTemplate === 'string') {
    if (selectorOrArrayOrTemplate[0] === '<') {
      //如果为标签，创建 div
      elements = [createElement(selectorOrArrayOrTemplate)]
    } else {
      //查找 div
      elements = document.querySelectorAll(selectorOrArrayOrTemplate)
    }
  } else if (selectorOrArrayOrTemplate instanceof Array) {
    elements = selectorOrArrayOrTemplate
  }
  //jQuery并不返回该元素elements，而是创造一个可以操作对应元素的对象(API)
  function createElement(string) {
    const container = document.createElement('template')
    container.innerHTML = string.trim()
    // trim() 会从一个字符串的两端删除空白字符
    return container.content.firstChild
  }
  // api 可以操作 elements
  return {
    //闭包，函数访问外部变量
    jquery: true,
    elements: elements,
    get(index) {
      return elements[index]
    },
    appendTo(node) {
      if (node instanceof Element) {
        this.each((el) => node.appendChild(el))
        // 遍历 elements，对每个 el 进行 node.appendChild 操作
      } else if (node.jQuery === true) {
        this.each((el) => node.get(0).appendChild(el))
        // 遍历 elements，对每个 el 进行 node.get(0).appendChild(el)) 操作
      }
      return this
    },
    append(children) {
      if (children instanceof Element) { // 一个节点
        this.get(0).appendChild(children)
      } else if (children instanceof HTMLCollection) { // HTML元素
        for (let i = 0; i < children.length; i++) {
          this.get(0).appendChild(children[i])
        }
      } else if (children.jquery === true) {
        children.each((node) => this.get(0).appendChild(node))
      }
      return this
    },
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
    oldApi: selectorOrArrayOrTemplate.oldApi, // 将oldApi 传出来给 end 使用
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
      console.log(elements) // elements 就是对应的元素们
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
