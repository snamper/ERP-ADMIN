export default {
    name: 'PgPrintToolBar',
    props: {
        currentField: {}
    },
    data() {
        return {
            fontSizes: ['12px', '14px', '16px', '18px', '20px', '22px', '24px', '26px', '28px', '30px', '32px', '34px', '36px']
        }
    },
    computed: {
        fieldStyle: {
            get() {
                return this.currentField.style || {}
            }
        }
    },
    methods: {
        // 字体加粗
        changeFontWeight() {
            this.fieldStyle.fontWeight === 'bold' ? this.fieldStyle.fontWeight = 'normal' : this.fieldStyle.fontWeight = 'bold'
        },
        // 斜体
        changeFontStyle() {
            this.fieldStyle.fontStyle === 'normal' ? this.fieldStyle.fontStyle = 'italic' : this.fieldStyle.fontStyle = 'normal'
        },
        // 文本对齐
        changeTextAlign(textAlign) {
            this.fieldStyle.textAlign = textAlign
        }
    }
}