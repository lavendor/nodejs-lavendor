/**
 * Created by admin on 2018/7/24.
 *
 * 封装mongoose的一些操作，并且使用Promise实现同步
 */


/**
 * 保存一个实例
 * @param modelInst
 * @param params
 * @returns {*|Promise}
 */
exports.addModel = function(modelInst,params){
    return modelInst(params).save();
};

/**
 * 根据ID查询一个实例
 * @param modelInst
 * @param id
 * @returns {Query}
 */
exports.findOneById = function(modelInst,id){
  return modelInst.findOne({_id:id});
};

/**
 * 根据其他条件查询一个实例
 * @param modelInst
 * @param search
 * @returns {Query}
 */
exports.findOneByOther = function(modelInst,search){
    return modelInst.findOne(search);
};

/**
 * 更新数据
 * @param modelInst 更新的实例
 * @param id        ID
 * @param newData   更新的数据
 * @param options   更新选项
 */
exports.updateById = function(modelInst,id,newData,options){
    var condition = {_id:id};
    var data = {$set:newData};
    var options = options?options:{};
    return modelInst.update(condition,data,options);
};

/**
 * 根据条件更新实例
 * @param modelInst
 * @param condition {key:vale}
 * @param data
 * @param option
 */
exports.updateByOther = function(modelInst,condition,data,options){
    var data = {$set:data};
    var options = options?options:{};
    return modelInst.update(condition,data,options);
};

/**
 * 根据ID删除一个实例
 * @param modelInst
 * @param id
 */
exports.deleteOneById = function(modelInst,id){
    return modelInst.remove({_id:id});
}

/**
 * 分页查询
 * @param modelInst 实例
 * @param searchMap 查询条件map
 * @param page      分页-页号
 * @param size      分页-页条数
 * @param populate  联查字段 "id1 id2 "
 * @param sort      排序字段 {id:-1,id2:1} -1倒序，1升序
 */
exports.getAllPage = function (modelInst,searchMap,page,size,populate,sort){
    return new Promise(function(resolve,reject){
        var query = modelInst.find({});

        //分页
        size = parseInt(size),page = !page || page <= 0 ? 1:page;
        page = (page-1)*size;
        query.limit(size),query.skip(page);

        //查询条件
        if(searchMap){
            for(var key in searchMap){
                query.where(key,searchMap[key]);
            }
        }

        //联查
        if(populate){
            query.populate(populate);
        }

        //排序
        if(sort){
            query.sort(sort)
        }

        //执行查询
        query.exec().then(function(result){
            //统计条数
            modelInst.count(searchMap).then(function(total){
                resolve({data:result,total:total});
            }).catch(function(e){
                reject(e);
            })
        }).catch(function(err){
            reject(err);
        })
    })
}

/**
 * 不分页查询
 * @param modelInst
 * @param searchMap
 * @param populate  联查字段 "id1 id2 "
 * @param sort      排序字段 {id:-1,id2:1} -1倒序，1升序
 */
exports.getAllNoPage = function(modelInst,searchMap,populate,sort){
    return new Promise(function(resolve,reject){
        var query = modelInst.find({});

        //查询条件
        if(searchMap){
            for(var key in searchMap){
                query.where(key,searchMap[key]);
            }
        }

        //联查
        if(populate){
            query.populate(populate);
        }

        //排序
        if(sort){
            query.sort(sort)
        }

        //执行查询
        query.exec().then(function(result){
            resolve(result);
        }).catch(function(err){
            reject(err);
        })
    })
};