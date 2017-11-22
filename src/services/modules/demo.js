import ajax from '../fetch'

export default{
    getDemoData() {
        return ajax({
            url: '/Demo',
            method: 'post',
        })
    },
}