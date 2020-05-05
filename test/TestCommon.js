var TestCommon_ = function () {
  var properties = PropertiesService.getUserProperties();
  this.token = properties.getProperty('TOKEN');
  this.workspaceId = properties.getProperty('WORKSPACE_ID');
  this.teamId = properties.getProperty('TEAM_ID');
  this.projectId = properties.getProperty('PROJECT_ID');
  this.projectStatusId = properties.getProperty('PROJECT_STATUS_ID');
};

TestCommon_.prototype.getClientUser = function () {
  this.client = new AsanaClient(this.token, this.workspaceId, this.teamId, this.projectId);
  return this.client;
};
