import React from 'react';
import 'web-adtrace';

class AdTrace extends React.Component {
  
  constructor(props) {
    super(props);
    const config = {
      app_token: props.app_token,
      environment: props.environment,
      unique_id: props.unique_id,
      
    };
    if (props.default_tracker !== undefined) {
      config['default_tracker'] = props.default_tracker;
    }
    this.adtrace = new window.AdTrace(config);
  }

  trackSession = (onSuccess, onError) => {
    this.adtrace.trackSession((result) => {
      onSuccess(result);
    }, (errorMsg, error) => {
      onError(errorMsg, error);
    });
  }

  trackEvent = (config, onSuccess, onError) => {
    this.adtrace.trackEvent(config, (result) => {
      onSuccess(result);
    }, (errorMsg, error) => {
      onError(errorMsg, error);
    });
  }

  getAdId = () => {
    return this.adtrace.getAdId();
  }

  stableLocalData = () => {
    this.adtrace.stableLocalData();
  }

}

export default AdTrace;