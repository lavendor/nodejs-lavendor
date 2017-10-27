/**
 * Created by Administrator on 2017/8/24.
 */

/**
 * 清除表单验证，回复表单到初始化状态
 */
$.fn.formReset = function(){
    this.find('.form-group').removeClass('has-error').removeClass('has-success');
    this.find('.alert-danger').hide();
    this.find('.alert-success').hide();
    this.find('.input-icon i').removeClass('fa-check');
    this.find('.input-icon i').removeClass('fa-warning');
    this.find('.input-icon span').remove();
    this.find('input').val('');
}

$.fn._propAttr = $.fn.prop || $.fn.attr;

/**
 * 加载form表单数据
 * @param data 对象
 */
$.fn.loadForm = function(data){
    var form = this;//form对象
    if(data.length<=1){
        data.forEach(function(value,index,array){
            for(var name in value){
                var val = value[name];
                if(!_checkedFields(name,val)){
                    form.find('input[name="'+name+'"]').val(val);
                    form.find('textarea[name="'+name+'"]').val(val);
                    form.find('select[name="'+name+'"]').val(val);
                }
            }
        });
    }

    /**
     *  checked the radio and checkbox fields
     * @param name
     * @param val
     * @private
     */
    function _checkedFields(name,val){
        //筛选radio和checkbox元素
        var cc = form.find('input[name="'+name+'"][type=radio],input[name="'+name+'"][type=checkbox]');
        if(cc.length){
            cc._propAttr('checked',false);//清除原本的格式
            cc.each(function(){
                if(_isChecked($(this).val(),val)){
                    $(this)._propAttr('checked',true);//选中
                };
            });
            return true;
        }
        return false;
    }

    /**
     *  检查是否值相等
     * @param v
     * @param val
     * @private
     */
    function _isChecked(v,val){
        if (v == String(val) || $.inArray(v, $.isArray(val)?val:[val]) >= 0){
            return true;
        } else {
            return false;
        }
    }
};
