/**
 * Asana Clientのインスタンスを作成する
 * @param {string} token 【必須】アクセストークン
 * @param {?number} workspaceId 【任意】Workspace ID
 * @param {?number} teamId 【任意】Team ID
 * @param {?number} projectId 【任意】Project ID
 * @return {AsanaClient} Asana Clientのインスタンス
 */
function create(token, workspaceId, teamId, projectId) { // eslint-disable-line no-unused-vars
  return new AsanaClient(token, workspaceId, teamId, projectId);
}

/**
 * 認証したユーザーに表示されるすべてのWorkspaceを取得する
 * @param {?Object} params
 *   @param {?boolean} params.opt_pretty
 *   @param {?Array<string>} params.opt_fields
 *   @param {?number} params.limit
 *   @param {?string} params.offset
 * @return {Object} Workspaceのオブジェクト
 * https://developers.asana.com/docs/get-multiple-workspaces
 */
function getAllWorkspaces(params) { // eslint-disable-line no-unused-vars
  throw new Error('このメソッドは直接呼び出せません。createメソッドで取得したインスタンスより呼び出してください。');
}

/**
 * Workspace内のProjectを取得する
 * @param {?number} workspaceId 【任意】ワークスペースID
 * @return {Object} Projectのオブジェクト
 */
function getProjectsInWorkspace(workspaceId) { // eslint-disable-line no-unused-vars
  throw new Error('このメソッドは直接呼び出せません。createメソッドで取得したインスタンスより呼び出してください。');
}

/**
 * Projectの情報を取得する
 * @param {?number} projectId 【任意】プロジェクトID
 * @return {Object} Projectのオブジェクト
 */
function getSpecificProject(projectId) { // eslint-disable-line no-unused-vars
  throw new Error('このメソッドは直接呼び出せません。createメソッドで取得したインスタンスより呼び出してください。');
}

/**
 * Project内のTaskを取得する
 * @param {?number} projectId 【任意】プロジェクトID
 * @return {Object} Taskのオブジェクト
 */
function getTasksInProject(projectId) { // eslint-disable-line no-unused-vars
  throw new Error('このメソッドは直接呼び出せません。createメソッドで取得したインスタンスより呼び出してください。');
}

/**
 * Taskの情報を取得する
 * @param {number} taskId 【必須】タスクID
 * @return {Object} Taskのオブジェクト
 */
function getSpecificTask(taskId) { // eslint-disable-line no-unused-vars
  throw new Error('このメソッドは直接呼び出せません。createメソッドで取得したインスタンスより呼び出してください。');
}

/**
 * Taskを検索する
 * https://asana.com/developers/documentation/getting-started/search-api
 * @param {?number} workspaceId 【任意】ワークスペースID
 * @param {Object} params 【必須】パラメーター
 * @return {Object} Taskのオブジェクト
 */
function searchTask(workspaceId, params) { // eslint-disable-line no-unused-vars
  throw new Error('このメソッドは直接呼び出せません。createメソッドで取得したインスタンスより呼び出してください。');
}

/**
 * Project内のTaskをカウントする
 * https://asana.com/developers/api-reference/projects#get-task-counts
 * @param {?number} projectId 【任意】プロジェクトID
 * @param {Array<string>} fields 【必須】カウントするフィールド
 * @return {Object} データのオブジェクト
 */
function countProjectTasks(projectId, fields) { // eslint-disable-line no-unused-vars
  throw new Error('このメソッドは直接呼び出せません。createメソッドで取得したインスタンスより呼び出してください。');
}
