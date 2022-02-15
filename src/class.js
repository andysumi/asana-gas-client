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

    // Tasks
    AsanaClient.prototype.getAllTasks = function (workspaceId, projectId, sectionId, userId, completedSince, modifiedSince, params) {
      var parameter = {};
      if (workspaceId) parameter['workspace'] = workspaceId;
      if (projectId) parameter['project'] = projectId;
      if (sectionId) parameter['section'] = sectionId;
      if (userId) parameter['assignee'] = userId;
      if (completedSince) parameter['completed_since'] = completedSince;
      if (modifiedSince) parameter['modified_since'] = modifiedSince;
      return this.fetch_(Utilities.formatString('/tasks?%s', this.buildUrlParam_(_.extend(parameter, params))), { 'method': 'get' });
    };
    AsanaClient.prototype.getSpecificTask = function (taskId, params) {
      if (!taskId) throw new Error('"taskId"は必須です');
      return this.fetch_(Utilities.formatString('/tasks/%s?%s', taskId, this.buildUrlParam_(params)), { 'method': 'get' });
    };
    AsanaClient.prototype.getTasksInProject = function (projectId, params) {
      var id = projectId || this.projectId;
      return this.fetch_(Utilities.formatString('/projects/%s/tasks?%s', id, this.buildUrlParam_(params)), { 'method': 'get' });
    };
    AsanaClient.prototype.getTasksInSection = function (sectionId, params) {
      if (!sectionId) throw new Error('"sectionId"は必須です');
      return this.fetch_(Utilities.formatString('/sections/%s/tasks?%s', sectionId, this.buildUrlParam_(params)), { 'method': 'get' });
    };
    AsanaClient.prototype.getTasksWithTag = function (tagId, params) {
      if (!tagId) throw new Error('"tagId"は必須です');
      return this.fetch_(Utilities.formatString('/tags/%s/tasks?%s', tagId, this.buildUrlParam_(params)), { 'method': 'get' });
    };
    AsanaClient.prototype.getSubTasksInTask = function (taskId, params) {
      if (!taskId) throw new Error('"taskId"は必須です');
      return this.fetch_(Utilities.formatString('/tasks/%s/subtasks?%s', taskId, this.buildUrlParam_(params)), { 'method': 'get' });
    };
    AsanaClient.prototype.searchTaskInWorkspace = function (workspaceId, keys, params) {
      if (!keys) throw new Error('"keys"は必須です');
      var id = workspaceId || this.workspaceId;
      return this.fetch_(Utilities.formatString('/workspaces/%s/tasks/search?%s', id, this.buildUrlParam_(_.extend(keys, params))), { 'method': 'get' });
    };

    // Sections
    AsanaClient.prototype.getSpecificSection = function (sectionId, params) {
      if (!sectionId) throw new Error('"sectionId"は必須です');
      return this.fetch_(Utilities.formatString('/sections/%s?%s', sectionId, this.buildUrlParam_(params)), { 'method': 'get' });
    };
    AsanaClient.prototype.getSectionsInProject = function (projectId, params) {
      var id = projectId || this.projectId;
      return this.fetch_(Utilities.formatString('/projects/%s/sections?%s', id, this.buildUrlParam_(params)), { 'method': 'get' });
    };

    // Story
    AsanaClient.prototype.postCommentToTask = function (taskId, text, htmlText, isPinned, params) {
      if (!taskId) throw new Error('"taskId"は必須です');
      if (!text && !htmlText) throw new Error('"text"または"htmlText"は必須です');

      var body = { 'data': { 'is_pinned': isPinned }};
      if (text) body['data']['text'] = text;
      if (htmlText) body['data']['html_text'] = htmlText;
      return this.fetch_(Utilities.formatString('/tasks/%s/stories?%s', taskId, this.buildUrlParam_(params)), { 'method' : 'post', 'payload': body });
    };

    AsanaClient.prototype.postStickerToTask = function (taskId, stickerName, isPinned, params) {
      if (!taskId) throw new Error('"taskId"は必須です');
      if (!stickerName) throw new Error('"stickerName"は必須です');

      var body = { 'data': { 'is_pinned': isPinned, 'sticker_name': stickerName}};
      return this.fetch_(Utilities.formatString('/tasks/%s/stories?%s', taskId, this.buildUrlParam_(params)), { 'method' : 'post', 'payload': body });
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
        payload           : JSON.stringify(options.payload)
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
