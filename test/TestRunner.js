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
