/**
 * 根据旅游景点ID，获取用户上传的景点图片
 */

let request = require("request");
let cheerio = require("cheerio");

module.exports = function(tourId, pageId){
    return new Promise(function(resolve, reject){
        let options = {
            url: "http://www.mafengwo.cn/mdd/ajax_photolist.php?act=getPoiPhotoList&poiid="+ tourId + "&page=" + pageId,
            header : {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36'
            }
        }
        request(options, function(err, response, html){
            if (err){
                console.log(err);
                reject(err);
                return
            }
            if (response.statusCode != 200){
                console.log("statusCode: " + response.statusCode);
                reject();
                return;
            }
            let $ = cheerio.load(html);
            let imgs = $("img");
            let returnImgs = [];
            if (imgs.length > 0){
                let values = [];
                for (let i = 0; i < imgs.length; i++){
                    let imgUrl = $(imgs[i]).attr('src');
                    imgUrl.replace(/(.*)\?image/, function(match, p1){
                        if (p1){
                            imgUrl = p1;
                            returnImgs.push(imgUrl);
                        }
                    })
                    
                }
            } else {
                resolve(returnImgs);
            }
        })
    })
}

// Test
module.exports(3498, 1).then(function(imgs){
    console.log(imgs);
}).catch(function(err){
})