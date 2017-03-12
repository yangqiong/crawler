/**
 * 获取某个Tag下第几页的图片名称和ID
 * https://book.douban.com/tag/%E5%B0%8F%E8%AF%B4
 */

let request = require("request");
let cheerio = require("cheerio");

module.exports = function(tag, pageId){
    return new Promise(function(resolve, reject){
        let options = {
            url: encodeURI("https://book.douban.com/tag/" + tag + "?start=" + (pageId * 20)+ "&type=T"),
            headers: {
                "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36"
            }
        }

        request.get(options, function(err, response, data){
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
            let $ = cheerio.load(data);
            let books = $(".subject-list li");

            if (books.length > 0){
                let result = [];
                for (let i = 0; i < books.length; i++){
                    let book = $(books[i]);
                    let title = book.find("div.info h2 a").text().replace(/\s+/g, "").trim() || "";
                    let url = book.find("a.nbg").attr("href") || "";
                    let bookId;
                        url.replace(/(\d+)/, function(match, p1){
                            bookId = p1;
                        })
                    result.push({
                        title: title,
                        bookId: bookId
                    })
                }
                resolve(result);
            } else {
                resolve([])
            }
        })
    })
}

// Test
// module.exports("小说", 0).then(function(data){
//     console.log(data);
// })