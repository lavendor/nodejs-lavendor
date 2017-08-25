/**
 * Created by Administrator on 2017/8/25.
 */

var phantom = require('phantom');
var pdf = require('html-pdf');
var wkhtmltopdf = require('wkhtmltopdf');
var fs = require('fs');

/**
 * 使用wkhtmltopdf转换
 * @param html
 * @param pdfName
 */
exports.wkHtmlToPdf = function(html,pdfName){
    wkhtmltopdf.command = 'D:/Program Files/wkhtmltopdf/bin/wkhtmltopdf.exe';
    wkhtmltopdf(html,{output:'dash.pdf'});
}

/**
 * html to pdf 排版略有问题
 * @param url
 * @param pdfName
 */
exports.renderHtml2Pdf = function (url,pdfName){
    phantom.create().then(function(ph) {
        ph.createPage().then(function(page) {
            page.open("http://127.0.0.1:8080/"+url+"").then(function(status) {
                page.render(__dirname+'/'+pdfName).then(function() {
                    console.log('Page Rendered');
                    ph.exit();
                });
            });
        });
    });
};

/**
 * 这种方法没有渲染样式和图片
 * @param url
 * @param pdfName
 */
exports.html2Pdf = function(html,pdfName){
    var options = {format:true};
    pdf.create(html,options).toFile(__dirname+'/'+pdfName,function(err,res){
        if (err) return console.log(err);
        console.log(res);
    });
};