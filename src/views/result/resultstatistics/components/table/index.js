import { result as ajax} from 'services'

export default {
    props: {
        list: Array
    },
    mounted(){
    	console.log(this.list)
    },
}