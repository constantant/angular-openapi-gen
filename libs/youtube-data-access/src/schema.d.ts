export interface paths {
  '/youtube/v3/abuseReports': {
    parameters: {
      query?: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** @description Inserts a new resource into this collection. */
    post: operations['youtube.abuseReports.insert'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/youtube/v3/activities': {
    parameters: {
      query?: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** @description Retrieves a list of resources, possibly filtered. */
    get: operations['youtube.activities.list'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/youtube/v3/captions': {
    parameters: {
      query?: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** @description Retrieves a list of resources, possibly filtered. */
    get: operations['youtube.captions.list'];
    /** @description Updates an existing resource. */
    put: operations['youtube.captions.update'];
    /** @description Inserts a new resource into this collection. */
    post: operations['youtube.captions.insert'];
    /** @description Deletes a resource. */
    delete: operations['youtube.captions.delete'];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/youtube/v3/captions/{id}': {
    parameters: {
      query?: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** @description Downloads a caption track. */
    get: operations['youtube.captions.download'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/youtube/v3/channelBanners/insert': {
    parameters: {
      query?: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** @description Inserts a new resource into this collection. */
    post: operations['youtube.channelBanners.insert'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/youtube/v3/channelSections': {
    parameters: {
      query?: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** @description Retrieves a list of resources, possibly filtered. */
    get: operations['youtube.channelSections.list'];
    /** @description Updates an existing resource. */
    put: operations['youtube.channelSections.update'];
    /** @description Inserts a new resource into this collection. */
    post: operations['youtube.channelSections.insert'];
    /** @description Deletes a resource. */
    delete: operations['youtube.channelSections.delete'];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/youtube/v3/channels': {
    parameters: {
      query?: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** @description Retrieves a list of resources, possibly filtered. */
    get: operations['youtube.channels.list'];
    /** @description Updates an existing resource. */
    put: operations['youtube.channels.update'];
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/youtube/v3/commentThreads': {
    parameters: {
      query?: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** @description Retrieves a list of resources, possibly filtered. */
    get: operations['youtube.commentThreads.list'];
    /** @description Updates an existing resource. */
    put: operations['youtube.youtube.v3.updateCommentThreads'];
    /** @description Inserts a new resource into this collection. */
    post: operations['youtube.commentThreads.insert'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/youtube/v3/comments': {
    parameters: {
      query?: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** @description Retrieves a list of resources, possibly filtered. */
    get: operations['youtube.comments.list'];
    /** @description Updates an existing resource. */
    put: operations['youtube.comments.update'];
    /** @description Inserts a new resource into this collection. */
    post: operations['youtube.comments.insert'];
    /** @description Deletes a resource. */
    delete: operations['youtube.comments.delete'];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/youtube/v3/comments/markAsSpam': {
    parameters: {
      query?: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** @description Expresses the caller's opinion that one or more comments should be flagged as spam. */
    post: operations['youtube.comments.markAsSpam'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/youtube/v3/comments/setModerationStatus': {
    parameters: {
      query?: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** @description Sets the moderation status of one or more comments. */
    post: operations['youtube.comments.setModerationStatus'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/youtube/v3/i18nLanguages': {
    parameters: {
      query?: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** @description Retrieves a list of resources, possibly filtered. */
    get: operations['youtube.i18nLanguages.list'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/youtube/v3/i18nRegions': {
    parameters: {
      query?: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** @description Retrieves a list of resources, possibly filtered. */
    get: operations['youtube.i18nRegions.list'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/youtube/v3/liveBroadcasts': {
    parameters: {
      query?: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** @description Retrieve the list of broadcasts associated with the given channel. */
    get: operations['youtube.liveBroadcasts.list'];
    /** @description Updates an existing broadcast for the authenticated user. */
    put: operations['youtube.liveBroadcasts.update'];
    /** @description Inserts a new stream for the authenticated user. */
    post: operations['youtube.liveBroadcasts.insert'];
    /** @description Delete a given broadcast. */
    delete: operations['youtube.liveBroadcasts.delete'];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/youtube/v3/liveBroadcasts/bind': {
    parameters: {
      query?: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** @description Bind a broadcast to a stream. */
    post: operations['youtube.liveBroadcasts.bind'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/youtube/v3/liveBroadcasts/cuepoint': {
    parameters: {
      query?: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** @description Insert cuepoints in a broadcast */
    post: operations['youtube.liveBroadcasts.insertCuepoint'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/youtube/v3/liveBroadcasts/transition': {
    parameters: {
      query?: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** @description Transition a broadcast to a given status. */
    post: operations['youtube.liveBroadcasts.transition'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/youtube/v3/liveChat/bans': {
    parameters: {
      query?: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** @description Inserts a new resource into this collection. */
    post: operations['youtube.liveChatBans.insert'];
    /** @description Deletes a chat ban. */
    delete: operations['youtube.liveChatBans.delete'];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/youtube/v3/liveChat/messages': {
    parameters: {
      query?: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** @description Retrieves a list of resources, possibly filtered. */
    get: operations['youtube.liveChatMessages.list'];
    put?: never;
    /** @description Inserts a new resource into this collection. */
    post: operations['youtube.liveChatMessages.insert'];
    /** @description Deletes a chat message. */
    delete: operations['youtube.liveChatMessages.delete'];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/youtube/v3/liveChat/moderators': {
    parameters: {
      query?: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** @description Retrieves a list of resources, possibly filtered. */
    get: operations['youtube.liveChatModerators.list'];
    put?: never;
    /** @description Inserts a new resource into this collection. */
    post: operations['youtube.liveChatModerators.insert'];
    /** @description Deletes a chat moderator. */
    delete: operations['youtube.liveChatModerators.delete'];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/youtube/v3/liveStreams': {
    parameters: {
      query?: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** @description Retrieve the list of streams associated with the given channel. -- */
    get: operations['youtube.liveStreams.list'];
    /** @description Updates an existing stream for the authenticated user. */
    put: operations['youtube.liveStreams.update'];
    /** @description Inserts a new stream for the authenticated user. */
    post: operations['youtube.liveStreams.insert'];
    /** @description Deletes an existing stream for the authenticated user. */
    delete: operations['youtube.liveStreams.delete'];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/youtube/v3/members': {
    parameters: {
      query?: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** @description Retrieves a list of members that match the request criteria for a channel. */
    get: operations['youtube.members.list'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/youtube/v3/membershipsLevels': {
    parameters: {
      query?: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** @description Retrieves a list of all pricing levels offered by a creator to the fans. */
    get: operations['youtube.membershipsLevels.list'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/youtube/v3/playlistItems': {
    parameters: {
      query?: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** @description Retrieves a list of resources, possibly filtered. */
    get: operations['youtube.playlistItems.list'];
    /** @description Updates an existing resource. */
    put: operations['youtube.playlistItems.update'];
    /** @description Inserts a new resource into this collection. */
    post: operations['youtube.playlistItems.insert'];
    /** @description Deletes a resource. */
    delete: operations['youtube.playlistItems.delete'];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/youtube/v3/playlists': {
    parameters: {
      query?: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** @description Retrieves a list of resources, possibly filtered. */
    get: operations['youtube.playlists.list'];
    /** @description Updates an existing resource. */
    put: operations['youtube.playlists.update'];
    /** @description Inserts a new resource into this collection. */
    post: operations['youtube.playlists.insert'];
    /** @description Deletes a resource. */
    delete: operations['youtube.playlists.delete'];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/youtube/v3/search': {
    parameters: {
      query?: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** @description Retrieves a list of search resources */
    get: operations['youtube.search.list'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/youtube/v3/subscriptions': {
    parameters: {
      query?: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** @description Retrieves a list of resources, possibly filtered. */
    get: operations['youtube.subscriptions.list'];
    put?: never;
    /** @description Inserts a new resource into this collection. */
    post: operations['youtube.subscriptions.insert'];
    /** @description Deletes a resource. */
    delete: operations['youtube.subscriptions.delete'];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/youtube/v3/superChatEvents': {
    parameters: {
      query?: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** @description Retrieves a list of resources, possibly filtered. */
    get: operations['youtube.superChatEvents.list'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/youtube/v3/tests': {
    parameters: {
      query?: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** @description POST method. */
    post: operations['youtube.tests.insert'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/youtube/v3/thirdPartyLinks': {
    parameters: {
      query?: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** @description Retrieves a list of resources, possibly filtered. */
    get: operations['youtube.thirdPartyLinks.list'];
    /** @description Updates an existing resource. */
    put: operations['youtube.thirdPartyLinks.update'];
    /** @description Inserts a new resource into this collection. */
    post: operations['youtube.thirdPartyLinks.insert'];
    /** @description Deletes a resource. */
    delete: operations['youtube.thirdPartyLinks.delete'];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/youtube/v3/thumbnails/set': {
    parameters: {
      query?: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** @description As this is not an insert in a strict sense (it supports uploading/setting of a thumbnail for multiple videos, which doesn't result in creation of a single resource), I use a custom verb here. */
    post: operations['youtube.thumbnails.set'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/youtube/v3/videoAbuseReportReasons': {
    parameters: {
      query?: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** @description Retrieves a list of resources, possibly filtered. */
    get: operations['youtube.videoAbuseReportReasons.list'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/youtube/v3/videoCategories': {
    parameters: {
      query?: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** @description Retrieves a list of resources, possibly filtered. */
    get: operations['youtube.videoCategories.list'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/youtube/v3/videos': {
    parameters: {
      query?: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** @description Retrieves a list of resources, possibly filtered. */
    get: operations['youtube.videos.list'];
    /** @description Updates an existing resource. */
    put: operations['youtube.videos.update'];
    /** @description Inserts a new resource into this collection. */
    post: operations['youtube.videos.insert'];
    /** @description Deletes a resource. */
    delete: operations['youtube.videos.delete'];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/youtube/v3/videos/getRating': {
    parameters: {
      query?: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** @description Retrieves the ratings that the authorized user gave to a list of specified videos. */
    get: operations['youtube.videos.getRating'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/youtube/v3/videos/rate': {
    parameters: {
      query?: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** @description Adds a like or dislike rating to a video or removes a rating from a video. */
    post: operations['youtube.videos.rate'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/youtube/v3/videos/reportAbuse': {
    parameters: {
      query?: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** @description Report abuse for a video. */
    post: operations['youtube.videos.reportAbuse'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/youtube/v3/watermarks/set': {
    parameters: {
      query?: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** @description Allows upload of watermark image and setting it for a channel. */
    post: operations['youtube.watermarks.set'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/youtube/v3/watermarks/unset': {
    parameters: {
      query?: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** @description Allows removal of channel watermark. */
    post: operations['youtube.watermarks.unset'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
}
export type webhooks = Record<string, never>;
export interface components {
  schemas: {
    AbuseReport: {
      abuseTypes?: components['schemas']['AbuseType'][];
      description?: string;
      relatedEntities?: components['schemas']['RelatedEntity'][];
      subject?: components['schemas']['Entity'];
    };
    AbuseType: {
      id?: string;
    };
    /** @description Rights management policy for YouTube resources. */
    AccessPolicy: {
      /** @description The value of allowed indicates whether the access to the policy is allowed or denied by default. */
      allowed?: boolean;
      /** @description A list of region codes that identify countries where the default policy do not apply. */
      exception?: string[];
    };
    /** @description An *activity* resource contains information about an action that a particular channel, or user, has taken on YouTube.The actions reported in activity feeds include rating a video, sharing a video, marking a video as a favorite, commenting on a video, uploading a video, and so forth. Each activity resource identifies the type of action, the channel associated with the action, and the resource(s) associated with the action, such as the video that was rated or uploaded. */
    Activity: {
      /** @description The contentDetails object contains information about the content associated with the activity. For example, if the snippet.type value is videoRated, then the contentDetails object's content identifies the rated video. */
      contentDetails?: components['schemas']['ActivityContentDetails'];
      /** @description Etag of this resource */
      etag?: string;
      /** @description The ID that YouTube uses to uniquely identify the activity. */
      id?: string;
      /**
       * @description Identifies what kind of resource this is. Value: the fixed string "youtube#activity".
       * @default youtube#activity
       */
      kind: string;
      /** @description The snippet object contains basic details about the activity, including the activity's type and group ID. */
      snippet?: components['schemas']['ActivitySnippet'];
    };
    /** @description Details about the content of an activity: the video that was shared, the channel that was subscribed to, etc. */
    ActivityContentDetails: {
      /** @description The bulletin object contains details about a channel bulletin post. This object is only present if the snippet.type is bulletin. */
      bulletin?: components['schemas']['ActivityContentDetailsBulletin'];
      /** @description The channelItem object contains details about a resource which was added to a channel. This property is only present if the snippet.type is channelItem. */
      channelItem?: components['schemas']['ActivityContentDetailsChannelItem'];
      /** @description The comment object contains information about a resource that received a comment. This property is only present if the snippet.type is comment. */
      comment?: components['schemas']['ActivityContentDetailsComment'];
      /** @description The favorite object contains information about a video that was marked as a favorite video. This property is only present if the snippet.type is favorite. */
      favorite?: components['schemas']['ActivityContentDetailsFavorite'];
      /** @description The like object contains information about a resource that received a positive (like) rating. This property is only present if the snippet.type is like. */
      like?: components['schemas']['ActivityContentDetailsLike'];
      /** @description The playlistItem object contains information about a new playlist item. This property is only present if the snippet.type is playlistItem. */
      playlistItem?: components['schemas']['ActivityContentDetailsPlaylistItem'];
      /** @description The promotedItem object contains details about a resource which is being promoted. This property is only present if the snippet.type is promotedItem. */
      promotedItem?: components['schemas']['ActivityContentDetailsPromotedItem'];
      /** @description The recommendation object contains information about a recommended resource. This property is only present if the snippet.type is recommendation. */
      recommendation?: components['schemas']['ActivityContentDetailsRecommendation'];
      /** @description The social object contains details about a social network post. This property is only present if the snippet.type is social. */
      social?: components['schemas']['ActivityContentDetailsSocial'];
      /** @description The subscription object contains information about a channel that a user subscribed to. This property is only present if the snippet.type is subscription. */
      subscription?: components['schemas']['ActivityContentDetailsSubscription'];
      /** @description The upload object contains information about the uploaded video. This property is only present if the snippet.type is upload. */
      upload?: components['schemas']['ActivityContentDetailsUpload'];
    };
    /** @description Details about a channel bulletin post. */
    ActivityContentDetailsBulletin: {
      /** @description The resourceId object contains information that identifies the resource associated with a bulletin post. @mutable youtube.activities.insert */
      resourceId?: components['schemas']['ResourceId'];
    };
    /** @description Details about a resource which was added to a channel. */
    ActivityContentDetailsChannelItem: {
      /** @description The resourceId object contains information that identifies the resource that was added to the channel. */
      resourceId?: components['schemas']['ResourceId'];
    };
    /** @description Information about a resource that received a comment. */
    ActivityContentDetailsComment: {
      /** @description The resourceId object contains information that identifies the resource associated with the comment. */
      resourceId?: components['schemas']['ResourceId'];
    };
    /** @description Information about a video that was marked as a favorite video. */
    ActivityContentDetailsFavorite: {
      /** @description The resourceId object contains information that identifies the resource that was marked as a favorite. */
      resourceId?: components['schemas']['ResourceId'];
    };
    /** @description Information about a resource that received a positive (like) rating. */
    ActivityContentDetailsLike: {
      /** @description The resourceId object contains information that identifies the rated resource. */
      resourceId?: components['schemas']['ResourceId'];
    };
    /** @description Information about a new playlist item. */
    ActivityContentDetailsPlaylistItem: {
      /** @description The value that YouTube uses to uniquely identify the playlist. */
      playlistId?: string;
      /** @description ID of the item within the playlist. */
      playlistItemId?: string;
      /** @description The resourceId object contains information about the resource that was added to the playlist. */
      resourceId?: components['schemas']['ResourceId'];
    };
    /** @description Details about a resource which is being promoted. */
    ActivityContentDetailsPromotedItem: {
      /** @description The URL the client should fetch to request a promoted item. */
      adTag?: string;
      /** @description The URL the client should ping to indicate that the user clicked through on this promoted item. */
      clickTrackingUrl?: string;
      /** @description The URL the client should ping to indicate that the user was shown this promoted item. */
      creativeViewUrl?: string;
      /**
       * @description The type of call-to-action, a message to the user indicating action that can be taken.
       * @enum {string}
       */
      ctaType?: 'ctaTypeUnspecified' | 'visitAdvertiserSite';
      /** @description The custom call-to-action button text. If specified, it will override the default button text for the cta_type. */
      customCtaButtonText?: string;
      /** @description The text description to accompany the promoted item. */
      descriptionText?: string;
      /** @description The URL the client should direct the user to, if the user chooses to visit the advertiser's website. */
      destinationUrl?: string;
      /** @description The list of forecasting URLs. The client should ping all of these URLs when a promoted item is not available, to indicate that a promoted item could have been shown. */
      forecastingUrl?: string[];
      /** @description The list of impression URLs. The client should ping all of these URLs to indicate that the user was shown this promoted item. */
      impressionUrl?: string[];
      /** @description The ID that YouTube uses to uniquely identify the promoted video. */
      videoId?: string;
    };
    /** @description Information that identifies the recommended resource. */
    ActivityContentDetailsRecommendation: {
      /**
       * @description The reason that the resource is recommended to the user.
       * @enum {string}
       */
      reason?:
        | 'reasonUnspecified'
        | 'videoFavorited'
        | 'videoLiked'
        | 'videoWatched';
      /** @description The resourceId object contains information that identifies the recommended resource. */
      resourceId?: components['schemas']['ResourceId'];
      /** @description The seedResourceId object contains information about the resource that caused the recommendation. */
      seedResourceId?: components['schemas']['ResourceId'];
    };
    /** @description Details about a social network post. */
    ActivityContentDetailsSocial: {
      /** @description The author of the social network post. */
      author?: string;
      /** @description An image of the post's author. */
      imageUrl?: string;
      /** @description The URL of the social network post. */
      referenceUrl?: string;
      /** @description The resourceId object encapsulates information that identifies the resource associated with a social network post. */
      resourceId?: components['schemas']['ResourceId'];
      /**
       * @description The name of the social network.
       * @enum {string}
       */
      type?: 'unspecified' | 'googlePlus' | 'facebook' | 'twitter';
    };
    /** @description Information about a channel that a user subscribed to. */
    ActivityContentDetailsSubscription: {
      /** @description The resourceId object contains information that identifies the resource that the user subscribed to. */
      resourceId?: components['schemas']['ResourceId'];
    };
    /** @description Information about the uploaded video. */
    ActivityContentDetailsUpload: {
      /** @description The ID that YouTube uses to uniquely identify the uploaded video. */
      videoId?: string;
    };
    ActivityListResponse: {
      /** @description Etag of this resource. */
      etag?: string;
      /** @description Serialized EventId of the request which produced this response. */
      eventId?: string;
      items?: components['schemas']['Activity'][];
      /**
       * @description Identifies what kind of resource this is. Value: the fixed string "youtube#activityListResponse".
       * @default youtube#activityListResponse
       */
      kind: string;
      /** @description The token that can be used as the value of the pageToken parameter to retrieve the next page in the result set. */
      nextPageToken?: string;
      /** @description General pagination information. */
      pageInfo?: components['schemas']['PageInfo'];
      /** @description The token that can be used as the value of the pageToken parameter to retrieve the previous page in the result set. */
      prevPageToken?: string;
      tokenPagination?: components['schemas']['TokenPagination'];
      /** @description The visitorId identifies the visitor. */
      visitorId?: string;
    };
    /** @description Basic details about an activity, including title, description, thumbnails, activity type and group. Next ID: 12 */
    ActivitySnippet: {
      /** @description The ID that YouTube uses to uniquely identify the channel associated with the activity. */
      channelId?: string;
      /** @description Channel title for the channel responsible for this activity */
      channelTitle?: string;
      /** @description The description of the resource primarily associated with the activity. @mutable youtube.activities.insert */
      description?: string;
      /** @description The group ID associated with the activity. A group ID identifies user events that are associated with the same user and resource. For example, if a user rates a video and marks the same video as a favorite, the entries for those events would have the same group ID in the user's activity feed. In your user interface, you can avoid repetition by grouping events with the same groupId value. */
      groupId?: string;
      /**
       * Format: date-time
       * @description The date and time that the video was uploaded.
       */
      publishedAt?: string;
      /** @description A map of thumbnail images associated with the resource that is primarily associated with the activity. For each object in the map, the key is the name of the thumbnail image, and the value is an object that contains other information about the thumbnail. */
      thumbnails?: components['schemas']['ThumbnailDetails'];
      /** @description The title of the resource primarily associated with the activity. */
      title?: string;
      /**
       * @description The type of activity that the resource describes.
       * @enum {string}
       */
      type?:
        | 'typeUnspecified'
        | 'upload'
        | 'like'
        | 'favorite'
        | 'comment'
        | 'subscription'
        | 'playlistItem'
        | 'recommendation'
        | 'bulletin'
        | 'social'
        | 'channelItem'
        | 'promotedItem';
    };
    /** @description A *caption* resource represents a YouTube caption track. A caption track is associated with exactly one YouTube video. */
    Caption: {
      /** @description Etag of this resource. */
      etag?: string;
      /** @description The ID that YouTube uses to uniquely identify the caption track. */
      id?: string;
      /**
       * @description Identifies what kind of resource this is. Value: the fixed string "youtube#caption".
       * @default youtube#caption
       */
      kind: string;
      /** @description The snippet object contains basic details about the caption. */
      snippet?: components['schemas']['CaptionSnippet'];
    };
    CaptionListResponse: {
      /** @description Etag of this resource. */
      etag?: string;
      /** @description Serialized EventId of the request which produced this response. */
      eventId?: string;
      /** @description A list of captions that match the request criteria. */
      items?: components['schemas']['Caption'][];
      /**
       * @description Identifies what kind of resource this is. Value: the fixed string "youtube#captionListResponse".
       * @default youtube#captionListResponse
       */
      kind: string;
      /** @description The visitorId identifies the visitor. */
      visitorId?: string;
    };
    /** @description Basic details about a caption track, such as its language and name. */
    CaptionSnippet: {
      /**
       * @description The type of audio track associated with the caption track.
       * @enum {string}
       */
      audioTrackType?: 'unknown' | 'primary' | 'commentary' | 'descriptive';
      /**
       * @description The reason that YouTube failed to process the caption track. This property is only present if the state property's value is failed.
       * @enum {string}
       */
      failureReason?:
        | 'unknownFormat'
        | 'unsupportedFormat'
        | 'processingFailed';
      /** @description Indicates whether YouTube synchronized the caption track to the audio track in the video. The value will be true if a sync was explicitly requested when the caption track was uploaded. For example, when calling the captions.insert or captions.update methods, you can set the sync parameter to true to instruct YouTube to sync the uploaded track to the video. If the value is false, YouTube uses the time codes in the uploaded caption track to determine when to display captions. */
      isAutoSynced?: boolean;
      /** @description Indicates whether the track contains closed captions for the deaf and hard of hearing. The default value is false. */
      isCC?: boolean;
      /** @description Indicates whether the caption track is a draft. If the value is true, then the track is not publicly visible. The default value is false. @mutable youtube.captions.insert youtube.captions.update */
      isDraft?: boolean;
      /** @description Indicates whether caption track is formatted for "easy reader," meaning it is at a third-grade level for language learners. The default value is false. */
      isEasyReader?: boolean;
      /** @description Indicates whether the caption track uses large text for the vision-impaired. The default value is false. */
      isLarge?: boolean;
      /** @description The language of the caption track. The property value is a BCP-47 language tag. */
      language?: string;
      /**
       * Format: date-time
       * @description The date and time when the caption track was last updated.
       */
      lastUpdated?: string;
      /** @description The name of the caption track. The name is intended to be visible to the user as an option during playback. */
      name?: string;
      /**
       * @description The caption track's status.
       * @enum {string}
       */
      status?: 'serving' | 'syncing' | 'failed';
      /**
       * @description The caption track's type.
       * @enum {string}
       */
      trackKind?: 'standard' | 'ASR' | 'forced';
      /** @description The ID that YouTube uses to uniquely identify the video associated with the caption track. @mutable youtube.captions.insert */
      videoId?: string;
    };
    /** @description Brief description of the live stream cdn settings. */
    CdnSettings: {
      /** @description The format of the video stream that you are sending to Youtube. */
      format?: string;
      /**
       * @description The frame rate of the inbound video data.
       * @enum {string}
       */
      frameRate?: '30fps' | '60fps' | 'variable';
      /** @description The ingestionInfo object contains information that YouTube provides that you need to transmit your RTMP or HTTP stream to YouTube. */
      ingestionInfo?: components['schemas']['IngestionInfo'];
      /**
       * @description The method or protocol used to transmit the video stream.
       * @enum {string}
       */
      ingestionType?: 'rtmp' | 'dash' | 'webrtc' | 'hls';
      /**
       * @description The resolution of the inbound video data.
       * @enum {string}
       */
      resolution?:
        | '240p'
        | '360p'
        | '480p'
        | '720p'
        | '1080p'
        | '1440p'
        | '2160p'
        | 'variable';
    };
    /** @description A *channel* resource contains information about a YouTube channel. */
    Channel: {
      /** @description The auditionDetails object encapsulates channel data that is relevant for YouTube Partners during the audition process. */
      auditDetails?: components['schemas']['ChannelAuditDetails'];
      /** @description The brandingSettings object encapsulates information about the branding of the channel. */
      brandingSettings?: components['schemas']['ChannelBrandingSettings'];
      /** @description The contentDetails object encapsulates information about the channel's content. */
      contentDetails?: components['schemas']['ChannelContentDetails'];
      /** @description The contentOwnerDetails object encapsulates channel data that is relevant for YouTube Partners linked with the channel. */
      contentOwnerDetails?: components['schemas']['ChannelContentOwnerDetails'];
      /** @description The conversionPings object encapsulates information about conversion pings that need to be respected by the channel. */
      conversionPings?: components['schemas']['ChannelConversionPings'];
      /** @description Etag of this resource. */
      etag?: string;
      /** @description The ID that YouTube uses to uniquely identify the channel. */
      id?: string;
      /**
       * @description Identifies what kind of resource this is. Value: the fixed string "youtube#channel".
       * @default youtube#channel
       */
      kind: string;
      /** @description Localizations for different languages */
      localizations?: {
        [key: string]: components['schemas']['ChannelLocalization'];
      };
      /** @description The snippet object contains basic details about the channel, such as its title, description, and thumbnail images. */
      snippet?: components['schemas']['ChannelSnippet'];
      /** @description The statistics object encapsulates statistics for the channel. */
      statistics?: components['schemas']['ChannelStatistics'];
      /** @description The status object encapsulates information about the privacy status of the channel. */
      status?: components['schemas']['ChannelStatus'];
      /** @description The topicDetails object encapsulates information about Freebase topics associated with the channel. */
      topicDetails?: components['schemas']['ChannelTopicDetails'];
    };
    /** @description The auditDetails object encapsulates channel data that is relevant for YouTube Partners during the audit process. */
    ChannelAuditDetails: {
      /** @description Whether or not the channel respects the community guidelines. */
      communityGuidelinesGoodStanding?: boolean;
      /** @description Whether or not the channel has any unresolved claims. */
      contentIdClaimsGoodStanding?: boolean;
      /** @description Whether or not the channel has any copyright strikes. */
      copyrightStrikesGoodStanding?: boolean;
    };
    /** @description A channel banner returned as the response to a channel_banner.insert call. */
    ChannelBannerResource: {
      etag?: string;
      /**
       * @description Identifies what kind of resource this is. Value: the fixed string "youtube#channelBannerResource".
       * @default youtube#channelBannerResource
       */
      kind: string;
      /** @description The URL of this banner image. */
      url?: string;
    };
    /** @description Branding properties of a YouTube channel. */
    ChannelBrandingSettings: {
      /** @description Branding properties for the channel view. */
      channel?: components['schemas']['ChannelSettings'];
      /** @description Additional experimental branding properties. */
      hints?: components['schemas']['PropertyValue'][];
      /** @description Branding properties for branding images. */
      image?: components['schemas']['ImageSettings'];
      /** @description Branding properties for the watch page. */
      watch?: components['schemas']['WatchSettings'];
    };
    /** @description Details about the content of a channel. */
    ChannelContentDetails: {
      relatedPlaylists?: {
        /** @description The ID of the playlist that contains the channel"s favorite videos. Use the playlistItems.insert and playlistItems.delete to add or remove items from that list. */
        favorites?: string;
        /** @description The ID of the playlist that contains the channel"s liked videos. Use the playlistItems.insert and playlistItems.delete to add or remove items from that list. */
        likes?: string;
        /** @description The ID of the playlist that contains the channel"s uploaded videos. Use the videos.insert method to upload new videos and the videos.delete method to delete previously uploaded videos. */
        uploads?: string;
        /** @description The ID of the playlist that contains the channel"s watch history. Use the playlistItems.insert and playlistItems.delete to add or remove items from that list. */
        watchHistory?: string;
        /** @description The ID of the playlist that contains the channel"s watch later playlist. Use the playlistItems.insert and playlistItems.delete to add or remove items from that list. */
        watchLater?: string;
      };
    };
    /** @description The contentOwnerDetails object encapsulates channel data that is relevant for YouTube Partners linked with the channel. */
    ChannelContentOwnerDetails: {
      /** @description The ID of the content owner linked to the channel. */
      contentOwner?: string;
      /**
       * Format: date-time
       * @description The date and time when the channel was linked to the content owner.
       */
      timeLinked?: string;
    };
    /** @description Pings that the app shall fire (authenticated by biscotti cookie). Each ping has a context, in which the app must fire the ping, and a url identifying the ping. */
    ChannelConversionPing: {
      /**
       * @description Defines the context of the ping.
       * @enum {string}
       */
      context?: 'subscribe' | 'unsubscribe' | 'cview';
      /** @description The url (without the schema) that the player shall send the ping to. It's at caller's descretion to decide which schema to use (http vs https) Example of a returned url: //googleads.g.doubleclick.net/pagead/ viewthroughconversion/962985656/?data=path%3DtHe_path%3Btype%3D cview%3Butuid%3DGISQtTNGYqaYl4sKxoVvKA&labe=default The caller must append biscotti authentication (ms param in case of mobile, for example) to this ping. */
      conversionUrl?: string;
    };
    /** @description The conversionPings object encapsulates information about conversion pings that need to be respected by the channel. */
    ChannelConversionPings: {
      /** @description Pings that the app shall fire (authenticated by biscotti cookie). Each ping has a context, in which the app must fire the ping, and a url identifying the ping. */
      pings?: components['schemas']['ChannelConversionPing'][];
    };
    ChannelListResponse: {
      /** @description Etag of this resource. */
      etag?: string;
      /** @description Serialized EventId of the request which produced this response. */
      eventId?: string;
      items?: components['schemas']['Channel'][];
      /**
       * @description Identifies what kind of resource this is. Value: the fixed string "youtube#channelListResponse".
       * @default youtube#channelListResponse
       */
      kind: string;
      /** @description The token that can be used as the value of the pageToken parameter to retrieve the next page in the result set. */
      nextPageToken?: string;
      /** @description General pagination information. */
      pageInfo?: components['schemas']['PageInfo'];
      /** @description The token that can be used as the value of the pageToken parameter to retrieve the previous page in the result set. */
      prevPageToken?: string;
      tokenPagination?: components['schemas']['TokenPagination'];
      /** @description The visitorId identifies the visitor. */
      visitorId?: string;
    };
    /** @description Channel localization setting */
    ChannelLocalization: {
      /** @description The localized strings for channel's description. */
      description?: string;
      /** @description The localized strings for channel's title. */
      title?: string;
    };
    ChannelProfileDetails: {
      /** @description The YouTube channel ID. */
      channelId?: string;
      /** @description The channel's URL. */
      channelUrl?: string;
      /** @description The channel's display name. */
      displayName?: string;
      /** @description The channels's avatar URL. */
      profileImageUrl?: string;
    };
    ChannelSection: {
      /** @description The contentDetails object contains details about the channel section content, such as a list of playlists or channels featured in the section. */
      contentDetails?: components['schemas']['ChannelSectionContentDetails'];
      /** @description Etag of this resource. */
      etag?: string;
      /** @description The ID that YouTube uses to uniquely identify the channel section. */
      id?: string;
      /**
       * @description Identifies what kind of resource this is. Value: the fixed string "youtube#channelSection".
       * @default youtube#channelSection
       */
      kind: string;
      /** @description Localizations for different languages */
      localizations?: {
        [key: string]: components['schemas']['ChannelSectionLocalization'];
      };
      /** @description The snippet object contains basic details about the channel section, such as its type, style and title. */
      snippet?: components['schemas']['ChannelSectionSnippet'];
      /** @description The targeting object contains basic targeting settings about the channel section. */
      targeting?: components['schemas']['ChannelSectionTargeting'];
    };
    /** @description Details about a channelsection, including playlists and channels. */
    ChannelSectionContentDetails: {
      /** @description The channel ids for type multiple_channels. */
      channels?: string[];
      /** @description The playlist ids for type single_playlist and multiple_playlists. For singlePlaylist, only one playlistId is allowed. */
      playlists?: string[];
    };
    ChannelSectionListResponse: {
      /** @description Etag of this resource. */
      etag?: string;
      /** @description Serialized EventId of the request which produced this response. */
      eventId?: string;
      /** @description A list of ChannelSections that match the request criteria. */
      items?: components['schemas']['ChannelSection'][];
      /**
       * @description Identifies what kind of resource this is. Value: the fixed string "youtube#channelSectionListResponse".
       * @default youtube#channelSectionListResponse
       */
      kind: string;
      /** @description The visitorId identifies the visitor. */
      visitorId?: string;
    };
    /** @description ChannelSection localization setting */
    ChannelSectionLocalization: {
      /** @description The localized strings for channel section's title. */
      title?: string;
    };
    /** @description Basic details about a channel section, including title, style and position. */
    ChannelSectionSnippet: {
      /** @description The ID that YouTube uses to uniquely identify the channel that published the channel section. */
      channelId?: string;
      /** @description The language of the channel section's default title and description. */
      defaultLanguage?: string;
      /** @description Localized title, read-only. */
      localized?: components['schemas']['ChannelSectionLocalization'];
      /**
       * Format: uint32
       * @description The position of the channel section in the channel.
       */
      position?: number;
      /**
       * @description The style of the channel section.
       * @enum {string}
       */
      style?:
        | 'channelsectionStyleUnspecified'
        | 'horizontalRow'
        | 'verticalList';
      /** @description The channel section's title for multiple_playlists and multiple_channels. */
      title?: string;
      /**
       * @description The type of the channel section.
       * @enum {string}
       */
      type?:
        | 'channelsectionTypeUndefined'
        | 'singlePlaylist'
        | 'multiplePlaylists'
        | 'popularUploads'
        | 'recentUploads'
        | 'likes'
        | 'allPlaylists'
        | 'likedPlaylists'
        | 'recentPosts'
        | 'recentActivity'
        | 'liveEvents'
        | 'upcomingEvents'
        | 'completedEvents'
        | 'multipleChannels'
        | 'postedVideos'
        | 'postedPlaylists'
        | 'subscriptions';
    };
    /** @description ChannelSection targeting setting. */
    ChannelSectionTargeting: {
      /** @description The country the channel section is targeting. */
      countries?: string[];
      /** @description The language the channel section is targeting. */
      languages?: string[];
      /** @description The region the channel section is targeting. */
      regions?: string[];
    };
    /** @description Branding properties for the channel view. */
    ChannelSettings: {
      /** @description The country of the channel. */
      country?: string;
      defaultLanguage?: string;
      /** @description Which content tab users should see when viewing the channel. */
      defaultTab?: string;
      /** @description Specifies the channel description. */
      description?: string;
      /** @description Title for the featured channels tab. */
      featuredChannelsTitle?: string;
      /** @description The list of featured channels. */
      featuredChannelsUrls?: string[];
      /** @description Lists keywords associated with the channel, comma-separated. */
      keywords?: string;
      /** @description Whether user-submitted comments left on the channel page need to be approved by the channel owner to be publicly visible. */
      moderateComments?: boolean;
      /** @description A prominent color that can be rendered on this channel page. */
      profileColor?: string;
      /** @description Whether the tab to browse the videos should be displayed. */
      showBrowseView?: boolean;
      /** @description Whether related channels should be proposed. */
      showRelatedChannels?: boolean;
      /** @description Specifies the channel title. */
      title?: string;
      /** @description The ID for a Google Analytics account to track and measure traffic to the channels. */
      trackingAnalyticsAccountId?: string;
      /** @description The trailer of the channel, for users that are not subscribers. */
      unsubscribedTrailer?: string;
    };
    /** @description Basic details about a channel, including title, description and thumbnails. */
    ChannelSnippet: {
      /** @description The country of the channel. */
      country?: string;
      /** @description The custom url of the channel. */
      customUrl?: string;
      /** @description The language of the channel's default title and description. */
      defaultLanguage?: string;
      /** @description The description of the channel. */
      description?: string;
      /** @description Localized title and description, read-only. */
      localized?: components['schemas']['ChannelLocalization'];
      /**
       * Format: date-time
       * @description The date and time that the channel was created.
       */
      publishedAt?: string;
      /** @description A map of thumbnail images associated with the channel. For each object in the map, the key is the name of the thumbnail image, and the value is an object that contains other information about the thumbnail. When displaying thumbnails in your application, make sure that your code uses the image URLs exactly as they are returned in API responses. For example, your application should not use the http domain instead of the https domain in a URL returned in an API response. Beginning in July 2018, channel thumbnail URLs will only be available in the https domain, which is how the URLs appear in API responses. After that time, you might see broken images in your application if it tries to load YouTube images from the http domain. Thumbnail images might be empty for newly created channels and might take up to one day to populate. */
      thumbnails?: components['schemas']['ThumbnailDetails'];
      /** @description The channel's title. */
      title?: string;
    };
    /** @description Statistics about a channel: number of subscribers, number of videos in the channel, etc. */
    ChannelStatistics: {
      /**
       * Format: uint64
       * @description The number of comments for the channel.
       */
      commentCount?: string;
      /** @description Whether or not the number of subscribers is shown for this user. */
      hiddenSubscriberCount?: boolean;
      /**
       * Format: uint64
       * @description The number of subscribers that the channel has.
       */
      subscriberCount?: string;
      /**
       * Format: uint64
       * @description The number of videos uploaded to the channel.
       */
      videoCount?: string;
      /**
       * Format: uint64
       * @description The number of times the channel has been viewed.
       */
      viewCount?: string;
    };
    /** @description JSON template for the status part of a channel. */
    ChannelStatus: {
      /** @description If true, then the user is linked to either a YouTube username or G+ account. Otherwise, the user doesn't have a public YouTube identity. */
      isLinked?: boolean;
      /**
       * @description The long uploads status of this channel. See https://support.google.com/youtube/answer/71673 for more information.
       * @enum {string}
       */
      longUploadsStatus?:
        | 'longUploadsUnspecified'
        | 'allowed'
        | 'eligible'
        | 'disallowed';
      madeForKids?: boolean;
      /**
       * @description Privacy status of the channel.
       * @enum {string}
       */
      privacyStatus?: 'public' | 'unlisted' | 'private';
      selfDeclaredMadeForKids?: boolean;
    };
    /** @description Information specific to a store on a merchandising platform linked to a YouTube channel. */
    ChannelToStoreLinkDetails: {
      /**
       * Format: uint64
       * @description Google Merchant Center id of the store.
       */
      merchantId?: string;
      /** @description Name of the store. */
      storeName?: string;
      /** @description Landing page of the store. */
      storeUrl?: string;
    };
    /** @description Freebase topic information related to the channel. */
    ChannelTopicDetails: {
      /** @description A list of Wikipedia URLs that describe the channel's content. */
      topicCategories?: string[];
      /** @description A list of Freebase topic IDs associated with the channel. You can retrieve information about each topic using the Freebase Topic API. */
      topicIds?: string[];
    };
    /** @description A *comment* represents a single YouTube comment. */
    Comment: {
      /** @description Etag of this resource. */
      etag?: string;
      /** @description The ID that YouTube uses to uniquely identify the comment. */
      id?: string;
      /**
       * @description Identifies what kind of resource this is. Value: the fixed string "youtube#comment".
       * @default youtube#comment
       */
      kind: string;
      /** @description The snippet object contains basic details about the comment. */
      snippet?: components['schemas']['CommentSnippet'];
    };
    CommentListResponse: {
      /** @description Etag of this resource. */
      etag?: string;
      /** @description Serialized EventId of the request which produced this response. */
      eventId?: string;
      /** @description A list of comments that match the request criteria. */
      items?: components['schemas']['Comment'][];
      /**
       * @description Identifies what kind of resource this is. Value: the fixed string "youtube#commentListResponse".
       * @default youtube#commentListResponse
       */
      kind: string;
      /** @description The token that can be used as the value of the pageToken parameter to retrieve the next page in the result set. */
      nextPageToken?: string;
      /** @description General pagination information. */
      pageInfo?: components['schemas']['PageInfo'];
      tokenPagination?: components['schemas']['TokenPagination'];
      /** @description The visitorId identifies the visitor. */
      visitorId?: string;
    };
    /** @description Basic details about a comment, such as its author and text. */
    CommentSnippet: {
      authorChannelId?: components['schemas']['CommentSnippetAuthorChannelId'];
      /** @description Link to the author's YouTube channel, if any. */
      authorChannelUrl?: string;
      /** @description The name of the user who posted the comment. */
      authorDisplayName?: string;
      /** @description The URL for the avatar of the user who posted the comment. */
      authorProfileImageUrl?: string;
      /** @description Whether the current viewer can rate this comment. */
      canRate?: boolean;
      /** @description The id of the corresponding YouTube channel. In case of a channel comment this is the channel the comment refers to. In case of a video comment it's the video's channel. */
      channelId?: string;
      /**
       * Format: uint32
       * @description The total number of likes this comment has received.
       */
      likeCount?: number;
      /**
       * @description The comment's moderation status. Will not be set if the comments were requested through the id filter.
       * @enum {string}
       */
      moderationStatus?:
        | 'published'
        | 'heldForReview'
        | 'likelySpam'
        | 'rejected';
      /** @description The unique id of the parent comment, only set for replies. */
      parentId?: string;
      /**
       * Format: date-time
       * @description The date and time when the comment was originally published.
       */
      publishedAt?: string;
      /** @description The comment's text. The format is either plain text or HTML dependent on what has been requested. Even the plain text representation may differ from the text originally posted in that it may replace video links with video titles etc. */
      textDisplay?: string;
      /** @description The comment's original raw text as initially posted or last updated. The original text will only be returned if it is accessible to the viewer, which is only guaranteed if the viewer is the comment's author. */
      textOriginal?: string;
      /**
       * Format: date-time
       * @description The date and time when the comment was last updated.
       */
      updatedAt?: string;
      /** @description The ID of the video the comment refers to, if any. */
      videoId?: string;
      /**
       * @description The rating the viewer has given to this comment. For the time being this will never return RATE_TYPE_DISLIKE and instead return RATE_TYPE_NONE. This may change in the future.
       * @enum {string}
       */
      viewerRating?: 'none' | 'like' | 'dislike';
    };
    /** @description The id of the author's YouTube channel, if any. */
    CommentSnippetAuthorChannelId: {
      value?: string;
    };
    /** @description A *comment thread* represents information that applies to a top level comment and all its replies. It can also include the top level comment itself and some of the replies. */
    CommentThread: {
      /** @description Etag of this resource. */
      etag?: string;
      /** @description The ID that YouTube uses to uniquely identify the comment thread. */
      id?: string;
      /**
       * @description Identifies what kind of resource this is. Value: the fixed string "youtube#commentThread".
       * @default youtube#commentThread
       */
      kind: string;
      /** @description The replies object contains a limited number of replies (if any) to the top level comment found in the snippet. */
      replies?: components['schemas']['CommentThreadReplies'];
      /** @description The snippet object contains basic details about the comment thread and also the top level comment. */
      snippet?: components['schemas']['CommentThreadSnippet'];
    };
    CommentThreadListResponse: {
      /** @description Etag of this resource. */
      etag?: string;
      /** @description Serialized EventId of the request which produced this response. */
      eventId?: string;
      /** @description A list of comment threads that match the request criteria. */
      items?: components['schemas']['CommentThread'][];
      /**
       * @description Identifies what kind of resource this is. Value: the fixed string "youtube#commentThreadListResponse".
       * @default youtube#commentThreadListResponse
       */
      kind: string;
      /** @description The token that can be used as the value of the pageToken parameter to retrieve the next page in the result set. */
      nextPageToken?: string;
      /** @description General pagination information. */
      pageInfo?: components['schemas']['PageInfo'];
      tokenPagination?: components['schemas']['TokenPagination'];
      /** @description The visitorId identifies the visitor. */
      visitorId?: string;
    };
    /** @description Comments written in (direct or indirect) reply to the top level comment. */
    CommentThreadReplies: {
      /** @description A limited number of replies. Unless the number of replies returned equals total_reply_count in the snippet the returned replies are only a subset of the total number of replies. */
      comments?: components['schemas']['Comment'][];
    };
    /** @description Basic details about a comment thread. */
    CommentThreadSnippet: {
      /** @description Whether the current viewer of the thread can reply to it. This is viewer specific - other viewers may see a different value for this field. */
      canReply?: boolean;
      /** @description The YouTube channel the comments in the thread refer to or the channel with the video the comments refer to. If video_id isn't set the comments refer to the channel itself. */
      channelId?: string;
      /** @description Whether the thread (and therefore all its comments) is visible to all YouTube users. */
      isPublic?: boolean;
      /** @description The top level comment of this thread. */
      topLevelComment?: components['schemas']['Comment'];
      /**
       * Format: uint32
       * @description The total number of replies (not including the top level comment).
       */
      totalReplyCount?: number;
      /** @description The ID of the video the comments refer to, if any. No video_id implies a channel discussion comment. */
      videoId?: string;
    };
    /** @description Ratings schemes. The country-specific ratings are mostly for movies and shows. LINT.IfChange */
    ContentRating: {
      /**
       * @description The video's Australian Classification Board (ACB) or Australian Communications and Media Authority (ACMA) rating. ACMA ratings are used to classify children's television programming.
       * @enum {string}
       */
      acbRating?:
        | 'acbUnspecified'
        | 'acbE'
        | 'acbP'
        | 'acbC'
        | 'acbG'
        | 'acbPg'
        | 'acbM'
        | 'acbMa15plus'
        | 'acbR18plus'
        | 'acbUnrated';
      /**
       * @description The video's rating from Italy's Autorità per le Garanzie nelle Comunicazioni (AGCOM).
       * @enum {string}
       */
      agcomRating?:
        | 'agcomUnspecified'
        | 'agcomT'
        | 'agcomVm14'
        | 'agcomVm18'
        | 'agcomUnrated';
      /**
       * @description The video's Anatel (Asociación Nacional de Televisión) rating for Chilean television.
       * @enum {string}
       */
      anatelRating?:
        | 'anatelUnspecified'
        | 'anatelF'
        | 'anatelI'
        | 'anatelI7'
        | 'anatelI10'
        | 'anatelI12'
        | 'anatelR'
        | 'anatelA'
        | 'anatelUnrated';
      /**
       * @description The video's British Board of Film Classification (BBFC) rating.
       * @enum {string}
       */
      bbfcRating?:
        | 'bbfcUnspecified'
        | 'bbfcU'
        | 'bbfcPg'
        | 'bbfc12a'
        | 'bbfc12'
        | 'bbfc15'
        | 'bbfc18'
        | 'bbfcR18'
        | 'bbfcUnrated';
      /**
       * @description The video's rating from Thailand's Board of Film and Video Censors.
       * @enum {string}
       */
      bfvcRating?:
        | 'bfvcUnspecified'
        | 'bfvcG'
        | 'bfvcE'
        | 'bfvc13'
        | 'bfvc15'
        | 'bfvc18'
        | 'bfvc20'
        | 'bfvcB'
        | 'bfvcUnrated';
      /**
       * @description The video's rating from the Austrian Board of Media Classification (Bundesministerium für Unterricht, Kunst und Kultur).
       * @enum {string}
       */
      bmukkRating?:
        | 'bmukkUnspecified'
        | 'bmukkAa'
        | 'bmukk6'
        | 'bmukk8'
        | 'bmukk10'
        | 'bmukk12'
        | 'bmukk14'
        | 'bmukk16'
        | 'bmukkUnrated';
      /**
       * @description Rating system for Canadian TV - Canadian TV Classification System The video's rating from the Canadian Radio-Television and Telecommunications Commission (CRTC) for Canadian English-language broadcasts. For more information, see the Canadian Broadcast Standards Council website.
       * @enum {string}
       */
      catvRating?:
        | 'catvUnspecified'
        | 'catvC'
        | 'catvC8'
        | 'catvG'
        | 'catvPg'
        | 'catv14plus'
        | 'catv18plus'
        | 'catvUnrated'
        | 'catvE';
      /**
       * @description The video's rating from the Canadian Radio-Television and Telecommunications Commission (CRTC) for Canadian French-language broadcasts. For more information, see the Canadian Broadcast Standards Council website.
       * @enum {string}
       */
      catvfrRating?:
        | 'catvfrUnspecified'
        | 'catvfrG'
        | 'catvfr8plus'
        | 'catvfr13plus'
        | 'catvfr16plus'
        | 'catvfr18plus'
        | 'catvfrUnrated'
        | 'catvfrE';
      /**
       * @description The video's Central Board of Film Certification (CBFC - India) rating.
       * @enum {string}
       */
      cbfcRating?:
        | 'cbfcUnspecified'
        | 'cbfcU'
        | 'cbfcUA'
        | 'cbfcUA7plus'
        | 'cbfcUA13plus'
        | 'cbfcUA16plus'
        | 'cbfcA'
        | 'cbfcS'
        | 'cbfcUnrated';
      /**
       * @description The video's Consejo de Calificación Cinematográfica (Chile) rating.
       * @enum {string}
       */
      cccRating?:
        | 'cccUnspecified'
        | 'cccTe'
        | 'ccc6'
        | 'ccc14'
        | 'ccc18'
        | 'ccc18v'
        | 'ccc18s'
        | 'cccUnrated';
      /**
       * @description The video's rating from Portugal's Comissão de Classificação de Espect´culos.
       * @enum {string}
       */
      cceRating?:
        | 'cceUnspecified'
        | 'cceM4'
        | 'cceM6'
        | 'cceM12'
        | 'cceM16'
        | 'cceM18'
        | 'cceUnrated'
        | 'cceM14';
      /**
       * @description The video's rating in Switzerland.
       * @enum {string}
       */
      chfilmRating?:
        | 'chfilmUnspecified'
        | 'chfilm0'
        | 'chfilm6'
        | 'chfilm12'
        | 'chfilm16'
        | 'chfilm18'
        | 'chfilmUnrated';
      /**
       * @description The video's Canadian Home Video Rating System (CHVRS) rating.
       * @enum {string}
       */
      chvrsRating?:
        | 'chvrsUnspecified'
        | 'chvrsG'
        | 'chvrsPg'
        | 'chvrs14a'
        | 'chvrs18a'
        | 'chvrsR'
        | 'chvrsE'
        | 'chvrsUnrated';
      /**
       * @description The video's rating from the Commission de Contrôle des Films (Belgium).
       * @enum {string}
       */
      cicfRating?:
        | 'cicfUnspecified'
        | 'cicfE'
        | 'cicfKtEa'
        | 'cicfKntEna'
        | 'cicfUnrated';
      /**
       * @description The video's rating from Romania's CONSILIUL NATIONAL AL AUDIOVIZUALULUI (CNA).
       * @enum {string}
       */
      cnaRating?:
        | 'cnaUnspecified'
        | 'cnaAp'
        | 'cna12'
        | 'cna15'
        | 'cna18'
        | 'cna18plus'
        | 'cnaUnrated';
      /**
       * @description Rating system in France - Commission de classification cinematographique
       * @enum {string}
       */
      cncRating?:
        | 'cncUnspecified'
        | 'cncT'
        | 'cnc10'
        | 'cnc12'
        | 'cnc16'
        | 'cnc18'
        | 'cncE'
        | 'cncInterdiction'
        | 'cncUnrated';
      /**
       * @description The video's rating from France's Conseil supérieur de l’audiovisuel, which rates broadcast content.
       * @enum {string}
       */
      csaRating?:
        | 'csaUnspecified'
        | 'csaT'
        | 'csa10'
        | 'csa12'
        | 'csa16'
        | 'csa18'
        | 'csaInterdiction'
        | 'csaUnrated';
      /**
       * @description The video's rating from Luxembourg's Commission de surveillance de la classification des films (CSCF).
       * @enum {string}
       */
      cscfRating?:
        | 'cscfUnspecified'
        | 'cscfAl'
        | 'cscfA'
        | 'cscf6'
        | 'cscf9'
        | 'cscf12'
        | 'cscf16'
        | 'cscf18'
        | 'cscfUnrated';
      /**
       * @description The video's rating in the Czech Republic.
       * @enum {string}
       */
      czfilmRating?:
        | 'czfilmUnspecified'
        | 'czfilmU'
        | 'czfilm12'
        | 'czfilm14'
        | 'czfilm18'
        | 'czfilmUnrated';
      /**
       * @description The video's Departamento de Justiça, Classificação, Qualificação e Títulos (DJCQT - Brazil) rating.
       * @enum {string}
       */
      djctqRating?:
        | 'djctqUnspecified'
        | 'djctqL'
        | 'djctq10'
        | 'djctq12'
        | 'djctq14'
        | 'djctq16'
        | 'djctq18'
        | 'djctqEr'
        | 'djctqL10'
        | 'djctqL12'
        | 'djctqL14'
        | 'djctqL16'
        | 'djctqL18'
        | 'djctq1012'
        | 'djctq1014'
        | 'djctq1016'
        | 'djctq1018'
        | 'djctq1214'
        | 'djctq1216'
        | 'djctq1218'
        | 'djctq1416'
        | 'djctq1418'
        | 'djctq1618'
        | 'djctqUnrated';
      /** @description Reasons that explain why the video received its DJCQT (Brazil) rating. */
      djctqRatingReasons?: (
        | 'djctqRatingReasonUnspecified'
        | 'djctqViolence'
        | 'djctqExtremeViolence'
        | 'djctqSexualContent'
        | 'djctqNudity'
        | 'djctqSex'
        | 'djctqExplicitSex'
        | 'djctqDrugs'
        | 'djctqLegalDrugs'
        | 'djctqIllegalDrugs'
        | 'djctqInappropriateLanguage'
        | 'djctqCriminalActs'
        | 'djctqImpactingContent'
      )[];
      /**
       * @description Rating system in Turkey - Evaluation and Classification Board of the Ministry of Culture and Tourism
       * @enum {string}
       */
      ecbmctRating?:
        | 'ecbmctUnspecified'
        | 'ecbmctG'
        | 'ecbmct7a'
        | 'ecbmct7plus'
        | 'ecbmct13a'
        | 'ecbmct13plus'
        | 'ecbmct15a'
        | 'ecbmct15plus'
        | 'ecbmct18plus'
        | 'ecbmctUnrated';
      /**
       * @description The video's rating in Estonia.
       * @enum {string}
       */
      eefilmRating?:
        | 'eefilmUnspecified'
        | 'eefilmPere'
        | 'eefilmL'
        | 'eefilmMs6'
        | 'eefilmK6'
        | 'eefilmMs12'
        | 'eefilmK12'
        | 'eefilmK14'
        | 'eefilmK16'
        | 'eefilmUnrated';
      /**
       * @description The video's rating in Egypt.
       * @enum {string}
       */
      egfilmRating?:
        | 'egfilmUnspecified'
        | 'egfilmGn'
        | 'egfilm18'
        | 'egfilmBn'
        | 'egfilmUnrated';
      /**
       * @description The video's Eirin (映倫) rating. Eirin is the Japanese rating system.
       * @enum {string}
       */
      eirinRating?:
        | 'eirinUnspecified'
        | 'eirinG'
        | 'eirinPg12'
        | 'eirinR15plus'
        | 'eirinR18plus'
        | 'eirinUnrated';
      /**
       * @description The video's rating from Malaysia's Film Censorship Board.
       * @enum {string}
       */
      fcbmRating?:
        | 'fcbmUnspecified'
        | 'fcbmU'
        | 'fcbmPg13'
        | 'fcbmP13'
        | 'fcbm18'
        | 'fcbm18sx'
        | 'fcbm18pa'
        | 'fcbm18sg'
        | 'fcbm18pl'
        | 'fcbmUnrated';
      /**
       * @description The video's rating from Hong Kong's Office for Film, Newspaper and Article Administration.
       * @enum {string}
       */
      fcoRating?:
        | 'fcoUnspecified'
        | 'fcoI'
        | 'fcoIia'
        | 'fcoIib'
        | 'fcoIi'
        | 'fcoIii'
        | 'fcoUnrated';
      /**
       * @description This property has been deprecated. Use the contentDetails.contentRating.cncRating instead.
       * @enum {string}
       */
      fmocRating?:
        | 'fmocUnspecified'
        | 'fmocU'
        | 'fmoc10'
        | 'fmoc12'
        | 'fmoc16'
        | 'fmoc18'
        | 'fmocE'
        | 'fmocUnrated';
      /**
       * @description The video's rating from South Africa's Film and Publication Board.
       * @enum {string}
       */
      fpbRating?:
        | 'fpbUnspecified'
        | 'fpbA'
        | 'fpbPg'
        | 'fpb79Pg'
        | 'fpb1012Pg'
        | 'fpb13'
        | 'fpb16'
        | 'fpb18'
        | 'fpbX18'
        | 'fpbXx'
        | 'fpbUnrated'
        | 'fpb10';
      /** @description Reasons that explain why the video received its FPB (South Africa) rating. */
      fpbRatingReasons?: (
        | 'fpbRatingReasonUnspecified'
        | 'fpbBlasphemy'
        | 'fpbLanguage'
        | 'fpbNudity'
        | 'fpbPrejudice'
        | 'fpbSex'
        | 'fpbViolence'
        | 'fpbDrugs'
        | 'fpbSexualViolence'
        | 'fpbHorror'
        | 'fpbCriminalTechniques'
        | 'fpbImitativeActsTechniques'
      )[];
      /**
       * @description The video's Freiwillige Selbstkontrolle der Filmwirtschaft (FSK - Germany) rating.
       * @enum {string}
       */
      fskRating?:
        | 'fskUnspecified'
        | 'fsk0'
        | 'fsk6'
        | 'fsk12'
        | 'fsk16'
        | 'fsk18'
        | 'fskUnrated';
      /**
       * @description The video's rating in Greece.
       * @enum {string}
       */
      grfilmRating?:
        | 'grfilmUnspecified'
        | 'grfilmK'
        | 'grfilmE'
        | 'grfilmK12'
        | 'grfilmK13'
        | 'grfilmK15'
        | 'grfilmK17'
        | 'grfilmK18'
        | 'grfilmUnrated';
      /**
       * @description The video's Instituto de la Cinematografía y de las Artes Audiovisuales (ICAA - Spain) rating.
       * @enum {string}
       */
      icaaRating?:
        | 'icaaUnspecified'
        | 'icaaApta'
        | 'icaa7'
        | 'icaa12'
        | 'icaa13'
        | 'icaa16'
        | 'icaa18'
        | 'icaaX'
        | 'icaaUnrated';
      /**
       * @description The video's Irish Film Classification Office (IFCO - Ireland) rating. See the IFCO website for more information.
       * @enum {string}
       */
      ifcoRating?:
        | 'ifcoUnspecified'
        | 'ifcoG'
        | 'ifcoPg'
        | 'ifco12'
        | 'ifco12a'
        | 'ifco15'
        | 'ifco15a'
        | 'ifco16'
        | 'ifco18'
        | 'ifcoUnrated';
      /**
       * @description The video's rating in Israel.
       * @enum {string}
       */
      ilfilmRating?:
        | 'ilfilmUnspecified'
        | 'ilfilmAa'
        | 'ilfilm12'
        | 'ilfilm14'
        | 'ilfilm16'
        | 'ilfilm18'
        | 'ilfilmUnrated';
      /**
       * @description The video's INCAA (Instituto Nacional de Cine y Artes Audiovisuales - Argentina) rating.
       * @enum {string}
       */
      incaaRating?:
        | 'incaaUnspecified'
        | 'incaaAtp'
        | 'incaaSam13'
        | 'incaaSam16'
        | 'incaaSam18'
        | 'incaaC'
        | 'incaaUnrated';
      /**
       * @description The video's rating from the Kenya Film Classification Board.
       * @enum {string}
       */
      kfcbRating?:
        | 'kfcbUnspecified'
        | 'kfcbG'
        | 'kfcbPg'
        | 'kfcb16plus'
        | 'kfcbR'
        | 'kfcbUnrated';
      /**
       * @description The video's NICAM/Kijkwijzer rating from the Nederlands Instituut voor de Classificatie van Audiovisuele Media (Netherlands).
       * @enum {string}
       */
      kijkwijzerRating?:
        | 'kijkwijzerUnspecified'
        | 'kijkwijzerAl'
        | 'kijkwijzer6'
        | 'kijkwijzer9'
        | 'kijkwijzer12'
        | 'kijkwijzer16'
        | 'kijkwijzer18'
        | 'kijkwijzerUnrated';
      /**
       * @description The video's Korea Media Rating Board (영상물등급위원회) rating. The KMRB rates videos in South Korea.
       * @enum {string}
       */
      kmrbRating?:
        | 'kmrbUnspecified'
        | 'kmrbAll'
        | 'kmrb12plus'
        | 'kmrb15plus'
        | 'kmrbTeenr'
        | 'kmrbR'
        | 'kmrbUnrated';
      /**
       * @description The video's rating from Indonesia's Lembaga Sensor Film.
       * @enum {string}
       */
      lsfRating?:
        | 'lsfUnspecified'
        | 'lsfSu'
        | 'lsfA'
        | 'lsfBo'
        | 'lsf13'
        | 'lsfR'
        | 'lsf17'
        | 'lsfD'
        | 'lsf21'
        | 'lsfUnrated';
      /**
       * @description The video's rating from Malta's Film Age-Classification Board.
       * @enum {string}
       */
      mccaaRating?:
        | 'mccaaUnspecified'
        | 'mccaaU'
        | 'mccaaPg'
        | 'mccaa12a'
        | 'mccaa12'
        | 'mccaa14'
        | 'mccaa15'
        | 'mccaa16'
        | 'mccaa18'
        | 'mccaaUnrated';
      /**
       * @description The video's rating from the Danish Film Institute's (Det Danske Filminstitut) Media Council for Children and Young People.
       * @enum {string}
       */
      mccypRating?:
        | 'mccypUnspecified'
        | 'mccypA'
        | 'mccyp7'
        | 'mccyp11'
        | 'mccyp15'
        | 'mccypUnrated';
      /**
       * @description The video's rating system for Vietnam - MCST
       * @enum {string}
       */
      mcstRating?:
        | 'mcstUnspecified'
        | 'mcstP'
        | 'mcst0'
        | 'mcstC13'
        | 'mcstC16'
        | 'mcst16plus'
        | 'mcstC18'
        | 'mcstGPg'
        | 'mcstUnrated';
      /**
       * @description The video's rating from Singapore's Media Development Authority (MDA) and, specifically, it's Board of Film Censors (BFC).
       * @enum {string}
       */
      mdaRating?:
        | 'mdaUnspecified'
        | 'mdaG'
        | 'mdaPg'
        | 'mdaPg13'
        | 'mdaNc16'
        | 'mdaM18'
        | 'mdaR21'
        | 'mdaUnrated';
      /**
       * @description The video's rating from Medietilsynet, the Norwegian Media Authority.
       * @enum {string}
       */
      medietilsynetRating?:
        | 'medietilsynetUnspecified'
        | 'medietilsynetA'
        | 'medietilsynet6'
        | 'medietilsynet7'
        | 'medietilsynet9'
        | 'medietilsynet11'
        | 'medietilsynet12'
        | 'medietilsynet15'
        | 'medietilsynet18'
        | 'medietilsynetUnrated';
      /**
       * @description The video's rating from Finland's Kansallinen Audiovisuaalinen Instituutti (National Audiovisual Institute).
       * @enum {string}
       */
      mekuRating?:
        | 'mekuUnspecified'
        | 'mekuS'
        | 'meku7'
        | 'meku12'
        | 'meku16'
        | 'meku18'
        | 'mekuUnrated';
      /**
       * @description The rating system for MENA countries, a clone of MPAA. It is needed to prevent titles go live w/o additional QC check, since some of them can be inappropriate for the countries at all. See b/33408548 for more details.
       * @enum {string}
       */
      menaMpaaRating?:
        | 'menaMpaaUnspecified'
        | 'menaMpaaG'
        | 'menaMpaaPg'
        | 'menaMpaaPg13'
        | 'menaMpaaR'
        | 'menaMpaaUnrated';
      /**
       * @description The video's rating from the Ministero dei Beni e delle Attività Culturali e del Turismo (Italy).
       * @enum {string}
       */
      mibacRating?:
        | 'mibacUnspecified'
        | 'mibacT'
        | 'mibacVap'
        | 'mibacVm6'
        | 'mibacVm12'
        | 'mibacVm14'
        | 'mibacVm16'
        | 'mibacVm18'
        | 'mibacUnrated';
      /**
       * @description The video's Ministerio de Cultura (Colombia) rating.
       * @enum {string}
       */
      mocRating?:
        | 'mocUnspecified'
        | 'mocE'
        | 'mocT'
        | 'moc7'
        | 'moc12'
        | 'moc15'
        | 'moc18'
        | 'mocX'
        | 'mocBanned'
        | 'mocUnrated';
      /**
       * @description The video's rating from Taiwan's Ministry of Culture (文化部).
       * @enum {string}
       */
      moctwRating?:
        | 'moctwUnspecified'
        | 'moctwG'
        | 'moctwP'
        | 'moctwPg'
        | 'moctwR'
        | 'moctwUnrated'
        | 'moctwR12'
        | 'moctwR15';
      /**
       * @description The video's Motion Picture Association of America (MPAA) rating.
       * @enum {string}
       */
      mpaaRating?:
        | 'mpaaUnspecified'
        | 'mpaaG'
        | 'mpaaPg'
        | 'mpaaPg13'
        | 'mpaaR'
        | 'mpaaNc17'
        | 'mpaaX'
        | 'mpaaUnrated';
      /**
       * @description The rating system for trailer, DVD, and Ad in the US. See http://movielabs.com/md/ratings/v2.3/html/US_MPAAT_Ratings.html.
       * @enum {string}
       */
      mpaatRating?: 'mpaatUnspecified' | 'mpaatGb' | 'mpaatRb';
      /**
       * @description The video's rating from the Movie and Television Review and Classification Board (Philippines).
       * @enum {string}
       */
      mtrcbRating?:
        | 'mtrcbUnspecified'
        | 'mtrcbG'
        | 'mtrcbPg'
        | 'mtrcbR13'
        | 'mtrcbR16'
        | 'mtrcbR18'
        | 'mtrcbX'
        | 'mtrcbUnrated';
      /**
       * @description The video's rating from the Maldives National Bureau of Classification.
       * @enum {string}
       */
      nbcRating?:
        | 'nbcUnspecified'
        | 'nbcG'
        | 'nbcPg'
        | 'nbc12plus'
        | 'nbc15plus'
        | 'nbc18plus'
        | 'nbc18plusr'
        | 'nbcPu'
        | 'nbcUnrated';
      /**
       * @description The video's rating in Poland.
       * @enum {string}
       */
      nbcplRating?:
        | 'nbcplUnspecified'
        | 'nbcplI'
        | 'nbcplIi'
        | 'nbcplIii'
        | 'nbcplIv'
        | 'nbcpl18plus'
        | 'nbcplUnrated';
      /**
       * @description The video's rating from the Bulgarian National Film Center.
       * @enum {string}
       */
      nfrcRating?:
        | 'nfrcUnspecified'
        | 'nfrcA'
        | 'nfrcB'
        | 'nfrcC'
        | 'nfrcD'
        | 'nfrcX'
        | 'nfrcUnrated';
      /**
       * @description The video's rating from Nigeria's National Film and Video Censors Board.
       * @enum {string}
       */
      nfvcbRating?:
        | 'nfvcbUnspecified'
        | 'nfvcbG'
        | 'nfvcbPg'
        | 'nfvcb12'
        | 'nfvcb12a'
        | 'nfvcb15'
        | 'nfvcb18'
        | 'nfvcbRe'
        | 'nfvcbUnrated';
      /**
       * @description The video's rating from the Nacionãlais Kino centrs (National Film Centre of Latvia).
       * @enum {string}
       */
      nkclvRating?:
        | 'nkclvUnspecified'
        | 'nkclvU'
        | 'nkclv7plus'
        | 'nkclv12plus'
        | 'nkclv16plus'
        | 'nkclv18plus'
        | 'nkclvUnrated';
      /**
       * @description The National Media Council ratings system for United Arab Emirates.
       * @enum {string}
       */
      nmcRating?:
        | 'nmcUnspecified'
        | 'nmcG'
        | 'nmcPg'
        | 'nmcPg13'
        | 'nmcPg15'
        | 'nmc15plus'
        | 'nmc18plus'
        | 'nmc18tc'
        | 'nmcUnrated';
      /**
       * @description The video's Office of Film and Literature Classification (OFLC - New Zealand) rating.
       * @enum {string}
       */
      oflcRating?:
        | 'oflcUnspecified'
        | 'oflcG'
        | 'oflcPg'
        | 'oflcM'
        | 'oflcR13'
        | 'oflcR15'
        | 'oflcR16'
        | 'oflcR18'
        | 'oflcUnrated'
        | 'oflcRp13'
        | 'oflcRp16'
        | 'oflcRp18';
      /**
       * @description The video's rating in Peru.
       * @enum {string}
       */
      pefilmRating?:
        | 'pefilmUnspecified'
        | 'pefilmPt'
        | 'pefilmPg'
        | 'pefilm14'
        | 'pefilm18'
        | 'pefilmUnrated';
      /**
       * @description The video's rating from the Hungarian Nemzeti Filmiroda, the Rating Committee of the National Office of Film.
       * @enum {string}
       */
      rcnofRating?:
        | 'rcnofUnspecified'
        | 'rcnofI'
        | 'rcnofIi'
        | 'rcnofIii'
        | 'rcnofIv'
        | 'rcnofV'
        | 'rcnofVi'
        | 'rcnofUnrated';
      /**
       * @description The video's rating in Venezuela.
       * @enum {string}
       */
      resorteviolenciaRating?:
        | 'resorteviolenciaUnspecified'
        | 'resorteviolenciaA'
        | 'resorteviolenciaB'
        | 'resorteviolenciaC'
        | 'resorteviolenciaD'
        | 'resorteviolenciaE'
        | 'resorteviolenciaUnrated';
      /**
       * @description The video's General Directorate of Radio, Television and Cinematography (Mexico) rating.
       * @enum {string}
       */
      rtcRating?:
        | 'rtcUnspecified'
        | 'rtcAa'
        | 'rtcA'
        | 'rtcB'
        | 'rtcB15'
        | 'rtcC'
        | 'rtcD'
        | 'rtcUnrated';
      /**
       * @description The video's rating from Ireland's Raidió Teilifís Éireann.
       * @enum {string}
       */
      rteRating?:
        | 'rteUnspecified'
        | 'rteGa'
        | 'rteCh'
        | 'rtePs'
        | 'rteMa'
        | 'rteUnrated';
      /**
       * @description The video's National Film Registry of the Russian Federation (MKRF - Russia) rating.
       * @enum {string}
       */
      russiaRating?:
        | 'russiaUnspecified'
        | 'russia0'
        | 'russia6'
        | 'russia12'
        | 'russia16'
        | 'russia18'
        | 'russiaUnrated';
      /**
       * @description The video's rating in Slovakia.
       * @enum {string}
       */
      skfilmRating?:
        | 'skfilmUnspecified'
        | 'skfilmG'
        | 'skfilmP2'
        | 'skfilmP5'
        | 'skfilmP8'
        | 'skfilmUnrated';
      /**
       * @description The video's rating in Iceland.
       * @enum {string}
       */
      smaisRating?:
        | 'smaisUnspecified'
        | 'smaisL'
        | 'smais7'
        | 'smais12'
        | 'smais14'
        | 'smais16'
        | 'smais18'
        | 'smaisUnrated';
      /**
       * @description The video's rating from Statens medieråd (Sweden's National Media Council).
       * @enum {string}
       */
      smsaRating?:
        | 'smsaUnspecified'
        | 'smsaA'
        | 'smsa7'
        | 'smsa11'
        | 'smsa15'
        | 'smsaUnrated';
      /**
       * @description The video's TV Parental Guidelines (TVPG) rating.
       * @enum {string}
       */
      tvpgRating?:
        | 'tvpgUnspecified'
        | 'tvpgY'
        | 'tvpgY7'
        | 'tvpgY7Fv'
        | 'tvpgG'
        | 'tvpgPg'
        | 'pg14'
        | 'tvpgMa'
        | 'tvpgUnrated';
      /**
       * @description A rating that YouTube uses to identify age-restricted content.
       * @enum {string}
       */
      ytRating?: 'ytUnspecified' | 'ytAgeRestricted';
    };
    /** @description Note that there may be a 5-second end-point resolution issue. For instance, if a cuepoint comes in for 22:03:27, we may stuff the cuepoint into 22:03:25 or 22:03:30, depending. This is an artifact of HLS. */
    Cuepoint: {
      /** @enum {string} */
      cueType?: 'cueTypeUnspecified' | 'cueTypeAd';
      /**
       * Format: uint32
       * @description The duration of this cuepoint.
       */
      durationSecs?: number;
      etag?: string;
      /** @description The identifier for cuepoint resource. */
      id?: string;
      /**
       * Format: int64
       * @description The time when the cuepoint should be inserted by offset to the broadcast actual start time.
       */
      insertionOffsetTimeMs?: string;
      /**
       * Format: uint64
       * @description The wall clock time at which the cuepoint should be inserted. Only one of insertion_offset_time_ms and walltime_ms may be set at a time.
       */
      walltimeMs?: string;
    };
    Entity: {
      id?: string;
      typeId?: string;
      url?: string;
    };
    /** @description Geographical coordinates of a point, in WGS84. */
    GeoPoint: {
      /**
       * Format: double
       * @description Altitude above the reference ellipsoid, in meters.
       */
      altitude?: number;
      /**
       * Format: double
       * @description Latitude in degrees.
       */
      latitude?: number;
      /**
       * Format: double
       * @description Longitude in degrees.
       */
      longitude?: number;
    };
    /** @description An *i18nLanguage* resource identifies a UI language currently supported by YouTube. */
    I18nLanguage: {
      /** @description Etag of this resource. */
      etag?: string;
      /** @description The ID that YouTube uses to uniquely identify the i18n language. */
      id?: string;
      /**
       * @description Identifies what kind of resource this is. Value: the fixed string "youtube#i18nLanguage".
       * @default youtube#i18nLanguage
       */
      kind: string;
      /** @description The snippet object contains basic details about the i18n language, such as language code and human-readable name. */
      snippet?: components['schemas']['I18nLanguageSnippet'];
    };
    I18nLanguageListResponse: {
      /** @description Etag of this resource. */
      etag?: string;
      /** @description Serialized EventId of the request which produced this response. */
      eventId?: string;
      /** @description A list of supported i18n languages. In this map, the i18n language ID is the map key, and its value is the corresponding i18nLanguage resource. */
      items?: components['schemas']['I18nLanguage'][];
      /**
       * @description Identifies what kind of resource this is. Value: the fixed string "youtube#i18nLanguageListResponse".
       * @default youtube#i18nLanguageListResponse
       */
      kind: string;
      /** @description The visitorId identifies the visitor. */
      visitorId?: string;
    };
    /** @description Basic details about an i18n language, such as language code and human-readable name. */
    I18nLanguageSnippet: {
      /** @description A short BCP-47 code that uniquely identifies a language. */
      hl?: string;
      /** @description The human-readable name of the language in the language itself. */
      name?: string;
    };
    /** @description A *i18nRegion* resource identifies a region where YouTube is available. */
    I18nRegion: {
      /** @description Etag of this resource. */
      etag?: string;
      /** @description The ID that YouTube uses to uniquely identify the i18n region. */
      id?: string;
      /**
       * @description Identifies what kind of resource this is. Value: the fixed string "youtube#i18nRegion".
       * @default youtube#i18nRegion
       */
      kind: string;
      /** @description The snippet object contains basic details about the i18n region, such as region code and human-readable name. */
      snippet?: components['schemas']['I18nRegionSnippet'];
    };
    I18nRegionListResponse: {
      /** @description Etag of this resource. */
      etag?: string;
      /** @description Serialized EventId of the request which produced this response. */
      eventId?: string;
      /** @description A list of regions where YouTube is available. In this map, the i18n region ID is the map key, and its value is the corresponding i18nRegion resource. */
      items?: components['schemas']['I18nRegion'][];
      /**
       * @description Identifies what kind of resource this is. Value: the fixed string "youtube#i18nRegionListResponse".
       * @default youtube#i18nRegionListResponse
       */
      kind: string;
      /** @description The visitorId identifies the visitor. */
      visitorId?: string;
    };
    /** @description Basic details about an i18n region, such as region code and human-readable name. */
    I18nRegionSnippet: {
      /** @description The region code as a 2-letter ISO country code. */
      gl?: string;
      /** @description The human-readable name of the region. */
      name?: string;
    };
    /** @description Branding properties for images associated with the channel. */
    ImageSettings: {
      /** @description The URL for the background image shown on the video watch page. The image should be 1200px by 615px, with a maximum file size of 128k. */
      backgroundImageUrl?: components['schemas']['LocalizedProperty'];
      /** @description This is generated when a ChannelBanner.Insert request has succeeded for the given channel. */
      bannerExternalUrl?: string;
      /** @description Banner image. Desktop size (1060x175). */
      bannerImageUrl?: string;
      /** @description Banner image. Mobile size high resolution (1440x395). */
      bannerMobileExtraHdImageUrl?: string;
      /** @description Banner image. Mobile size high resolution (1280x360). */
      bannerMobileHdImageUrl?: string;
      /** @description Banner image. Mobile size (640x175). */
      bannerMobileImageUrl?: string;
      /** @description Banner image. Mobile size low resolution (320x88). */
      bannerMobileLowImageUrl?: string;
      /** @description Banner image. Mobile size medium/high resolution (960x263). */
      bannerMobileMediumHdImageUrl?: string;
      /** @description Banner image. Tablet size extra high resolution (2560x424). */
      bannerTabletExtraHdImageUrl?: string;
      /** @description Banner image. Tablet size high resolution (2276x377). */
      bannerTabletHdImageUrl?: string;
      /** @description Banner image. Tablet size (1707x283). */
      bannerTabletImageUrl?: string;
      /** @description Banner image. Tablet size low resolution (1138x188). */
      bannerTabletLowImageUrl?: string;
      /** @description Banner image. TV size high resolution (1920x1080). */
      bannerTvHighImageUrl?: string;
      /** @description Banner image. TV size extra high resolution (2120x1192). */
      bannerTvImageUrl?: string;
      /** @description Banner image. TV size low resolution (854x480). */
      bannerTvLowImageUrl?: string;
      /** @description Banner image. TV size medium resolution (1280x720). */
      bannerTvMediumImageUrl?: string;
      /** @description The image map script for the large banner image. */
      largeBrandedBannerImageImapScript?: components['schemas']['LocalizedProperty'];
      /** @description The URL for the 854px by 70px image that appears below the video player in the expanded video view of the video watch page. */
      largeBrandedBannerImageUrl?: components['schemas']['LocalizedProperty'];
      /** @description The image map script for the small banner image. */
      smallBrandedBannerImageImapScript?: components['schemas']['LocalizedProperty'];
      /** @description The URL for the 640px by 70px banner image that appears below the video player in the default view of the video watch page. The URL for the image that appears above the top-left corner of the video player. This is a 25-pixel-high image with a flexible width that cannot exceed 170 pixels. */
      smallBrandedBannerImageUrl?: components['schemas']['LocalizedProperty'];
      /** @description The URL for a 1px by 1px tracking pixel that can be used to collect statistics for views of the channel or video pages. */
      trackingImageUrl?: string;
      watchIconImageUrl?: string;
    };
    /** @description Describes information necessary for ingesting an RTMP, HTTP, or SRT stream. */
    IngestionInfo: {
      /** @description The backup ingestion URL that you should use to stream video to YouTube. You have the option of simultaneously streaming the content that you are sending to the ingestionAddress to this URL. */
      backupIngestionAddress?: string;
      /** @description The primary ingestion URL that you should use to stream video to YouTube. You must stream video to this URL. Depending on which application or tool you use to encode your video stream, you may need to enter the stream URL and stream name separately or you may need to concatenate them in the following format: *STREAM_URL/STREAM_NAME* */
      ingestionAddress?: string;
      /** @description This ingestion url may be used instead of backupIngestionAddress in order to stream via RTMPS. Not applicable to non-RTMP streams. */
      rtmpsBackupIngestionAddress?: string;
      /** @description This ingestion url may be used instead of ingestionAddress in order to stream via RTMPS. Not applicable to non-RTMP streams. */
      rtmpsIngestionAddress?: string;
      /** @description The stream name that YouTube assigns to the video stream. */
      streamName?: string;
    };
    /** @description LINT.IfChange Describes an invideo branding. */
    InvideoBranding: {
      /**
       * Format: byte
       * @description The bytes the uploaded image. Only used in api to youtube communication.
       */
      imageBytes?: string;
      /** @description The url of the uploaded image. Only used in apiary to api communication. */
      imageUrl?: string;
      /** @description The spatial position within the video where the branding watermark will be displayed. */
      position?: components['schemas']['InvideoPosition'];
      /** @description The channel to which this branding links. If not present it defaults to the current channel. */
      targetChannelId?: string;
      /** @description The temporal position within the video where watermark will be displayed. */
      timing?: components['schemas']['InvideoTiming'];
    };
    /** @description Describes the spatial position of a visual widget inside a video. It is a union of various position types, out of which only will be set one. */
    InvideoPosition: {
      /**
       * @description Describes in which corner of the video the visual widget will appear.
       * @enum {string}
       */
      cornerPosition?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
      /**
       * @description Defines the position type.
       * @enum {string}
       */
      type?: 'corner';
    };
    /** @description Describes a temporal position of a visual widget inside a video. */
    InvideoTiming: {
      /**
       * Format: uint64
       * @description Defines the duration in milliseconds for which the promotion should be displayed. If missing, the client should use the default.
       */
      durationMs?: string;
      /**
       * Format: uint64
       * @description Defines the time at which the promotion will appear. Depending on the value of type the value of the offsetMs field will represent a time offset from the start or from the end of the video, expressed in milliseconds.
       */
      offsetMs?: string;
      /**
       * @description Describes a timing type. If the value is offsetFromStart, then the offsetMs field represents an offset from the start of the video. If the value is offsetFromEnd, then the offsetMs field represents an offset from the end of the video.
       * @enum {string}
       */
      type?: 'offsetFromStart' | 'offsetFromEnd';
    };
    LanguageTag: {
      value?: string;
    };
    LevelDetails: {
      /** @description The name that should be used when referring to this level. */
      displayName?: string;
    };
    /** @description A *liveBroadcast* resource represents an event that will be streamed, via live video, on YouTube. */
    LiveBroadcast: {
      /** @description The contentDetails object contains information about the event's video content, such as whether the content can be shown in an embedded video player or if it will be archived and therefore available for viewing after the event has concluded. */
      contentDetails?: components['schemas']['LiveBroadcastContentDetails'];
      /** @description Etag of this resource. */
      etag?: string;
      /** @description The ID that YouTube assigns to uniquely identify the broadcast. */
      id?: string;
      /**
       * @description Identifies what kind of resource this is. Value: the fixed string "youtube#liveBroadcast".
       * @default youtube#liveBroadcast
       */
      kind: string;
      /** @description The snippet object contains basic details about the event, including its title, description, start time, and end time. */
      snippet?: components['schemas']['LiveBroadcastSnippet'];
      /** @description The statistics object contains info about the event's current stats. These include concurrent viewers and total chat count. Statistics can change (in either direction) during the lifetime of an event. Statistics are only returned while the event is live. */
      statistics?: components['schemas']['LiveBroadcastStatistics'];
      /** @description The status object contains information about the event's status. */
      status?: components['schemas']['LiveBroadcastStatus'];
    };
    /** @description Detailed settings of a broadcast. */
    LiveBroadcastContentDetails: {
      /** @description This value uniquely identifies the live stream bound to the broadcast. */
      boundStreamId?: string;
      /**
       * Format: date-time
       * @description The date and time that the live stream referenced by boundStreamId was last updated.
       */
      boundStreamLastUpdateTimeMs?: string;
      /** @enum {string} */
      closedCaptionsType?:
        | 'closedCaptionsTypeUnspecified'
        | 'closedCaptionsDisabled'
        | 'closedCaptionsHttpPost'
        | 'closedCaptionsEmbedded';
      /** @description This setting indicates whether auto start is enabled for this broadcast. The default value for this property is false. This setting can only be used by Events. */
      enableAutoStart?: boolean;
      /** @description This setting indicates whether auto stop is enabled for this broadcast. The default value for this property is false. This setting can only be used by Events. */
      enableAutoStop?: boolean;
      /** @description This setting indicates whether HTTP POST closed captioning is enabled for this broadcast. The ingestion URL of the closed captions is returned through the liveStreams API. This is mutually exclusive with using the closed_captions_type property, and is equivalent to setting closed_captions_type to CLOSED_CAPTIONS_HTTP_POST. */
      enableClosedCaptions?: boolean;
      /** @description This setting indicates whether YouTube should enable content encryption for the broadcast. */
      enableContentEncryption?: boolean;
      /** @description This setting determines whether viewers can access DVR controls while watching the video. DVR controls enable the viewer to control the video playback experience by pausing, rewinding, or fast forwarding content. The default value for this property is true. *Important:* You must set the value to true and also set the enableArchive property's value to true if you want to make playback available immediately after the broadcast ends. */
      enableDvr?: boolean;
      /** @description This setting indicates whether the broadcast video can be played in an embedded player. If you choose to archive the video (using the enableArchive property), this setting will also apply to the archived video. */
      enableEmbed?: boolean;
      /** @description Indicates whether this broadcast has low latency enabled. */
      enableLowLatency?: boolean;
      /**
       * @description If both this and enable_low_latency are set, they must match. LATENCY_NORMAL should match enable_low_latency=false LATENCY_LOW should match enable_low_latency=true LATENCY_ULTRA_LOW should have enable_low_latency omitted.
       * @enum {string}
       */
      latencyPreference?:
        | 'latencyPreferenceUnspecified'
        | 'normal'
        | 'low'
        | 'ultraLow';
      /**
       * Format: byte
       * @description The mesh for projecting the video if projection is mesh. The mesh value must be a UTF-8 string containing the base-64 encoding of 3D mesh data that follows the Spherical Video V2 RFC specification for an mshp box, excluding the box size and type but including the following four reserved zero bytes for the version and flags.
       */
      mesh?: string;
      /** @description The monitorStream object contains information about the monitor stream, which the broadcaster can use to review the event content before the broadcast stream is shown publicly. */
      monitorStream?: components['schemas']['MonitorStreamInfo'];
      /**
       * @description The projection format of this broadcast. This defaults to rectangular.
       * @enum {string}
       */
      projection?: 'projectionUnspecified' | 'rectangular' | '360' | 'mesh';
      /** @description Automatically start recording after the event goes live. The default value for this property is true. *Important:* You must also set the enableDvr property's value to true if you want the playback to be available immediately after the broadcast ends. If you set this property's value to true but do not also set the enableDvr property to true, there may be a delay of around one day before the archived video will be available for playback. */
      recordFromStart?: boolean;
      /** @description This setting indicates whether the broadcast should automatically begin with an in-stream slate when you update the broadcast's status to live. After updating the status, you then need to send a liveCuepoints.insert request that sets the cuepoint's eventState to end to remove the in-stream slate and make your broadcast stream visible to viewers. */
      startWithSlate?: boolean;
      /**
       * @description The 3D stereo layout of this broadcast. This defaults to mono.
       * @enum {string}
       */
      stereoLayout?:
        | 'stereoLayoutUnspecified'
        | 'mono'
        | 'leftRight'
        | 'topBottom';
    };
    LiveBroadcastListResponse: {
      /** @description Etag of this resource. */
      etag?: string;
      /** @description Serialized EventId of the request which produced this response. */
      eventId?: string;
      /** @description A list of broadcasts that match the request criteria. */
      items?: components['schemas']['LiveBroadcast'][];
      /**
       * @description Identifies what kind of resource this is. Value: the fixed string "youtube#liveBroadcastListResponse".
       * @default youtube#liveBroadcastListResponse
       */
      kind: string;
      /** @description The token that can be used as the value of the pageToken parameter to retrieve the next page in the result set. */
      nextPageToken?: string;
      /** @description General pagination information. */
      pageInfo?: components['schemas']['PageInfo'];
      /** @description The token that can be used as the value of the pageToken parameter to retrieve the previous page in the result set. */
      prevPageToken?: string;
      tokenPagination?: components['schemas']['TokenPagination'];
      /** @description The visitorId identifies the visitor. */
      visitorId?: string;
    };
    /** @description Basic broadcast information. */
    LiveBroadcastSnippet: {
      /**
       * Format: date-time
       * @description The date and time that the broadcast actually ended. This information is only available once the broadcast's state is complete.
       */
      actualEndTime?: string;
      /**
       * Format: date-time
       * @description The date and time that the broadcast actually started. This information is only available once the broadcast's state is live.
       */
      actualStartTime?: string;
      /** @description The ID that YouTube uses to uniquely identify the channel that is publishing the broadcast. */
      channelId?: string;
      /** @description The broadcast's description. As with the title, you can set this field by modifying the broadcast resource or by setting the description field of the corresponding video resource. */
      description?: string;
      /** @description Indicates whether this broadcast is the default broadcast. Internal only. */
      isDefaultBroadcast?: boolean;
      /** @description The id of the live chat for this broadcast. */
      liveChatId?: string;
      /**
       * Format: date-time
       * @description The date and time that the broadcast was added to YouTube's live broadcast schedule.
       */
      publishedAt?: string;
      /**
       * Format: date-time
       * @description The date and time that the broadcast is scheduled to end.
       */
      scheduledEndTime?: string;
      /**
       * Format: date-time
       * @description The date and time that the broadcast is scheduled to start.
       */
      scheduledStartTime?: string;
      /** @description A map of thumbnail images associated with the broadcast. For each nested object in this object, the key is the name of the thumbnail image, and the value is an object that contains other information about the thumbnail. */
      thumbnails?: components['schemas']['ThumbnailDetails'];
      /** @description The broadcast's title. Note that the broadcast represents exactly one YouTube video. You can set this field by modifying the broadcast resource or by setting the title field of the corresponding video resource. */
      title?: string;
    };
    /** @description Statistics about the live broadcast. These represent a snapshot of the values at the time of the request. Statistics are only returned for live broadcasts. */
    LiveBroadcastStatistics: {
      /**
       * Format: uint64
       * @description The number of viewers currently watching the broadcast. The property and its value will be present if the broadcast has current viewers and the broadcast owner has not hidden the viewcount for the video. Note that YouTube stops tracking the number of concurrent viewers for a broadcast when the broadcast ends. So, this property would not identify the number of viewers watching an archived video of a live broadcast that already ended.
       */
      concurrentViewers?: string;
    };
    /** @description Live broadcast state. */
    LiveBroadcastStatus: {
      /**
       * @description The broadcast's status. The status can be updated using the API's liveBroadcasts.transition method.
       * @enum {string}
       */
      lifeCycleStatus?:
        | 'lifeCycleStatusUnspecified'
        | 'created'
        | 'ready'
        | 'testing'
        | 'live'
        | 'complete'
        | 'revoked'
        | 'testStarting'
        | 'liveStarting';
      /**
       * @description Priority of the live broadcast event (internal state).
       * @enum {string}
       */
      liveBroadcastPriority?:
        | 'liveBroadcastPriorityUnspecified'
        | 'low'
        | 'normal'
        | 'high';
      /** @description Whether the broadcast is made for kids or not, decided by YouTube instead of the creator. This field is read only. */
      madeForKids?: boolean;
      /**
       * @description The broadcast's privacy status. Note that the broadcast represents exactly one YouTube video, so the privacy settings are identical to those supported for videos. In addition, you can set this field by modifying the broadcast resource or by setting the privacyStatus field of the corresponding video resource.
       * @enum {string}
       */
      privacyStatus?: 'public' | 'unlisted' | 'private';
      /**
       * @description The broadcast's recording status.
       * @enum {string}
       */
      recordingStatus?:
        | 'liveBroadcastRecordingStatusUnspecified'
        | 'notRecording'
        | 'recording'
        | 'recorded';
      /** @description This field will be set to True if the creator declares the broadcast to be kids only: go/live-cw-work. */
      selfDeclaredMadeForKids?: boolean;
    };
    /** @description A `__liveChatBan__` resource represents a ban for a YouTube live chat. */
    LiveChatBan: {
      /** @description Etag of this resource. */
      etag?: string;
      /** @description The ID that YouTube assigns to uniquely identify the ban. */
      id?: string;
      /**
       * @description Identifies what kind of resource this is. Value: the fixed string `"youtube#liveChatBan"`.
       * @default youtube#liveChatBan
       */
      kind: string;
      /** @description The `snippet` object contains basic details about the ban. */
      snippet?: components['schemas']['LiveChatBanSnippet'];
    };
    LiveChatBanSnippet: {
      /**
       * Format: uint64
       * @description The duration of a ban, only filled if the ban has type TEMPORARY.
       */
      banDurationSeconds?: string;
      bannedUserDetails?: components['schemas']['ChannelProfileDetails'];
      /** @description The chat this ban is pertinent to. */
      liveChatId?: string;
      /**
       * @description The type of ban.
       * @enum {string}
       */
      type?: 'liveChatBanTypeUnspecified' | 'permanent' | 'temporary';
    };
    LiveChatFanFundingEventDetails: {
      /** @description A rendered string that displays the fund amount and currency to the user. */
      amountDisplayString?: string;
      /**
       * Format: uint64
       * @description The amount of the fund.
       */
      amountMicros?: string;
      /** @description The currency in which the fund was made. */
      currency?: string;
      /** @description The comment added by the user to this fan funding event. */
      userComment?: string;
    };
    LiveChatGiftMembershipReceivedDetails: {
      /** @description The ID of the membership gifting message that is related to this gift membership. This ID will always refer to a message whose type is 'membershipGiftingEvent'. */
      associatedMembershipGiftingMessageId?: string;
      /** @description The ID of the user that made the membership gifting purchase. This matches the `snippet.authorChannelId` of the associated membership gifting message. */
      gifterChannelId?: string;
      /** @description The name of the Level at which the viewer is a member. This matches the `snippet.membershipGiftingDetails.giftMembershipsLevelName` of the associated membership gifting message. The Level names are defined by the YouTube channel offering the Membership. In some situations this field isn't filled. */
      memberLevelName?: string;
    };
    LiveChatMemberMilestoneChatDetails: {
      /** @description The name of the Level at which the viever is a member. The Level names are defined by the YouTube channel offering the Membership. In some situations this field isn't filled. */
      memberLevelName?: string;
      /**
       * Format: uint32
       * @description The total amount of months (rounded up) the viewer has been a member that granted them this Member Milestone Chat. This is the same number of months as is being displayed to YouTube users.
       */
      memberMonth?: number;
      /** @description The comment added by the member to this Member Milestone Chat. This field is empty for messages without a comment from the member. */
      userComment?: string;
    };
    LiveChatMembershipGiftingDetails: {
      /**
       * Format: int32
       * @description The number of gift memberships purchased by the user.
       */
      giftMembershipsCount?: number;
      /** @description The name of the level of the gift memberships purchased by the user. The Level names are defined by the YouTube channel offering the Membership. In some situations this field isn't filled. */
      giftMembershipsLevelName?: string;
    };
    /** @description A *liveChatMessage* resource represents a chat message in a YouTube Live Chat. */
    LiveChatMessage: {
      /** @description The authorDetails object contains basic details about the user that posted this message. */
      authorDetails?: components['schemas']['LiveChatMessageAuthorDetails'];
      /** @description Etag of this resource. */
      etag?: string;
      /** @description The ID that YouTube assigns to uniquely identify the message. */
      id?: string;
      /**
       * @description Identifies what kind of resource this is. Value: the fixed string "youtube#liveChatMessage".
       * @default youtube#liveChatMessage
       */
      kind: string;
      /** @description The snippet object contains basic details about the message. */
      snippet?: components['schemas']['LiveChatMessageSnippet'];
    };
    LiveChatMessageAuthorDetails: {
      /** @description The YouTube channel ID. */
      channelId?: string;
      /** @description The channel's URL. */
      channelUrl?: string;
      /** @description The channel's display name. */
      displayName?: string;
      /** @description Whether the author is a moderator of the live chat. */
      isChatModerator?: boolean;
      /** @description Whether the author is the owner of the live chat. */
      isChatOwner?: boolean;
      /** @description Whether the author is a sponsor of the live chat. */
      isChatSponsor?: boolean;
      /** @description Whether the author's identity has been verified by YouTube. */
      isVerified?: boolean;
      /** @description The channels's avatar URL. */
      profileImageUrl?: string;
    };
    LiveChatMessageDeletedDetails: {
      deletedMessageId?: string;
    };
    LiveChatMessageListResponse: {
      /** @description Etag of this resource. */
      etag?: string;
      /** @description Serialized EventId of the request which produced this response. */
      eventId?: string;
      items?: components['schemas']['LiveChatMessage'][];
      /**
       * @description Identifies what kind of resource this is. Value: the fixed string "youtube#liveChatMessageListResponse".
       * @default youtube#liveChatMessageListResponse
       */
      kind: string;
      nextPageToken?: string;
      /**
       * Format: date-time
       * @description The date and time when the underlying stream went offline.
       */
      offlineAt?: string;
      /** @description General pagination information. */
      pageInfo?: components['schemas']['PageInfo'];
      /**
       * Format: uint32
       * @description The amount of time the client should wait before polling again.
       */
      pollingIntervalMillis?: number;
      tokenPagination?: components['schemas']['TokenPagination'];
      /** @description The visitorId identifies the visitor. */
      visitorId?: string;
    };
    LiveChatMessageRetractedDetails: {
      retractedMessageId?: string;
    };
    /** @description Next ID: 33 */
    LiveChatMessageSnippet: {
      /** @description The ID of the user that authored this message, this field is not always filled. textMessageEvent - the user that wrote the message fanFundingEvent - the user that funded the broadcast newSponsorEvent - the user that just became a sponsor memberMilestoneChatEvent - the member that sent the message membershipGiftingEvent - the user that made the purchase giftMembershipReceivedEvent - the user that received the gift membership messageDeletedEvent - the moderator that took the action messageRetractedEvent - the author that retracted their message userBannedEvent - the moderator that took the action superChatEvent - the user that made the purchase superStickerEvent - the user that made the purchase */
      authorChannelId?: string;
      /** @description Contains a string that can be displayed to the user. If this field is not present the message is silent, at the moment only messages of type TOMBSTONE and CHAT_ENDED_EVENT are silent. */
      displayMessage?: string;
      /** @description Details about the funding event, this is only set if the type is 'fanFundingEvent'. */
      fanFundingEventDetails?: components['schemas']['LiveChatFanFundingEventDetails'];
      /** @description Details about the Gift Membership Received event, this is only set if the type is 'giftMembershipReceivedEvent'. */
      giftMembershipReceivedDetails?: components['schemas']['LiveChatGiftMembershipReceivedDetails'];
      /** @description Whether the message has display content that should be displayed to users. */
      hasDisplayContent?: boolean;
      liveChatId?: string;
      /** @description Details about the Member Milestone Chat event, this is only set if the type is 'memberMilestoneChatEvent'. */
      memberMilestoneChatDetails?: components['schemas']['LiveChatMemberMilestoneChatDetails'];
      /** @description Details about the Membership Gifting event, this is only set if the type is 'membershipGiftingEvent'. */
      membershipGiftingDetails?: components['schemas']['LiveChatMembershipGiftingDetails'];
      messageDeletedDetails?: components['schemas']['LiveChatMessageDeletedDetails'];
      messageRetractedDetails?: components['schemas']['LiveChatMessageRetractedDetails'];
      /** @description Details about the New Member Announcement event, this is only set if the type is 'newSponsorEvent'. Please note that "member" is the new term for "sponsor". */
      newSponsorDetails?: components['schemas']['LiveChatNewSponsorDetails'];
      /**
       * Format: date-time
       * @description The date and time when the message was orignally published.
       */
      publishedAt?: string;
      /** @description Details about the Super Chat event, this is only set if the type is 'superChatEvent'. */
      superChatDetails?: components['schemas']['LiveChatSuperChatDetails'];
      /** @description Details about the Super Sticker event, this is only set if the type is 'superStickerEvent'. */
      superStickerDetails?: components['schemas']['LiveChatSuperStickerDetails'];
      /** @description Details about the text message, this is only set if the type is 'textMessageEvent'. */
      textMessageDetails?: components['schemas']['LiveChatTextMessageDetails'];
      /**
       * @description The type of message, this will always be present, it determines the contents of the message as well as which fields will be present.
       * @enum {string}
       */
      type?:
        | 'invalidType'
        | 'textMessageEvent'
        | 'tombstone'
        | 'fanFundingEvent'
        | 'chatEndedEvent'
        | 'sponsorOnlyModeStartedEvent'
        | 'sponsorOnlyModeEndedEvent'
        | 'newSponsorEvent'
        | 'memberMilestoneChatEvent'
        | 'membershipGiftingEvent'
        | 'giftMembershipReceivedEvent'
        | 'messageDeletedEvent'
        | 'messageRetractedEvent'
        | 'userBannedEvent'
        | 'superChatEvent'
        | 'superStickerEvent';
      userBannedDetails?: components['schemas']['LiveChatUserBannedMessageDetails'];
    };
    /** @description A *liveChatModerator* resource represents a moderator for a YouTube live chat. A chat moderator has the ability to ban/unban users from a chat, remove message, etc. */
    LiveChatModerator: {
      /** @description Etag of this resource. */
      etag?: string;
      /** @description The ID that YouTube assigns to uniquely identify the moderator. */
      id?: string;
      /**
       * @description Identifies what kind of resource this is. Value: the fixed string "youtube#liveChatModerator".
       * @default youtube#liveChatModerator
       */
      kind: string;
      /** @description The snippet object contains basic details about the moderator. */
      snippet?: components['schemas']['LiveChatModeratorSnippet'];
    };
    LiveChatModeratorListResponse: {
      /** @description Etag of this resource. */
      etag?: string;
      /** @description Serialized EventId of the request which produced this response. */
      eventId?: string;
      /** @description A list of moderators that match the request criteria. */
      items?: components['schemas']['LiveChatModerator'][];
      /**
       * @description Identifies what kind of resource this is. Value: the fixed string "youtube#liveChatModeratorListResponse".
       * @default youtube#liveChatModeratorListResponse
       */
      kind: string;
      /** @description The token that can be used as the value of the pageToken parameter to retrieve the next page in the result set. */
      nextPageToken?: string;
      /** @description General pagination information. */
      pageInfo?: components['schemas']['PageInfo'];
      /** @description The token that can be used as the value of the pageToken parameter to retrieve the previous page in the result set. */
      prevPageToken?: string;
      tokenPagination?: components['schemas']['TokenPagination'];
      /** @description The visitorId identifies the visitor. */
      visitorId?: string;
    };
    LiveChatModeratorSnippet: {
      /** @description The ID of the live chat this moderator can act on. */
      liveChatId?: string;
      /** @description Details about the moderator. */
      moderatorDetails?: components['schemas']['ChannelProfileDetails'];
    };
    LiveChatNewSponsorDetails: {
      /** @description If the viewer just had upgraded from a lower level. For viewers that were not members at the time of purchase, this field is false. */
      isUpgrade?: boolean;
      /** @description The name of the Level that the viewer just had joined. The Level names are defined by the YouTube channel offering the Membership. In some situations this field isn't filled. */
      memberLevelName?: string;
    };
    LiveChatSuperChatDetails: {
      /** @description A rendered string that displays the fund amount and currency to the user. */
      amountDisplayString?: string;
      /**
       * Format: uint64
       * @description The amount purchased by the user, in micros (1,750,000 micros = 1.75).
       */
      amountMicros?: string;
      /** @description The currency in which the purchase was made. */
      currency?: string;
      /**
       * Format: uint32
       * @description The tier in which the amount belongs. Lower amounts belong to lower tiers. The lowest tier is 1.
       */
      tier?: number;
      /** @description The comment added by the user to this Super Chat event. */
      userComment?: string;
    };
    LiveChatSuperStickerDetails: {
      /** @description A rendered string that displays the fund amount and currency to the user. */
      amountDisplayString?: string;
      /**
       * Format: uint64
       * @description The amount purchased by the user, in micros (1,750,000 micros = 1.75).
       */
      amountMicros?: string;
      /** @description The currency in which the purchase was made. */
      currency?: string;
      /** @description Information about the Super Sticker. */
      superStickerMetadata?: components['schemas']['SuperStickerMetadata'];
      /**
       * Format: uint32
       * @description The tier in which the amount belongs. Lower amounts belong to lower tiers. The lowest tier is 1.
       */
      tier?: number;
    };
    LiveChatTextMessageDetails: {
      /** @description The user's message. */
      messageText?: string;
    };
    LiveChatUserBannedMessageDetails: {
      /**
       * Format: uint64
       * @description The duration of the ban. This property is only present if the banType is temporary.
       */
      banDurationSeconds?: string;
      /**
       * @description The type of ban.
       * @enum {string}
       */
      banType?: 'permanent' | 'temporary';
      /** @description The details of the user that was banned. */
      bannedUserDetails?: components['schemas']['ChannelProfileDetails'];
    };
    /** @description A live stream describes a live ingestion point. */
    LiveStream: {
      /** @description The cdn object defines the live stream's content delivery network (CDN) settings. These settings provide details about the manner in which you stream your content to YouTube. */
      cdn?: components['schemas']['CdnSettings'];
      /** @description The content_details object contains information about the stream, including the closed captions ingestion URL. */
      contentDetails?: components['schemas']['LiveStreamContentDetails'];
      /** @description Etag of this resource. */
      etag?: string;
      /** @description The ID that YouTube assigns to uniquely identify the stream. */
      id?: string;
      /**
       * @description Identifies what kind of resource this is. Value: the fixed string "youtube#liveStream".
       * @default youtube#liveStream
       */
      kind: string;
      /** @description The snippet object contains basic details about the stream, including its channel, title, and description. */
      snippet?: components['schemas']['LiveStreamSnippet'];
      /** @description The status object contains information about live stream's status. */
      status?: components['schemas']['LiveStreamStatus'];
    };
    LiveStreamConfigurationIssue: {
      /** @description The long-form description of the issue and how to resolve it. */
      description?: string;
      /** @description The short-form reason for this issue. */
      reason?: string;
      /**
       * @description How severe this issue is to the stream.
       * @enum {string}
       */
      severity?: 'info' | 'warning' | 'error';
      /**
       * @description The kind of error happening.
       * @enum {string}
       */
      type?:
        | 'gopSizeOver'
        | 'gopSizeLong'
        | 'gopSizeShort'
        | 'openGop'
        | 'badContainer'
        | 'audioBitrateHigh'
        | 'audioBitrateLow'
        | 'audioSampleRate'
        | 'bitrateHigh'
        | 'bitrateLow'
        | 'audioCodec'
        | 'videoCodec'
        | 'noAudioStream'
        | 'noVideoStream'
        | 'multipleVideoStreams'
        | 'multipleAudioStreams'
        | 'audioTooManyChannels'
        | 'interlacedVideo'
        | 'frameRateHigh'
        | 'resolutionMismatch'
        | 'videoCodecMismatch'
        | 'videoInterlaceMismatch'
        | 'videoProfileMismatch'
        | 'videoBitrateMismatch'
        | 'framerateMismatch'
        | 'gopMismatch'
        | 'audioSampleRateMismatch'
        | 'audioStereoMismatch'
        | 'audioCodecMismatch'
        | 'audioBitrateMismatch'
        | 'videoResolutionSuboptimal'
        | 'videoResolutionUnsupported'
        | 'videoIngestionStarved'
        | 'videoIngestionFasterThanRealtime';
    };
    /** @description Detailed settings of a stream. */
    LiveStreamContentDetails: {
      /** @description The ingestion URL where the closed captions of this stream are sent. */
      closedCaptionsIngestionUrl?: string;
      /** @description Indicates whether the stream is reusable, which means that it can be bound to multiple broadcasts. It is common for broadcasters to reuse the same stream for many different broadcasts if those broadcasts occur at different times. If you set this value to false, then the stream will not be reusable, which means that it can only be bound to one broadcast. Non-reusable streams differ from reusable streams in the following ways: - A non-reusable stream can only be bound to one broadcast. - A non-reusable stream might be deleted by an automated process after the broadcast ends. - The liveStreams.list method does not list non-reusable streams if you call the method and set the mine parameter to true. The only way to use that method to retrieve the resource for a non-reusable stream is to use the id parameter to identify the stream. */
      isReusable?: boolean;
    };
    LiveStreamHealthStatus: {
      /** @description The configurations issues on this stream */
      configurationIssues?: components['schemas']['LiveStreamConfigurationIssue'][];
      /**
       * Format: uint64
       * @description The last time this status was updated (in seconds)
       */
      lastUpdateTimeSeconds?: string;
      /**
       * @description The status code of this stream
       * @enum {string}
       */
      status?: 'good' | 'ok' | 'bad' | 'noData' | 'revoked';
    };
    LiveStreamListResponse: {
      /** @description Etag of this resource. */
      etag?: string;
      /** @description Serialized EventId of the request which produced this response. */
      eventId?: string;
      /** @description A list of live streams that match the request criteria. */
      items?: components['schemas']['LiveStream'][];
      /**
       * @description Identifies what kind of resource this is. Value: the fixed string "youtube#liveStreamListResponse".
       * @default youtube#liveStreamListResponse
       */
      kind: string;
      /** @description The token that can be used as the value of the pageToken parameter to retrieve the next page in the result set. */
      nextPageToken?: string;
      pageInfo?: components['schemas']['PageInfo'];
      /** @description The token that can be used as the value of the pageToken parameter to retrieve the previous page in the result set. */
      prevPageToken?: string;
      tokenPagination?: components['schemas']['TokenPagination'];
      /** @description The visitorId identifies the visitor. */
      visitorId?: string;
    };
    LiveStreamSnippet: {
      /** @description The ID that YouTube uses to uniquely identify the channel that is transmitting the stream. */
      channelId?: string;
      /** @description The stream's description. The value cannot be longer than 10000 characters. */
      description?: string;
      isDefaultStream?: boolean;
      /**
       * Format: date-time
       * @description The date and time that the stream was created.
       */
      publishedAt?: string;
      /** @description The stream's title. The value must be between 1 and 128 characters long. */
      title?: string;
    };
    /** @description Brief description of the live stream status. */
    LiveStreamStatus: {
      /** @description The health status of the stream. */
      healthStatus?: components['schemas']['LiveStreamHealthStatus'];
      /** @enum {string} */
      streamStatus?: 'created' | 'ready' | 'active' | 'inactive' | 'error';
    };
    LocalizedProperty: {
      /** @description The language of the default property. */
      defaultLanguage?: components['schemas']['LanguageTag'];
      localized?: components['schemas']['LocalizedString'][];
    };
    LocalizedString: {
      language?: string;
      value?: string;
    };
    /** @description A *member* resource represents a member for a YouTube channel. A member provides recurring monetary support to a creator and receives special benefits. */
    Member: {
      /** @description Etag of this resource. */
      etag?: string;
      /**
       * @description Identifies what kind of resource this is. Value: the fixed string "youtube#member".
       * @default youtube#member
       */
      kind: string;
      /** @description The snippet object contains basic details about the member. */
      snippet?: components['schemas']['MemberSnippet'];
    };
    MemberListResponse: {
      /** @description Etag of this resource. */
      etag?: string;
      /** @description Serialized EventId of the request which produced this response. */
      eventId?: string;
      /** @description A list of members that match the request criteria. */
      items?: components['schemas']['Member'][];
      /**
       * @description Identifies what kind of resource this is. Value: the fixed string "youtube#memberListResponse".
       * @default youtube#memberListResponse
       */
      kind: string;
      /** @description The token that can be used as the value of the pageToken parameter to retrieve the next page in the result set. */
      nextPageToken?: string;
      pageInfo?: components['schemas']['PageInfo'];
      tokenPagination?: components['schemas']['TokenPagination'];
      /** @description The visitorId identifies the visitor. */
      visitorId?: string;
    };
    MemberSnippet: {
      /** @description The id of the channel that's offering memberships. */
      creatorChannelId?: string;
      /** @description Details about the member. */
      memberDetails?: components['schemas']['ChannelProfileDetails'];
      /** @description Details about the user's membership. */
      membershipsDetails?: components['schemas']['MembershipsDetails'];
    };
    MembershipsDetails: {
      /** @description Ids of all levels that the user has access to. This includes the currently active level and all other levels that are included because of a higher purchase. */
      accessibleLevels?: string[];
      /** @description Id of the highest level that the user has access to at the moment. */
      highestAccessibleLevel?: string;
      /** @description Display name for the highest level that the user has access to at the moment. */
      highestAccessibleLevelDisplayName?: string;
      /** @description Data about memberships duration without taking into consideration pricing levels. */
      membershipsDuration?: components['schemas']['MembershipsDuration'];
      /** @description Data about memberships duration on particular pricing levels. */
      membershipsDurationAtLevels?: components['schemas']['MembershipsDurationAtLevel'][];
    };
    MembershipsDuration: {
      /** @description The date and time when the user became a continuous member across all levels. */
      memberSince?: string;
      /**
       * Format: int32
       * @description The cumulative time the user has been a member across all levels in complete months (the time is rounded down to the nearest integer).
       */
      memberTotalDurationMonths?: number;
    };
    MembershipsDurationAtLevel: {
      /** @description Pricing level ID. */
      level?: string;
      /** @description The date and time when the user became a continuous member for the given level. */
      memberSince?: string;
      /**
       * Format: int32
       * @description The cumulative time the user has been a member for the given level in complete months (the time is rounded down to the nearest integer).
       */
      memberTotalDurationMonths?: number;
    };
    /** @description A *membershipsLevel* resource represents an offer made by YouTube creators for their fans. Users can become members of the channel by joining one of the available levels. They will provide recurring monetary support and receives special benefits. */
    MembershipsLevel: {
      /** @description Etag of this resource. */
      etag?: string;
      /** @description The ID that YouTube assigns to uniquely identify the memberships level. */
      id?: string;
      /**
       * @description Identifies what kind of resource this is. Value: the fixed string "youtube#membershipsLevelListResponse".
       * @default youtube#membershipsLevel
       */
      kind: string;
      /** @description The snippet object contains basic details about the level. */
      snippet?: components['schemas']['MembershipsLevelSnippet'];
    };
    MembershipsLevelListResponse: {
      /** @description Etag of this resource. */
      etag?: string;
      /** @description Serialized EventId of the request which produced this response. */
      eventId?: string;
      /** @description A list of pricing levels offered by a creator to the fans. */
      items?: components['schemas']['MembershipsLevel'][];
      /**
       * @description Identifies what kind of resource this is. Value: the fixed string "youtube#membershipsLevelListResponse".
       * @default youtube#membershipsLevelListResponse
       */
      kind: string;
      /** @description The visitorId identifies the visitor. */
      visitorId?: string;
    };
    MembershipsLevelSnippet: {
      /** @description The id of the channel that's offering channel memberships. */
      creatorChannelId?: string;
      /** @description Details about the pricing level. */
      levelDetails?: components['schemas']['LevelDetails'];
    };
    /** @description Settings and Info of the monitor stream */
    MonitorStreamInfo: {
      /**
       * Format: uint32
       * @description If you have set the enableMonitorStream property to true, then this property determines the length of the live broadcast delay.
       */
      broadcastStreamDelayMs?: number;
      /** @description HTML code that embeds a player that plays the monitor stream. */
      embedHtml?: string;
      /** @description This value determines whether the monitor stream is enabled for the broadcast. If the monitor stream is enabled, then YouTube will broadcast the event content on a special stream intended only for the broadcaster's consumption. The broadcaster can use the stream to review the event content and also to identify the optimal times to insert cuepoints. You need to set this value to true if you intend to have a broadcast delay for your event. *Note:* This property cannot be updated once the broadcast is in the testing or live state. */
      enableMonitorStream?: boolean;
    };
    /** @description Paging details for lists of resources, including total number of items available and number of resources returned in a single page. */
    PageInfo: {
      /**
       * Format: int32
       * @description The number of results included in the API response.
       */
      resultsPerPage?: number;
      /**
       * Format: int32
       * @description The total number of results in the result set.
       */
      totalResults?: number;
    };
    /** @description A *playlist* resource represents a YouTube playlist. A playlist is a collection of videos that can be viewed sequentially and shared with other users. A playlist can contain up to 200 videos, and YouTube does not limit the number of playlists that each user creates. By default, playlists are publicly visible to other users, but playlists can be public or private. YouTube also uses playlists to identify special collections of videos for a channel, such as: - uploaded videos - favorite videos - positively rated (liked) videos - watch history - watch later To be more specific, these lists are associated with a channel, which is a collection of a person, group, or company's videos, playlists, and other YouTube information. You can retrieve the playlist IDs for each of these lists from the channel resource for a given channel. You can then use the playlistItems.list method to retrieve any of those lists. You can also add or remove items from those lists by calling the playlistItems.insert and playlistItems.delete methods. */
    Playlist: {
      /** @description The contentDetails object contains information like video count. */
      contentDetails?: components['schemas']['PlaylistContentDetails'];
      /** @description Etag of this resource. */
      etag?: string;
      /** @description The ID that YouTube uses to uniquely identify the playlist. */
      id?: string;
      /**
       * @description Identifies what kind of resource this is. Value: the fixed string "youtube#playlist".
       * @default youtube#playlist
       */
      kind: string;
      /** @description Localizations for different languages */
      localizations?: {
        [key: string]: components['schemas']['PlaylistLocalization'];
      };
      /** @description The player object contains information that you would use to play the playlist in an embedded player. */
      player?: components['schemas']['PlaylistPlayer'];
      /** @description The snippet object contains basic details about the playlist, such as its title and description. */
      snippet?: components['schemas']['PlaylistSnippet'];
      /** @description The status object contains status information for the playlist. */
      status?: components['schemas']['PlaylistStatus'];
    };
    PlaylistContentDetails: {
      /**
       * Format: uint32
       * @description The number of videos in the playlist.
       */
      itemCount?: number;
    };
    /** @description A *playlistItem* resource identifies another resource, such as a video, that is included in a playlist. In addition, the playlistItem resource contains details about the included resource that pertain specifically to how that resource is used in that playlist. YouTube uses playlists to identify special collections of videos for a channel, such as: - uploaded videos - favorite videos - positively rated (liked) videos - watch history - watch later To be more specific, these lists are associated with a channel, which is a collection of a person, group, or company's videos, playlists, and other YouTube information. You can retrieve the playlist IDs for each of these lists from the channel resource for a given channel. You can then use the playlistItems.list method to retrieve any of those lists. You can also add or remove items from those lists by calling the playlistItems.insert and playlistItems.delete methods. For example, if a user gives a positive rating to a video, you would insert that video into the liked videos playlist for that user's channel. */
    PlaylistItem: {
      /** @description The contentDetails object is included in the resource if the included item is a YouTube video. The object contains additional information about the video. */
      contentDetails?: components['schemas']['PlaylistItemContentDetails'];
      /** @description Etag of this resource. */
      etag?: string;
      /** @description The ID that YouTube uses to uniquely identify the playlist item. */
      id?: string;
      /**
       * @description Identifies what kind of resource this is. Value: the fixed string "youtube#playlistItem".
       * @default youtube#playlistItem
       */
      kind: string;
      /** @description The snippet object contains basic details about the playlist item, such as its title and position in the playlist. */
      snippet?: components['schemas']['PlaylistItemSnippet'];
      /** @description The status object contains information about the playlist item's privacy status. */
      status?: components['schemas']['PlaylistItemStatus'];
    };
    PlaylistItemContentDetails: {
      /** @description The time, measured in seconds from the start of the video, when the video should stop playing. (The playlist owner can specify the times when the video should start and stop playing when the video is played in the context of the playlist.) By default, assume that the video.endTime is the end of the video. */
      endAt?: string;
      /** @description A user-generated note for this item. */
      note?: string;
      /** @description The time, measured in seconds from the start of the video, when the video should start playing. (The playlist owner can specify the times when the video should start and stop playing when the video is played in the context of the playlist.) The default value is 0. */
      startAt?: string;
      /** @description The ID that YouTube uses to uniquely identify a video. To retrieve the video resource, set the id query parameter to this value in your API request. */
      videoId?: string;
      /**
       * Format: date-time
       * @description The date and time that the video was published to YouTube.
       */
      videoPublishedAt?: string;
    };
    PlaylistItemListResponse: {
      etag?: string;
      /** @description Serialized EventId of the request which produced this response. */
      eventId?: string;
      /** @description A list of playlist items that match the request criteria. */
      items?: components['schemas']['PlaylistItem'][];
      /**
       * @description Identifies what kind of resource this is. Value: the fixed string "youtube#playlistItemListResponse". Etag of this resource.
       * @default youtube#playlistItemListResponse
       */
      kind: string;
      /** @description The token that can be used as the value of the pageToken parameter to retrieve the next page in the result set. */
      nextPageToken?: string;
      /** @description General pagination information. */
      pageInfo?: components['schemas']['PageInfo'];
      /** @description The token that can be used as the value of the pageToken parameter to retrieve the previous page in the result set. */
      prevPageToken?: string;
      tokenPagination?: components['schemas']['TokenPagination'];
      /** @description The visitorId identifies the visitor. */
      visitorId?: string;
    };
    /** @description Basic details about a playlist, including title, description and thumbnails. Basic details of a YouTube Playlist item provided by the author. Next ID: 15 */
    PlaylistItemSnippet: {
      /** @description The ID that YouTube uses to uniquely identify the user that added the item to the playlist. */
      channelId?: string;
      /** @description Channel title for the channel that the playlist item belongs to. */
      channelTitle?: string;
      /** @description The item's description. */
      description?: string;
      /** @description The ID that YouTube uses to uniquely identify thGe playlist that the playlist item is in. */
      playlistId?: string;
      /**
       * Format: uint32
       * @description The order in which the item appears in the playlist. The value uses a zero-based index, so the first item has a position of 0, the second item has a position of 1, and so forth.
       */
      position?: number;
      /**
       * Format: date-time
       * @description The date and time that the item was added to the playlist.
       */
      publishedAt?: string;
      /** @description The id object contains information that can be used to uniquely identify the resource that is included in the playlist as the playlist item. */
      resourceId?: components['schemas']['ResourceId'];
      /** @description A map of thumbnail images associated with the playlist item. For each object in the map, the key is the name of the thumbnail image, and the value is an object that contains other information about the thumbnail. */
      thumbnails?: components['schemas']['ThumbnailDetails'];
      /** @description The item's title. */
      title?: string;
      /** @description Channel id for the channel this video belongs to. */
      videoOwnerChannelId?: string;
      /** @description Channel title for the channel this video belongs to. */
      videoOwnerChannelTitle?: string;
    };
    /** @description Information about the playlist item's privacy status. */
    PlaylistItemStatus: {
      /**
       * @description This resource's privacy status.
       * @enum {string}
       */
      privacyStatus?: 'public' | 'unlisted' | 'private';
    };
    PlaylistListResponse: {
      /** @description Etag of this resource. */
      etag?: string;
      /** @description Serialized EventId of the request which produced this response. */
      eventId?: string;
      /** @description A list of playlists that match the request criteria */
      items?: components['schemas']['Playlist'][];
      /**
       * @description Identifies what kind of resource this is. Value: the fixed string "youtube#playlistListResponse".
       * @default youtube#playlistListResponse
       */
      kind: string;
      /** @description The token that can be used as the value of the pageToken parameter to retrieve the next page in the result set. */
      nextPageToken?: string;
      /** @description General pagination information. */
      pageInfo?: components['schemas']['PageInfo'];
      /** @description The token that can be used as the value of the pageToken parameter to retrieve the previous page in the result set. */
      prevPageToken?: string;
      tokenPagination?: components['schemas']['TokenPagination'];
      /** @description The visitorId identifies the visitor. */
      visitorId?: string;
    };
    /** @description Playlist localization setting */
    PlaylistLocalization: {
      /** @description The localized strings for playlist's description. */
      description?: string;
      /** @description The localized strings for playlist's title. */
      title?: string;
    };
    PlaylistPlayer: {
      /** @description An <iframe> tag that embeds a player that will play the playlist. */
      embedHtml?: string;
    };
    /** @description Basic details about a playlist, including title, description and thumbnails. */
    PlaylistSnippet: {
      /** @description The ID that YouTube uses to uniquely identify the channel that published the playlist. */
      channelId?: string;
      /** @description The channel title of the channel that the video belongs to. */
      channelTitle?: string;
      /** @description The language of the playlist's default title and description. */
      defaultLanguage?: string;
      /** @description The playlist's description. */
      description?: string;
      /** @description Localized title and description, read-only. */
      localized?: components['schemas']['PlaylistLocalization'];
      /**
       * Format: date-time
       * @description The date and time that the playlist was created.
       */
      publishedAt?: string;
      /** @description Keyword tags associated with the playlist. */
      tags?: string[];
      /** @description Note: if the playlist has a custom thumbnail, this field will not be populated. The video id selected by the user that will be used as the thumbnail of this playlist. This field defaults to the first publicly viewable video in the playlist, if: 1. The user has never selected a video to be the thumbnail of the playlist. 2. The user selects a video to be the thumbnail, and then removes that video from the playlist. 3. The user selects a non-owned video to be the thumbnail, but that video becomes private, or gets deleted. */
      thumbnailVideoId?: string;
      /** @description A map of thumbnail images associated with the playlist. For each object in the map, the key is the name of the thumbnail image, and the value is an object that contains other information about the thumbnail. */
      thumbnails?: components['schemas']['ThumbnailDetails'];
      /** @description The playlist's title. */
      title?: string;
    };
    PlaylistStatus: {
      /**
       * @description The playlist's privacy status.
       * @enum {string}
       */
      privacyStatus?: 'public' | 'unlisted' | 'private';
    };
    /** @description A pair Property / Value. */
    PropertyValue: {
      /** @description A property. */
      property?: string;
      /** @description The property's value. */
      value?: string;
    };
    RelatedEntity: {
      entity?: components['schemas']['Entity'];
    };
    /** @description A resource id is a generic reference that points to another YouTube resource. */
    ResourceId: {
      /** @description The ID that YouTube uses to uniquely identify the referred resource, if that resource is a channel. This property is only present if the resourceId.kind value is youtube#channel. */
      channelId?: string;
      /** @description The type of the API resource. */
      kind?: string;
      /** @description The ID that YouTube uses to uniquely identify the referred resource, if that resource is a playlist. This property is only present if the resourceId.kind value is youtube#playlist. */
      playlistId?: string;
      /** @description The ID that YouTube uses to uniquely identify the referred resource, if that resource is a video. This property is only present if the resourceId.kind value is youtube#video. */
      videoId?: string;
    };
    SearchListResponse: {
      /** @description Etag of this resource. */
      etag?: string;
      /** @description Serialized EventId of the request which produced this response. */
      eventId?: string;
      /** @description Pagination information for token pagination. */
      items?: components['schemas']['SearchResult'][];
      /**
       * @description Identifies what kind of resource this is. Value: the fixed string "youtube#searchListResponse".
       * @default youtube#searchListResponse
       */
      kind: string;
      /** @description The token that can be used as the value of the pageToken parameter to retrieve the next page in the result set. */
      nextPageToken?: string;
      /** @description General pagination information. */
      pageInfo?: components['schemas']['PageInfo'];
      /** @description The token that can be used as the value of the pageToken parameter to retrieve the previous page in the result set. */
      prevPageToken?: string;
      regionCode?: string;
      tokenPagination?: components['schemas']['TokenPagination'];
      /** @description The visitorId identifies the visitor. */
      visitorId?: string;
    };
    /** @description A search result contains information about a YouTube video, channel, or playlist that matches the search parameters specified in an API request. While a search result points to a uniquely identifiable resource, like a video, it does not have its own persistent data. */
    SearchResult: {
      /** @description Etag of this resource. */
      etag?: string;
      /** @description The id object contains information that can be used to uniquely identify the resource that matches the search request. */
      id?: components['schemas']['ResourceId'];
      /**
       * @description Identifies what kind of resource this is. Value: the fixed string "youtube#searchResult".
       * @default youtube#searchResult
       */
      kind: string;
      /** @description The snippet object contains basic details about a search result, such as its title or description. For example, if the search result is a video, then the title will be the video's title and the description will be the video's description. */
      snippet?: components['schemas']['SearchResultSnippet'];
    };
    /** @description Basic details about a search result, including title, description and thumbnails of the item referenced by the search result. */
    SearchResultSnippet: {
      /** @description The value that YouTube uses to uniquely identify the channel that published the resource that the search result identifies. */
      channelId?: string;
      /** @description The title of the channel that published the resource that the search result identifies. */
      channelTitle?: string;
      /** @description A description of the search result. */
      description?: string;
      /**
       * @description It indicates if the resource (video or channel) has upcoming/active live broadcast content. Or it's "none" if there is not any upcoming/active live broadcasts.
       * @enum {string}
       */
      liveBroadcastContent?: 'none' | 'upcoming' | 'live' | 'completed';
      /**
       * Format: date-time
       * @description The creation date and time of the resource that the search result identifies.
       */
      publishedAt?: string;
      /** @description A map of thumbnail images associated with the search result. For each object in the map, the key is the name of the thumbnail image, and the value is an object that contains other information about the thumbnail. */
      thumbnails?: components['schemas']['ThumbnailDetails'];
      /** @description The title of the search result. */
      title?: string;
    };
    /** @description A *subscription* resource contains information about a YouTube user subscription. A subscription notifies a user when new videos are added to a channel or when another user takes one of several actions on YouTube, such as uploading a video, rating a video, or commenting on a video. */
    Subscription: {
      /** @description The contentDetails object contains basic statistics about the subscription. */
      contentDetails?: components['schemas']['SubscriptionContentDetails'];
      /** @description Etag of this resource. */
      etag?: string;
      /** @description The ID that YouTube uses to uniquely identify the subscription. */
      id?: string;
      /**
       * @description Identifies what kind of resource this is. Value: the fixed string "youtube#subscription".
       * @default youtube#subscription
       */
      kind: string;
      /** @description The snippet object contains basic details about the subscription, including its title and the channel that the user subscribed to. */
      snippet?: components['schemas']['SubscriptionSnippet'];
      /** @description The subscriberSnippet object contains basic details about the subscriber. */
      subscriberSnippet?: components['schemas']['SubscriptionSubscriberSnippet'];
    };
    /** @description Details about the content to witch a subscription refers. */
    SubscriptionContentDetails: {
      /**
       * @description The type of activity this subscription is for (only uploads, everything).
       * @enum {string}
       */
      activityType?: 'subscriptionActivityTypeUnspecified' | 'all' | 'uploads';
      /**
       * Format: uint32
       * @description The number of new items in the subscription since its content was last read.
       */
      newItemCount?: number;
      /**
       * Format: uint32
       * @description The approximate number of items that the subscription points to.
       */
      totalItemCount?: number;
    };
    SubscriptionListResponse: {
      /** @description Etag of this resource. */
      etag?: string;
      /** @description Serialized EventId of the request which produced this response. */
      eventId?: string;
      /** @description A list of subscriptions that match the request criteria. */
      items?: components['schemas']['Subscription'][];
      /**
       * @description Identifies what kind of resource this is. Value: the fixed string "youtube#subscriptionListResponse".
       * @default youtube#subscriptionListResponse
       */
      kind: string;
      /** @description The token that can be used as the value of the pageToken parameter to retrieve the next page in the result set. */
      nextPageToken?: string;
      pageInfo?: components['schemas']['PageInfo'];
      /** @description The token that can be used as the value of the pageToken parameter to retrieve the previous page in the result set. */
      prevPageToken?: string;
      tokenPagination?: components['schemas']['TokenPagination'];
      /** @description The visitorId identifies the visitor. */
      visitorId?: string;
    };
    /** @description Basic details about a subscription, including title, description and thumbnails of the subscribed item. */
    SubscriptionSnippet: {
      /** @description The ID that YouTube uses to uniquely identify the subscriber's channel. */
      channelId?: string;
      /** @description Channel title for the channel that the subscription belongs to. */
      channelTitle?: string;
      /** @description The subscription's details. */
      description?: string;
      /**
       * Format: date-time
       * @description The date and time that the subscription was created.
       */
      publishedAt?: string;
      /** @description The id object contains information about the channel that the user subscribed to. */
      resourceId?: components['schemas']['ResourceId'];
      /** @description A map of thumbnail images associated with the video. For each object in the map, the key is the name of the thumbnail image, and the value is an object that contains other information about the thumbnail. */
      thumbnails?: components['schemas']['ThumbnailDetails'];
      /** @description The subscription's title. */
      title?: string;
    };
    /** @description Basic details about a subscription's subscriber including title, description, channel ID and thumbnails. */
    SubscriptionSubscriberSnippet: {
      /** @description The channel ID of the subscriber. */
      channelId?: string;
      /** @description The description of the subscriber. */
      description?: string;
      /** @description Thumbnails for this subscriber. */
      thumbnails?: components['schemas']['ThumbnailDetails'];
      /** @description The title of the subscriber. */
      title?: string;
    };
    /** @description A `__superChatEvent__` resource represents a Super Chat purchase on a YouTube channel. */
    SuperChatEvent: {
      /** @description Etag of this resource. */
      etag?: string;
      /** @description The ID that YouTube assigns to uniquely identify the Super Chat event. */
      id?: string;
      /**
       * @description Identifies what kind of resource this is. Value: the fixed string `"youtube#superChatEvent"`.
       * @default youtube#superChatEvent
       */
      kind: string;
      /** @description The `snippet` object contains basic details about the Super Chat event. */
      snippet?: components['schemas']['SuperChatEventSnippet'];
    };
    SuperChatEventListResponse: {
      /** @description Etag of this resource. */
      etag?: string;
      /** @description Serialized EventId of the request which produced this response. */
      eventId?: string;
      /** @description A list of Super Chat purchases that match the request criteria. */
      items?: components['schemas']['SuperChatEvent'][];
      /**
       * @description Identifies what kind of resource this is. Value: the fixed string "youtube#superChatEventListResponse".
       * @default youtube#superChatEventListResponse
       */
      kind: string;
      /** @description The token that can be used as the value of the pageToken parameter to retrieve the next page in the result set. */
      nextPageToken?: string;
      pageInfo?: components['schemas']['PageInfo'];
      tokenPagination?: components['schemas']['TokenPagination'];
      /** @description The visitorId identifies the visitor. */
      visitorId?: string;
    };
    SuperChatEventSnippet: {
      /**
       * Format: uint64
       * @description The purchase amount, in micros of the purchase currency. e.g., 1 is represented as 1000000.
       */
      amountMicros?: string;
      /** @description Channel id where the event occurred. */
      channelId?: string;
      /** @description The text contents of the comment left by the user. */
      commentText?: string;
      /**
       * Format: date-time
       * @description The date and time when the event occurred.
       */
      createdAt?: string;
      /** @description The currency in which the purchase was made. ISO 4217. */
      currency?: string;
      /** @description A rendered string that displays the purchase amount and currency (e.g., "$1.00"). The string is rendered for the given language. */
      displayString?: string;
      /** @description True if this event is a Super Sticker event. */
      isSuperStickerEvent?: boolean;
      /**
       * Format: uint32
       * @description The tier for the paid message, which is based on the amount of money spent to purchase the message.
       */
      messageType?: number;
      /** @description If this event is a Super Sticker event, this field will contain metadata about the Super Sticker. */
      superStickerMetadata?: components['schemas']['SuperStickerMetadata'];
      /** @description Details about the supporter. */
      supporterDetails?: components['schemas']['ChannelProfileDetails'];
    };
    SuperStickerMetadata: {
      /** @description Internationalized alt text that describes the sticker image and any animation associated with it. */
      altText?: string;
      /** @description Specifies the localization language in which the alt text is returned. */
      altTextLanguage?: string;
      /** @description Unique identifier of the Super Sticker. This is a shorter form of the alt_text that includes pack name and a recognizable characteristic of the sticker. */
      stickerId?: string;
    };
    TestItem: {
      featuredPart?: boolean;
      /** Format: int64 */
      gaia?: string;
      id?: string;
      snippet?: components['schemas']['TestItemTestItemSnippet'];
    };
    TestItemTestItemSnippet: Record<string, never>;
    /** @description A *third party account link* resource represents a link between a YouTube account or a channel and an account on a third-party service. */
    ThirdPartyLink: {
      /** @description Etag of this resource */
      etag?: string;
      /**
       * @description Identifies what kind of resource this is. Value: the fixed string "youtube#thirdPartyLink".
       * @default youtube#thirdPartyLink
       */
      kind: string;
      /** @description The linking_token identifies a YouTube account and channel with which the third party account is linked. */
      linkingToken?: string;
      /** @description The snippet object contains basic details about the third- party account link. */
      snippet?: components['schemas']['ThirdPartyLinkSnippet'];
      /** @description The status object contains information about the status of the link. */
      status?: components['schemas']['ThirdPartyLinkStatus'];
    };
    ThirdPartyLinkListResponse: {
      /** @description Etag of this resource. */
      etag?: string;
      items?: components['schemas']['ThirdPartyLink'][];
      /**
       * @description Identifies what kind of resource this is. Value: the fixed string "youtube#thirdPartyLinkListResponse".
       * @default youtube#thirdPartyLinkListResponse
       */
      kind: string;
    };
    /** @description Basic information about a third party account link, including its type and type-specific information. */
    ThirdPartyLinkSnippet: {
      /** @description Information specific to a link between a channel and a store on a merchandising platform. */
      channelToStoreLink?: components['schemas']['ChannelToStoreLinkDetails'];
      /**
       * @description Type of the link named after the entities that are being linked.
       * @enum {string}
       */
      type?: 'linkUnspecified' | 'channelToStoreLink';
    };
    /** @description The third-party link status object contains information about the status of the link. */
    ThirdPartyLinkStatus: {
      /** @enum {string} */
      linkStatus?: 'unknown' | 'failed' | 'pending' | 'linked';
    };
    /** @description A thumbnail is an image representing a YouTube resource. */
    Thumbnail: {
      /**
       * Format: uint32
       * @description (Optional) Height of the thumbnail image.
       */
      height?: number;
      /** @description The thumbnail image's URL. */
      url?: string;
      /**
       * Format: uint32
       * @description (Optional) Width of the thumbnail image.
       */
      width?: number;
    };
    /** @description Internal representation of thumbnails for a YouTube resource. */
    ThumbnailDetails: {
      /** @description The high quality image for this resource. */
      high?: components['schemas']['Thumbnail'];
      /** @description The maximum resolution quality image for this resource. */
      maxres?: components['schemas']['Thumbnail'];
      /** @description The medium quality image for this resource. */
      medium?: components['schemas']['Thumbnail'];
      /** @description The standard quality image for this resource. */
      standard?: components['schemas']['Thumbnail'];
    };
    ThumbnailSetResponse: {
      /** @description Etag of this resource. */
      etag?: string;
      /** @description Serialized EventId of the request which produced this response. */
      eventId?: string;
      /** @description A list of thumbnails. */
      items?: components['schemas']['ThumbnailDetails'][];
      /**
       * @description Identifies what kind of resource this is. Value: the fixed string "youtube#thumbnailSetResponse".
       * @default youtube#thumbnailSetResponse
       */
      kind: string;
      /** @description The visitorId identifies the visitor. */
      visitorId?: string;
    };
    /** @description Stub token pagination template to suppress results. */
    TokenPagination: Record<string, never>;
    /** @description A *video* resource represents a YouTube video. */
    Video: {
      /** @description Age restriction details related to a video. This data can only be retrieved by the video owner. */
      ageGating?: components['schemas']['VideoAgeGating'];
      /** @description The contentDetails object contains information about the video content, including the length of the video and its aspect ratio. */
      contentDetails?: components['schemas']['VideoContentDetails'];
      /** @description Etag of this resource. */
      etag?: string;
      /** @description The fileDetails object encapsulates information about the video file that was uploaded to YouTube, including the file's resolution, duration, audio and video codecs, stream bitrates, and more. This data can only be retrieved by the video owner. */
      fileDetails?: components['schemas']['VideoFileDetails'];
      /** @description The ID that YouTube uses to uniquely identify the video. */
      id?: string;
      /**
       * @description Identifies what kind of resource this is. Value: the fixed string "youtube#video".
       * @default youtube#video
       */
      kind: string;
      /** @description The liveStreamingDetails object contains metadata about a live video broadcast. The object will only be present in a video resource if the video is an upcoming, live, or completed live broadcast. */
      liveStreamingDetails?: components['schemas']['VideoLiveStreamingDetails'];
      /** @description The localizations object contains localized versions of the basic details about the video, such as its title and description. */
      localizations?: {
        [key: string]: components['schemas']['VideoLocalization'];
      };
      /** @description The monetizationDetails object encapsulates information about the monetization status of the video. */
      monetizationDetails?: components['schemas']['VideoMonetizationDetails'];
      /** @description The player object contains information that you would use to play the video in an embedded player. */
      player?: components['schemas']['VideoPlayer'];
      /** @description The processingDetails object encapsulates information about YouTube's progress in processing the uploaded video file. The properties in the object identify the current processing status and an estimate of the time remaining until YouTube finishes processing the video. This part also indicates whether different types of data or content, such as file details or thumbnail images, are available for the video. The processingProgress object is designed to be polled so that the video uploaded can track the progress that YouTube has made in processing the uploaded video file. This data can only be retrieved by the video owner. */
      processingDetails?: components['schemas']['VideoProcessingDetails'];
      /** @description The projectDetails object contains information about the project specific video metadata. b/157517979: This part was never populated after it was added. However, it sees non-zero traffic because there is generated client code in the wild that refers to it [1]. We keep this field and do NOT remove it because otherwise V3 would return an error when this part gets requested [2]. [1] https://developers.google.com/resources/api-libraries/documentation/youtube/v3/csharp/latest/classGoogle_1_1Apis_1_1YouTube_1_1v3_1_1Data_1_1VideoProjectDetails.html [2] http://google3/video/youtube/src/python/servers/data_api/common.py?l=1565-1569&rcl=344141677 */
      projectDetails?: components['schemas']['VideoProjectDetails'];
      /** @description The recordingDetails object encapsulates information about the location, date and address where the video was recorded. */
      recordingDetails?: components['schemas']['VideoRecordingDetails'];
      /** @description The snippet object contains basic details about the video, such as its title, description, and category. */
      snippet?: components['schemas']['VideoSnippet'];
      /** @description The statistics object contains statistics about the video. */
      statistics?: components['schemas']['VideoStatistics'];
      /** @description The status object contains information about the video's uploading, processing, and privacy statuses. */
      status?: components['schemas']['VideoStatus'];
      /** @description The suggestions object encapsulates suggestions that identify opportunities to improve the video quality or the metadata for the uploaded video. This data can only be retrieved by the video owner. */
      suggestions?: components['schemas']['VideoSuggestions'];
      /** @description The topicDetails object encapsulates information about Freebase topics associated with the video. */
      topicDetails?: components['schemas']['VideoTopicDetails'];
    };
    VideoAbuseReport: {
      /** @description Additional comments regarding the abuse report. */
      comments?: string;
      /** @description The language that the content was viewed in. */
      language?: string;
      /** @description The high-level, or primary, reason that the content is abusive. The value is an abuse report reason ID. */
      reasonId?: string;
      /** @description The specific, or secondary, reason that this content is abusive (if available). The value is an abuse report reason ID that is a valid secondary reason for the primary reason. */
      secondaryReasonId?: string;
      /** @description The ID that YouTube uses to uniquely identify the video. */
      videoId?: string;
    };
    /** @description A `__videoAbuseReportReason__` resource identifies a reason that a video could be reported as abusive. Video abuse report reasons are used with `video.ReportAbuse`. */
    VideoAbuseReportReason: {
      /** @description Etag of this resource. */
      etag?: string;
      /** @description The ID of this abuse report reason. */
      id?: string;
      /**
       * @description Identifies what kind of resource this is. Value: the fixed string `"youtube#videoAbuseReportReason"`.
       * @default youtube#videoAbuseReportReason
       */
      kind: string;
      /** @description The `snippet` object contains basic details about the abuse report reason. */
      snippet?: components['schemas']['VideoAbuseReportReasonSnippet'];
    };
    VideoAbuseReportReasonListResponse: {
      /** @description Etag of this resource. */
      etag?: string;
      /** @description Serialized EventId of the request which produced this response. */
      eventId?: string;
      /** @description A list of valid abuse reasons that are used with `video.ReportAbuse`. */
      items?: components['schemas']['VideoAbuseReportReason'][];
      /**
       * @description Identifies what kind of resource this is. Value: the fixed string `"youtube#videoAbuseReportReasonListResponse"`.
       * @default youtube#videoAbuseReportReasonListResponse
       */
      kind: string;
      /** @description The `visitorId` identifies the visitor. */
      visitorId?: string;
    };
    /** @description Basic details about a video category, such as its localized title. */
    VideoAbuseReportReasonSnippet: {
      /** @description The localized label belonging to this abuse report reason. */
      label?: string;
      /** @description The secondary reasons associated with this reason, if any are available. (There might be 0 or more.) */
      secondaryReasons?: components['schemas']['VideoAbuseReportSecondaryReason'][];
    };
    VideoAbuseReportSecondaryReason: {
      /** @description The ID of this abuse report secondary reason. */
      id?: string;
      /** @description The localized label for this abuse report secondary reason. */
      label?: string;
    };
    VideoAgeGating: {
      /** @description Indicates whether or not the video has alcoholic beverage content. Only users of legal purchasing age in a particular country, as identified by ICAP, can view the content. */
      alcoholContent?: boolean;
      /** @description Age-restricted trailers. For redband trailers and adult-rated video-games. Only users aged 18+ can view the content. The the field is true the content is restricted to viewers aged 18+. Otherwise The field won't be present. */
      restricted?: boolean;
      /**
       * @description Video game rating, if any.
       * @enum {string}
       */
      videoGameRating?: 'anyone' | 'm15Plus' | 'm16Plus' | 'm17Plus';
    };
    /** @description A *videoCategory* resource identifies a category that has been or could be associated with uploaded videos. */
    VideoCategory: {
      /** @description Etag of this resource. */
      etag?: string;
      /** @description The ID that YouTube uses to uniquely identify the video category. */
      id?: string;
      /**
       * @description Identifies what kind of resource this is. Value: the fixed string "youtube#videoCategory".
       * @default youtube#videoCategory
       */
      kind: string;
      /** @description The snippet object contains basic details about the video category, including its title. */
      snippet?: components['schemas']['VideoCategorySnippet'];
    };
    VideoCategoryListResponse: {
      /** @description Etag of this resource. */
      etag?: string;
      /** @description Serialized EventId of the request which produced this response. */
      eventId?: string;
      /** @description A list of video categories that can be associated with YouTube videos. In this map, the video category ID is the map key, and its value is the corresponding videoCategory resource. */
      items?: components['schemas']['VideoCategory'][];
      /**
       * @description Identifies what kind of resource this is. Value: the fixed string "youtube#videoCategoryListResponse".
       * @default youtube#videoCategoryListResponse
       */
      kind: string;
      /** @description The token that can be used as the value of the pageToken parameter to retrieve the next page in the result set. */
      nextPageToken?: string;
      /** @description General pagination information. */
      pageInfo?: components['schemas']['PageInfo'];
      /** @description The token that can be used as the value of the pageToken parameter to retrieve the previous page in the result set. */
      prevPageToken?: string;
      tokenPagination?: components['schemas']['TokenPagination'];
      /** @description The visitorId identifies the visitor. */
      visitorId?: string;
    };
    /** @description Basic details about a video category, such as its localized title. */
    VideoCategorySnippet: {
      assignable?: boolean;
      /**
       * @description The YouTube channel that created the video category.
       * @default UCBR8-60-B28hp2BmDPdntcQ
       */
      channelId: string;
      /** @description The video category's title. */
      title?: string;
    };
    /** @description Details about the content of a YouTube Video. */
    VideoContentDetails: {
      /**
       * @description The value of captions indicates whether the video has captions or not.
       * @enum {string}
       */
      caption?: 'true' | 'false';
      /** @description Specifies the ratings that the video received under various rating schemes. */
      contentRating?: components['schemas']['ContentRating'];
      /** @description The countryRestriction object contains information about the countries where a video is (or is not) viewable. */
      countryRestriction?: components['schemas']['AccessPolicy'];
      /**
       * @description The value of definition indicates whether the video is available in high definition or only in standard definition.
       * @enum {string}
       */
      definition?: 'sd' | 'hd';
      /** @description The value of dimension indicates whether the video is available in 3D or in 2D. */
      dimension?: string;
      /** @description The length of the video. The tag value is an ISO 8601 duration in the format PT#M#S, in which the letters PT indicate that the value specifies a period of time, and the letters M and S refer to length in minutes and seconds, respectively. The # characters preceding the M and S letters are both integers that specify the number of minutes (or seconds) of the video. For example, a value of PT15M51S indicates that the video is 15 minutes and 51 seconds long. */
      duration?: string;
      /** @description Indicates whether the video uploader has provided a custom thumbnail image for the video. This property is only visible to the video uploader. */
      hasCustomThumbnail?: boolean;
      /** @description The value of is_license_content indicates whether the video is licensed content. */
      licensedContent?: boolean;
      /**
       * @description Specifies the projection format of the video.
       * @enum {string}
       */
      projection?: 'rectangular' | '360';
      /** @description The regionRestriction object contains information about the countries where a video is (or is not) viewable. The object will contain either the contentDetails.regionRestriction.allowed property or the contentDetails.regionRestriction.blocked property. */
      regionRestriction?: components['schemas']['VideoContentDetailsRegionRestriction'];
    };
    /** @description DEPRECATED Region restriction of the video. */
    VideoContentDetailsRegionRestriction: {
      /** @description A list of region codes that identify countries where the video is viewable. If this property is present and a country is not listed in its value, then the video is blocked from appearing in that country. If this property is present and contains an empty list, the video is blocked in all countries. */
      allowed?: string[];
      /** @description A list of region codes that identify countries where the video is blocked. If this property is present and a country is not listed in its value, then the video is viewable in that country. If this property is present and contains an empty list, the video is viewable in all countries. */
      blocked?: string[];
    };
    /** @description Describes original video file properties, including technical details about audio and video streams, but also metadata information like content length, digitization time, or geotagging information. */
    VideoFileDetails: {
      /** @description A list of audio streams contained in the uploaded video file. Each item in the list contains detailed metadata about an audio stream. */
      audioStreams?: components['schemas']['VideoFileDetailsAudioStream'][];
      /**
       * Format: uint64
       * @description The uploaded video file's combined (video and audio) bitrate in bits per second.
       */
      bitrateBps?: string;
      /** @description The uploaded video file's container format. */
      container?: string;
      /** @description The date and time when the uploaded video file was created. The value is specified in ISO 8601 format. Currently, the following ISO 8601 formats are supported: - Date only: YYYY-MM-DD - Naive time: YYYY-MM-DDTHH:MM:SS - Time with timezone: YYYY-MM-DDTHH:MM:SS+HH:MM */
      creationTime?: string;
      /**
       * Format: uint64
       * @description The length of the uploaded video in milliseconds.
       */
      durationMs?: string;
      /** @description The uploaded file's name. This field is present whether a video file or another type of file was uploaded. */
      fileName?: string;
      /**
       * Format: uint64
       * @description The uploaded file's size in bytes. This field is present whether a video file or another type of file was uploaded.
       */
      fileSize?: string;
      /**
       * @description The uploaded file's type as detected by YouTube's video processing engine. Currently, YouTube only processes video files, but this field is present whether a video file or another type of file was uploaded.
       * @enum {string}
       */
      fileType?:
        | 'video'
        | 'audio'
        | 'image'
        | 'archive'
        | 'document'
        | 'project'
        | 'other';
      /** @description A list of video streams contained in the uploaded video file. Each item in the list contains detailed metadata about a video stream. */
      videoStreams?: components['schemas']['VideoFileDetailsVideoStream'][];
    };
    /** @description Information about an audio stream. */
    VideoFileDetailsAudioStream: {
      /**
       * Format: uint64
       * @description The audio stream's bitrate, in bits per second.
       */
      bitrateBps?: string;
      /**
       * Format: uint32
       * @description The number of audio channels that the stream contains.
       */
      channelCount?: number;
      /** @description The audio codec that the stream uses. */
      codec?: string;
      /** @description A value that uniquely identifies a video vendor. Typically, the value is a four-letter vendor code. */
      vendor?: string;
    };
    /** @description Information about a video stream. */
    VideoFileDetailsVideoStream: {
      /**
       * Format: double
       * @description The video content's display aspect ratio, which specifies the aspect ratio in which the video should be displayed.
       */
      aspectRatio?: number;
      /**
       * Format: uint64
       * @description The video stream's bitrate, in bits per second.
       */
      bitrateBps?: string;
      /** @description The video codec that the stream uses. */
      codec?: string;
      /**
       * Format: double
       * @description The video stream's frame rate, in frames per second.
       */
      frameRateFps?: number;
      /**
       * Format: uint32
       * @description The encoded video content's height in pixels.
       */
      heightPixels?: number;
      /**
       * @description The amount that YouTube needs to rotate the original source content to properly display the video.
       * @enum {string}
       */
      rotation?:
        | 'none'
        | 'clockwise'
        | 'upsideDown'
        | 'counterClockwise'
        | 'other';
      /** @description A value that uniquely identifies a video vendor. Typically, the value is a four-letter vendor code. */
      vendor?: string;
      /**
       * Format: uint32
       * @description The encoded video content's width in pixels. You can calculate the video's encoding aspect ratio as width_pixels / height_pixels.
       */
      widthPixels?: number;
    };
    VideoGetRatingResponse: {
      /** @description Etag of this resource. */
      etag?: string;
      /** @description Serialized EventId of the request which produced this response. */
      eventId?: string;
      /** @description A list of ratings that match the request criteria. */
      items?: components['schemas']['VideoRating'][];
      /**
       * @description Identifies what kind of resource this is. Value: the fixed string "youtube#videoGetRatingResponse".
       * @default youtube#videoGetRatingResponse
       */
      kind: string;
      /** @description The visitorId identifies the visitor. */
      visitorId?: string;
    };
    VideoListResponse: {
      /** @description Etag of this resource. */
      etag?: string;
      /** @description Serialized EventId of the request which produced this response. */
      eventId?: string;
      items?: components['schemas']['Video'][];
      /**
       * @description Identifies what kind of resource this is. Value: the fixed string "youtube#videoListResponse".
       * @default youtube#videoListResponse
       */
      kind: string;
      /** @description The token that can be used as the value of the pageToken parameter to retrieve the next page in the result set. */
      nextPageToken?: string;
      /** @description General pagination information. */
      pageInfo?: components['schemas']['PageInfo'];
      /** @description The token that can be used as the value of the pageToken parameter to retrieve the previous page in the result set. */
      prevPageToken?: string;
      tokenPagination?: components['schemas']['TokenPagination'];
      /** @description The visitorId identifies the visitor. */
      visitorId?: string;
    };
    /** @description Details about the live streaming metadata. */
    VideoLiveStreamingDetails: {
      /** @description The ID of the currently active live chat attached to this video. This field is filled only if the video is a currently live broadcast that has live chat. Once the broadcast transitions to complete this field will be removed and the live chat closed down. For persistent broadcasts that live chat id will no longer be tied to this video but rather to the new video being displayed at the persistent page. */
      activeLiveChatId?: string;
      /**
       * Format: date-time
       * @description The time that the broadcast actually ended. This value will not be available until the broadcast is over.
       */
      actualEndTime?: string;
      /**
       * Format: date-time
       * @description The time that the broadcast actually started. This value will not be available until the broadcast begins.
       */
      actualStartTime?: string;
      /**
       * Format: uint64
       * @description The number of viewers currently watching the broadcast. The property and its value will be present if the broadcast has current viewers and the broadcast owner has not hidden the viewcount for the video. Note that YouTube stops tracking the number of concurrent viewers for a broadcast when the broadcast ends. So, this property would not identify the number of viewers watching an archived video of a live broadcast that already ended.
       */
      concurrentViewers?: string;
      /**
       * Format: date-time
       * @description The time that the broadcast is scheduled to end. If the value is empty or the property is not present, then the broadcast is scheduled to contiue indefinitely.
       */
      scheduledEndTime?: string;
      /**
       * Format: date-time
       * @description The time that the broadcast is scheduled to begin.
       */
      scheduledStartTime?: string;
    };
    /** @description Localized versions of certain video properties (e.g. title). */
    VideoLocalization: {
      /** @description Localized version of the video's description. */
      description?: string;
      /** @description Localized version of the video's title. */
      title?: string;
    };
    /** @description Details about monetization of a YouTube Video. */
    VideoMonetizationDetails: {
      /** @description The value of access indicates whether the video can be monetized or not. */
      access?: components['schemas']['AccessPolicy'];
    };
    /** @description Player to be used for a video playback. */
    VideoPlayer: {
      /** Format: int64 */
      embedHeight?: string;
      /** @description An <iframe> tag that embeds a player that will play the video. */
      embedHtml?: string;
      /**
       * Format: int64
       * @description The embed width
       */
      embedWidth?: string;
    };
    /** @description Describes processing status and progress and availability of some other Video resource parts. */
    VideoProcessingDetails: {
      /** @description This value indicates whether video editing suggestions, which might improve video quality or the playback experience, are available for the video. You can retrieve these suggestions by requesting the suggestions part in your videos.list() request. */
      editorSuggestionsAvailability?: string;
      /** @description This value indicates whether file details are available for the uploaded video. You can retrieve a video's file details by requesting the fileDetails part in your videos.list() request. */
      fileDetailsAvailability?: string;
      /**
       * @description The reason that YouTube failed to process the video. This property will only have a value if the processingStatus property's value is failed.
       * @enum {string}
       */
      processingFailureReason?:
        | 'uploadFailed'
        | 'transcodeFailed'
        | 'streamingFailed'
        | 'other';
      /** @description This value indicates whether the video processing engine has generated suggestions that might improve YouTube's ability to process the the video, warnings that explain video processing problems, or errors that cause video processing problems. You can retrieve these suggestions by requesting the suggestions part in your videos.list() request. */
      processingIssuesAvailability?: string;
      /** @description The processingProgress object contains information about the progress YouTube has made in processing the video. The values are really only relevant if the video's processing status is processing. */
      processingProgress?: components['schemas']['VideoProcessingDetailsProcessingProgress'];
      /**
       * @description The video's processing status. This value indicates whether YouTube was able to process the video or if the video is still being processed.
       * @enum {string}
       */
      processingStatus?: 'processing' | 'succeeded' | 'failed' | 'terminated';
      /** @description This value indicates whether keyword (tag) suggestions are available for the video. Tags can be added to a video's metadata to make it easier for other users to find the video. You can retrieve these suggestions by requesting the suggestions part in your videos.list() request. */
      tagSuggestionsAvailability?: string;
      /** @description This value indicates whether thumbnail images have been generated for the video. */
      thumbnailsAvailability?: string;
    };
    /** @description Video processing progress and completion time estimate. */
    VideoProcessingDetailsProcessingProgress: {
      /**
       * Format: uint64
       * @description The number of parts of the video that YouTube has already processed. You can estimate the percentage of the video that YouTube has already processed by calculating: 100 * parts_processed / parts_total Note that since the estimated number of parts could increase without a corresponding increase in the number of parts that have already been processed, it is possible that the calculated progress could periodically decrease while YouTube processes a video.
       */
      partsProcessed?: string;
      /**
       * Format: uint64
       * @description An estimate of the total number of parts that need to be processed for the video. The number may be updated with more precise estimates while YouTube processes the video.
       */
      partsTotal?: string;
      /**
       * Format: uint64
       * @description An estimate of the amount of time, in millseconds, that YouTube needs to finish processing the video.
       */
      timeLeftMs?: string;
    };
    /** @description DEPRECATED. b/157517979: This part was never populated after it was added. However, it sees non-zero traffic because there is generated client code in the wild that refers to it [1]. We keep this field and do NOT remove it because otherwise V3 would return an error when this part gets requested [2]. [1] https://developers.google.com/resources/api-libraries/documentation/youtube/v3/csharp/latest/classGoogle_1_1Apis_1_1YouTube_1_1v3_1_1Data_1_1VideoProjectDetails.html [2] http://google3/video/youtube/src/python/servers/data_api/common.py?l=1565-1569&rcl=344141677 */
    VideoProjectDetails: Record<string, never>;
    /** @description Basic details about rating of a video. */
    VideoRating: {
      /**
       * @description Rating of a video.
       * @enum {string}
       */
      rating?: 'none' | 'like' | 'dislike';
      /** @description The ID that YouTube uses to uniquely identify the video. */
      videoId?: string;
    };
    /** @description Recording information associated with the video. */
    VideoRecordingDetails: {
      /** @description The geolocation information associated with the video. */
      location?: components['schemas']['GeoPoint'];
      /** @description The text description of the location where the video was recorded. */
      locationDescription?: string;
      /**
       * Format: date-time
       * @description The date and time when the video was recorded.
       */
      recordingDate?: string;
    };
    /** @description Basic details about a video, including title, description, uploader, thumbnails and category. */
    VideoSnippet: {
      /** @description The YouTube video category associated with the video. */
      categoryId?: string;
      /** @description The ID that YouTube uses to uniquely identify the channel that the video was uploaded to. */
      channelId?: string;
      /** @description Channel title for the channel that the video belongs to. */
      channelTitle?: string;
      /** @description The default_audio_language property specifies the language spoken in the video's default audio track. */
      defaultAudioLanguage?: string;
      /** @description The language of the videos's default snippet. */
      defaultLanguage?: string;
      /** @description The video's description. @mutable youtube.videos.insert youtube.videos.update */
      description?: string;
      /**
       * @description Indicates if the video is an upcoming/active live broadcast. Or it's "none" if the video is not an upcoming/active live broadcast.
       * @enum {string}
       */
      liveBroadcastContent?: 'none' | 'upcoming' | 'live' | 'completed';
      /** @description Localized snippet selected with the hl parameter. If no such localization exists, this field is populated with the default snippet. (Read-only) */
      localized?: components['schemas']['VideoLocalization'];
      /**
       * Format: date-time
       * @description The date and time when the video was uploaded.
       */
      publishedAt?: string;
      /** @description A list of keyword tags associated with the video. Tags may contain spaces. */
      tags?: string[];
      /** @description A map of thumbnail images associated with the video. For each object in the map, the key is the name of the thumbnail image, and the value is an object that contains other information about the thumbnail. */
      thumbnails?: components['schemas']['ThumbnailDetails'];
      /** @description The video's title. @mutable youtube.videos.insert youtube.videos.update */
      title?: string;
    };
    /** @description Statistics about the video, such as the number of times the video was viewed or liked. */
    VideoStatistics: {
      /**
       * Format: uint64
       * @description The number of comments for the video.
       */
      commentCount?: string;
      /**
       * Format: uint64
       * @description The number of users who have indicated that they disliked the video by giving it a negative rating.
       */
      dislikeCount?: string;
      /**
       * Format: uint64
       * @description The number of users who currently have the video marked as a favorite video.
       */
      favoriteCount?: string;
      /**
       * Format: uint64
       * @description The number of users who have indicated that they liked the video by giving it a positive rating.
       */
      likeCount?: string;
      /**
       * Format: uint64
       * @description The number of times the video has been viewed.
       */
      viewCount?: string;
    };
    /** @description Basic details about a video category, such as its localized title. Next Id: 18 */
    VideoStatus: {
      /** @description This value indicates if the video can be embedded on another website. @mutable youtube.videos.insert youtube.videos.update */
      embeddable?: boolean;
      /**
       * @description This value explains why a video failed to upload. This property is only present if the uploadStatus property indicates that the upload failed.
       * @enum {string}
       */
      failureReason?:
        | 'conversion'
        | 'invalidFile'
        | 'emptyFile'
        | 'tooSmall'
        | 'codec'
        | 'uploadAborted';
      /**
       * @description The video's license. @mutable youtube.videos.insert youtube.videos.update
       * @enum {string}
       */
      license?: 'youtube' | 'creativeCommon';
      madeForKids?: boolean;
      /**
       * @description The video's privacy status.
       * @enum {string}
       */
      privacyStatus?: 'public' | 'unlisted' | 'private';
      /** @description This value indicates if the extended video statistics on the watch page can be viewed by everyone. Note that the view count, likes, etc will still be visible if this is disabled. @mutable youtube.videos.insert youtube.videos.update */
      publicStatsViewable?: boolean;
      /**
       * Format: date-time
       * @description The date and time when the video is scheduled to publish. It can be set only if the privacy status of the video is private..
       */
      publishAt?: string;
      /**
       * @description This value explains why YouTube rejected an uploaded video. This property is only present if the uploadStatus property indicates that the upload was rejected.
       * @enum {string}
       */
      rejectionReason?:
        | 'copyright'
        | 'inappropriate'
        | 'duplicate'
        | 'termsOfUse'
        | 'uploaderAccountSuspended'
        | 'length'
        | 'claim'
        | 'uploaderAccountClosed'
        | 'trademark'
        | 'legal';
      selfDeclaredMadeForKids?: boolean;
      /**
       * @description The status of the uploaded video.
       * @enum {string}
       */
      uploadStatus?:
        | 'uploaded'
        | 'processed'
        | 'failed'
        | 'rejected'
        | 'deleted';
    };
    /** @description Specifies suggestions on how to improve video content, including encoding hints, tag suggestions, and editor suggestions. */
    VideoSuggestions: {
      /** @description A list of video editing operations that might improve the video quality or playback experience of the uploaded video. */
      editorSuggestions?: (
        | 'videoAutoLevels'
        | 'videoStabilize'
        | 'videoCrop'
        | 'audioQuietAudioSwap'
      )[];
      /** @description A list of errors that will prevent YouTube from successfully processing the uploaded video video. These errors indicate that, regardless of the video's current processing status, eventually, that status will almost certainly be failed. */
      processingErrors?: (
        | 'audioFile'
        | 'imageFile'
        | 'projectFile'
        | 'notAVideoFile'
        | 'docFile'
        | 'archiveFile'
        | 'unsupportedSpatialAudioLayout'
      )[];
      /** @description A list of suggestions that may improve YouTube's ability to process the video. */
      processingHints?: (
        | 'nonStreamableMov'
        | 'sendBestQualityVideo'
        | 'sphericalVideo'
        | 'spatialAudio'
        | 'vrVideo'
        | 'hdrVideo'
      )[];
      /** @description A list of reasons why YouTube may have difficulty transcoding the uploaded video or that might result in an erroneous transcoding. These warnings are generated before YouTube actually processes the uploaded video file. In addition, they identify issues that are unlikely to cause the video processing to fail but that might cause problems such as sync issues, video artifacts, or a missing audio track. */
      processingWarnings?: (
        | 'unknownContainer'
        | 'unknownVideoCodec'
        | 'unknownAudioCodec'
        | 'inconsistentResolution'
        | 'hasEditlist'
        | 'problematicVideoCodec'
        | 'problematicAudioCodec'
        | 'unsupportedVrStereoMode'
        | 'unsupportedSphericalProjectionType'
        | 'unsupportedHdrPixelFormat'
        | 'unsupportedHdrColorMetadata'
        | 'problematicHdrLookupTable'
      )[];
      /** @description A list of keyword tags that could be added to the video's metadata to increase the likelihood that users will locate your video when searching or browsing on YouTube. */
      tagSuggestions?: components['schemas']['VideoSuggestionsTagSuggestion'][];
    };
    /** @description A single tag suggestion with it's relevance information. */
    VideoSuggestionsTagSuggestion: {
      /** @description A set of video categories for which the tag is relevant. You can use this information to display appropriate tag suggestions based on the video category that the video uploader associates with the video. By default, tag suggestions are relevant for all categories if there are no restricts defined for the keyword. */
      categoryRestricts?: string[];
      /** @description The keyword tag suggested for the video. */
      tag?: string;
    };
    /** @description Freebase topic information related to the video. */
    VideoTopicDetails: {
      /** @description Similar to topic_id, except that these topics are merely relevant to the video. These are topics that may be mentioned in, or appear in the video. You can retrieve information about each topic using Freebase Topic API. */
      relevantTopicIds?: string[];
      /** @description A list of Wikipedia URLs that provide a high-level description of the video's content. */
      topicCategories?: string[];
      /** @description A list of Freebase topic IDs that are centrally associated with the video. These are topics that are centrally featured in the video, and it can be said that the video is mainly about each of these. You can retrieve information about each topic using the < a href="http://wiki.freebase.com/wiki/Topic_API">Freebase Topic API. */
      topicIds?: string[];
    };
    /** @description Branding properties for the watch. All deprecated. */
    WatchSettings: {
      /** @description The text color for the video watch page's branded area. */
      backgroundColor?: string;
      /** @description An ID that uniquely identifies a playlist that displays next to the video player. */
      featuredPlaylistId?: string;
      /** @description The background color for the video watch page's branded area. */
      textColor?: string;
    };
  };
  responses: never;
  parameters: {
    /** @description V1 error format. */
    '_.xgafv': '1' | '2';
    /** @description OAuth access token. */
    access_token: string;
    /** @description Data format for response. */
    alt: 'json' | 'media' | 'proto';
    /** @description JSONP */
    callback: string;
    /** @description Selector specifying which fields to include in a partial response. */
    fields: string;
    /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
    key: string;
    /** @description OAuth 2.0 token for the current user. */
    oauth_token: string;
    /** @description Returns response with indentations and line breaks. */
    prettyPrint: boolean;
    /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
    quotaUser: string;
    /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
    uploadType: string;
    /** @description Upload protocol for media (e.g. "raw", "multipart"). */
    upload_protocol: string;
  };
  requestBodies: never;
  headers: never;
  pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
  'youtube.abuseReports.insert': {
    parameters: {
      query: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
        /** @description The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will include. */
        part: string[];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: {
      content: {
        'application/json': components['schemas']['AbuseReport'];
      };
    };
    responses: {
      /** @description Successful response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['AbuseReport'];
        };
      };
    };
  };
  'youtube.activities.list': {
    parameters: {
      query: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
        /** @description The *part* parameter specifies a comma-separated list of one or more activity resource properties that the API response will include. If the parameter identifies a property that contains child properties, the child properties will be included in the response. For example, in an activity resource, the snippet property contains other properties that identify the type of activity, a display title for the activity, and so forth. If you set *part=snippet*, the API response will also contain all of those nested properties. */
        part: string[];
        channelId?: string;
        home?: boolean;
        /** @description The *maxResults* parameter specifies the maximum number of items that should be returned in the result set. */
        maxResults?: number;
        mine?: boolean;
        /** @description The *pageToken* parameter identifies a specific page in the result set that should be returned. In an API response, the nextPageToken and prevPageToken properties identify other pages that could be retrieved. */
        pageToken?: string;
        publishedAfter?: string;
        publishedBefore?: string;
        regionCode?: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ActivityListResponse'];
        };
      };
    };
  };
  'youtube.captions.list': {
    parameters: {
      query: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
        /** @description The *part* parameter specifies a comma-separated list of one or more caption resource parts that the API response will include. The part names that you can include in the parameter value are id and snippet. */
        part: string[];
        /** @description Returns the captions for the specified video. */
        videoId: string;
        /** @description Returns the captions with the given IDs for Stubby or Apiary. */
        id?: string[];
        /** @description ID of the Google+ Page for the channel that the request is on behalf of. */
        onBehalfOf?: string;
        /** @description *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The actual CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
        onBehalfOfContentOwner?: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['CaptionListResponse'];
        };
      };
    };
  };
  'youtube.captions.update': {
    parameters: {
      query: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
        /** @description The *part* parameter specifies a comma-separated list of one or more caption resource parts that the API response will include. The part names that you can include in the parameter value are id and snippet. */
        part: string[];
        /** @description ID of the Google+ Page for the channel that the request is on behalf of. */
        onBehalfOf?: string;
        /** @description *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The actual CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
        onBehalfOfContentOwner?: string;
        /** @description Extra parameter to allow automatically syncing the uploaded caption/transcript with the audio. */
        sync?: boolean;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: {
      content: {
        'application/octet-stream': components['schemas']['Caption'];
        'text/xml': components['schemas']['Caption'];
      };
    };
    responses: {
      /** @description Successful response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['Caption'];
        };
      };
    };
  };
  'youtube.captions.insert': {
    parameters: {
      query: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
        /** @description The *part* parameter specifies the caption resource parts that the API response will include. Set the parameter value to snippet. */
        part: string[];
        /** @description ID of the Google+ Page for the channel that the request is be on behalf of */
        onBehalfOf?: string;
        /** @description *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The actual CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
        onBehalfOfContentOwner?: string;
        /** @description Extra parameter to allow automatically syncing the uploaded caption/transcript with the audio. */
        sync?: boolean;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: {
      content: {
        'application/octet-stream': components['schemas']['Caption'];
        'text/xml': components['schemas']['Caption'];
      };
    };
    responses: {
      /** @description Successful response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['Caption'];
        };
      };
    };
  };
  'youtube.captions.delete': {
    parameters: {
      query: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
        id: string;
        /** @description ID of the Google+ Page for the channel that the request is be on behalf of */
        onBehalfOf?: string;
        /** @description *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The actual CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
        onBehalfOfContentOwner?: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  'youtube.captions.download': {
    parameters: {
      query?: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
        /** @description ID of the Google+ Page for the channel that the request is be on behalf of */
        onBehalfOf?: string;
        /** @description *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The actual CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
        onBehalfOfContentOwner?: string;
        /** @description Convert the captions into this format. Supported options are sbv, srt, and vtt. */
        tfmt?: string;
        /** @description tlang is the language code; machine translate the captions into this language. */
        tlang?: string;
      };
      header?: never;
      path: {
        /** @description The ID of the caption track to download, required for One Platform. */
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  'youtube.channelBanners.insert': {
    parameters: {
      query?: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
        /** @description Unused, channel_id is currently derived from the security context of the requestor. */
        channelId?: string;
        /** @description *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The actual CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
        onBehalfOfContentOwner?: string;
        /** @description This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide authentication credentials for each separate channel. */
        onBehalfOfContentOwnerChannel?: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: {
      content: {
        'application/octet-stream': components['schemas']['ChannelBannerResource'];
        'image/jpeg': components['schemas']['ChannelBannerResource'];
        'image/png': components['schemas']['ChannelBannerResource'];
      };
    };
    responses: {
      /** @description Successful response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ChannelBannerResource'];
        };
      };
    };
  };
  'youtube.channelSections.list': {
    parameters: {
      query: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
        /** @description The *part* parameter specifies a comma-separated list of one or more channelSection resource properties that the API response will include. The part names that you can include in the parameter value are id, snippet, and contentDetails. If the parameter identifies a property that contains child properties, the child properties will be included in the response. For example, in a channelSection resource, the snippet property contains other properties, such as a display title for the channelSection. If you set *part=snippet*, the API response will also contain all of those nested properties. */
        part: string[];
        /** @description Return the ChannelSections owned by the specified channel ID. */
        channelId?: string;
        /** @description Return content in specified language */
        hl?: string;
        /** @description Return the ChannelSections with the given IDs for Stubby or Apiary. */
        id?: string[];
        /** @description Return the ChannelSections owned by the authenticated user. */
        mine?: boolean;
        /** @description *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
        onBehalfOfContentOwner?: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ChannelSectionListResponse'];
        };
      };
    };
  };
  'youtube.channelSections.update': {
    parameters: {
      query: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
        /** @description The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will include. The part names that you can include in the parameter value are snippet and contentDetails. */
        part: string[];
        /** @description *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
        onBehalfOfContentOwner?: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: {
      content: {
        'application/json': components['schemas']['ChannelSection'];
      };
    };
    responses: {
      /** @description Successful response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ChannelSection'];
        };
      };
    };
  };
  'youtube.channelSections.insert': {
    parameters: {
      query: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
        /** @description The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will include. The part names that you can include in the parameter value are snippet and contentDetails. */
        part: string[];
        /** @description *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
        onBehalfOfContentOwner?: string;
        /** @description This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide authentication credentials for each separate channel. */
        onBehalfOfContentOwnerChannel?: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: {
      content: {
        'application/json': components['schemas']['ChannelSection'];
      };
    };
    responses: {
      /** @description Successful response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ChannelSection'];
        };
      };
    };
  };
  'youtube.channelSections.delete': {
    parameters: {
      query: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
        id: string;
        /** @description *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
        onBehalfOfContentOwner?: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  'youtube.channels.list': {
    parameters: {
      query: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
        /** @description The *part* parameter specifies a comma-separated list of one or more channel resource properties that the API response will include. If the parameter identifies a property that contains child properties, the child properties will be included in the response. For example, in a channel resource, the contentDetails property contains other properties, such as the uploads properties. As such, if you set *part=contentDetails*, the API response will also contain all of those nested properties. */
        part: string[];
        /** @description Return the channels within the specified guide category ID. */
        categoryId?: string;
        /** @description Return the channel associated with a YouTube username. */
        forUsername?: string;
        /** @description Stands for "host language". Specifies the localization language of the metadata to be filled into snippet.localized. The field is filled with the default metadata if there is no localization in the specified language. The parameter value must be a language code included in the list returned by the i18nLanguages.list method (e.g. en_US, es_MX). */
        hl?: string;
        /** @description Return the channels with the specified IDs. */
        id?: string[];
        /** @description Return the channels managed by the authenticated user. */
        managedByMe?: boolean;
        /** @description The *maxResults* parameter specifies the maximum number of items that should be returned in the result set. */
        maxResults?: number;
        /** @description Return the ids of channels owned by the authenticated user. */
        mine?: boolean;
        /** @description Return the channels subscribed to the authenticated user */
        mySubscribers?: boolean;
        /** @description *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
        onBehalfOfContentOwner?: string;
        /** @description The *pageToken* parameter identifies a specific page in the result set that should be returned. In an API response, the nextPageToken and prevPageToken properties identify other pages that could be retrieved. */
        pageToken?: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ChannelListResponse'];
        };
      };
    };
  };
  'youtube.channels.update': {
    parameters: {
      query: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
        /** @description The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will include. The API currently only allows the parameter value to be set to either brandingSettings or invideoPromotion. (You cannot update both of those parts with a single request.) Note that this method overrides the existing values for all of the mutable properties that are contained in any parts that the parameter value specifies. */
        part: string[];
        /** @description The *onBehalfOfContentOwner* parameter indicates that the authenticated user is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The actual CMS account that the user authenticates with needs to be linked to the specified YouTube content owner. */
        onBehalfOfContentOwner?: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: {
      content: {
        'application/json': components['schemas']['Channel'];
      };
    };
    responses: {
      /** @description Successful response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['Channel'];
        };
      };
    };
  };
  'youtube.commentThreads.list': {
    parameters: {
      query: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
        /** @description The *part* parameter specifies a comma-separated list of one or more commentThread resource properties that the API response will include. */
        part: string[];
        /** @description Returns the comment threads of all videos of the channel and the channel comments as well. */
        allThreadsRelatedToChannelId?: string;
        /** @description Returns the comment threads for all the channel comments (ie does not include comments left on videos). */
        channelId?: string;
        /** @description Returns the comment threads with the given IDs for Stubby or Apiary. */
        id?: string[];
        /** @description The *maxResults* parameter specifies the maximum number of items that should be returned in the result set. */
        maxResults?: number;
        /** @description Limits the returned comment threads to those with the specified moderation status. Not compatible with the 'id' filter. Valid values: published, heldForReview, likelySpam. */
        moderationStatus?:
          | 'published'
          | 'heldForReview'
          | 'likelySpam'
          | 'rejected';
        order?: 'orderUnspecified' | 'time' | 'relevance';
        /** @description The *pageToken* parameter identifies a specific page in the result set that should be returned. In an API response, the nextPageToken and prevPageToken properties identify other pages that could be retrieved. */
        pageToken?: string;
        /** @description Limits the returned comment threads to those matching the specified key words. Not compatible with the 'id' filter. */
        searchTerms?: string;
        /** @description The requested text format for the returned comments. */
        textFormat?: 'textFormatUnspecified' | 'html' | 'plainText';
        /** @description Returns the comment threads of the specified video. */
        videoId?: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['CommentThreadListResponse'];
        };
      };
    };
  };
  'youtube.youtube.v3.updateCommentThreads': {
    parameters: {
      query?: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
        /** @description The *part* parameter specifies a comma-separated list of commentThread resource properties that the API response will include. You must at least include the snippet part in the parameter value since that part contains all of the properties that the API request can update. */
        part?: string[];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: {
      content: {
        'application/json': components['schemas']['CommentThread'];
      };
    };
    responses: {
      /** @description Successful response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['CommentThread'];
        };
      };
    };
  };
  'youtube.commentThreads.insert': {
    parameters: {
      query: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
        /** @description The *part* parameter identifies the properties that the API response will include. Set the parameter value to snippet. The snippet part has a quota cost of 2 units. */
        part: string[];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: {
      content: {
        'application/json': components['schemas']['CommentThread'];
      };
    };
    responses: {
      /** @description Successful response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['CommentThread'];
        };
      };
    };
  };
  'youtube.comments.list': {
    parameters: {
      query: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
        /** @description The *part* parameter specifies a comma-separated list of one or more comment resource properties that the API response will include. */
        part: string[];
        /** @description Returns the comments with the given IDs for One Platform. */
        id?: string[];
        /** @description The *maxResults* parameter specifies the maximum number of items that should be returned in the result set. */
        maxResults?: number;
        /** @description The *pageToken* parameter identifies a specific page in the result set that should be returned. In an API response, the nextPageToken and prevPageToken properties identify other pages that could be retrieved. */
        pageToken?: string;
        /** @description Returns replies to the specified comment. Note, currently YouTube features only one level of replies (ie replies to top level comments). However replies to replies may be supported in the future. */
        parentId?: string;
        /** @description The requested text format for the returned comments. */
        textFormat?: 'textFormatUnspecified' | 'html' | 'plainText';
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['CommentListResponse'];
        };
      };
    };
  };
  'youtube.comments.update': {
    parameters: {
      query: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
        /** @description The *part* parameter identifies the properties that the API response will include. You must at least include the snippet part in the parameter value since that part contains all of the properties that the API request can update. */
        part: string[];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: {
      content: {
        'application/json': components['schemas']['Comment'];
      };
    };
    responses: {
      /** @description Successful response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['Comment'];
        };
      };
    };
  };
  'youtube.comments.insert': {
    parameters: {
      query: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
        /** @description The *part* parameter identifies the properties that the API response will include. Set the parameter value to snippet. The snippet part has a quota cost of 2 units. */
        part: string[];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: {
      content: {
        'application/json': components['schemas']['Comment'];
      };
    };
    responses: {
      /** @description Successful response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['Comment'];
        };
      };
    };
  };
  'youtube.comments.delete': {
    parameters: {
      query: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
        id: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  'youtube.comments.markAsSpam': {
    parameters: {
      query: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
        /** @description Flags the comments with the given IDs as spam in the caller's opinion. */
        id: string[];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  'youtube.comments.setModerationStatus': {
    parameters: {
      query: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
        /** @description Modifies the moderation status of the comments with the given IDs */
        id: string[];
        /** @description Specifies the requested moderation status. Note, comments can be in statuses, which are not available through this call. For example, this call does not allow to mark a comment as 'likely spam'. Valid values: MODERATION_STATUS_PUBLISHED, MODERATION_STATUS_HELD_FOR_REVIEW, MODERATION_STATUS_REJECTED. */
        moderationStatus:
          | 'published'
          | 'heldForReview'
          | 'likelySpam'
          | 'rejected';
        /** @description If set to true the author of the comment gets added to the ban list. This means all future comments of the author will autmomatically be rejected. Only valid in combination with STATUS_REJECTED. */
        banAuthor?: boolean;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  'youtube.i18nLanguages.list': {
    parameters: {
      query: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
        /** @description The *part* parameter specifies the i18nLanguage resource properties that the API response will include. Set the parameter value to snippet. */
        part: string[];
        hl?: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['I18nLanguageListResponse'];
        };
      };
    };
  };
  'youtube.i18nRegions.list': {
    parameters: {
      query: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
        /** @description The *part* parameter specifies the i18nRegion resource properties that the API response will include. Set the parameter value to snippet. */
        part: string[];
        hl?: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['I18nRegionListResponse'];
        };
      };
    };
  };
  'youtube.liveBroadcasts.list': {
    parameters: {
      query: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
        /** @description The *part* parameter specifies a comma-separated list of one or more liveBroadcast resource properties that the API response will include. The part names that you can include in the parameter value are id, snippet, contentDetails, status and statistics. */
        part: string[];
        /** @description Return broadcasts with a certain status, e.g. active broadcasts. */
        broadcastStatus?:
          | 'broadcastStatusFilterUnspecified'
          | 'all'
          | 'active'
          | 'upcoming'
          | 'completed';
        /** @description Return only broadcasts with the selected type. */
        broadcastType?:
          | 'broadcastTypeFilterUnspecified'
          | 'all'
          | 'event'
          | 'persistent';
        /** @description Return broadcasts with the given ids from Stubby or Apiary. */
        id?: string[];
        /** @description The *maxResults* parameter specifies the maximum number of items that should be returned in the result set. */
        maxResults?: number;
        mine?: boolean;
        /** @description *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
        onBehalfOfContentOwner?: string;
        /** @description This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide authentication credentials for each separate channel. */
        onBehalfOfContentOwnerChannel?: string;
        /** @description The *pageToken* parameter identifies a specific page in the result set that should be returned. In an API response, the nextPageToken and prevPageToken properties identify other pages that could be retrieved. */
        pageToken?: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['LiveBroadcastListResponse'];
        };
      };
    };
  };
  'youtube.liveBroadcasts.update': {
    parameters: {
      query: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
        /** @description The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will include. The part properties that you can include in the parameter value are id, snippet, contentDetails, and status. Note that this method will override the existing values for all of the mutable properties that are contained in any parts that the parameter value specifies. For example, a broadcast's privacy status is defined in the status part. As such, if your request is updating a private or unlisted broadcast, and the request's part parameter value includes the status part, the broadcast's privacy setting will be updated to whatever value the request body specifies. If the request body does not specify a value, the existing privacy setting will be removed and the broadcast will revert to the default privacy setting. */
        part: string[];
        /** @description *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
        onBehalfOfContentOwner?: string;
        /** @description This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide authentication credentials for each separate channel. */
        onBehalfOfContentOwnerChannel?: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: {
      content: {
        'application/json': components['schemas']['LiveBroadcast'];
      };
    };
    responses: {
      /** @description Successful response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['LiveBroadcast'];
        };
      };
    };
  };
  'youtube.liveBroadcasts.insert': {
    parameters: {
      query: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
        /** @description The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will include. The part properties that you can include in the parameter value are id, snippet, contentDetails, and status. */
        part: string[];
        /** @description *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
        onBehalfOfContentOwner?: string;
        /** @description This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide authentication credentials for each separate channel. */
        onBehalfOfContentOwnerChannel?: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: {
      content: {
        'application/json': components['schemas']['LiveBroadcast'];
      };
    };
    responses: {
      /** @description Successful response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['LiveBroadcast'];
        };
      };
    };
  };
  'youtube.liveBroadcasts.delete': {
    parameters: {
      query: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
        /** @description Broadcast to delete. */
        id: string;
        /** @description *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
        onBehalfOfContentOwner?: string;
        /** @description This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide authentication credentials for each separate channel. */
        onBehalfOfContentOwnerChannel?: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  'youtube.liveBroadcasts.bind': {
    parameters: {
      query: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
        /** @description Broadcast to bind to the stream */
        id: string;
        /** @description The *part* parameter specifies a comma-separated list of one or more liveBroadcast resource properties that the API response will include. The part names that you can include in the parameter value are id, snippet, contentDetails, and status. */
        part: string[];
        /** @description *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
        onBehalfOfContentOwner?: string;
        /** @description This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide authentication credentials for each separate channel. */
        onBehalfOfContentOwnerChannel?: string;
        /** @description Stream to bind, if not set unbind the current one. */
        streamId?: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['LiveBroadcast'];
        };
      };
    };
  };
  'youtube.liveBroadcasts.insertCuepoint': {
    parameters: {
      query?: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
        /** @description Broadcast to insert ads to, or equivalently `external_video_id` for internal use. */
        id?: string;
        /** @description *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
        onBehalfOfContentOwner?: string;
        /** @description This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide authentication credentials for each separate channel. */
        onBehalfOfContentOwnerChannel?: string;
        /** @description The *part* parameter specifies a comma-separated list of one or more liveBroadcast resource properties that the API response will include. The part names that you can include in the parameter value are id, snippet, contentDetails, and status. */
        part?: string[];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: {
      content: {
        'application/json': components['schemas']['Cuepoint'];
      };
    };
    responses: {
      /** @description Successful response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['Cuepoint'];
        };
      };
    };
  };
  'youtube.liveBroadcasts.transition': {
    parameters: {
      query: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
        /** @description The status to which the broadcast is going to transition. */
        broadcastStatus: 'statusUnspecified' | 'testing' | 'live' | 'complete';
        /** @description Broadcast to transition. */
        id: string;
        /** @description The *part* parameter specifies a comma-separated list of one or more liveBroadcast resource properties that the API response will include. The part names that you can include in the parameter value are id, snippet, contentDetails, and status. */
        part: string[];
        /** @description *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
        onBehalfOfContentOwner?: string;
        /** @description This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide authentication credentials for each separate channel. */
        onBehalfOfContentOwnerChannel?: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['LiveBroadcast'];
        };
      };
    };
  };
  'youtube.liveChatBans.insert': {
    parameters: {
      query: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
        /** @description The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response returns. Set the parameter value to snippet. */
        part: string[];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: {
      content: {
        'application/json': components['schemas']['LiveChatBan'];
      };
    };
    responses: {
      /** @description Successful response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['LiveChatBan'];
        };
      };
    };
  };
  'youtube.liveChatBans.delete': {
    parameters: {
      query: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
        id: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  'youtube.liveChatMessages.list': {
    parameters: {
      query: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
        /** @description The id of the live chat for which comments should be returned. */
        liveChatId: string;
        /** @description The *part* parameter specifies the liveChatComment resource parts that the API response will include. Supported values are id and snippet. */
        part: string[];
        /** @description Specifies the localization language in which the system messages should be returned. */
        hl?: string;
        /** @description The *maxResults* parameter specifies the maximum number of items that should be returned in the result set. */
        maxResults?: number;
        /** @description The *pageToken* parameter identifies a specific page in the result set that should be returned. In an API response, the nextPageToken property identify other pages that could be retrieved. */
        pageToken?: string;
        /** @description Specifies the size of the profile image that should be returned for each user. */
        profileImageSize?: number;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['LiveChatMessageListResponse'];
        };
      };
    };
  };
  'youtube.liveChatMessages.insert': {
    parameters: {
      query: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
        /** @description The *part* parameter serves two purposes. It identifies the properties that the write operation will set as well as the properties that the API response will include. Set the parameter value to snippet. */
        part: string[];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: {
      content: {
        'application/json': components['schemas']['LiveChatMessage'];
      };
    };
    responses: {
      /** @description Successful response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['LiveChatMessage'];
        };
      };
    };
  };
  'youtube.liveChatMessages.delete': {
    parameters: {
      query: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
        id: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  'youtube.liveChatModerators.list': {
    parameters: {
      query: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
        /** @description The id of the live chat for which moderators should be returned. */
        liveChatId: string;
        /** @description The *part* parameter specifies the liveChatModerator resource parts that the API response will include. Supported values are id and snippet. */
        part: string[];
        /** @description The *maxResults* parameter specifies the maximum number of items that should be returned in the result set. */
        maxResults?: number;
        /** @description The *pageToken* parameter identifies a specific page in the result set that should be returned. In an API response, the nextPageToken and prevPageToken properties identify other pages that could be retrieved. */
        pageToken?: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['LiveChatModeratorListResponse'];
        };
      };
    };
  };
  'youtube.liveChatModerators.insert': {
    parameters: {
      query: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
        /** @description The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response returns. Set the parameter value to snippet. */
        part: string[];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: {
      content: {
        'application/json': components['schemas']['LiveChatModerator'];
      };
    };
    responses: {
      /** @description Successful response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['LiveChatModerator'];
        };
      };
    };
  };
  'youtube.liveChatModerators.delete': {
    parameters: {
      query: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
        id: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  'youtube.liveStreams.list': {
    parameters: {
      query: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
        /** @description The *part* parameter specifies a comma-separated list of one or more liveStream resource properties that the API response will include. The part names that you can include in the parameter value are id, snippet, cdn, and status. */
        part: string[];
        /** @description Return LiveStreams with the given ids from Stubby or Apiary. */
        id?: string[];
        /** @description The *maxResults* parameter specifies the maximum number of items that should be returned in the result set. */
        maxResults?: number;
        mine?: boolean;
        /** @description *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
        onBehalfOfContentOwner?: string;
        /** @description This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide authentication credentials for each separate channel. */
        onBehalfOfContentOwnerChannel?: string;
        /** @description The *pageToken* parameter identifies a specific page in the result set that should be returned. In an API response, the nextPageToken and prevPageToken properties identify other pages that could be retrieved. */
        pageToken?: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['LiveStreamListResponse'];
        };
      };
    };
  };
  'youtube.liveStreams.update': {
    parameters: {
      query: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
        /** @description The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will include. The part properties that you can include in the parameter value are id, snippet, cdn, and status. Note that this method will override the existing values for all of the mutable properties that are contained in any parts that the parameter value specifies. If the request body does not specify a value for a mutable property, the existing value for that property will be removed. */
        part: string[];
        /** @description *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
        onBehalfOfContentOwner?: string;
        /** @description This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide authentication credentials for each separate channel. */
        onBehalfOfContentOwnerChannel?: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: {
      content: {
        'application/json': components['schemas']['LiveStream'];
      };
    };
    responses: {
      /** @description Successful response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['LiveStream'];
        };
      };
    };
  };
  'youtube.liveStreams.insert': {
    parameters: {
      query: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
        /** @description The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will include. The part properties that you can include in the parameter value are id, snippet, cdn, content_details, and status. */
        part: string[];
        /** @description *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
        onBehalfOfContentOwner?: string;
        /** @description This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide authentication credentials for each separate channel. */
        onBehalfOfContentOwnerChannel?: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: {
      content: {
        'application/json': components['schemas']['LiveStream'];
      };
    };
    responses: {
      /** @description Successful response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['LiveStream'];
        };
      };
    };
  };
  'youtube.liveStreams.delete': {
    parameters: {
      query: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
        id: string;
        /** @description *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
        onBehalfOfContentOwner?: string;
        /** @description This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide authentication credentials for each separate channel. */
        onBehalfOfContentOwnerChannel?: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  'youtube.members.list': {
    parameters: {
      query: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
        /** @description The *part* parameter specifies the member resource parts that the API response will include. Set the parameter value to snippet. */
        part: string[];
        /** @description Comma separated list of channel IDs. Only data about members that are part of this list will be included in the response. */
        filterByMemberChannelId?: string;
        /** @description Filter members in the results set to the ones that have access to a level. */
        hasAccessToLevel?: string;
        /** @description The *maxResults* parameter specifies the maximum number of items that should be returned in the result set. */
        maxResults?: number;
        /** @description Parameter that specifies which channel members to return. */
        mode?: 'listMembersModeUnknown' | 'updates' | 'all_current';
        /** @description The *pageToken* parameter identifies a specific page in the result set that should be returned. In an API response, the nextPageToken and prevPageToken properties identify other pages that could be retrieved. */
        pageToken?: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['MemberListResponse'];
        };
      };
    };
  };
  'youtube.membershipsLevels.list': {
    parameters: {
      query: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
        /** @description The *part* parameter specifies the membershipsLevel resource parts that the API response will include. Supported values are id and snippet. */
        part: string[];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['MembershipsLevelListResponse'];
        };
      };
    };
  };
  'youtube.playlistItems.list': {
    parameters: {
      query: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
        /** @description The *part* parameter specifies a comma-separated list of one or more playlistItem resource properties that the API response will include. If the parameter identifies a property that contains child properties, the child properties will be included in the response. For example, in a playlistItem resource, the snippet property contains numerous fields, including the title, description, position, and resourceId properties. As such, if you set *part=snippet*, the API response will contain all of those properties. */
        part: string[];
        id?: string[];
        /** @description The *maxResults* parameter specifies the maximum number of items that should be returned in the result set. */
        maxResults?: number;
        /** @description *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
        onBehalfOfContentOwner?: string;
        /** @description The *pageToken* parameter identifies a specific page in the result set that should be returned. In an API response, the nextPageToken and prevPageToken properties identify other pages that could be retrieved. */
        pageToken?: string;
        /** @description Return the playlist items within the given playlist. */
        playlistId?: string;
        /** @description Return the playlist items associated with the given video ID. */
        videoId?: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['PlaylistItemListResponse'];
        };
      };
    };
  };
  'youtube.playlistItems.update': {
    parameters: {
      query: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
        /** @description The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will include. Note that this method will override the existing values for all of the mutable properties that are contained in any parts that the parameter value specifies. For example, a playlist item can specify a start time and end time, which identify the times portion of the video that should play when users watch the video in the playlist. If your request is updating a playlist item that sets these values, and the request's part parameter value includes the contentDetails part, the playlist item's start and end times will be updated to whatever value the request body specifies. If the request body does not specify values, the existing start and end times will be removed and replaced with the default settings. */
        part: string[];
        /** @description *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
        onBehalfOfContentOwner?: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: {
      content: {
        'application/json': components['schemas']['PlaylistItem'];
      };
    };
    responses: {
      /** @description Successful response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['PlaylistItem'];
        };
      };
    };
  };
  'youtube.playlistItems.insert': {
    parameters: {
      query: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
        /** @description The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will include. */
        part: string[];
        /** @description *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
        onBehalfOfContentOwner?: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: {
      content: {
        'application/json': components['schemas']['PlaylistItem'];
      };
    };
    responses: {
      /** @description Successful response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['PlaylistItem'];
        };
      };
    };
  };
  'youtube.playlistItems.delete': {
    parameters: {
      query: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
        id: string;
        /** @description *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
        onBehalfOfContentOwner?: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  'youtube.playlists.list': {
    parameters: {
      query: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
        /** @description The *part* parameter specifies a comma-separated list of one or more playlist resource properties that the API response will include. If the parameter identifies a property that contains child properties, the child properties will be included in the response. For example, in a playlist resource, the snippet property contains properties like author, title, description, tags, and timeCreated. As such, if you set *part=snippet*, the API response will contain all of those properties. */
        part: string[];
        /** @description Return the playlists owned by the specified channel ID. */
        channelId?: string;
        /** @description Return content in specified language */
        hl?: string;
        /** @description Return the playlists with the given IDs for Stubby or Apiary. */
        id?: string[];
        /** @description The *maxResults* parameter specifies the maximum number of items that should be returned in the result set. */
        maxResults?: number;
        /** @description Return the playlists owned by the authenticated user. */
        mine?: boolean;
        /** @description *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
        onBehalfOfContentOwner?: string;
        /** @description This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide authentication credentials for each separate channel. */
        onBehalfOfContentOwnerChannel?: string;
        /** @description The *pageToken* parameter identifies a specific page in the result set that should be returned. In an API response, the nextPageToken and prevPageToken properties identify other pages that could be retrieved. */
        pageToken?: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['PlaylistListResponse'];
        };
      };
    };
  };
  'youtube.playlists.update': {
    parameters: {
      query: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
        /** @description The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will include. Note that this method will override the existing values for mutable properties that are contained in any parts that the request body specifies. For example, a playlist's description is contained in the snippet part, which must be included in the request body. If the request does not specify a value for the snippet.description property, the playlist's existing description will be deleted. */
        part: string[];
        /** @description *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
        onBehalfOfContentOwner?: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: {
      content: {
        'application/json': components['schemas']['Playlist'];
      };
    };
    responses: {
      /** @description Successful response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['Playlist'];
        };
      };
    };
  };
  'youtube.playlists.insert': {
    parameters: {
      query: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
        /** @description The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will include. */
        part: string[];
        /** @description *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
        onBehalfOfContentOwner?: string;
        /** @description This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide authentication credentials for each separate channel. */
        onBehalfOfContentOwnerChannel?: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: {
      content: {
        'application/json': components['schemas']['Playlist'];
      };
    };
    responses: {
      /** @description Successful response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['Playlist'];
        };
      };
    };
  };
  'youtube.playlists.delete': {
    parameters: {
      query: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
        id: string;
        /** @description *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
        onBehalfOfContentOwner?: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  'youtube.search.list': {
    parameters: {
      query: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
        /** @description The *part* parameter specifies a comma-separated list of one or more search resource properties that the API response will include. Set the parameter value to snippet. */
        part: string[];
        /** @description Filter on resources belonging to this channelId. */
        channelId?: string;
        /** @description Add a filter on the channel search. */
        channelType?: 'channelTypeUnspecified' | 'any' | 'show';
        /** @description Filter on the livestream status of the videos. */
        eventType?: 'none' | 'upcoming' | 'live' | 'completed';
        /** @description Search owned by a content owner. */
        forContentOwner?: boolean;
        /** @description Restrict the search to only retrieve videos uploaded using the project id of the authenticated user. */
        forDeveloper?: boolean;
        /** @description Search for the private videos of the authenticated user. */
        forMine?: boolean;
        /** @description Filter on location of the video */
        location?: string;
        /** @description Filter on distance from the location (specified above). */
        locationRadius?: string;
        /** @description The *maxResults* parameter specifies the maximum number of items that should be returned in the result set. */
        maxResults?: number;
        /** @description *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
        onBehalfOfContentOwner?: string;
        /** @description Sort order of the results. */
        order?:
          | 'searchSortUnspecified'
          | 'date'
          | 'rating'
          | 'viewCount'
          | 'relevance'
          | 'title'
          | 'videoCount';
        /** @description The *pageToken* parameter identifies a specific page in the result set that should be returned. In an API response, the nextPageToken and prevPageToken properties identify other pages that could be retrieved. */
        pageToken?: string;
        /** @description Filter on resources published after this date. */
        publishedAfter?: string;
        /** @description Filter on resources published before this date. */
        publishedBefore?: string;
        /** @description Textual search terms to match. */
        q?: string;
        /** @description Display the content as seen by viewers in this country. */
        regionCode?: string;
        /** @description Search related to a resource. */
        relatedToVideoId?: string;
        /** @description Return results relevant to this language. */
        relevanceLanguage?: string;
        /** @description Indicates whether the search results should include restricted content as well as standard content. */
        safeSearch?:
          | 'safeSearchSettingUnspecified'
          | 'none'
          | 'moderate'
          | 'strict';
        /** @description Restrict results to a particular topic. */
        topicId?: string;
        /** @description Restrict results to a particular set of resource types from One Platform. */
        type?: string[];
        /** @description Filter on the presence of captions on the videos. */
        videoCaption?:
          | 'videoCaptionUnspecified'
          | 'any'
          | 'closedCaption'
          | 'none';
        /** @description Filter on videos in a specific category. */
        videoCategoryId?: string;
        /** @description Filter on the definition of the videos. */
        videoDefinition?: 'any' | 'standard' | 'high';
        /** @description Filter on 3d videos. */
        videoDimension?: 'any' | '2d' | '3d';
        /** @description Filter on the duration of the videos. */
        videoDuration?:
          | 'videoDurationUnspecified'
          | 'any'
          | 'short'
          | 'medium'
          | 'long';
        /** @description Filter on embeddable videos. */
        videoEmbeddable?: 'videoEmbeddableUnspecified' | 'any' | 'true';
        /** @description Filter on the license of the videos. */
        videoLicense?: 'any' | 'youtube' | 'creativeCommon';
        /** @description Filter on syndicated videos. */
        videoSyndicated?: 'videoSyndicatedUnspecified' | 'any' | 'true';
        /** @description Filter on videos of a specific type. */
        videoType?: 'videoTypeUnspecified' | 'any' | 'movie' | 'episode';
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['SearchListResponse'];
        };
      };
    };
  };
  'youtube.subscriptions.list': {
    parameters: {
      query: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
        /** @description The *part* parameter specifies a comma-separated list of one or more subscription resource properties that the API response will include. If the parameter identifies a property that contains child properties, the child properties will be included in the response. For example, in a subscription resource, the snippet property contains other properties, such as a display title for the subscription. If you set *part=snippet*, the API response will also contain all of those nested properties. */
        part: string[];
        /** @description Return the subscriptions of the given channel owner. */
        channelId?: string;
        /** @description Return the subscriptions to the subset of these channels that the authenticated user is subscribed to. */
        forChannelId?: string;
        /** @description Return the subscriptions with the given IDs for Stubby or Apiary. */
        id?: string[];
        /** @description The *maxResults* parameter specifies the maximum number of items that should be returned in the result set. */
        maxResults?: number;
        /** @description Flag for returning the subscriptions of the authenticated user. */
        mine?: boolean;
        myRecentSubscribers?: boolean;
        /** @description Return the subscribers of the given channel owner. */
        mySubscribers?: boolean;
        /** @description *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
        onBehalfOfContentOwner?: string;
        /** @description This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide authentication credentials for each separate channel. */
        onBehalfOfContentOwnerChannel?: string;
        /** @description The order of the returned subscriptions */
        order?:
          | 'subscriptionOrderUnspecified'
          | 'relevance'
          | 'unread'
          | 'alphabetical';
        /** @description The *pageToken* parameter identifies a specific page in the result set that should be returned. In an API response, the nextPageToken and prevPageToken properties identify other pages that could be retrieved. */
        pageToken?: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['SubscriptionListResponse'];
        };
      };
    };
  };
  'youtube.subscriptions.insert': {
    parameters: {
      query: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
        /** @description The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will include. */
        part: string[];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: {
      content: {
        'application/json': components['schemas']['Subscription'];
      };
    };
    responses: {
      /** @description Successful response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['Subscription'];
        };
      };
    };
  };
  'youtube.subscriptions.delete': {
    parameters: {
      query: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
        id: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  'youtube.superChatEvents.list': {
    parameters: {
      query: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
        /** @description The *part* parameter specifies the superChatEvent resource parts that the API response will include. This parameter is currently not supported. */
        part: string[];
        /** @description Return rendered funding amounts in specified language. */
        hl?: string;
        /** @description The *maxResults* parameter specifies the maximum number of items that should be returned in the result set. */
        maxResults?: number;
        /** @description The *pageToken* parameter identifies a specific page in the result set that should be returned. In an API response, the nextPageToken and prevPageToken properties identify other pages that could be retrieved. */
        pageToken?: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['SuperChatEventListResponse'];
        };
      };
    };
  };
  'youtube.tests.insert': {
    parameters: {
      query: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
        part: string[];
        externalChannelId?: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: {
      content: {
        'application/json': components['schemas']['TestItem'];
      };
    };
    responses: {
      /** @description Successful response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['TestItem'];
        };
      };
    };
  };
  'youtube.thirdPartyLinks.list': {
    parameters: {
      query: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
        /** @description The *part* parameter specifies the thirdPartyLink resource parts that the API response will include. Supported values are linkingToken, status, and snippet. */
        part: string[];
        /** @description Channel ID to which changes should be applied, for delegation. */
        externalChannelId?: string;
        /** @description Get a third party link with the given linking token. */
        linkingToken?: string;
        /** @description Get a third party link of the given type. */
        type?: 'linkUnspecified' | 'channelToStoreLink';
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ThirdPartyLinkListResponse'];
        };
      };
    };
  };
  'youtube.thirdPartyLinks.update': {
    parameters: {
      query: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
        /** @description The *part* parameter specifies the thirdPartyLink resource parts that the API request and response will include. Supported values are linkingToken, status, and snippet. */
        part: string[];
        /** @description Channel ID to which changes should be applied, for delegation. */
        externalChannelId?: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: {
      content: {
        'application/json': components['schemas']['ThirdPartyLink'];
      };
    };
    responses: {
      /** @description Successful response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ThirdPartyLink'];
        };
      };
    };
  };
  'youtube.thirdPartyLinks.insert': {
    parameters: {
      query: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
        /** @description The *part* parameter specifies the thirdPartyLink resource parts that the API request and response will include. Supported values are linkingToken, status, and snippet. */
        part: string[];
        /** @description Channel ID to which changes should be applied, for delegation. */
        externalChannelId?: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: {
      content: {
        'application/json': components['schemas']['ThirdPartyLink'];
      };
    };
    responses: {
      /** @description Successful response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ThirdPartyLink'];
        };
      };
    };
  };
  'youtube.thirdPartyLinks.delete': {
    parameters: {
      query: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
        /** @description Delete the partner links with the given linking token. */
        linkingToken: string;
        /** @description Type of the link to be deleted. */
        type: 'linkUnspecified' | 'channelToStoreLink';
        /** @description Channel ID to which changes should be applied, for delegation. */
        externalChannelId?: string;
        /** @description Do not use. Required for compatibility. */
        part?: string[];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  'youtube.thumbnails.set': {
    parameters: {
      query: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
        /** @description Returns the Thumbnail with the given video IDs for Stubby or Apiary. */
        videoId: string;
        /** @description *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The actual CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
        onBehalfOfContentOwner?: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ThumbnailSetResponse'];
        };
      };
    };
  };
  'youtube.videoAbuseReportReasons.list': {
    parameters: {
      query: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
        /** @description The *part* parameter specifies the videoCategory resource parts that the API response will include. Supported values are id and snippet. */
        part: string[];
        hl?: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['VideoAbuseReportReasonListResponse'];
        };
      };
    };
  };
  'youtube.videoCategories.list': {
    parameters: {
      query: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
        /** @description The *part* parameter specifies the videoCategory resource properties that the API response will include. Set the parameter value to snippet. */
        part: string[];
        hl?: string;
        /** @description Returns the video categories with the given IDs for Stubby or Apiary. */
        id?: string[];
        regionCode?: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['VideoCategoryListResponse'];
        };
      };
    };
  };
  'youtube.videos.list': {
    parameters: {
      query: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
        /** @description The *part* parameter specifies a comma-separated list of one or more video resource properties that the API response will include. If the parameter identifies a property that contains child properties, the child properties will be included in the response. For example, in a video resource, the snippet property contains the channelId, title, description, tags, and categoryId properties. As such, if you set *part=snippet*, the API response will contain all of those properties. */
        part: string[];
        /** @description Return the videos that are in the specified chart. */
        chart?: 'chartUnspecified' | 'mostPopular';
        /** @description Stands for "host language". Specifies the localization language of the metadata to be filled into snippet.localized. The field is filled with the default metadata if there is no localization in the specified language. The parameter value must be a language code included in the list returned by the i18nLanguages.list method (e.g. en_US, es_MX). */
        hl?: string;
        /** @description Return videos with the given ids. */
        id?: string[];
        locale?: string;
        maxHeight?: number;
        /** @description The *maxResults* parameter specifies the maximum number of items that should be returned in the result set. *Note:* This parameter is supported for use in conjunction with the myRating and chart parameters, but it is not supported for use in conjunction with the id parameter. */
        maxResults?: number;
        /** @description Return the player with maximum height specified in */
        maxWidth?: number;
        /** @description Return videos liked/disliked by the authenticated user. Does not support RateType.RATED_TYPE_NONE. */
        myRating?: 'none' | 'like' | 'dislike';
        /** @description *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
        onBehalfOfContentOwner?: string;
        /** @description The *pageToken* parameter identifies a specific page in the result set that should be returned. In an API response, the nextPageToken and prevPageToken properties identify other pages that could be retrieved. *Note:* This parameter is supported for use in conjunction with the myRating and chart parameters, but it is not supported for use in conjunction with the id parameter. */
        pageToken?: string;
        /** @description Use a chart that is specific to the specified region */
        regionCode?: string;
        /** @description Use chart that is specific to the specified video category */
        videoCategoryId?: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['VideoListResponse'];
        };
      };
    };
  };
  'youtube.videos.update': {
    parameters: {
      query: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
        /** @description The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will include. Note that this method will override the existing values for all of the mutable properties that are contained in any parts that the parameter value specifies. For example, a video's privacy setting is contained in the status part. As such, if your request is updating a private video, and the request's part parameter value includes the status part, the video's privacy setting will be updated to whatever value the request body specifies. If the request body does not specify a value, the existing privacy setting will be removed and the video will revert to the default privacy setting. In addition, not all parts contain properties that can be set when inserting or updating a video. For example, the statistics object encapsulates statistics that YouTube calculates for a video and does not contain values that you can set or modify. If the parameter value specifies a part that does not contain mutable values, that part will still be included in the API response. */
        part: string[];
        /** @description *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The actual CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
        onBehalfOfContentOwner?: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: {
      content: {
        'application/json': components['schemas']['Video'];
      };
    };
    responses: {
      /** @description Successful response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['Video'];
        };
      };
    };
  };
  'youtube.videos.insert': {
    parameters: {
      query: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
        /** @description The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will include. Note that not all parts contain properties that can be set when inserting or updating a video. For example, the statistics object encapsulates statistics that YouTube calculates for a video and does not contain values that you can set or modify. If the parameter value specifies a part that does not contain mutable values, that part will still be included in the API response. */
        part: string[];
        /** @description Should auto-levels be applied to the upload. */
        autoLevels?: boolean;
        /** @description Notify the channel subscribers about the new video. As default, the notification is enabled. */
        notifySubscribers?: boolean;
        /** @description *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
        onBehalfOfContentOwner?: string;
        /** @description This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide authentication credentials for each separate channel. */
        onBehalfOfContentOwnerChannel?: string;
        /** @description Should stabilize be applied to the upload. */
        stabilize?: boolean;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: {
      content: {
        'application/octet-stream': components['schemas']['Video'];
        'video/1d-interleaved-parityfec': components['schemas']['Video'];
        'video/3gpp': components['schemas']['Video'];
        'video/3gpp-tt': components['schemas']['Video'];
        'video/3gpp2': components['schemas']['Video'];
        'video/av1': components['schemas']['Video'];
        'video/bmpeg': components['schemas']['Video'];
        'video/bt656': components['schemas']['Video'];
        'video/celb': components['schemas']['Video'];
        'video/dv': components['schemas']['Video'];
        'video/encaprtp': components['schemas']['Video'];
        'video/ffv1': components['schemas']['Video'];
        'video/flexfec': components['schemas']['Video'];
        'video/h261': components['schemas']['Video'];
        'video/h263': components['schemas']['Video'];
        'video/h263-1998': components['schemas']['Video'];
        'video/h263-2000': components['schemas']['Video'];
        'video/h264': components['schemas']['Video'];
        'video/h264-rcdo': components['schemas']['Video'];
        'video/h264-svc': components['schemas']['Video'];
        'video/h265': components['schemas']['Video'];
        'video/iso.segment': components['schemas']['Video'];
        'video/jpeg': components['schemas']['Video'];
        'video/jpeg2000': components['schemas']['Video'];
        'video/jpm': components['schemas']['Video'];
        'video/jxsv': components['schemas']['Video'];
        'video/mj2': components['schemas']['Video'];
        'video/mp1s': components['schemas']['Video'];
        'video/mp2p': components['schemas']['Video'];
        'video/mp2t': components['schemas']['Video'];
        'video/mp4': components['schemas']['Video'];
        'video/mp4v-es': components['schemas']['Video'];
        'video/mpeg': components['schemas']['Video'];
        'video/mpeg4-generic': components['schemas']['Video'];
        'video/mpv': components['schemas']['Video'];
        'video/nv': components['schemas']['Video'];
        'video/ogg': components['schemas']['Video'];
        'video/parityfec': components['schemas']['Video'];
        'video/pointer': components['schemas']['Video'];
        'video/quicktime': components['schemas']['Video'];
        'video/raptorfec': components['schemas']['Video'];
        'video/raw': components['schemas']['Video'];
        'video/rtp-enc-aescm128': components['schemas']['Video'];
        'video/rtploopback': components['schemas']['Video'];
        'video/rtx': components['schemas']['Video'];
        'video/scip': components['schemas']['Video'];
        'video/smpte291': components['schemas']['Video'];
        'video/smpte292m': components['schemas']['Video'];
        'video/ulpfec': components['schemas']['Video'];
        'video/vc1': components['schemas']['Video'];
        'video/vc2': components['schemas']['Video'];
        'video/vnd.cctv': components['schemas']['Video'];
        'video/vnd.dece.hd': components['schemas']['Video'];
        'video/vnd.dece.mobile': components['schemas']['Video'];
        'video/vnd.dece.mp4': components['schemas']['Video'];
        'video/vnd.dece.pd': components['schemas']['Video'];
        'video/vnd.dece.sd': components['schemas']['Video'];
        'video/vnd.dece.video': components['schemas']['Video'];
        'video/vnd.directv.mpeg': components['schemas']['Video'];
        'video/vnd.directv.mpeg-tts': components['schemas']['Video'];
        'video/vnd.dlna.mpeg-tts': components['schemas']['Video'];
        'video/vnd.dvb.file': components['schemas']['Video'];
        'video/vnd.fvt': components['schemas']['Video'];
        'video/vnd.hns.video': components['schemas']['Video'];
        'video/vnd.iptvforum.1dparityfec-1010': components['schemas']['Video'];
        'video/vnd.iptvforum.1dparityfec-2005': components['schemas']['Video'];
        'video/vnd.iptvforum.2dparityfec-1010': components['schemas']['Video'];
        'video/vnd.iptvforum.2dparityfec-2005': components['schemas']['Video'];
        'video/vnd.iptvforum.ttsavc': components['schemas']['Video'];
        'video/vnd.iptvforum.ttsmpeg2': components['schemas']['Video'];
        'video/vnd.motorola.video': components['schemas']['Video'];
        'video/vnd.motorola.videop': components['schemas']['Video'];
        'video/vnd.mpegurl': components['schemas']['Video'];
        'video/vnd.ms-playready.media.pyv': components['schemas']['Video'];
        'video/vnd.nokia.interleaved-multimedia': components['schemas']['Video'];
        'video/vnd.nokia.mp4vr': components['schemas']['Video'];
        'video/vnd.nokia.videovoip': components['schemas']['Video'];
        'video/vnd.objectvideo': components['schemas']['Video'];
        'video/vnd.radgamettools.bink': components['schemas']['Video'];
        'video/vnd.radgamettools.smacker': components['schemas']['Video'];
        'video/vnd.sealed.mpeg1': components['schemas']['Video'];
        'video/vnd.sealed.mpeg4': components['schemas']['Video'];
        'video/vnd.sealed.swf': components['schemas']['Video'];
        'video/vnd.sealedmedia.softseal.mov': components['schemas']['Video'];
        'video/vnd.uvvu.mp4': components['schemas']['Video'];
        'video/vnd.vivo': components['schemas']['Video'];
        'video/vnd.youtube.yt': components['schemas']['Video'];
        'video/vp8': components['schemas']['Video'];
        'video/vp9': components['schemas']['Video'];
        'video/webm': components['schemas']['Video'];
        'video/x-f4v': components['schemas']['Video'];
        'video/x-fli': components['schemas']['Video'];
        'video/x-flv': components['schemas']['Video'];
        'video/x-m4v': components['schemas']['Video'];
        'video/x-matroska': components['schemas']['Video'];
        'video/x-mng': components['schemas']['Video'];
        'video/x-ms-asf': components['schemas']['Video'];
        'video/x-ms-vob': components['schemas']['Video'];
        'video/x-ms-wm': components['schemas']['Video'];
        'video/x-ms-wmv': components['schemas']['Video'];
        'video/x-ms-wmx': components['schemas']['Video'];
        'video/x-ms-wvx': components['schemas']['Video'];
        'video/x-msvideo': components['schemas']['Video'];
        'video/x-sgi-movie': components['schemas']['Video'];
        'video/x-smv': components['schemas']['Video'];
      };
    };
    responses: {
      /** @description Successful response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['Video'];
        };
      };
    };
  };
  'youtube.videos.delete': {
    parameters: {
      query: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
        id: string;
        /** @description *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The actual CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
        onBehalfOfContentOwner?: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  'youtube.videos.getRating': {
    parameters: {
      query: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
        id: string[];
        /** @description *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
        onBehalfOfContentOwner?: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['VideoGetRatingResponse'];
        };
      };
    };
  };
  'youtube.videos.rate': {
    parameters: {
      query: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
        id: string;
        rating: 'none' | 'like' | 'dislike';
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  'youtube.videos.reportAbuse': {
    parameters: {
      query?: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
        /** @description *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
        onBehalfOfContentOwner?: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: {
      content: {
        'application/json': components['schemas']['VideoAbuseReport'];
      };
    };
    responses: {
      /** @description Successful response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  'youtube.watermarks.set': {
    parameters: {
      query: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
        channelId: string;
        /** @description *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
        onBehalfOfContentOwner?: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: {
      content: {
        'application/octet-stream': components['schemas']['InvideoBranding'];
        'image/jpeg': components['schemas']['InvideoBranding'];
        'image/png': components['schemas']['InvideoBranding'];
      };
    };
    responses: {
      /** @description Successful response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  'youtube.watermarks.unset': {
    parameters: {
      query: {
        /** @description V1 error format. */
        '$.xgafv'?: components['parameters']['_.xgafv'];
        /** @description OAuth access token. */
        access_token?: components['parameters']['access_token'];
        /** @description Data format for response. */
        alt?: components['parameters']['alt'];
        /** @description JSONP */
        callback?: components['parameters']['callback'];
        /** @description Selector specifying which fields to include in a partial response. */
        fields?: components['parameters']['fields'];
        /** @description API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: components['parameters']['key'];
        /** @description OAuth 2.0 token for the current user. */
        oauth_token?: components['parameters']['oauth_token'];
        /** @description Returns response with indentations and line breaks. */
        prettyPrint?: components['parameters']['prettyPrint'];
        /** @description Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: components['parameters']['quotaUser'];
        /** @description Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: components['parameters']['upload_protocol'];
        /** @description Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: components['parameters']['uploadType'];
        channelId: string;
        /** @description *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
        onBehalfOfContentOwner?: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
}
