import { cloneDeep } from 'lodash'
import { material as ajax } from 'services'
import { mapActions, mapGetters } from 'vuex'
export default {
    props: {
        title: String,
        show: Boolean,
        isEdit: Boolean,
        editForm: Object
    },
    data() {
        return {
            form: {},
            initForm: {
                name: '', // 素材名称
                materialTagID: '', // 分类标签
                distributorGroupID: null, // 针对团队
                description: '', // 文案编辑
                status: '', // 素材状态 0保存 1发布
                fileType: 0, // 0图片 99其他
                imageUrls: [], // 文件url
                note: ''
            },
            uploadImgs: [],
            uploadOptions: [],
            uploadFileType: [
                {
                    text: '图片',
                    value: 0
                },
                {
                    text: '其他',
                    value: 99
                }
            ],
            // 输入验证
            rules: {
                name: [
                    { required: true, message: '请输入标签名称', trigger: 'blur' }
                ],
                materialTagID: [
                    { required: true, message: '请选择分类标签', trigger: 'change' }
                ],
                description: [
                    { required: true, message: '请填写文案', trigger: 'blur' }
                ]
            }
        }
    },
    watch: {
        editForm(editForm) {
            this.setForm(this.editForm)
        }
    },
    computed: {
        ...mapGetters([
            'teamList',
            'tagList'
        ]),
    },
    mounted() {
        if (!this.isEdit) {
            this.resetForm()
        }

        this.getTagList()
        this.getTeamList()
    },
    created() {
        this.setForm(this.editForm)
    },
    methods: {
        ...mapActions([
            'getTeamList',
            'getTagList'
        ]),
        resetForm() {
            this.form = cloneDeep(this.initForm)
            this.uploadImgs = []
            this.uploadOptions = []
        },
        setForm(editForm) {
            if (this.isEdit) {
                this.form = cloneDeep(this.editForm)
                this.$nextTick(() => {
                    if (this.form.imageUrls.length > 0) {
                        if (this.form.fileType == 0) {
                            this.uploadImgs = this.form.imageUrls
                            this.uploadOptions = []
                        }
                        else {
                            this.uploadOptions = this.form.imageUrls
                            this.uploadImgs = []
                        }
                        
                    }
                })
            }
            else {
                this.resetForm()
            }
        },
        // 返回
        close() {
            this.$emit('close')
        },
        // 保存
        save() {
            this.form.status = 0
            this.saveMaterialStock()
        },
        // 保存并发布
        issue() {
            this.form.status = 1
            this.saveMaterialStock()
        },
        saveMaterialStock() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    // 验证通过
                    ajax.saveMaterialStock(this.form).then((result) => {
                        this.$message.success('保存成功')
                        this.$emit('refresh')
                    }).catch((error) => {
                        this.$message.error(error)
                    })
                }
            })
        },
        // 多图上传
        multipleUploadSuccess(filelist) {
            this.form.imageUrls = filelist
        }
    }
}