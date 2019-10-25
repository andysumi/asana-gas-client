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

    AsanaClient.prototype.getSpecificProject = function (projectId) {
      var id = projectId || this.projectId;
      return this.fetch_(Utilities.formatString('/projects/%d', id), { 'method': 'get' });
    };

    AsanaClient.prototype.getTasksInProject = function (projectId) {
      var id = projectId || this.projectId;
      return this.fetch_(Utilities.formatString('/projects/%d/tasks', id), { 'method': 'get' });
    };

    AsanaClient.prototype.getSpecificTask = function (taskId) {
      return this.fetch_(Utilities.formatString('/tasks/%d', taskId), { 'method': 'get' });
    };

    AsanaClient.prototype.searchTask = function (workspaceId, params) {
      var id = workspaceId || this.workspaceId;
      var parameter = this.buildUrlParam_(params);
      return this.fetch_(Utilities.formatString('/workspaces/%d/tasks/search?%s', id, parameter), { 'method': 'get' });
    };

    AsanaClient.prototype.countProjectTasks = function (projectId, fields) {
      if (!fields) throw new Error('"fields"は必須です');
      var id = projectId || this.projectId;
      var res = this.fetch_(Utilities.formatString('/projects/%s/task_counts?opt_fields=%s', id, fields.join(',')), { 'method': 'get' });
      return res.data;
    };

    AsanaClient.prototype.buildUrlParam_ = function (options) {
      var params = [];
      for (var key in options) {
        params.push(Utilities.formatString('%s=%s', key, encodeURIComponent(options[key])));
      }
      return params.join('&');
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
