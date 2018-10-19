(function (global) {
  var AsanaClient = (function () {
    function AsanaClient(token, workspaceId, projectId) {
      this.apiUrl = 'https://app.asana.com/api/1.0';
      this.headers = { 'Authorization': 'Bearer ' + token };
      this.workspaceId = workspaceId;
      this.projectId = projectId;
      if (!token) throw new Error('"token"は必須です');
    }

    AsanaClient.prototype.getProjectsInWorkspace = function (workspaceId) {
      var id = workspaceId || this.workspaceId;
      return this.fetch_(Utilities.formatString('/workspaces/%d/projects', id), { 'method': 'get' });
    };

    AsanaClient.prototype.fetch_ = function (endPoint, options) {
      var url = this.apiUrl + endPoint;
      var response = UrlFetchApp.fetch(url, {
        'method': options.method,
        'muteHttpExceptions': true,
        'contentType': 'application/json; charset=utf-8',
        'headers': this.headers,
        'payload': options.payload || {}
      });
      return JSON.parse(response.getContentText());
    };

    return AsanaClient;
  })();
  return global.AsanaClient = AsanaClient;
})(this);
