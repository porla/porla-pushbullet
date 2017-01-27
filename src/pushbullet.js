const EventEmitter = require('events').EventEmitter;
const https = require('https');

const HOST = 'api.pushbullet.com';
const PORT = 443;

class PushbulletClient extends EventEmitter {
    constructor(token) {
        super();
        this.TOKEN = token;
    }

    pushNote(title, body) {
        let data = JSON.stringify({
            body: body,
            title: title,
            type: 'note'
        });

        let options = {
            hostname: HOST,
            port: PORT,
            path: '/v2/pushes',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Token': this.TOKEN,
                'Content-Length': Buffer.byteLength(data)
            }
        };

        let req = https.request(options, (res) => {
            if (res.statusCode !== 200) {
                this.emit('error', new Error('Pushbullet returned non-success status code: ' + res.statusCode))
            }
        });

        req.write(data);
        req.end();
    }
}

module.exports = PushbulletClient;
