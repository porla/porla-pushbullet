const PushbulletClient = require('./pushbullet');

module.exports = (porla) => {
    const token = porla.config.get([ 'pushbullet', 'access_token' ], '');

    if (!token.trim()) {
        porla.log('error', 'No Pushbullet access token configured.')
        return;
    }

    const client = new PushbulletClient(token);
    const events = porla.config.get([ 'pushbullet', 'notify_events' ], []);

    client.on('error', (err) => {
        porla.log('error', 'Pushbullet client error: %s', err);
    });

    porla.log('info', 'Pushbullet configured to push on %d event(s)', events.length);

    if (events.indexOf('transfer_added') > -1) {
        porla.on('torrent_added', (torrent) => {
            client.pushNote('(Porla) Transfer added', torrent.name + ' began downloading');
        });
    }

    if (events.indexOf('transfer_error') > -1) {
        porla.on('torrent_error', (torrent) => {
            client.pushNote('(Porla) Transfer error', torrent.name + ' had an error downloading');
        });
    }

    if (events.indexOf('transfer_finished') > -1) {
        porla.on('torrent_finished', (torrent) => {
            client.pushNote('(Porla) Transfer finished', torrent.name + ' finished downloading');
        });
    }
};
