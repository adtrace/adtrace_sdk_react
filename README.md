[![NPM](https://img.shields.io/npm/v/react-adtrace.svg)](https://www.npmjs.com/package/react-adtrace) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Summary

This is the guide to the React SDK of AdTrace™ for web apps. You can read more about AdTrace™ at [adtrace.io].

## Table of contents

* [Example apps](#example-app)
   * [React example](#react-example)
   * [Next example](#next-example)
* [Basic integration](#basic-integration)
   * [Recommendations](#recommendations)
   * [Install SDK](#install-sdk)
   * [Basic setup](#basic-setup)
* [Additional features](#additional-features)
   * [Adtrace Identifier](#adtrace-id)
   * [Event tracking](#event-tracking)
      * [Revenue tracking](#revenue-tracking)
      * [Event value](#event-value)
      * [Callback parameters](#callback-parameters)
      * [Partner parameters](#partner-parameters)
   * [Stable local data](#stable-local-data)
* [Use with React libraries](#libs)
   * [Next Js](#libs-next)

## <a id="example-app"></a>Example apps

### <a id="react-example"></a>React example
By using the SDK to your `React`, you can check [React example][react-example] for better help.

### <a id="next-example"></a>Next example
By using the SDK to your `Next JS`, you can check [Next Js example][next-example] for better help.

## <a id="basic-integration"></a>Basic integration

This SDK can be used to track installs, sessions and events.

### <a id="recommendations"></a>Recommendations

There are two ways to differentiate users coming from native apps to users coming from web apps if you are not running ad campaigns for your web apps:

- Create new app(s) in your AdTrace dashboard for your web app, pick one of the supported platforms during the creation and use this app token in the AdTrace SDK to initialise it. As with your native apps, organic traffic from your app will then be labelled under the `Organic` tracker in your AdTrace dashboard.
- Use one of your pre-existing app and hardcode a pre-installed tracker token in the AdTrace SDK. All traffic from your app will then be labelled under the hardcoded tracker in your AdTrace dashboard.

### <a id="install-sdk"></a>Install SDK

Simply add the AdTrace React SDK to `dependencies` by `npm` or `yarn`:

<table>
<tr>
<td>
<b>Npm</b>
</td>
</tr>
<tr>
<td>

```
npm install react-adtrace
```

</td>
</tr>
<tr>
<td>
<b>Yarn</b>
</td>
</tr>
<tr>
<td>

```
yarn install react-adtrace
```

</td>
</tr>
</table>


### <a id="basic-setup"></a>Basic setup

There are a few things to keep in mind while implementing the SDK:

- The `unique_id` is An **unuique device identifier** such as `gps_adid` in Android, `idfa` in iOS or `win_adid` in Windows. If your app isn't able to access or pass those identifiers, you should pass a similary built UUID.

1. First import AdTrace SDK like this:
	```js
	import AdTrace from 'react-adtrace'
	```

2. Initialize the SDK inside your `App.js`:

	```js
	const adtrace = new AdTrace({
	  app_token: 'YourAppToken',
	  environment: 'production', // or 'sandbox' in case you are testing SDK locally with your web app
	  unique_id: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' // each web app user needs to have unique identifier,
	  default_tracker: 'Your non organic tracker' // optional
	});

	adtrace.trackSession((result) => {
	    console.log(result);
	  }, (errorMsg, error) => {
	    console.log(errorMsg, error);
	  }
	);
	```

**Note**: The `default_tracker` is an **optional** parameter for attributing data to the **non organic** trackers.

If it doesn't used, your data will attribiute in **organic tracker**.

## <a id="additional-features"></a>Additional features

Once you integrate the AdTrace React SDK into your web app, you can take advantage of the following features.

### <a id="adtrace-id"></a>Adtrace Identifier

When initializing of SDK complete, you can get **Adtrace Identifier**.

```js
const adtraceId = adtrace.getAdId();
```

**Note**: If adtrace id equals `null`, that means the SDK is installing your data and will take a little time (under 10 seconds).

### <a id="event-tracking"></a>Event tracking

You can use adtrace to track events. Lets say you want to track every tap on a particular button. You would create a new event token in your [dashboard], which has an associated event token - looking something like `abc123`. In order to track this event from your web app, you should do following:

```js
const eventConfig = {
  event_token: 'EventToken'
};

adtrace.trackEvent(eventConfig, (result) => {
  successCb(result, 'event');
}, (errorMsg, error) => {
  errorCb(errorMsg, error, 'event');
});
```

### <a id="event-value"></a>Event value

You can also add custom string value to event. You can set this value by adding `event_value` to your event config:

```js
const eventConfig = {
  event_token: 'EventToken',
  event_value: 'my-value'
};

adtrace.trackEvent(eventConfig, (result) => {
  successCb(result, 'event');
}, (errorMsg, error) => {
  errorCb(errorMsg, error, 'event');
});
```

### <a id="revenue-tracking"></a>Revenue tracking

You can attach revenue to event being tracked with AdTrace React SDK in case you would like to track some purchase that happened inside your web app. In order to that, you need to attach `revenue` and `currency` parameters when tracking event:

```js
const eventConfig = {
  event_token: 'EventToken',
  revenue: 10,
  currency: 'EUR'
};

adtrace.trackEvent(_eventConfig, (result) => {
  console.log(result);
}, (errorMsg, error) => {
  console.log(errorMsg, error);
});
```

When you set a currency token, adtrace will automatically convert the incoming revenues into a reporting revenue of your choice.

### <a id="callback-parameters"></a>Callback parameters

You can register a callback URL for your events in your [dashboard]. We will send a GET request to that URL whenever the event is tracked. You can add callback parameters to that event by adding `callback_params` parameter to the map object passed to `trackEvent` method. We will then append these parameters to your callback URL.

For example, suppose you have registered the URL `http://www.mydomain.com/callback` then track an event like this:

```js
const eventConfig = {
  event_token: 'EventToken',
  callback_params: [{
    key: 'key',
    value: 'value'
  }, {
    key: 'foo',
    value: 'bar'
  }],
};

adtrace.trackEvent(eventConfig, (result) => {
  console.log(result);
}, (errorMsg, error) => {
  console.log(errorMsg, error);
});
```

In that case we would track the event and send a request to:

    http://www.mydomain.com/callback?key=value&foo=bar

It should be mentioned that we support a variety of placeholders like `{gps_adid}` that can be used as parameter values. In the resulting callback this placeholder would be replaced with the ID for Advertisers of the current device. Also note that we don't store any of your custom parameters, but only append them to your callbacks, thus without a callback they will not be saved nor sent to you.

### <a id="partner-parameters"></a>Partner parameters

You can also add parameters to be transmitted to network partners, which have been activated in your AdTrace dashboard.

This works similarly to the callback parameters mentioned above, but can be added by adding `partner_params` parameter to the map object passed to `trackEvent` method.

```js
const eventConfig = {
  event_token: 'EventToken',
  partner_params: [{
    key: 'key',
    value: 'value'
  }, {
    key: 'foo',
    value: 'bar'
  }],
};

adtrace.trackEvent(eventConfig, (result) => {
  console.log(result);
}, (errorMsg, error) => {
  console.log(errorMsg, error);
});
```

### <a id="stable-local-data"></a>Stable local data

Because the unique device identifer & adtrace identifer saved in `localStorage`. If you want to `clear` the `localStorage` consider that to call **`stableLocalData` after `clear` method**  to save those identifiers in `localStorage`:

```js
localStorage.clear(); // clearing your own data
adtrace.stableLocalData(); 
```

## <a id="libs"></a>Use with React libraries
### <a id="libs-next"></a>Next Js

1. Install this package like [this](#install-sdk).


2. Import `react-adtrace` in `componentDidMount` method:
	```js
	const AdTrace = require('react-adtrace').default;
	```

3. Create and initialize adtrace instance :
	```js
	this.adtrace = new AdTrace({
	  app_token: '9e8tyd0l38s7',
	  environment: 'sandbox', // or 'sandbox' in case you are testing SDK locally with your web app
	  unique_id: '5057e23a-fh94-878o-b8a2-4ac4e20d48b2', // each web app user needs to have unique identifier,
	});
	this.setState({
	  adtraceId: this.adtrace.getAdId()
	});
	```
4. Your code should look like this:
	```js
		componentDidMount() {
		  const AdTrace = require('react-adtrace').default;
		  this.adtrace = new AdTrace({
		    app_token: '9e8tyd0l38s7',
		    environment: 'sandbox', // or 'sandbox' in case you are testing SDK locally with your web app
		    unique_id: '5057e23a-fh94-878o-b8a2-4ac4e20d48b2', // each web app user needs to have unique identifier,
		  });
		}
	```

4.Use AdTrace's functions like the [examples above](#event-tracking)

**Note**: Any kind of importing will get **an error**. You should import `react-adtrace` look like the tutorial. For more help you can check [next-example][next-example].

[adtrace.io]:     https://adtrace.io
[dashboard]:      https://adtrace.io
[react-example]:    example/
[next-example]:  next-example/
