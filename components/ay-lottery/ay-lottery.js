Component({
    properties: {
        type: {
            type: Number,
            default: 1, //1:翻牌  2:跑马灯 3：转盘 4： 刮一刮（文本） 5： 刮一刮（图片）
        },
        list: {
            type: Array,
            default () {
                return []
            }
        },

        height: {
            type: Number,
            default: 150
        },
        width: {
            type: Number,
            default: 150
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
            default: '#f43f3b',
        },
        seled_t_Color: {
            type: String,
            default: '#98FB98',
        },
        un_seled_Color: {
            type: String,
            default: '#00BFFF',
        },
        un_seled_t_Color: {
            type: String,
            default: '#33CCCC',
        },
        result_txt: {
            type: String,
            default: '中奖结果',
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
        bgColor: {
            type: String,
            default: '#1E90FF',
        },
        bg_sd_Color: {
            type: String,
            default: '#4169E1',
        },

        chance_num_init :{
            type: Number,
            default: 5
        },
        height: {
            type: Number,
            default: 700
        },
        width: {
            type: Number,
            default: 700
        },
        txtColor: {
            type: String,
            default: '#FFFFFF',
        },
        txtFontSize: {
            type: Number,
            default: 50,
        },
        canvasId: {
            type: String,
            default: 'blow',
        },
        //停留位置
        stay_index :{
            type: Number,
            default: 1
        },
        percentage : { //刮开百分之多少的时候开奖
            type : Number ,
            default : 45
        },
        touchSize : { //触摸画笔大小
            type : Number ,
            default : 20
        },
        fillColor : { //未刮开图层时的填充色
            type : String ,
            default : '#ddd'
        },
        watermark : { //水印文字
            type : String ,
            default : '刮一刮'
        },
        watermarkColor : { //水印文字颜色
            type : String ,
            default : '#c5c5c5'
        },
        watermarkSize : { //水印文字大小
            type : Number ,
            default : 14
        },
        title : { //提示文字
            type : String ,
            default : '刮一刮开奖'
        },
        titleColor : { //提示文字颜色
            type : String ,
            default : '#888'
        },
        titleSize : { //提示文字大小
            type : Number ,
            default : 24
        },
        disabled : { //是否禁止刮卡
            type : Boolean ,
            default : false
        },

        is_show : { //防止画布画好前闪烁
            type : Boolean ,
            default : false
        },
        result_img: {
            type: String,
            default: 'https://cdn.pixabay.com/photo/2021/01/04/07/38/lily-5886728__340.jpg',
        },
    },
    data: {},
    methods: {
        initBlow(){
            this.$refs.blowRef.initBlow()
        },
        show(e){
            this.$emit('show', e);
        },
        again(e){
            this.$emit('again', e);
        },
        result(e){
            this.$emit('result', e);
        },
        toDetailPage(e){
            this.$emit('toDetailPage', e);
        },
        complete(e){
            this.$emit('complete', e);
        },
        init(e){
            this.$emit('init', e);
        },
    }
});
