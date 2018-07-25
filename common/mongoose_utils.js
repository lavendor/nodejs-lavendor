/**
 * Created by admin on 2018/7/24.
 *
 * 封装mongoose的一些操作
 */


/**
 * 分页查询
 * @param modelInst 实例
 * @param searchMap 查询条件map
 * @param page      分页-页号
 * @param size      分页-页条数
 * @param populate  联查字段 "id1 id2 "
 * @param sort      排序字段 {id:-1,id2:1} -1倒序，1升序
 */
exports.getPageAll = function (modelInst,searchMap,page,size,populate,sort){
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