/* global TestCommon */

function TestRunner() { // eslint-disable-line no-unused-vars
  if ((typeof GasTap) === 'undefined') { // GasT Initialization. (only if not initialized yet.)
    eval(UrlFetchApp.fetch('https://raw.githubusercontent.com/zixia/gast/master/src/gas-tap-lib.js').getContentText());
  } // Class GasTap is ready for use now!

  var test = new GasTap();
  var common = new TestCommon();

  try {
    /***** Test cases ******************************/
    testGetAllWorkspaces(test, common);
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

function testGetAllWorkspaces(test, common) {
  var client = common.getClientUser();

  test('getAllWorkspaces() - 正常系', function (t) {
    var result = client.getAllWorkspaces();
    t.ok(result instanceof Object, 'Objectで取得できること');
    t.ok(Object.prototype.hasOwnProperty.call(result[0], 'gid'), '"gid"を含むこと');
    t.ok(Object.prototype.hasOwnProperty.call(result[0], 'name'), '"name"を含むこと');
    t.equal(result[0].resource_type, 'workspace', 'resource_typeが"workspace"であること');
  });
}
