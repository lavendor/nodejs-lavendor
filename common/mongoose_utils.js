/**
 * Created by admin on 2018/7/24.
 *
 * 封装mongoose的一些操作
 */

function save (model,data){
    model.save(data).then(function(resolve,reject){

    })
}

var update = function(model,data){
    save()
}


exports = {
    save : save
}