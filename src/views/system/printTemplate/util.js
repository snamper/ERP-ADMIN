/**
 * 拖曳类,更改字段的长宽或左边距上边距
 * @field {object} 模板字段
 * @options {object}
 *          @horizonMin 水平范围最小值,
 *          @verticalMin 垂直范围最小值,
 *          @horizonStyle 水平方向需要更改的style名（width/left）,
 *          @verticalStyle垂直方向需要更改的style名（height/top）,
 *          @direction 'rb' 可以同时更改水平方向和垂直方向,‘r’只能更改水平方向,'b'只能更改垂直方向
 */
export class Drag {
    constructor(field,options) {
        this.field = field
        this.options = Object.assign({
            horizonMin: 0,
            verticalMin: 0,
            horizonStyle: 'width',
            verticalStyle: 'height',
            direction: 'rb',
        },options)
        this.start = false  // 拖曳是否已经开始
        this.moving = null // 拖曳interval
        this.startX = 0 // 水平方向初始位置
        this.startY = 0 // 垂直方向初始位置
        this.moveToX = 0 // 移动到的水平位置
        this.moveToY = 0 // 移动到的垂直位置
    }

    /**
     * 鼠标按下时,开始拖动,保存鼠标的初始位置,并且启动拖动函数
     * @param event
     */
    dragStart(event) {
        this.dragEnd()
        this.startX = event.x
        this.startY = event.y
        this.moveToX = event.x
        this.moveToY = event.y
        this.moving = setInterval(() => {
            this.dragMoveTo()
        },10)
        this.start = true
    }

    /**
     * 移动,保留移动到的位置信息
     * @param event
     */
    dragMove(event) {
        this.moveToX = event.x
        this.moveToY = event.y
    }

    /**
     * 移动函数,根据配置,设置水平样式/垂直样式
     */
    dragMoveTo() {
        if (this.start) {
            const { horizonMin = 0, verticalMin = 0,horizonStyle,verticalStyle,direction } = this.options
            const distanceX = this.moveToX - this.startX // 水平移动的距离
            const distanceY = this.moveToY - this.startY // 垂直移动的距离
            this.startX = this.moveToX // 将初始位置设置为当前的位置
            this.startY = this.moveToY
            let horizonStyleValue = distanceX + parseInt(this.field.style[horizonStyle])  // 水平样式的值
            let verticalStyleValue = distanceY + parseInt(this.field.style[verticalStyle]) // 垂直样式的值
            horizonStyleValue = horizonStyleValue > horizonMin ? horizonStyleValue : horizonMin // 如果水平样式值比设置的horizonMin小,则将值设为最小值
            verticalStyleValue = verticalStyleValue > verticalMin ? verticalStyleValue : verticalMin
            switch ( direction ) {
                case 'r':  // 只设置水平样式
                    this.field.style[horizonStyle] = `${horizonStyleValue}px`
                    break
                case 'b': // 只设置垂直样式
                    this.field.style[verticalStyle] = `${verticalStyleValue}px`
                    break
                case 'rb': // 同时设置水平样式和垂直样式
                    this.field.style[horizonStyle] = `${horizonStyleValue}px`
                    this.field.style[verticalStyle] = `${verticalStyleValue}px`
                    break;
            }
        }
    }

    /**
     * 鼠标弹起,拖曳终止
     */
    dragEnd() {
        this.start = false
        this.moving = clearInterval(this.moving)
    }
}