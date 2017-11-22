import demo from './demo/demo.vue'
import dialog from './dialog/index.vue'
import operations from './operations/index.vue'
import pagination from './pagination/index.vue'
import search from './search/index'
import box from './box/index.vue'
import button from './button/button.vue'
import buttonGroup from './button/button-group.vue'

import menusRecord from './menusRecord/menusRecord.vue'
import region from './region/index.vue'
import imgUpload from './imgUpload/index.vue'
import editor from './editor/index.vue'
import img from './img/index.vue'
import fileUpload from './fileUpload/index.vue'
import dragImgUpload from './fileUpload/imgUpload.vue'


const install = function (Vue) {
    Vue.component(demo.name, demo)
    Vue.component(dialog.name, dialog)
    Vue.component(operations.name, operations)
    Vue.component(pagination.name, pagination)
    Vue.component(search.name, search)
    Vue.component(box.name, box)
    Vue.component(menusRecord.name, menusRecord)
    Vue.component(button.name, button)
    Vue.component(buttonGroup.name, buttonGroup)
    Vue.component(region.name, region)
    Vue.component(imgUpload.name, imgUpload)
    Vue.component(editor.name, editor)
    Vue.component(img.name, img)
    Vue.component(fileUpload.name, fileUpload)
    Vue.component(dragImgUpload.name, dragImgUpload)
}

export default install