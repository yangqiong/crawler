/**
 * 获取京东商品用户评论的图片
 * https://item.jd.com/3133857.html
 */

let request = require("request");
let Iconv = require('iconv').Iconv;
iconv = new Iconv("GBK", 'UTF-8//TRANSLIT//IGNORE');

module.exports = function(productId, pageId){
    return new Promise(function(resolve, reject){
        let options = {
            url: "https://club.jd.com/discussion/getProductPageImageCommentList.action?productId=" + productId + "&isShadowSku=0&callback=jQuery5238936&page=" + pageId + "&pageSize=20&_=1488782739408",
            encoding: null
        }
        request.get(options, function(err, response, body){
            if (err){
                console.log(err);
                return;
            }

            body = iconv.convert(body).toString();
            body = JSON.parse(body.slice(body.indexOf("{"), body.lastIndexOf('}')+1));
            resolve(body);
        })
    })
}

// Text
module.exports(3133857, 1).then(function(data){
    console.log(data);
})