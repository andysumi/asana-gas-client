(function (global) {
  var AsanaClient = (function () {
    var _ = Underscore.load();

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

    // Teams
    AsanaClient.prototype.getSpecificTeam = function (teamId, params) {
      var id = teamId || this.teamId;
      return this.fetch_(Utilities.formatString('/teams/%s?%s', id, this.buildUrlParam_(params)), { 'method': 'get' });
    };
    AsanaClient.prototype.getTeamsInWorkspace = function (workspaceId, params) {
      var id = workspaceId || this.workspaceId;
      return this.fetch_(Utilities.formatString('/organizations/%s/teams?%s', id, this.buildUrlParam_(params)), { 'method': 'get' });
    };

    // Projects
    AsanaClient.prototype.getAllProjects = function (workspaceId, teamId, isArchived, params) {
      var parameter = {};
      if (workspaceId) parameter['workspace'] = workspaceId;
      if (teamId) parameter['team'] = teamId;
      if (isArchived != null) parameter['archived'] = isArchived;
      return this.fetch_(Utilities.formatString('/projects?%s', this.buildUrlParam_(_.extend(parameter, params))), { 'method': 'get' });
    };
    AsanaClient.prototype.getSpecificProject = function (projectId, params) {
      var id = projectId || this.projectId;
      return this.fetch_(Utilities.formatString('/projects/%s?%s', id, this.buildUrlParam_(params)), { 'method': 'get' });
    };
    AsanaClient.prototype.getProjectsInTeam = function (teamId, isArchived, params) {
      var id = teamId || this.teamId;
      var parameter = {};
      if (isArchived != null) parameter['archived'] = isArchived;
      return this.fetch_(Utilities.formatString('/teams/%s/projects?%s', id, this.buildUrlParam_(_.extend(parameter, params))), { 'method': 'get' });
    };
    AsanaClient.prototype.getProjectsInWorkspace = function (workspaceId, isArchived, params) {
      var id = workspaceId || this.workspaceId;
      var parameter = {};
      if (isArchived != null) parameter['archived'] = isArchived;
      return this.fetch_(Utilities.formatString('/workspaces/%s/projects?%s', id, this.buildUrlParam_(_.extend(parameter, params))), { 'method': 'get' });
    };
    AsanaClient.prototype.countProjectTasks = function (projectId, params) {
      var id = projectId || this.projectId;
      var res = this.fetch_(Utilities.formatString('/projects/%s/task_counts?%s', id, this.buildUrlParam_(params)), { 'method': 'get' });
      return res.data;
    };
    AsanaClient.prototype.getSpecificProjectStatus = function (projectStatusId, params) {
      if (!projectStatusId) throw new Error('"projectStatusId"は必須です');
      return this.fetch_(Utilities.formatString('/project_statuses/%s?%s', projectStatusId, this.buildUrlParam_(params)), { 'method': 'get' });
    };
    AsanaClient.prototype.getStatusesFromProject = function (projectId, params) {
      var id = projectId || this.projectId;
      return this.fetch_(Utilities.formatString('/projects/%s/project_statuses?%s', id, this.buildUrlParam_(params)), { 'method': 'get' });
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
      var response = UrlFetchApp.fetch(url, {
        method            : options.method,
        muteHttpExceptions: true,
        contentType       : 'application/json; charset=utf-8',
        headers           : this.headers,
        payload           : options.payload || {}
      });
      try {
        return JSON.parse(response.getContentText('utf-8'));
      } catch (err) {
        return response.getContentText('utf-8');
      }
    };

    return AsanaClient;
  })();
  return global.AsanaClient = AsanaClient;
})(this);
