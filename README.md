# Pushbullet for Porla

The *porla-pushbullet* script integrates with [Pushbullet](https://pushbullet.com)
to provide real-time push notifications.

The minimal configuration required is to set the `PORLA_PUSHBULLET_TOKEN` environment
to your Pushbullet access token. The rest of the configuration is done in the
`porla.json` file.


## Example configuration

```js
{
  "pushbullet": {
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
