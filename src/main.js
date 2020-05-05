/**
 * Asana Clientのインスタンスを作成する
 * @param {string} token 【必須】
 * @param {?string} workspaceId
 * @param {?string} teamId
 * @param {?string} projectId
 * @return {AsanaClient} Asana Clientのインスタンス
 */
function create(token, workspaceId, teamId, projectId) { // eslint-disable-line no-unused-vars
  return new AsanaClient(token, workspaceId, teamId, projectId);
}

/**
 * 認証したユーザーに表示されるすべてのWorkspaceの情報を取得する
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
 * 指定したWorkspaceの情報を取得する
 * @param {?string} workspaceId
 * @param {?Object} params
 *   @param {?boolean} params.opt_pretty
 *   @param {?Array<string>} params.opt_fields
 * @return {Object} Workspaceのオブジェクト
 * https://developers.asana.com/docs/get-a-workspace
 */
function getSpecificWorkspace(workspaceId, params) { // eslint-disable-line no-unused-vars
  throw new Error('このメソッドは直接呼び出せません。createメソッドで取得したインスタンスより呼び出してください。');
}

/**
 * 指定したTeamの情報を取得する
 * @param {?string} teamId
 * @param {?Object} params
 *   @param {?boolean} params.opt_pretty
 *   @param {?Array<string>} params.opt_fields
 * @return {Object} Teamのオブジェクト
 * https://developers.asana.com/docs/get-a-team
 */
function getSpecificTeam(teamId, params) { // eslint-disable-line no-unused-vars
  throw new Error('このメソッドは直接呼び出せません。createメソッドで取得したインスタンスより呼び出してください。');
}

/**
 * 指定したWorkspaceに表示されるすべてのTeamの情報を取得する
 * @param {?string} workspaceId
 * @param {?Object} params
 *   @param {?boolean} params.opt_pretty
 *   @param {?Array<string>} params.opt_fields
 *   @param {?number} params.limit
 *   @param {?string} params.offset
 * @return {Object} Teamのオブジェクト
 * https://developers.asana.com/docs/get-teams-in-an-organization
 */
function getTeamsInWorkspace(workspaceId, params) { // eslint-disable-line no-unused-vars
  throw new Error('このメソッドは直接呼び出せません。createメソッドで取得したインスタンスより呼び出してください。');
}

/**
 * 認証したユーザーに表示されるすべてのProjectの情報を取得する
 * @param {?string} workspaceId
 * @param {?string} teamId
 * @param {?boolean} isArchived
 * @param {?Object} params
 *   @param {?boolean} params.opt_pretty
 *   @param {?Array<string>} params.opt_fields
 *   @param {?number} params.limit
 *   @param {?string} params.offset
 * @return {Object} Projectのオブジェクト
 * https://developers.asana.com/docs/get-multiple-projects
 */
function getAllProjects(workspaceId, teamId, isArchived, params) { // eslint-disable-line no-unused-vars
  throw new Error('このメソッドは直接呼び出せません。createメソッドで取得したインスタンスより呼び出してください。');
}

/**
 * 指定したProjectの情報を取得する
 * @param {?string} projectId
 * @param {?Object} params
 *   @param {?boolean} params.opt_pretty
 *   @param {?Array<string>} params.opt_fields
 * @return {Object} Projectのオブジェクト
 * https://developers.asana.com/docs/get-a-project
 */
function getSpecificProject(projectId, params) { // eslint-disable-line no-unused-vars
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
