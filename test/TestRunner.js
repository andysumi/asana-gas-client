/* global TestCommon_ */

function TestRunner_() { // eslint-disable-line no-unused-vars
  if ((typeof GasTap) === 'undefined') { // GasT Initialization. (only if not initialized yet.)
    eval(UrlFetchApp.fetch('https://raw.githubusercontent.com/zixia/gast/master/src/gas-tap-lib.js').getContentText());
  } // Class GasTap is ready for use now!

  var test = new GasTap();
  var common = new TestCommon_();

  try {
    /***** Test cases ******************************/
    testGetAllWorkspaces_(test, common);
    testGetSpecificWorkspace_(test, common);
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
    t.ok(result.length > 1, '"1"以上の要素を含むこと');
    t.equal(result[0].resource_type, 'workspace', 'resource_typeが"workspace"であること');
  });

  test('getAllWorkspaces() - 正常系(paramsあり)', function (t) {
    var result = client.getAllWorkspaces({limit: 1});
    t.ok(result instanceof Object, 'Objectで取得できること');
    t.ok(result.length > 1, '"1"以上の要素を含むこと');
    t.equal(result[0].resource_type, 'workspace', 'resource_typeが"workspace"であること');
  });
}

function testGetSpecificWorkspace_(test, common) {
  var client = common.getClientUser();

  test('getSpecificWorkspace() - 正常系(idなし)', function (t) {
    var result = client.getSpecificWorkspace();
    t.ok(result instanceof Object, 'Objectで取得できること');
    t.equal(result.resource_type, 'workspace', 'resource_typeが"workspace"であること');
  });

  test('getSpecificWorkspace() - 正常系(idあり)', function (t) {
    var id = common.workspaceId;
    var result = client.getSpecificWorkspace(id);
    t.ok(result instanceof Object, 'Objectで取得できること');
    t.equal(result.resource_type, 'workspace', 'resource_typeが"workspace"であること');
  });
}
