/**
 * Created by admin on 2018/7/23.
 */

var LayoutInit = function(){

    /**
     * 初始化菜单
     */
    var initMenu = function initMenuTree(currentRoleId){
        $.ajax({
            url:'/login/initMenuByRoleId/'+currentRoleId,
            method:'get',
            success:function(result){
                var menus = result.data[0].menu_id;
                var menuTrees = arrToTree(menus);
                var html = '<ul class="page-sidebar-menu page-sidebar-menu-fixed page-header-fixed page-sidebar-menu-light " ' +
                    'data-keep-expanded="false" data-auto-scroll="true" data-slide-speed="200" style="padding-top: 20px">';
                for(var i=0;i<menuTrees.length;i++){
                    var current = menuTrees[i];
                    if(current.children){
                        //含有子菜单
                        var menuHtml = '<li class="nav-item"><a target="_self" href="'+current.menu_url+'" class="nav-link nav-toggle">' +
                            '<i class="'+current.menu_icon+'"></i><span class="title">'+current.menu_name+'</span>' +
                            '<span class="arrow"></span></a><ul class="sub-menu">';
                        for(var j=0;j<current.children.length;j++){
                            var child = current.children[j];
                            var childHtml = '<li class="nav-item"><a target="_self"  href="'+child.menu_url+'" class="nav-link">' +
                                '<i class="'+child.menu_icon+'"></i><span class="title">'+child.menu_name+'</span>' +
                                '</a></li>';
                            menuHtml += childHtml;
                        }
                        menuHtml += '</ul></li>';

                        html += menuHtml;
                    }else{
                        //不含子菜单
                        var menuHtml = '<li class="nav-item"><a target="_self"  href="'+current.menu_url+'" class="nav-link">' +
                            '<i class="'+current.menu_icon+'"></i><span class="title">'+current.menu_name+'</span>' +
                            '</a></li>';

                        html += menuHtml;
                    }
                }
                html += '</ul>';

                $('.page-sidebar').append(html);

                //当前页面路径
                var pathname = location.pathname;
                var urls = pathname.substr(1).split('/');
                var ahref = '/'.concat(urls[0]);
                var alink = $('a[href="'+ahref+'"]');
                alink.parents('.nav-item').addClass('active');//所有父菜单激活
                alink.parents('.nav-item').find('.arrow').addClass('open');//打开箭头
            }
        })
    }

    return {
        init: function(currentRoleId){
            initMenu(currentRoleId);
        }
    }
}();

//数组转树型结构
function arrToTree(arr){
    var resultTree = [],hash = {};
    for(var i=0;i<arr.length;i++){
        hash[arr[i]._id] = arr[i];//ID和值对应
    }
    for(var j=0;j<arr.length;j++){
        var currentValue = arr[j],parentValue = hash[arr[j].menu_parent];
        if(parentValue){
            //有父节点，保存到父节点
            !parentValue.children && (parentValue.children = []);
            parentValue.children.push(currentValue);
        }else{
            resultTree.push(currentValue);
        }
    }
    return resultTree;
}

/**
 * 生成菜单,下级菜单toggle事件监听
 * */
$(document).on('click','.nav-toggle',function(e){
    var that = $(this).closest('.nav-item').children('.nav-link');
    //关闭下级菜单
    if(that.parent().hasClass('open')){
        that.parent('.nav-item').removeClass('open');
        that.children('.arrow').removeClass('open');
        that.next('ul').css({display:"none"});
    }else{
        //开启下级菜单
        that.parent('.nav-item').addClass('open');
        that.children('.arrow').addClass('open');
        that.next('.sub-menu').css({display:"block"});
    }
});
