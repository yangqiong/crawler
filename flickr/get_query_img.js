/**
 * 根据搜索关键词获取flickr图片（需翻墙）
 * https://www.flickr.com/search/?text=%E5%93%88%E5%A3%AB%E5%A5%87
 */

let request = require("request");

module.exports = function(key, word, pageId){
    return new Promise(function(resolve, reject){
        let options = {
            url: "https://api.flickr.com/services/rest?sort=relevance&parse_tags=1&content_type=7&extras=can_comment%2Ccount_comments%2Ccount_faves%2Cdescription%2Cisfavorite%2Clicense%2Cmedia%2Cneeds_interstitial%2Cowner_name%2Cpath_alias%2Crealname%2Crotation%2Curl_c%2Curl_l%2Curl_m%2Curl_n%2Curl_q%2Curl_s%2Curl_sq%2Curl_t%2Curl_z&per_page=25&page=" + pageId + "&lang=zh-Hant-HK&text=" + encodeURI(word)  + "&viewerNSID=&method=flickr.photos.search&csrf=&api_key=" + key + "&format=json&hermes=1&hermesClient=1&reqId=41062247&nojsoncallback=1",
            headers: {
                "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36"
            }
        }

        request.get(options, function(err, response, data){
            if (err){
                console.log(err);
                reject(err);
                return;
            }
            if (response.statusCode != 200){
                console.log("statusCode: " + response.statusCode);
                reject(err);
                return;
            }
            let body = JSON.parse(data)
            resolve(body);
        })
    })
}

// Test
module.exports("5f7d3ae9aca233e5836595b405bfbf00", "哈士奇", 1).then(function(data){
    console.log(data);
})