var http = require("http");
var fs = require("fs");
var url = require("url");
var port = process.argv[2];

if (!port) {
  console.log("请指定端口号好不啦？\nnode server.js 8888 这样不会吗？");
  process.exit(1);
}

var server = http.createServer(function (request, response) {
  var parsedUrl = url.parse(request.url, true);
  var pathWithQuery = request.url;
  var queryString = "";
  if (pathWithQuery.indexOf("?") >= 0) {
    queryString = pathWithQuery.substring(pathWithQuery.indexOf("?"));
  }
  var path = parsedUrl.pathname;
  var query = parsedUrl.query;
  var method = request.method;

  /******** 从这里开始看，上面不要看 ************/
  path = path === "/" ? "/index.html" : path;
  console.log("有个傻子发请求过来啦！路径（带查询参数）为：" + pathWithQuery);
  response.statusCode = 200;
  let start = path.indexOf(".");
  let suffix = path.substring(start + 1);
  suffix = suffix === "js" ? "javascript" : suffix;
  //console.log(suffix);
  response.setHeader("Content-Type", `text/${suffix};charset=utf-8`);
  let file1 = fs.readFileSync(`./public/${path}`);
  response.write(file1);
  response.end();

  /******** 代码结束，下面不要看 ************/
});

server.listen(port);
console.log(
  "监听 " +
    port +
    " 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:" +
    port
);
