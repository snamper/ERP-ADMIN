import 'whatwg-fetch'
import cookie from 'js-cookie'
import { rootPath } from '../fetch/config'

export default{
    /**
     * 图片上传
     * @param  {object} file       图片对象
     * @param  {类型} folderType 二维码21 商品11 品牌31
     * @return {[type]}            [description]
     */
    uploadImg(file, folderType) {
        let data = new FormData()
        data.append(file.name, file)
        data.append('FolderType', folderType)
        return new Promise((resolve, reject) => {
            fetch(rootPath + '/Upload/UploadImg', {
                method: 'post',
                headers: {
                    Authorization: 'Bearer ' + cookie.get('wxb_erp_authToken')
                },
                body: data
            })
                .then((response) => response.json())
                .then((result) => {
                    if (result.resultCode === 1) {
                        resolve(result.data)
                    }
                    else {
                        reject(result.errorMessage)
                        throw new Error(result.errorMessage)
                    }
                })
                .catch((error) => {
                })
        })
    }
}
