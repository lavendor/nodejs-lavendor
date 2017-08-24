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
    this.find('input').val('');
}