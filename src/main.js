// //调试addClass
// jQuery('.test') // 不返回元素们，返回api对象
//   .addClass('red')
//   .addClass('blue')
//   .addClass('green')
// // 遍历所有刚才获取到的元素，添加 .red
// //链式操作

// const x1 = jQuery('.test1').find('.child')
// console.log(x1)
// x1.addClass('red')

// jQuery('.test1')
//   .find('.child')
//   .addClass('red') // find的实现让其添加到 .child 上
//   .addClass('blue')
//   .addClass('green')
//   .end() // 返回到上一层(也就是 .test1)去添加东西
//   .addClass('yellow') // 添加到 .test1 上

// const api1 = jQuery('.test1')
// const api2 = api1
//   .find('.child')
//   .addClass('red')
//   .addClass('blue')
//   .addClass('green')
// const api3 = api2.end().addClass('yellow')

// const x = jQuery('.test').find('.child')
// x.each((div) => console.log(div))

// jQuery('.test').parent().print()
// $('.test').children().print()

// console.log($('.test').get(0))

// $('.test').appendTo(document.head)


// $('<div>1</div>').appendTo(document.body)
$('<div>1</div>').appendTo(document.body).print()

// $('body').append($('<div>1</div>'))