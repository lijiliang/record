/**
 * @desc vue toast 插件
 */
import ToastComponent from './toast.vue'
var Toast = {};
Toast.install = function (Vue, options) {
    var opt = {
        defaultType:'center',
        duration:'3000'
    }
    for(var property in options){
        opt[property] = options[property];
    }
    Vue.prototype.$toast = function(message,option){

        let callback = '';
        //设置局部配置
        if(typeof option == 'object'){
            for(var property in option){
              opt[property] = option[property];
            }
        }else if(typeof option == 'function'){
          callback = option;
        }

        const ToastController = Vue.extend(ToastComponent);

         //new 一个实例，并将实例挂载到一个空的div中
        var instance = new ToastController().$mount(document.createElement("div"));  
        instance.message = message;
        instance.visible = true;
        document.body.appendChild(instance.$el);  // 放到body内
        setTimeout(function () {
            instance.visible = false;
            setTimeout(()=>{
              document.body.removeChild(instance.$el); //移除实例
              callback && callback();
            },500);
        }, opt.duration)
    };
    //后期扩展
    ['show', 'success', 'info', 'error'].forEach(function(type) {
        Vue.prototype.$toast[type] = function(tips,option) {
            return Vue.prototype.$toast(tips,option)
        }
    });

}
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(Toast);
}
export default Toast;