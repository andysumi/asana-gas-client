var TestCommon_ = function () {
  var properties = PropertiesService.getUserProperties();
  this.token = properties.getProperty('TOKEN');
  this.workspaceId = properties.getProperty('WORKSPACE_ID');
  this.teamId = properties.getProperty('TEAM_ID');
  this.projectId = properties.getProperty('PROJECT_ID');
  this.projectStatusId = properties.getProperty('PROJECT_STATUS_ID');
  this.sectionId = properties.getProperty('SECTION_ID');
  this.taskId = properties.getProperty('TASK_ID');
  this.tagId = properties.getProperty('TAG_ID');
  this.userId = properties.getProperty('USER_ID');
};

TestCommon_.prototype.getClientUser = function () {
  this.client = new AsanaClient(this.token, this.workspaceId, this.teamId, this.projectId);
  return this.client;
};
