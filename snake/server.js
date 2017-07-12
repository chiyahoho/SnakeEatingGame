var net = require('net');

var HOST = '127.0.0.1';
var PORT = 8080;
var socklist = [];
var idlist = 0;
var savelist = [];

var server = net.createServer();
server.listen(PORT, HOST);
console.log('Server listening on ' + HOST + ':' + PORT);

server.on('connection', function(sock) {
    console.log('CONNECTED: ' + sock.remoteAddress + ':' + sock.remotePort);
    socklist.push(sock);

    sock.on('data', function(data) {
        console.log('DATA ' + sock.remoteAddress + ': ' + data);
        var x = parseInt(data);
        var op = x % 10;
        var ans;
        if (op == 1){
            ans = idlist.toString() + '2';
            console.log("send" + ans);
            sock.write(ans);
            x = parseInt(x / 10);
            ans =idlist.toString() + '3';
            for(var i=0;i<5;i++) {
                ans = (x % 10).toString() + ans;
                x = parseInt(x / 10);
            }
            savelist[idlist] = ans;
            for(var i=0;i<socklist.length;i++){
                sock.write(savelist[i]);
            }
            for(var i=0;i<socklist.length-1;i+=1){
                console.log("send" + ans);
                socklist[i].write(ans);
            }
            idlist = idlist + 1;
        }
        else {
            for(var i=0;i<socklist.length;i+=1) {
                console.log("send" + data);
                socklist[i].write(data);
            }
        }
    });

    sock.on('close', function(data) {
        console.log('CLOSED: ' + sock.remoteAddress + ' ' + sock.remotePort);
    });
});