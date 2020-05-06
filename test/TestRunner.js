/* global TestCommon_ */

function TestRunner_() { // eslint-disable-line no-unused-vars
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

  test('getAllWorkspaces() - 正常系(paramsなし)', function (t) {
    var result = client.getAllWorkspaces();
    t.ok(result instanceof Object, 'Objectで取得できること');
    t.ok(result.data.length > 1, '"1"以上の要素を含むこと');
    t.equal(result.data[0].resource_type, 'workspace', 'resource_typeが"workspace"であること');
  });

  test('getAllWorkspaces() - 正常系(paramsあり)', function (t) {
    var limit = 1;
    var result = client.getAllWorkspaces({limit: limit});
    t.ok(result instanceof Object, 'Objectで取得できること');
    t.ok(result.data.length === limit, '"limit"で指定した要素の数が取得できること');
    t.equal(result.data[0].resource_type, 'workspace', 'resource_typeが"workspace"であること');
    t.ok(Object.prototype.hasOwnProperty.call(result, 'next_page'), '"next_page"を含むこと');
  });
}

function testGetSpecificWorkspace_(test, common) {
  var client = common.getClientUser();

  test('getSpecificWorkspace() - 正常系(idなし)', function (t) {
    var result = client.getSpecificWorkspace();
    t.ok(result instanceof Object, 'Objectで取得できること');
    t.equal(result.data.resource_type, 'workspace', 'resource_typeが"workspace"であること');
  });

  test('getSpecificWorkspace() - 正常系(idあり)', function (t) {
    var id = common.workspaceId;
    var result = client.getSpecificWorkspace(id);
    t.ok(result instanceof Object, 'Objectで取得できること');
    t.equal(result.data.resource_type, 'workspace', 'resource_typeが"workspace"であること');
    t.equal(result.data.gid, id, 'idが正しいこと');
  });
}

function testGetSpecificTeam_(test, common) {
  var client = common.getClientUser();

  test('getSpecificTeam() - 正常系(idなし)', function (t) {
    var result = client.getSpecificTeam();
    t.ok(result instanceof Object, 'Objectで取得できること');
    t.equal(result.data.resource_type, 'team', 'resource_typeが"wteam"であること');
  });

  test('getSpecificTeam() - 正常系(idあり)', function (t) {
    var id = common.teamId;
    var result = client.getSpecificTeam(id);
    t.ok(result instanceof Object, 'Objectで取得できること');
    t.equal(result.data.resource_type, 'team', 'resource_typeが"team"であること');
    t.equal(result.data.gid, id, 'idが正しいこと');
  });
}

function testGetTeamsInWorkspace_(test, common) {
  var client = common.getClientUser();

  test('getTeamsInWorkspace() - 正常系(paramsなし)', function (t) {
    var result = client.getTeamsInWorkspace();
    t.ok(result instanceof Object, 'Objectで取得できること');
    t.ok(result.data.length > 1, '"1"以上の要素を含むこと');
    t.equal(result.data[0].resource_type, 'team', 'resource_typeが"team"であること');
  });

  test('getTeamsInWorkspace() - 正常系(paramsあり)', function (t) {
    var id = common.workspaceId;
    var limit = 3;
    var result = client.getTeamsInWorkspace(id, { limit: limit });
    t.ok(result instanceof Object, 'Objectで取得できること');
    t.ok(result.data.length === limit, '"limit"で指定した要素の数が取得できること');
    t.equal(result.data[0].resource_type, 'team', 'resource_typeが"team"であること');
    t.ok(Object.prototype.hasOwnProperty.call(result, 'next_page'), '"next_page"を含むこと');
  });
}

function testGetAllProjects_(test, common) {
  var client = common.getClientUser();

  test('getAllProjects() - 正常系(paramsなし)', function (t) {
    var result = client.getAllProjects();
    t.ok(result instanceof Object, 'Objectで取得できること');
    t.ok(result.data.length > 1, '"1"以上の要素を含むこと');
    t.equal(result.data[0].resource_type, 'project', 'resource_typeが"project"であること');
  });

  test('getAllProjects() - 正常系(paramsあり)', function (t) {
    var workspaceId = common.workspaceId;
    var teamId = common.teamId;
    var isArchived = false;
    var limit = 3;
    var result = client.getAllProjects(workspaceId, teamId, isArchived, { limit: limit });
    t.ok(result instanceof Object, 'Objectで取得できること');
    t.ok(result.data.length === limit, '"limit"で指定した要素の数が取得できること');
    t.equal(result.data[0].resource_type, 'project', 'resource_typeが"project"であること');
    t.ok(Object.prototype.hasOwnProperty.call(result, 'next_page'), '"next_page"を含むこと');
  });
}

function testGetSpecificProject_(test, common) {
  var client = common.getClientUser();

  test('getSpecificProject() - 正常系(idなし)', function (t) {
    var result = client.getSpecificProject();
    t.ok(result instanceof Object, 'Objectで取得できること');
    t.equal(result.data.resource_type, 'project', 'resource_typeが"project"であること');
  });

  test('getSpecificProject() - 正常系(idあり)', function (t) {
    var id = common.projectId;
    var result = client.getSpecificProject(id);
    t.ok(result instanceof Object, 'Objectで取得できること');
    t.equal(result.data.resource_type, 'project', 'resource_typeが"project"であること');
    t.equal(result.data.gid, id, 'idが正しいこと');
  });
}

function testGetProjectsInTeam_(test, common) {
  var client = common.getClientUser();

  test('getProjectsInTeam() - 正常系(paramsなし)', function (t) {
    var result = client.getProjectsInTeam();
    t.ok(result instanceof Object, 'Objectで取得できること');
    t.ok(result.data.length > 1, '"1"以上の要素を含むこと');
    t.equal(result.data[0].resource_type, 'project', 'resource_typeが"project"であること');
  });

  test('getProjectsInTeam() - 正常系(paramsあり)', function (t) {
    var teamId = common.teamId;
    var isArchived = false;
    var limit = 3;
    var result = client.getProjectsInTeam(teamId, isArchived, { limit: limit });
    t.ok(result instanceof Object, 'Objectで取得できること');
    t.ok(result.data.length === limit, '"limit"で指定した要素の数が取得できること');
    t.equal(result.data[0].resource_type, 'project', 'resource_typeが"project"であること');
    t.ok(Object.prototype.hasOwnProperty.call(result, 'next_page'), '"next_page"を含むこと');
  });
}

function testGetProjectsInWorkspace_(test, common) {
  var client = common.getClientUser();

  test('getProjectsInWorkspace() - 正常系(paramsなし)', function (t) {
    var result = client.getProjectsInWorkspace();
    t.ok(result instanceof Object, 'Objectで取得できること');
    t.ok(result.data.length > 1, '"1"以上の要素を含むこと');
    t.equal(result.data[0].resource_type, 'project', 'resource_typeが"project"であること');
  });

  test('getProjectsInWorkspace() - 正常系(paramsあり)', function (t) {
    var workspaceId = common.workspaceId;
    var isArchived = false;
    var limit = 3;
    var result = client.getProjectsInWorkspace(workspaceId, isArchived, { limit: limit });
    t.ok(result instanceof Object, 'Objectで取得できること');
    t.ok(result.data.length === limit, '"limit"で指定した要素の数が取得できること');
    t.equal(result.data[0].resource_type, 'project', 'resource_typeが"project"であること');
    t.ok(Object.prototype.hasOwnProperty.call(result, 'next_page'), '"next_page"を含むこと');
  });
}

function testCountProjectTasks_(test, common) {
  var client = common.getClientUser();

  test('countProjectTasks() - 正常系(paramsなし)', function (t) {
    var result = client.countProjectTasks();
    t.ok(result instanceof Object, 'Objectで取得できること');
  });

  test('countProjectTasks() - 正常系(paramsあり)', function (t) {
    var projectId = common.projectId;
    var fields = ['num_tasks'];
    var result = client.countProjectTasks(projectId, { opt_fields: fields });
    t.ok(result instanceof Object, 'Objectで取得できること');
    t.ok(Object.prototype.hasOwnProperty.call(result, 'num_tasks'), '"num_tasks"を含むこと');
  });
}

function testGetSpecificProjectStatus_(test, common) {
  var client = common.getClientUser();

  test('getSpecificProjectStatus() - 正常系', function (t) {
    var id = common.projectStatusId;
    var result = client.getSpecificProjectStatus(id);
    t.ok(result instanceof Object, 'Objectで取得できること');
    t.equal(result.data.resource_type, 'project_status', 'resource_typeが"project_status"であること');
  });

  test('getSpecificProjectStatus() - 異常系', function (t) {
    t.throws(function () {
      return client.getSpecificProjectStatus();
    },
    '"id"を指定していない場合はエラー');
  });
}

function testGetStatusesFromProject_(test, common) {
  var client = common.getClientUser();

  test('getStatusesFromProject() - 正常系(paramsなし)', function (t) {
    var result = client.getStatusesFromProject();
    t.ok(result instanceof Object, 'Objectで取得できること');
    t.ok(result.data.length > 1, '"1"以上の要素を含むこと');
    t.equal(result.data[0].resource_type, 'project_status', 'resource_typeが"project_status"であること');
  });

  test('getStatusesFromProject() - 正常系(paramsあり)', function (t) {
    var projectId = common.projectId;
    var limit = 1;
    var result = client.getStatusesFromProject(projectId, { limit: limit });
    t.ok(result instanceof Object, 'Objectで取得できること');
    t.ok(result.data.length === limit, '"limit"で指定した要素の数が取得できること');
    t.equal(result.data[0].resource_type, 'project_status', 'resource_typeが"project_status"であること');
    t.ok(Object.prototype.hasOwnProperty.call(result, 'next_page'), '"next_page"を含むこと');
  });
}

function testGetAllTasks_(test, common) {
  var client = common.getClientUser();

  test('getAllTasks() - 異常系', function (t) {
    var result = client.getAllTasks();
    t.ok(result instanceof Object, 'Objectで取得できること');
    t.ok(Object.prototype.hasOwnProperty.call(result, 'errors'), '引数を指定しないとエラー');
  });

  test('getAllTasks() - 正常系(workspace&assignee&completed_since)', function (t) {
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

  test('getAllTasks() - 正常系(paramsあり)', function (t) {
    var projectId = common.projectId;
    var limit = 1;
    var result = client.getAllTasks(null, projectId, null, null, null, null, {limit: limit});
    t.ok(result instanceof Object, 'Objectで取得できること');
    t.ok(result.data.length === limit, '"limit"で指定した要素の数が取得できること');
    t.equal(result.data[0].resource_type, 'task', 'resource_typeが"task"であること');
    t.ok(Object.prototype.hasOwnProperty.call(result, 'next_page'), '"next_page"を含むこと');
  });
}
