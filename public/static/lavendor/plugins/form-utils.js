/**
 * Created by Administrator on 2017/8/24.
 */

/**
 * 清除表单验证，回复表单到初始化状态
 */
$.fn.formRest = function(){
    this.find('.form-group').removeClass('has-error').removeClass('has-success');
    this.find('.alert-danger').hide();
    this.find('.alert-success').hide();
    this.find('.input-icon i').removeClass('fa-check');
    this.find('.input-icon i').removeClass('fa-warning');
    this.find('.input-icon span').remove();
    this.find('input').val('');
}

/**
 * 加载form表单数据
 * @param data 对象
 */
$.fn.loadForm = function(data){
    var form = this;
    if(data.length<=1){
        data.forEach(function(value,index,array){
            for(var name in value){
                var val = value[name];
                form.find('input[name="'+name+'"]').val(val);
                form.find('textarea[name="'+name+'"]').val(val);
                form.find('select[name="'+name+'"]').val(val);
            }
        });
    }
}