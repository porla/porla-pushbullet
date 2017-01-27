const PushbulletClient = require('./pushbullet');
const PORLA_PUSHBULLET_TOKEN = process.env.PORLA_PUSHBULLET_TOKEN || '';

module.exports = (porla) => {
    if (!PORLA_PUSHBULLET_TOKEN.trim()) {
        porla.log('error', 'PORLA_PUSHBULLET_TOKEN environment variable not set.')
        return;
    }

    const cfg = porla.config['pushbullet'] || {};
    const client = new PushbulletClient(PORLA_PUSHBULLET_TOKEN);
    const events = cfg['notify_events'] || [];

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
