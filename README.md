# Pushbullet for Porla

The *porla-pushbullet* script integrates with [Pushbullet](https://pushbullet.com)
to provide real-time push notifications.

To use the Pushbullet script, you will need an access token. This can be acquired
by heading to [your account settings](https://www.pushbullet.com/#settings) and
click *Create access token*.

*It is recommended to encrypt your access token before adding it to your configuration.*


## Example configuration

```js
{
  "pushbullet": {
    // Your access token
    "access_token": "...",

    // An array of events which will trigger a notification.
    // Available events:
    // - transfer_added
    // - transfer_error
    // - transfer_finished
    "notify_events": [ 'transfer_added', 'transfer_finished' ]
  }
}
```


## Installing in Porla

From your Porla project repository, run:

```
npm install porla-pushbullet --save
```

Then add **porla-pushbullet** to your `external-scripts.json`:

```
[
    "porla-pushbullet"
]
```
