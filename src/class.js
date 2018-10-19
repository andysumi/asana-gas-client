(function (global) {
  var AsanaClient = (function () {
    function AsanaClient(token, workspaceId, projectId) {
      this.apiUrl = 'https://app.asana.com/api/1.0';
      this.headers = { 'Authorization': 'Bearer ' + token };
      this.workspaceId = workspaceId;
      this.projectId = projectId;
      if (!token) throw new Error('"token"は必須です');
    }
    return AsanaClient;
  })();
  return global.AsanaClient = AsanaClient;
})(this);
