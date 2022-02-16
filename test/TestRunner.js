/* global TestCommon_ */

function TestRunner() { // eslint-disable-line no-unused-vars
  if ((typeof GasTap) === 'undefined') { // GasT Initialization. (only if not initialized yet.)
    eval(UrlFetchApp.fetch('https://raw.githubusercontent.com/zixia/gast/master/src/gas-tap-lib.js').getContentText());
  } // Class GasTap is ready for use now!

  var test = new GasTap();
  var common = new TestCommon_();

  try {
    /***** Test cases ******************************/
    // Workspace
    testGetAllWorkspaces_(test, common);
    testGetSpecificWorkspace_(test, common);
    // Team
    testGetSpecificTeam_(test, common);
    testGetTeamsInWorkspace_(test, common);
    // Project
    testGetAllProjects_(test, common);
    testGetSpecificProject_(test, common);
    testGetProjectsInTeam_(test, common);
    testGetProjectsInWorkspace_(test, common);
    testCountProjectTasks_(test, common);
    testGetSpecificProjectStatus_(test, common);
    testGetStatusesFromProject_(test, common);
    // Task
    testGetAllTasks_(test, common);
    testGetSpecificTask_(test, common);
    testGetTasksInProject_(test, common);
    testGetTasksInSection_(test, common);
    testGetTasksWithTag_(test, common);
    testGetSubTasksInTask_(test, common);
    testSearchTaskInWorkspace_(test, common);
    // Section
    testGetSpecificSection_(test, common);
    testGetSectionsInProject_(test, common);
    // Story
    testPostCommentToTask_(test, common);
    testPostStickerToTask_(test, common);
    /***********************************************/
  } catch (err) {
    test('Exception occurred', function f(assert) {
      Logger.log(err);
      assert.fail(err);
    });
  }

  test.finish();

  return {
    successd: test.totalSucceed(),
    failed: test.totalFailed(),
    skipped: test.totalSkipped(),
    log: Logger.getLog()
  };
}

function testGetAllWorkspaces_(test, common) {
  var client = common.getClientUser();

  test('getAllWorkspaces() - 正常系(引数なし)', function (t) {
    var result = client.getAllWorkspaces();
    t.ok(result instanceof Object, 'Objectで取得できること');
    t.equal(result.data[0].resource_type, 'workspace', 'resource_typeが"workspace"であること');
  });

  test('getAllWorkspaces() - 正常系(paramsあり)', function (t) {
    var fields = ['name'];
    var limit = 1;
    var result = client.getAllWorkspaces({ opt_pretty: true, opt_fields: fields, limit: limit });
    t.ok(result instanceof Object, 'Objectで取得できること');
    t.ok(result.data.length === limit, '"limit"で指定した要素の数が取得できること');
    t.ok(Object.prototype.hasOwnProperty.call(result.data[0], fields[0]), '"opt_fields"で指定したfieldを含むこと');
    t.ok(Object.prototype.hasOwnProperty.call(result, 'next_page'), '"next_page"を含むこと');
  });
}

function testGetSpecificWorkspace_(test, common) {
  var client = common.getClientUser();

  test('getSpecificWorkspace() - 正常系(引数なし)', function (t) {
    var result = client.getSpecificWorkspace();
    t.ok(result instanceof Object, 'Objectで取得できること');
    t.equal(result.data.resource_type, 'workspace', 'resource_typeが"workspace"であること');
  });

  test('getSpecificWorkspace() - 正常系(workspaceId)', function (t) {
    var id = common.workspaceId;
    var result = client.getSpecificWorkspace(id);
    t.ok(result instanceof Object, 'Objectで取得できること');
    t.equal(result.data.resource_type, 'workspace', 'resource_typeが"workspace"であること');
    t.equal(result.data.gid, id, 'idが正しいこと');
  });

  test('getSpecificWorkspace() - 正常系(params)', function (t) {
    var id = common.workspaceId;
    var fields = ['name'];
    var result = client.getSpecificWorkspace(id, { opt_pretty: true, opt_fields: fields });
    t.ok(result instanceof Object, 'Objectで取得できること');
    t.ok(Object.prototype.hasOwnProperty.call(result.data, fields[0]), '"opt_fields"で指定したfieldを含むこと');
    t.equal(result.data.gid, id, 'idが正しいこと');
  });
}

function testGetSpecificTeam_(test, common) {
  var client = common.getClientUser();

  test('getSpecificTeam() - 正常系(引数なし)', function (t) {
    var result = client.getSpecificTeam();
    t.ok(result instanceof Object, 'Objectで取得できること');
    t.equal(result.data.resource_type, 'team', 'resource_typeが"team"であること');
  });

  test('getSpecificTeam() - 正常系(teamId)', function (t) {
    var id = common.teamId;
    var result = client.getSpecificTeam(id);
    t.ok(result instanceof Object, 'Objectで取得できること');
    t.equal(result.data.resource_type, 'team', 'resource_typeが"team"であること');
    t.equal(result.data.gid, id, 'idが正しいこと');
  });

  test('getSpecificTeam() - 正常系(prams)', function (t) {
    var id = common.teamId;
    var fields = ['name'];
    var result = client.getSpecificTeam(id, { opt_pretty: true, opt_fields: fields });
    t.ok(result instanceof Object, 'Objectで取得できること');
    t.ok(Object.prototype.hasOwnProperty.call(result.data, fields[0]), '"opt_fields"で指定したfieldを含むこと');
    t.equal(result.data.gid, id, 'idが正しいこと');
  });
}

function testGetTeamsInWorkspace_(test, common) {
  var client = common.getClientUser();

  test('getTeamsInWorkspace() - 正常系(引数なし)', function (t) {
    var result = client.getTeamsInWorkspace();
    t.ok(result instanceof Object, 'Objectで取得できること');
    t.equal(result.data[0].resource_type, 'team', 'resource_typeが"team"であること');
  });

  test('getTeamsInWorkspace() - 正常系(workspaceId)', function (t) {
    var id = common.workspaceId;
    var result = client.getTeamsInWorkspace(id);
    t.ok(result instanceof Object, 'Objectで取得できること');
    t.equal(result.data[0].resource_type, 'team', 'resource_typeが"team"であること');
  });

  test('getTeamsInWorkspace() - 正常系(params)', function (t) {
    var id = common.workspaceId;
    var fields = ['name'];
    var limit = 3;
    var result = client.getTeamsInWorkspace(id, { opt_pretty: true, opt_fields: fields, limit: limit });
    t.ok(result instanceof Object, 'Objectで取得できること');
    t.ok(result.data.length === limit, '"limit"で指定した要素の数が取得できること');
    t.ok(Object.prototype.hasOwnProperty.call(result, 'next_page'), '"next_page"を含むこと');
  });
}

function testGetAllProjects_(test, common) {
  var client = common.getClientUser();

  test('getAllProjects() - 正常系(引数なし)', function (t) {
    var result = client.getAllProjects();
    t.ok(result instanceof Object, 'Objectで取得できること');
    t.equal(result.data[0].resource_type, 'project', 'resource_typeが"project"であること');
  });

  test('getAllProjects() - 正常系(workspaceId)', function (t) {
    var workspaceId = common.workspaceId;
    var result = client.getAllProjects(workspaceId);
    t.ok(result instanceof Object, 'Objectで取得できること');
    t.equal(result.data[0].resource_type, 'project', 'resource_typeが"project"であること');
  });

  test('getAllProjects() - 正常系(teamId)', function (t) {
    var teamId = common.teamId;
    var result = client.getAllProjects(null, teamId);
    t.ok(result instanceof Object, 'Objectで取得できること');
    t.equal(result.data[0].resource_type, 'project', 'resource_typeが"project"であること');
  });

  test('getAllProjects() - 正常系(isArchived)', function (t) {
    var isArchived = true;
    var result = client.getAllProjects(null , null, isArchived);
    t.ok(result instanceof Object, 'Objectで取得できること');
    t.equal(result.data[0].resource_type, 'project', 'resource_typeが"project"であること');
  });

  test('getAllProjects() - 正常系(params)', function (t) {
    var workspaceId = common.workspaceId;
    var teamId = common.teamId;
    var isArchived = true;
    var fields = ['name'];
    var limit = 1;
    var result = client.getAllProjects(workspaceId, teamId, isArchived, { opt_pretty: true, opt_fields: fields, limit: limit });
    t.ok(result instanceof Object, 'Objectで取得できること');
    t.ok(result.data.length === limit, '"limit"で指定した要素の数が取得できること');
    t.ok(Object.prototype.hasOwnProperty.call(result.data[0], fields[0]), '"opt_fields"で指定したfieldを含むこと');
    t.ok(Object.prototype.hasOwnProperty.call(result, 'next_page'), '"next_page"を含むこと');
  });
}

function testGetSpecificProject_(test, common) {
  var client = common.getClientUser();

  test('getSpecificProject() - 正常系(引数なし)', function (t) {
    var result = client.getSpecificProject();
    t.ok(result instanceof Object, 'Objectで取得できること');
    t.equal(result.data.resource_type, 'project', 'resource_typeが"project"であること');
  });

  test('getSpecificProject() - 正常系(projectId)', function (t) {
    var id = common.projectId;
    var result = client.getSpecificProject(id);
    t.ok(result instanceof Object, 'Objectで取得できること');
    t.equal(result.data.resource_type, 'project', 'resource_typeが"project"であること');
    t.equal(result.data.gid, id, 'idが正しいこと');
  });

  test('getSpecificProject() - 正常系(params)', function (t) {
    var id = common.projectId;
    var fields = ['name'];
    var result = client.getSpecificProject(id , { opt_pretty: true, opt_fields: fields });
    t.ok(result instanceof Object, 'Objectで取得できること');
    t.ok(Object.prototype.hasOwnProperty.call(result.data, fields[0]), '"opt_fields"で指定したfieldを含むこと');
    t.equal(result.data.gid, id, 'idが正しいこと');
  });
}

function testGetProjectsInTeam_(test, common) {
  var client = common.getClientUser();

  test('getProjectsInTeam() - 正常系(引数なし)', function (t) {
    var result = client.getProjectsInTeam();
    t.ok(result instanceof Object, 'Objectで取得できること');
    t.equal(result.data[0].resource_type, 'project', 'resource_typeが"project"であること');
  });

  test('getProjectsInTeam() - 正常系(teamId)', function (t) {
    var teamId = common.teamId;
    var result = client.getProjectsInTeam(teamId);
    t.ok(result instanceof Object, 'Objectで取得できること');
    t.equal(result.data[0].resource_type, 'project', 'resource_typeが"project"であること');
  });

  test('getProjectsInTeam() - 正常系(isArchived)', function (t) {
    var isArchived = true;
    var result = client.getProjectsInTeam(null, isArchived);
    t.ok(result instanceof Object, 'Objectで取得できること');
    t.equal(result.data[0].resource_type, 'project', 'resource_typeが"project"であること');
  });

  test('getProjectsInTeam() - 正常系(params)', function (t) {
    var teamId = common.teamId;
    var isArchived = true;
    var fields = ['name'];
    var limit = 1;
    var result = client.getProjectsInTeam(teamId, isArchived, { opt_pretty: true, opt_fields: fields, limit: limit });
    t.ok(result instanceof Object, 'Objectで取得できること');
    t.ok(result.data.length === limit, '"limit"で指定した要素の数が取得できること');
    t.ok(Object.prototype.hasOwnProperty.call(result.data[0], fields[0]), '"opt_fields"で指定したfieldを含むこと');
    t.ok(Object.prototype.hasOwnProperty.call(result, 'next_page'), '"next_page"を含むこと');
  });
}

function testGetProjectsInWorkspace_(test, common) {
  var client = common.getClientUser();

  test('getProjectsInWorkspace() - 正常系(引数なし)', function (t) {
    var result = client.getProjectsInWorkspace();
    t.ok(result instanceof Object, 'Objectで取得できること');
    t.equal(result.data[0].resource_type, 'project', 'resource_typeが"project"であること');
  });

  test('getProjectsInWorkspace() - 正常系(workspaceId)', function (t) {
    var workspaceId = common.workspaceId;
    var result = client.getProjectsInWorkspace(workspaceId);
    t.ok(result instanceof Object, 'Objectで取得できること');
    t.equal(result.data[0].resource_type, 'project', 'resource_typeが"project"であること');
  });

  test('getProjectsInWorkspace() - 正常系(isArchived)', function (t) {
    var isArchived = true;
    var result = client.getProjectsInWorkspace(null, isArchived);
    t.ok(result instanceof Object, 'Objectで取得できること');
    t.equal(result.data[0].resource_type, 'project', 'resource_typeが"project"であること');
  });

  test('getProjectsInWorkspace() - 正常系(params)', function (t) {
    var workspaceId = common.workspaceId;
    var isArchived = true;
    var fields = ['name'];
    var limit = 1;
    var result = client.getProjectsInWorkspace(workspaceId, isArchived, { opt_pretty: true, opt_fields: fields, limit: limit });
    t.ok(result instanceof Object, 'Objectで取得できること');
    t.ok(result.data.length === limit, '"limit"で指定した要素の数が取得できること');
    t.ok(Object.prototype.hasOwnProperty.call(result.data[0], fields[0]), '"opt_fields"で指定したfieldを含むこと');
    t.ok(Object.prototype.hasOwnProperty.call(result, 'next_page'), '"next_page"を含むこと');
  });
}

function testCountProjectTasks_(test, common) {
  var client = common.getClientUser();

  test('countProjectTasks() - 正常系(引数なし)', function (t) {
    var result = client.countProjectTasks();
    t.ok(result instanceof Object, 'Objectで取得できること');
    t.deepEqual(result, {}, '空であること');
  });

  test('countProjectTasks() - 正常系(projectId)', function (t) {
    var projectId = common.projectId;
    var result = client.countProjectTasks(projectId);
    t.ok(result instanceof Object, 'Objectで取得できること');
    t.deepEqual(result, {}, '空であること');
  });

  test('countProjectTasks() - 正常系(params)', function (t) {
    var projectId = common.projectId;
    var fields = ['num_tasks'];
    var result = client.countProjectTasks(projectId, { opt_pretty: true, opt_fields: fields });
    t.ok(result instanceof Object, 'Objectで取得できること');
    t.ok(Object.prototype.hasOwnProperty.call(result, fields[0]), '"opt_fields"で指定したfieldを含むこと');
  });
}

function testGetSpecificProjectStatus_(test, common) {
  var client = common.getClientUser();

  test('getSpecificProjectStatus() - 異常系(引数なし)', function (t) {
    t.throws(function () {
      return client.getSpecificProjectStatus();
    },
    '"id"を指定していない場合はエラー');
  });

  test('getSpecificProjectStatus() - 正常系(projectStatusId)', function (t) {
    var id = common.projectStatusId;
    var result = client.getSpecificProjectStatus(id);
    t.ok(result instanceof Object, 'Objectで取得できること');
    t.equal(result.data.resource_type, 'project_status', 'resource_typeが"project_status"であること');
    t.equal(result.data.gid, id, 'idが正しいこと');
  });

  test('getSpecificProjectStatus() - 正常系(params)', function (t) {
    var id = common.projectStatusId;
    var fields = ['title'];
    var result = client.getSpecificProjectStatus(id, { opt_pretty: true, opt_fields: fields });
    t.ok(result instanceof Object, 'Objectで取得できること');
    t.ok(Object.prototype.hasOwnProperty.call(result.data, fields[0]), '"opt_fields"で指定したfieldを含むこと');
  });
}

function testGetStatusesFromProject_(test, common) {
  var client = common.getClientUser();

  test('getStatusesFromProject() - 正常系(引数なし)', function (t) {
    var result = client.getStatusesFromProject();
    t.ok(result instanceof Object, 'Objectで取得できること');
    t.equal(result.data[0].resource_type, 'project_status', 'resource_typeが"project_status"であること');
  });

  test('getStatusesFromProject() - 正常系(projectId)', function (t) {
    var projectId = common.projectId;
    var result = client.getStatusesFromProject(projectId);
    t.ok(result instanceof Object, 'Objectで取得できること');
    t.equal(result.data[0].resource_type, 'project_status', 'resource_typeが"project_status"であること');
  });

  test('getStatusesFromProject() - 正常系(params)', function (t) {
    var projectId = common.projectId;
    var fields = ['title'];
    var limit = 1;
    var result = client.getStatusesFromProject(projectId, { opt_pretty: true, opt_fields: fields, limit: limit });
    t.ok(result instanceof Object, 'Objectで取得できること');
    t.ok(result.data.length === limit, '"limit"で指定した要素の数が取得できること');
    t.ok(Object.prototype.hasOwnProperty.call(result.data[0], fields[0]), '"opt_fields"で指定したfieldを含むこと');
    t.ok(Object.prototype.hasOwnProperty.call(result, 'next_page'), '"next_page"を含むこと');
  });
}

function testGetAllTasks_(test, common) {
  var client = common.getClientUser();

  test('getAllTasks() - 異常系(引数なし)', function (t) {
    var result = client.getAllTasks();
    t.ok(result instanceof Object, 'Objectで取得できること');
    t.ok(Object.prototype.hasOwnProperty.call(result, 'errors'), '引数を指定しないとエラー');
  });

  test('getAllTasks() - 正常系(workspace&assignee)', function (t) {
    var workspaceId = common.workspaceId;
    var userId = common.userId;
    var result = client.getAllTasks(workspaceId, null, null, userId, null, null, null);
    t.ok(result instanceof Object, 'Objectで取得できること');
    t.equal(result.data[0].resource_type, 'task', 'resource_typeが"task"であること');
  });

  test('getAllTasks() - 正常系(project)', function (t) {
    var projectId = common.projectId;
    var result = client.getAllTasks(null, projectId, null, null, null, null, null);
    t.ok(result instanceof Object, 'Objectで取得できること');
    t.equal(result.data[0].resource_type, 'task', 'resource_typeが"task"であること');
  });

  test('getAllTasks() - 正常系(section)', function (t) {
    var sectionId = common.sectionId;
    var result = client.getAllTasks(null, null, sectionId, null, null, null, null);
    t.ok(result instanceof Object, 'Objectで取得できること');
    t.equal(result.data[0].resource_type, 'task', 'resource_typeが"task"であること');
  });

  test('getAllTasks() - 正常系(completed_since)', function (t) {
    var projectId = common.projectId;
    var completedSince = Utilities.formatDate(new Date(), 'JST', 'yyyy-MM-dd\'T\'HH:mm:ss\'+09:00\'');
    var result = client.getAllTasks(null, projectId, null, null, completedSince, null);
    t.ok(result instanceof Object, 'Objectで取得できること');
    t.equal(result.data[0].resource_type, 'task', 'resource_typeが"task"であること');
  });

  test('getAllTasks() - 正常系(modified_since)', function (t) {
    var projectId = common.projectId;
    var modifiedSince = Utilities.formatDate(new Date(), 'JST', 'yyyy-MM-dd\'T\'HH:mm:ss\'+09:00\'');
    var result = client.getAllTasks(null, projectId, null, null, null, modifiedSince);
    t.ok(result instanceof Object, 'Objectで取得できること');
    t.ok(result.data.length == 0, '0件であること');
  });

  test('getAllTasks() - 正常系(params)', function (t) {
    var projectId = common.projectId;
    var fields = ['name'];
    var limit = 1;
    var result = client.getAllTasks(null, projectId, null, null, null, null, { opt_pretty: true, opt_fields: fields, limit: limit });
    t.ok(result instanceof Object, 'Objectで取得できること');
    t.ok(result.data.length === limit, '"limit"で指定した要素の数が取得できること');
    t.ok(Object.prototype.hasOwnProperty.call(result.data[0], fields[0]), '"opt_fields"で指定したfieldを含むこと');
    t.ok(Object.prototype.hasOwnProperty.call(result, 'next_page'), '"next_page"を含むこと');
  });
}

function testGetSpecificTask_(test, common) {
  var client = common.getClientUser();

  test('getSpecificTask() - 異常系(引数なし)', function (t) {
    t.throws(function () {
      return client.getSpecificTask();
    },
    '"id"を指定していない場合はエラー');
  });

  test('getSpecificTask() - 正常系(taskId)', function (t) {
    var id = common.taskId;
    var result = client.getSpecificTask(id);
    t.ok(result instanceof Object, 'Objectで取得できること');
    t.equal(result.data.resource_type, 'task', 'resource_typeが"task"であること');
    t.equal(result.data.gid, id, 'idが正しいこと');
  });

  test('getSpecificTask() - 正常系(params)', function (t) {
    var id = common.taskId;
    var fields = ['name'];
    var result = client.getSpecificTask(id, { opt_pretty: true, opt_fields: fields });
    t.ok(result instanceof Object, 'Objectで取得できること');
    t.ok(Object.prototype.hasOwnProperty.call(result.data, fields[0]), '"opt_fields"で指定したfieldを含むこと');
  });
}

function testGetTasksInProject_(test, common) {
  var client = common.getClientUser();

  test('getTasksInProject() - 正常系(引数なし)', function (t) {
    var result = client.getTasksInProject();
    t.ok(result instanceof Object, 'Objectで取得できること');
    t.equal(result.data[0].resource_type, 'task', 'resource_typeが"task"であること');
  });

  test('getTasksInProject() - 正常系(projectId)', function (t) {
    var projectId = common.projectId;
    var result = client.getTasksInProject(projectId);
    t.ok(result instanceof Object, 'Objectで取得できること');
    t.equal(result.data[0].resource_type, 'task', 'resource_typeが"task"であること');
  });

  test('getTasksInProject() - 正常系(params)', function (t) {
    var projectId = common.projectId;
    var fields = ['name'];
    var limit = 1;
    var result = client.getTasksInProject(projectId, { opt_pretty: true, opt_fields: fields, limit: limit });
    t.ok(result instanceof Object, 'Objectで取得できること');
    t.ok(Object.prototype.hasOwnProperty.call(result.data[0], fields[0]), '"opt_fields"で指定したfieldを含むこと');
    t.ok(result.data.length === limit, '"limit"で指定した要素の数が取得できること');
    t.ok(Object.prototype.hasOwnProperty.call(result, 'next_page'), '"next_page"を含むこと');
  });
}

function testGetTasksInSection_(test, common) {
  var client = common.getClientUser();

  test('getTasksInSection() - 異常系(引数なし)', function (t) {
    t.throws(function () {
      return client.getTasksInSection();
    },
    '"id"を指定していない場合はエラー');
  });

  test('getTasksInSection() - 正常系(sectionId)', function (t) {
    var sectionId = common.sectionId;
    var result = client.getTasksInSection(sectionId);
    t.ok(result instanceof Object, 'Objectで取得できること');
    t.equal(result.data[0].resource_type, 'task', 'resource_typeが"task"であること');
  });

  test('getTasksInSection() - 正常系(params)', function (t) {
    var sectionId = common.sectionId;
    var fields = ['name'];
    var limit = 1;
    var result = client.getTasksInSection(sectionId, { opt_pretty: true, opt_fields: fields, limit: limit });
    t.ok(result instanceof Object, 'Objectで取得できること');
    t.ok(Object.prototype.hasOwnProperty.call(result.data[0], fields[0]), '"opt_fields"で指定したfieldを含むこと');
    t.ok(result.data.length === limit, '"limit"で指定した要素の数が取得できること');
    t.ok(Object.prototype.hasOwnProperty.call(result, 'next_page'), '"next_page"を含むこと');
  });
}

function testGetTasksWithTag_(test, common) {
  var client = common.getClientUser();

  test('getTasksWithTag() - 異常系(引数なし)', function (t) {
    t.throws(function () {
      return client.getTasksWithTag();
    },
    '"id"を指定していない場合はエラー');
  });

  test('getTasksWithTag() - 正常系(tagId)', function (t) {
    var tagId = common.tagId;
    var result = client.getTasksWithTag(tagId);
    t.ok(result instanceof Object, 'Objectで取得できること');
    t.equal(result.data[0].resource_type, 'task', 'resource_typeが"task"であること');
  });

  test('getTasksWithTag() - 正常系(params)', function (t) {
    var tagId = common.tagId;
    var fields = ['name'];
    var limit = 1;
    var result = client.getTasksWithTag(tagId, { opt_pretty: true, opt_fields: fields, limit: limit });
    t.ok(result instanceof Object, 'Objectで取得できること');
    t.ok(Object.prototype.hasOwnProperty.call(result.data[0], fields[0]), '"opt_fields"で指定したfieldを含むこと');
    t.ok(result.data.length === limit, '"limit"で指定した要素の数が取得できること');
    t.ok(Object.prototype.hasOwnProperty.call(result, 'next_page'), '"next_page"を含むこと');
  });
}

function testGetSubTasksInTask_(test, common) {
  var client = common.getClientUser();

  test('getSubTasksInTask() - 異常系(引数なし)', function (t) {
    t.throws(function () {
      return client.getSubTasksInTask();
    },
    '"id"を指定していない場合はエラー');
  });

  test('getSubTasksInTask() - 正常系(taskId)', function (t) {
    var taskId = common.taskId;
    var result = client.getSubTasksInTask(taskId);
    t.ok(result instanceof Object, 'Objectで取得できること');
    t.equal(result.data[0].resource_type, 'task', 'resource_typeが"task"であること');
  });

  test('getSubTasksInTask() - 正常系(params)', function (t) {
    var taskId = common.taskId;
    var fields = ['name'];
    var limit = 1;
    var result = client.getSubTasksInTask(taskId, { opt_pretty: true, opt_fields: fields, limit: limit });
    t.ok(result instanceof Object, 'Objectで取得できること');
    t.ok(Object.prototype.hasOwnProperty.call(result.data[0], fields[0]), '"opt_fields"で指定したfieldを含むこと');
    t.ok(result.data.length === limit, '"limit"で指定した要素の数が取得できること');
    t.ok(Object.prototype.hasOwnProperty.call(result, 'next_page'), '"next_page"を含むこと');
  });
}

function testSearchTaskInWorkspace_(test, common) {
  var client = common.getClientUser();

  test('searchTaskInWorkspace() - 異常系(引数なし)', function (t) {
    t.throws(function () {
      return client.searchTaskInWorkspace();
    },
    '"keys"を指定していない場合はエラー');
  });

  test('searchTaskInWorkspace() - 正常系(keys)', function (t) {
    var keys = {
      'text': 'hoge'
    };
    var result = client.searchTaskInWorkspace(null, keys);
    t.ok(result instanceof Object, 'Objectで取得できること');
    t.equal(result.data[0].resource_type, 'task', 'resource_typeが"task"であること');
  });

  test('searchTaskInWorkspace() - 正常系(workspaceId, keys)', function (t) {
    var workspaceId = common.workspaceId;
    var keys = {
      'assignee.any'  : common.userId,
      'projects.all'  : common.projectId,
      'completed'     : true,
      'sort_by'       : 'created_at',
      'sort_ascending': true
    };
    var result = client.searchTaskInWorkspace(workspaceId, keys);
    t.ok(result instanceof Object, 'Objectで取得できること');
    t.equal(result.data[0].resource_type, 'task', 'resource_typeが"task"であること');
  });

  test('searchTaskInWorkspace() - 正常系(params)', function (t) {
    var workspaceId = common.workspaceId;
    var keys = {
      'assignee.any': common.userId,
    };
    var fields = ['name'];
    var limit = 1;
    var result = client.searchTaskInWorkspace(workspaceId, keys, { opt_pretty: true, opt_fields: fields, limit: limit });
    t.ok(result instanceof Object, 'Objectで取得できること');
    t.ok(Object.prototype.hasOwnProperty.call(result.data[0], fields[0]), '"opt_fields"で指定したfieldを含むこと');
    t.ok(result.data.length === limit, '"limit"で指定した要素の数が取得できること');
  });
}

function testGetSpecificSection_(test, common) {
  var client = common.getClientUser();

  test('getSpecificSection() - 異常系(引数なし)', function (t) {
    t.throws(function () {
      return client.getSpecificSection();
    },
    '"id"を指定していない場合はエラー');
  });

  test('getSpecificSection() - 正常系(sectionId)', function (t) {
    var id = common.sectionId;
    var result = client.getSpecificSection(id);
    t.ok(result instanceof Object, 'Objectで取得できること');
    t.equal(result.data.resource_type, 'section', 'resource_typeが"section"であること');
    t.equal(result.data.gid, id, 'idが正しいこと');
  });

  test('getSpecificSection() - 正常系(params)', function (t) {
    var id = common.sectionId;
    var fields = ['name'];
    var result = client.getSpecificSection(id, { opt_pretty: true, opt_fields: fields });
    t.ok(result instanceof Object, 'Objectで取得できること');
    t.ok(Object.prototype.hasOwnProperty.call(result.data, fields[0]), '"opt_fields"で指定したfieldを含むこと');
  });
}

function testGetSectionsInProject_(test, common) {
  var client = common.getClientUser();

  test('getSectionsInProject() - 正常系(引数なし)', function (t) {
    var result = client.getSectionsInProject();
    t.ok(result instanceof Object, 'Objectで取得できること');
    t.equal(result.data[0].resource_type, 'section', 'resource_typeが"section"であること');
  });

  test('getSectionsInProject() - 正常系(projectId)', function (t) {
    var projectId = common.projectId;
    var result = client.getSectionsInProject(projectId);
    t.ok(result instanceof Object, 'Objectで取得できること');
    t.equal(result.data[0].resource_type, 'section', 'resource_typeが"section"であること');
  });

  test('getSectionsInProject() - 正常系(params)', function (t) {
    var projectId = common.projectId;
    var fields = ['name'];
    var limit = 1;
    var result = client.getSectionsInProject(projectId, { opt_pretty: true, opt_fields: fields, limit: limit });
    t.ok(result instanceof Object, 'Objectで取得できること');
    t.ok(Object.prototype.hasOwnProperty.call(result.data[0], fields[0]), '"opt_fields"で指定したfieldを含むこと');
    t.ok(result.data.length === limit, '"limit"で指定した要素の数が取得できること');
    t.ok(Object.prototype.hasOwnProperty.call(result, 'next_page'), '"next_page"を含むこと');
  });
}

function testPostCommentToTask_(test, common) {
  var client = common.getClientUser();
  var taskId = common.taskId

  test('postCommentToTask() - 異常系(引数のtaskIdなし)', function (t) {
    t.throws(function () {
      return client.postCommentToTask(null, 'テスト', '<body>htmlテキスト.</body>');
    },
    '"taskId"を指定していない場合はエラー');
  });

  test('postCommentToTask() - 異常系(引数のtextとhtmlTextなし)', function (t) {
    t.throws(function () {
      return client.postCommentToTask(taskId, null, null);
    },
    '"text"と"htmlText"の両方を指定していない場合はエラー');
  });

  test('postCommentToTask() - 正常系(引数のtaskIdとtextあり)', function (t) {
    var result = client.postCommentToTask(taskId, 'planeテキスト', null, true);
    t.equal(result.data.text, 'planeテキスト', 'コメントのtextが正しいこと');
    t.equal(result.data.is_pinned, true, 'コメントのisPinnedがただしいこと');
  });

  test('postCommentToTask() - 正常系(引数のtaskIdとhtmlTextあり)', function (t) {
    var result = client.postCommentToTask(taskId, null, '<body><strong>html</strong><em>テキスト</em></body>', false);
    t.equal(result.data.text, 'htmlテキスト', 'コメントのhtmlTextが正しいこと');
    t.equal(result.data.is_pinned, false, 'コメントのisPinnedがただしいこと');
  });
}

function testPostStickerToTask_(test, common) {
  var client = common.getClientUser();
  var taskId = common.taskId

  test('postStickerToTask() - 異常系(引数のtaskIdなし)', function (t) {
    t.throws(function () {
      return client.postStickerToTask(null, 'dancing_unicorn');
    },
    '"taskId"を指定していない場合はエラー');
  });

  test('postStickerToTask() - 異常系(引数のstickerNameなし)', function (t) {
    t.throws(function () {
      return client.postStickerToTask(taskId, null);
    },
    '"stickerName"を指定していない場合はエラー');
  }); 

  test('postStickerToTask() - 正常系(引数のtaskIdとstickerNameあり)', function (t) {
    var result = client.postStickerToTask(taskId, 'dancing_unicorn', true);
    t.equal(result.data.sticker_name, 'dancing_unicorn', '正しいステッカーがポストされること');
    t.equal(result.data.is_pinned, true, 'コメントのisPinnedがただしいこと');
  });
}
