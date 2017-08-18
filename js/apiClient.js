/**
 * Request next set of members thought ApiGetClient
 */
var ApiGetClient = new Class({
  Extends: Request,
  options: {
    headers: {
      Accept: 'application/json'
    },
    method: 'get',
    queryparams: null,
    apibaseurl: '',
    apipath: ''
  },

  initialize: function(options) {
    this.parent(options);
    this.setApiUrl();
    this.setQueryParams(this.options.queryparams);
    this.send();
  },

  setApiUrl: function() {
    this.apiurl = this.options.apibaseurl;
    this.apiurl += this.options.apipath;
  },

  setQueryParams: function(params) {
    var apiquerystring = {};
    if (params) {
      Object.merge(apiquerystring, params);
    }
    if (Object.getLength(apiquerystring) > 0) {
      this.apiurl += '?' + Object.toQueryString(apiquerystring);
      this.apiurl = this.apiurl.replace("'", '%27');
    }
  },

  getRequestUrl: function() {
    return this.apiurl;
  },

  send: function(query_string) {
    if (typeof(query_string) === 'string') {
      this.setOptions({
        postdata: query_string.parseQueryString()
      });
    }
    var requesturl = this.getRequestUrl();
    this.setOptions({
      url: requesturl,
      data: this.options.postdata
    });
    this.parent(query_string);
  }

});
