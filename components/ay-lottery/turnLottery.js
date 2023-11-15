Component({
    properties: {
        bgColor: {
            type: String,
            default: '#1E90FF',
        },
        bg_sd_Color: {
            type: String,
            default: '#4169E1',
        },
        list: {
            type: Array,
            default: [],
        },
        themeColor: {
            type: String,
            default: '#33CCCC',
        },


        btn_Color: {
            type: String,
            default: '#ffffff',
        },
        seled_Color: {
            type: String,
            default: '#fff',
        },
        seled_t_Color: {
            type: String,
            default: '#98FB98',
        },
        un_seled_Color: {
            type: String,
            default: '#fff',
        },
        un_seled_t_Color: {
            type: String,
            default: '#33CCCC',
        },
        result_txt: {
            type: String,
            default: '结果',
        },
        show_again: {
            type: Boolean,
            default: false
        },
        again_txt: {
            type: String,
            default: '重新开始',
        },
        tips_init: {
            type: String,
            default: '点击',
        },
        no_z_init: {
            type: String,
            default: '谢谢参与',
        },
        height: {
            type: Number,
            default: 150
        },
        width: {
            type: Number,
            default: 350
        },
        height1: {
            type: Number,
            default: 600
        },
        width1: {
            type: Number,
            default: 650
        },
    },
    watch: {
        result_txt(e) {
            this.data.can_z = e;
        },
        tips_init(e) {
            this.data.tips = e;
        },
        no_z_init(e) {
            this.data.no_z = e;
        },
    },
    created: function () {
        let tips_init = this.data.tips_init
        this.data.tips = tips_init;
        this.data.can_z = tips_init;
        this.data.no_z = this.data.no_z_init;
    },
    computed: {
        style_seled() {
            let that = this;
            var style = '';
            style = `background-image: linear-gradient(45deg, ${that.seled_Color}, ${that.seled_t_Color});`;

            return style;
        },
        style_un_seled() {
            let that = this;

            var style = '';
            style = `background-image: linear-gradient(45deg, ${that.un_seled_Color}, ${that.un_seled_t_Color});`;

            return style;
        },
        style_box() {
            let that = this;
            var height = parseInt(that.height1);
            var width = parseInt(that.width1);
            var style = '';
            if (height > 0) {
                style = `height:${height}rpx;`;
            }
            if (width > 0) {
                style += `width:${width}rpx;`;
            }
            style += `background-color:${that.bgColor};`;
            style += `box-shadow: 0 10px 0  ${that.bg_sd_Color};`;
            return style;
        },
        style_box_in() {
            let that = this;
            var height = parseInt(that.height1);
            var width = parseInt(that.width1);
            var style = '';
            if (height > 70) {
                style = `height:${height - 70}rpx;`;
            }
            if (width > 70) {
                style += `width:${width - 70}rpx;`;
            }
            style += `background-color:${that.themeColor};`;

            return style;
        },
    },
    data: {

        whether: false,
        can_z: '',
        really: '',
        implement: 0,
        surplus: false,
        no_z: '',
        tips: '',
        dotList: 24, //圆点个数

    },
    methods: {
        again:function(e) {
            if (this.data.implement === 3 || this.data.implement === 0) {
                this.data.whether = false
                this.data.can_z = this.data.tips ;
                this.data.really = ''
                this.data.implement = 0
                this.data.surplus = false
                this.data.no_z = this.data.tips ;
                let data = {

                };
                this.$emit('again', data);
            } else {
                uni.showToast({
                    title: '正在执行中...',
                    icon: 'none',
                    duration: 2000
                })
                return false
            }
        },
        tamin:function (index) {
            if (this.data.really === '') {
                this.data.whether = true
                this.data.really = index + 1
                this.data.implement = 1

                setTimeout(res => {
                    this.data.can_z = ''
                    console.log(111);
                }, 500)

                setTimeout(res => {
                    //this.data.can_z = this.data.result_txt;
                    console.log(222);
                    let data = {
                        result : 1 ,//1成功 0失败
                    };
                    this.$emit('show', data);

                    this.data.surplus = true
                    this.data.implement = 2
                }, 1200)

                setTimeout(res => {
                    console.log(333);
                    this.data.no_z = ''
                }, 1700)

                setTimeout(res => {
                    console.log(444);
                    let data = {
                        result : 0 ,//1成功 0失败
                    };
                    this.$emit('show', data);
                    //this.data.no_z = '谢谢惠顾'
                    this.data.implement = 3
                }, 2500)
            }
        }

    }
});
