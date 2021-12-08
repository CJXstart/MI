// const util = require('./util')

window.onload = function () {

    /* 轮播图 */
    let index = 1;  // 默认的图片索引
    // 获取导航点
    const allA = document.querySelectorAll('#pointer a')
    // 获取轮播列表
    const imgList = document.querySelectorAll('#img-list li')
    // 在函数外面定义定时器标识
    let timer=null
    // 获取 banner
    const banner = document.querySelector('.banner')
    // 获取箭头
    const prev = document.querySelector('#prev-next .prev')
    const next = document.querySelector('#prev-next .next')

    // 设置默认选中的效果
    imgList[index].style.opacity = '1'
    allA[index-1].style.backgroundColor = 'rgba(255,255,255,0.4)'
    allA[index-1].style.borderColor = 'rgba(0,0,0,0.4)'

    /* 点击导航点切换到指定图片 */
    // 为每个导航点绑定单击响应函数
    for (let i=0,length=allA.length; i<length; i++) {

        // 在点击导航按钮时，要关闭自动切换定时器
        clearInterval(timer)

        // 为每个导航点添加一个属性 num 来保存索引值，解决执行上下文问题
        allA[i].index = i

        allA[i].onclick = function () {
            // 把导航点的索引赋值给图片索引（图片索引是导航点索引+1）
            index = this.index+1

            // 修改选中的导航点
            setA()

            // 切换图片
            setImg()
        }
    }

    /* 点击箭头切换下一张 */
    prev.onclick = throttle(function () {
        index--
        // 设置index自增限制
        if (index === 0) {
            index = imgList.length-2
        }
        setA()
        setImg()
    }, 1500)
    next.onclick = throttle(function () {
            index++
            //不写限制，在调用 setA 函数时，会重置index，但是要写在前面
            setA()
            setImg()
        }, 1500)


    /* 开启自动切换 */
    autoChange()

    /* 当鼠标移入 banner 时，停止自动切换 */
    banner.onmouseenter = function () {
        clearInterval(timer)
    }
    // 当鼠标移出 banner 时，开启自动切换
    banner.onmouseleave = function () {
        autoChange()
    }



    // 创建一个方法，切换图片的 opacity
    function setImg() {
        // 遍历所有图片列表，把 opacity 设为0
        for (let i=0,length=imgList.length; i<length; i++) {
            imgList[i].style.opacity = '0'
        }
        // 将选中的图片调整
        imgList[index].style.opacity = '1'
    }

    // 创建一个方法，用来设置选中的导航点
    function setA() {

        // 自动轮播时判断当前索引是否是最后一张
        if (index === imgList.length-1) {
            index = 1
            // 进入判断就代表显示的是最后一张，把它变成第一张
        }
        // // 手动翻播时判断当前索引是否是-1张
        // if (index === -1) {
        //     index = imgList.length-1
        // }


        // 遍历所有导航点，将颜色设置默认值
        for (let i=0,length=allA.length; i<length; i++) {
            // 内联样式的优先级高，所以变成空串，来让css样式生效
            allA[i].style.backgroundColor = ''
            allA[i].style.borderColor = ''
        }
        // 将选中的导航点，设置颜色
        allA[index-1].style.backgroundColor = 'rgba(255,255,255,0.4)'
        allA[index-1].style.borderColor = 'rgba(0,0,0,0.4)'
    }

    // 创建一个函数，用来自动切换图片
    function autoChange() {
        timer = setInterval(function () {
            // 使索引自增
            index++
            //限制 index 自增的值
            if (index===imgList.length-1) {
                index = 1
            }
            setA()
            setImg()
        }, 5000)
    }

    /*
*   节流函数：频繁触发的函数在规定时间内，只有第一次触发有效
*       fn      要被节流的函数
*       delay   规定的时间
*   */
    function throttle(fn, delay) {
        // 记录上一次函数触发的时间
        let lastTime = 0
        return function () {
            // 记录当前函数触发的时间
            const nowTime = Date.now()
            if (nowTime - lastTime > delay) {
                // 修正 this 指向问题
                fn.call(this)
                // 同步时间
                lastTime = nowTime
            }
        }
    }


    /* 商品页 */
    // a标签的hover效果
    const brickA = document.querySelectorAll('.brick-bd a')

    for (let i=0,length=brickA.length; i<length; i++) {
        brickA[i].onmouseenter = function () {
            const offset = this.offsetTop
            this.style.top = offset - 2 + 'px'
            this.style.boxShadow = '0 5px 20px rgba(0,0,0,.2)'
        }

        brickA[i].onmouseleave = function () {
            const offset = this.offsetTop
            this.style.top = offset + 2 + 'px'
            this.style.boxShadow = 'none'
        }
    }

}
