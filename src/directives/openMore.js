/**
 * 该指令的作用是通过设置max-height,来控制不定高度的元素显示隐藏动画,元素需要设置transition属性,并且overflow为hidden
 * 元素绑定值为boolean,true为显示,false为隐藏
 */
let elHeight = 0;   // 元素的高度
export default {
    inserted(el,{value}) {
        elHeight = el.clientHeight
        setMaxHeight(el,value)
    },
    update(el,{value}) {
        setMaxHeight(el,value)
    },
    unbind() {
        elHeight = null
    }
}
/**
 * 设置元素的max-height
 * @param el {dom} dom元素
 * @param value  {boolean} 是否显示元素
 */
function setMaxHeight(el,value) {
    el.style.overflow = 'hidden'
    if (value) {
        el.style.maxHeight = elHeight + 'px'
    } else {
        el.style.maxHeight = 0
    }
    // 动画完成后,如果为展开状态,则设置为visible,避免隐藏地址选择下拉,否则设为hidden
    el.addEventListener('transitionend',() => {
        if(value) {
            el.style.overflow = 'visible'
        } else {
            el.style.overflow = 'hidden'
        }
    })
}