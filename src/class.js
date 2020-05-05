(function (global) {
  var AsanaClient = (function () {
    function AsanaClient(token, workspaceId, teamId, projectId) {
      if (!token) throw new Error('"token"は必須です');

      this.apiUrl = 'https://app.asana.com/api/1.0';
      this.headers = { 'Authorization': 'Bearer ' + token };
      this.workspaceId = workspaceId;
      this.teamId = teamId;
      this.projectId = projectId;
    }

    // Workspaces
    AsanaClient.prototype.getAllWorkspaces = function (params) {
      return this.fetch_(Utilities.formatString('/workspaces?%s', this.buildUrlParam_(params)), { 'method': 'get' });
    };
    AsanaClient.prototype.getSpecificWorkspace = function (workspaceId, params) {
      var id = workspaceId || this.workspaceId;
      return this.fetch_(Utilities.formatString('/workspaces/%s?%s', id, this.buildUrlParam_(params)), { 'method': 'get' });
    };

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

    AsanaClient.prototype.buildUrlParam_ = function (params) {
      if (!params) return '';

      var temp = [];
      for (var key in params) {
        temp.push(Utilities.formatString('%s=%s', key, encodeURIComponent(params[key])));
      }
      return temp.join('&');
    };

    AsanaClient.prototype.fetch_ = function (endPoint, options) {
      var url = this.apiUrl + endPoint;
      var params = {
        method             : options.method,
        muteHttpExceptions : true,
        contentType        : 'application/json; charset=utf-8',
        headers            : this.headers,
        payload            : options.payload || {}
      };
      var response = UrlFetchApp.fetch(url, params);
      var contents = JSON.parse(response.getContentText('utf-8'));

      if (!/2\d\d/.test(response.getResponseCode())) {
        return contents;
      }

      var data = contents.data;
      while (contents.next_page) {
        url = contents.next_page.uri;
        contents = JSON.parse(UrlFetchApp.fetch(url, params).getContentText('utf-8'));
        data.push.apply(data, contents.data);
      }
      return data;
    };

    return AsanaClient;
  })();
  return global.AsanaClient = AsanaClient;
})(this);
