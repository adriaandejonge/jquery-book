00 var http = require('http'),
01     url = require('url'),
02     fs = require('fs');
03 http.createServer(function (req, res) {
04   var reqData = {
05     url: url.parse(req.url, true),
06     method: req.method,
07     headers: req.headers },
08       path = reqData.url.pathname;
09 
10   if(path.match(/^\/[0-9a-z\-]+\.(html)|(json)|(xml)$/))
11     fs.readFile('.' + path, function (err, data) {
12       if (err) {
13         res.writeHead(404, {'Content-Type': 'text/plain'});
14         res.end('not found');
15       }
16     else {
17      if(path.split('.')[1] == 'html')
18          res.writeHead(200, {'Content-Type': 'text/html'});
19      else if(path.split('.')[1] == 'xml')
20          res.writeHead(200, {'Content-Type': 'application/xml'});
21      else 
22          res.writeHead(200, {'Content-Type': 'application/json'});
23        res.end(data);
24       }   
25     });
26   else if(path == '/return-http-headers') {
27     res.writeHead(200, {'Content-Type': 'application/json'});
28     res.end(JSON.stringify(reqData));
29   }
30   else if(path == '/sleep') {
31   var endTime = new Date().getTime() + 2000;
32   while (new Date().getTime() < endTime);
33   res.writeHead(500, {'Content-Type': 'text/plain'});
34     res.end('slow response');
35   }
36   else if(path == '/validate') {
37   var keys = [];
38   for(var key in reqData.url.query) {
39     if(reqData.url.query[key] == '')
40       keys.push(key);
41   }
42   res.writeHead(200, {'Content-Type': 'application/json'});
43     res.end(JSON.stringify(keys));
44   }
45   else if(path == '/redirect') {
46   res.writeHead(302, {
47     'Location': '/test-values.json' });
48     res.end();  
49   }
50   else if(path == '/fail\-on\-purpose') {
51     res.writeHead(500, {'Content-Type': 'text/plain'});
52     res.end('unexpected" error');
53   }
54   else {
55    res.writeHead(404, {'Content-Type': 'text/plain'});
56    res.end('not found');
57   }
58 }).listen(1337, "192.168.2.101");
59 console.log('Server running at http://localhost:1337/');