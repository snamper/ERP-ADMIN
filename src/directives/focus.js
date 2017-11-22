/**
 * 该指令的作用是通过设置焦点,来控制input元素是否获得焦点,
 * 元素绑定值为boolean,true为获得焦点,false是去焦点
 */
export default {
    update(el,{value}) {
        if (value) {
            el.focus()
        }
        else {
            el.blur()
        }
    },
}
