/**
 * Asana Clientのインスタンスを作成する
 * @param {String} token 【必須】アクセストークン
 * @param {Integer} workspaceId 【任意】ワークスペースID
 * @param {Integer} projectId 【任意】プロジェクトID
 * @return {AsanaClient} Asana Clientのインスタンス
 */
function create(token, workspaceId, projectId) { // eslint-disable-line no-unused-vars
  return new AsanaClient(token, workspaceId, projectId);
}

/**
 * Workspace内のProjectを取得する
 * @param {Integer} workspaceId 【任意】ワークスペースID
 * @return {Object} Projectのオブジェクト
 */
function getProjectsInWorkspace(workspaceId) { // eslint-disable-line no-unused-vars
  throw new Error('このメソッドは直接呼び出せません。createメソッドで取得したインスタンスより呼び出してください。');
}

/**
 * Project内のTaskを取得する
 * @param {Integer} projectId 【任意】プロジェクトID
 * @return {Object} Taskのオブジェクト
 */
function getTasksInProject(projectId) { // eslint-disable-line no-unused-vars
  throw new Error('このメソッドは直接呼び出せません。createメソッドで取得したインスタンスより呼び出してください。');
}

/**
 * Taskの情報を取得する
 * @param {Integer} taskId 【必須】タスクID
 * @return {Object} Taskのオブジェクト
 */
function getSpecificTask(taskId) { // eslint-disable-line no-unused-vars
  throw new Error('このメソッドは直接呼び出せません。createメソッドで取得したインスタンスより呼び出してください。');
}
