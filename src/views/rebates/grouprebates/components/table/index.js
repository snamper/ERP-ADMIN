import {goods as ajax} from 'services'
export default {
    props: {
        list: Array
    },
    methods: {
        edit(item) {
            this.$emit('edit', item)
        },
        selectChange(val) {
            this.$emit('select-change', val)
        }
    }
}