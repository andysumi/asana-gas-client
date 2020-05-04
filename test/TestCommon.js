var TestCommon = function () {
  var properties = PropertiesService.getUserProperties();
  this.token = properties.getProperty('TOKEN');
  this.organizationId = properties.getProperty('ORGANIZATION_ID');
  this.workspaceId = properties.getProperty('WORKSPACE_ID');
  this.teamId = properties.getProperty('TEAM_ID');
  this.projectId = properties.getProperty('PROJECT_ID');
};

TestCommon.prototype.getClientUser = function () {
  this.client = new AsanaClient(this.token, this.organizationId, this.workspaceId, this.teamId, this.projectId);
  return this.client;
};
