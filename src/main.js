/**
 * Asana Clientのインスタンスを作成する
 * @param {string} token
 * @param {?string} workspaceId
 * @param {?string} teamId
 * @param {?string} projectId
 * @return {AsanaClient} Asana Clientのインスタンス
 */
function create(token, workspaceId, teamId, projectId) { // eslint-disable-line no-unused-vars
  return new AsanaClient(token, workspaceId, teamId, projectId);
}

/**
 * 認証したユーザーに表示されるすべてのWorkspaceの情報を取得する<br>
 * https://developers.asana.com/docs/get-multiple-workspaces
 * @param {?Object} params
 *   @param {?boolean} params.opt_pretty
 *   @param {?Array<string>} params.opt_fields
 *   @param {?number} params.limit
 *   @param {?string} params.offset
 * @return {Object} Workspaceのオブジェクト
 */
function getAllWorkspaces(params) { // eslint-disable-line no-unused-vars
  throw new Error('このメソッドは直接呼び出せません。createメソッドで取得したインスタンスより呼び出してください。');
}

/**
 * 指定したWorkspaceの情報を取得する<br>
 * https://developers.asana.com/docs/get-a-workspace
 * @param {?string} workspaceId
 * @param {?Object} params
 *   @param {?boolean} params.opt_pretty
 *   @param {?Array<string>} params.opt_fields
 * @return {Object} Workspaceのオブジェクト
 */
function getSpecificWorkspace(workspaceId, params) { // eslint-disable-line no-unused-vars
  throw new Error('このメソッドは直接呼び出せません。createメソッドで取得したインスタンスより呼び出してください。');
}

/**
 * 指定したTeamの情報を取得する<br>
 * https://developers.asana.com/docs/get-a-team
 * @param {?string} teamId
 * @param {?Object} params
 *   @param {?boolean} params.opt_pretty
 *   @param {?Array<string>} params.opt_fields
 * @return {Object} Teamのオブジェクト
 */
function getSpecificTeam(teamId, params) { // eslint-disable-line no-unused-vars
  throw new Error('このメソッドは直接呼び出せません。createメソッドで取得したインスタンスより呼び出してください。');
}

/**
 * 指定したWorkspaceに表示されるすべてのTeamの情報を取得する<br>
 * https://developers.asana.com/docs/get-teams-in-an-organization
 * @param {?string} workspaceId
 * @param {?Object} params
 *   @param {?boolean} params.opt_pretty
 *   @param {?Array<string>} params.opt_fields
 *   @param {?number} params.limit
 *   @param {?string} params.offset
 * @return {Object} Teamのオブジェクト
 */
function getTeamsInWorkspace(workspaceId, params) { // eslint-disable-line no-unused-vars
  throw new Error('このメソッドは直接呼び出せません。createメソッドで取得したインスタンスより呼び出してください。');
}

/**
 * 認証したユーザーに表示されるすべてのProjectを取得する<br>
 * https://developers.asana.com/docs/get-multiple-projects
 * @param {?string} workspaceId
 * @param {?string} teamId
 * @param {?boolean} isArchived
 * @param {?Object} params
 *   @param {?boolean} params.opt_pretty
 *   @param {?Array<string>} params.opt_fields
 *   @param {?number} params.limit
 *   @param {?string} params.offset
 * @return {Object} Projectのオブジェクト
 */
function getAllProjects(workspaceId, teamId, isArchived, params) { // eslint-disable-line no-unused-vars
  throw new Error('このメソッドは直接呼び出せません。createメソッドで取得したインスタンスより呼び出してください。');
}

/**
 * 指定したProjectを取得する<br>
 * https://developers.asana.com/docs/get-a-project
 * @param {?string} projectId
 * @param {?Object} params
 *   @param {?boolean} params.opt_pretty
 *   @param {?Array<string>} params.opt_fields
 * @return {Object} Projectのオブジェクト
 */
function getSpecificProject(projectId, params) { // eslint-disable-line no-unused-vars
  throw new Error('このメソッドは直接呼び出せません。createメソッドで取得したインスタンスより呼び出してください。');
}

/**
 * 指定したTeam内のProjectを取得する<br>
 * https://developers.asana.com/docs/get-a-teams-projects
 * @param {?string} teamId
 * @param {?boolean} isArchived
 * @param {?Object} params
 *   @param {?boolean} params.opt_pretty
 *   @param {?Array<string>} params.opt_fields
 *   @param {?number} params.limit
 *   @param {?string} params.offset
 * @return {Object} Projectのオブジェクト
 */
function getProjectsInTeam(teamId, isArchived, params) { // eslint-disable-line no-unused-vars
  throw new Error('このメソッドは直接呼び出せません。createメソッドで取得したインスタンスより呼び出してください。');
}

/**
 * 指定したWorkspace内のProjectを取得する<br>
 * https://developers.asana.com/docs/get-all-projects-in-a-workspace
 * @param {?string} workspaceId
 * @param {?boolean} isArchived
 * @param {?Object} params
 *   @param {?boolean} params.opt_pretty
 *   @param {?Array<string>} params.opt_fields
 *   @param {?number} params.limit
 *   @param {?string} params.offset
 * @return {Object} Projectのオブジェクト
 */
function getProjectsInWorkspace(workspaceId, isArchived, params) { // eslint-disable-line no-unused-vars
  throw new Error('このメソッドは直接呼び出せません。createメソッドで取得したインスタンスより呼び出してください。');
}

/**
 * 指定したProjectのTaskをカウントする<br>
 * https://developers.asana.com/docs/get-task-count-of-a-project
 * @param {?string} projectId
 * @param {?Object} params
 *   @param {?boolean} params.opt_pretty
 *   @param {?Array<string>} params.opt_fields
 * @return {Object} データのオブジェクト
 */
function countProjectTasks(projectId, params) { // eslint-disable-line no-unused-vars
  throw new Error('このメソッドは直接呼び出せません。createメソッドで取得したインスタンスより呼び出してください。');
}

/**
 * 指定したProject statusを取得する<br>
 * https://developers.asana.com/docs/get-a-project-status
 * @param {string} projectStatusId
 * @param {?Object} params
 *   @param {?boolean} params.opt_pretty
 *   @param {?Array<string>} params.opt_fields
 * @return {Object} Project statusのオブジェクト
 */
function getSpecificProjectStatus(projectStatusId, params) { // eslint-disable-line no-unused-vars
  throw new Error('このメソッドは直接呼び出せません。createメソッドで取得したインスタンスより呼び出してください。');
}

/**
 * 指定したProjectのStatusを取得する<br>
 * https://developers.asana.com/docs/get-statuses-from-a-project
 * @param {?string} projectId
 * @param {?Object} params
 *   @param {?boolean} params.opt_pretty
 *   @param {?Array<string>} params.opt_fields
 *   @param {?number} params.limit
 *   @param {?string} params.offset
 * @return {Object} Project statusのオブジェクト
 */
function getStatusesFromProject(projectId, params) { // eslint-disable-line no-unused-vars
  throw new Error('このメソッドは直接呼び出せません。createメソッドで取得したインスタンスより呼び出してください。');
}

/**
 * 指定した条件に該当するTaskを取得する<br>
 * https://developers.asana.com/docs/get-multiple-tasks
 * @param {?string} workspaceId
 * @param {?string} projectId
 * @param {?string} sectionId
 * @param {?string} userId
 * @param {?string} completedSince date-time
 * @param {?string} modifiedSince date-time
 * @param {?Object} params
 *   @param {?boolean} params.opt_pretty
 *   @param {?Array<string>} params.opt_fields
 *   @param {?number} params.limit
 *   @param {?string} params.offset
 * @return {Object}
 */
function getAllTasks(workspaceId, projectId, sectionId, userId, completedSince, modifiedSince, params) { // eslint-disable-line no-unused-vars
  throw new Error('このメソッドは直接呼び出せません。createメソッドで取得したインスタンスより呼び出してください。');
}

/**
 * 指定したTaskの情報を取得する<br>
 * https://developers.asana.com/docs/get-a-task
 * @param {string} taskId
 * @param {?Object} params
 *   @param {?boolean} params.opt_pretty
 *   @param {?Array<string>} params.opt_fields
 * @return {Object}
 */
function getSpecificTask(taskId, params) { // eslint-disable-line no-unused-vars
  throw new Error('このメソッドは直接呼び出せません。createメソッドで取得したインスタンスより呼び出してください。');
}

/**
 * 指定したProject内のTaskを取得する<br>
 * https://developers.asana.com/docs/get-tasks-from-a-project
 * @param {?string} projectId
 * @param {?Object} params
 *   @param {?boolean} params.opt_pretty
 *   @param {?Array<string>} params.opt_fields
 *   @param {?number} params.limit
 *   @param {?string} params.offset
 * @return {Object}
 */
function getTasksInProject(projectId, params) { // eslint-disable-line no-unused-vars
  throw new Error('このメソッドは直接呼び出せません。createメソッドで取得したインスタンスより呼び出してください。');
}

/**
 * 指定したSection内のTaskを取得する<br>
 * https://developers.asana.com/docs/get-tasks-from-a-section
 * @param {string} sectionId
 * @param {?Object} params
 *   @param {?boolean} params.opt_pretty
 *   @param {?Array<string>} params.opt_fields
 *   @param {?number} params.limit
 *   @param {?string} params.offset
 * @return {Object}
 */
function getTasksInSection(sectionId, params) { // eslint-disable-line no-unused-vars
  throw new Error('このメソッドは直接呼び出せません。createメソッドで取得したインスタンスより呼び出してください。');
}

/**
 * 指定したTagを持つTaskを取得する<br>
 * https://developers.asana.com/docs/get-tasks-from-a-tag
 * @param {string} tagId
 * @param {?Object} params
 *   @param {?boolean} params.opt_pretty
 *   @param {?Array<string>} params.opt_fields
 *   @param {?number} params.limit
 *   @param {?string} params.offset
 * @return {Object}
 */
function getTasksWithTag(tagId, params) { // eslint-disable-line no-unused-vars
  throw new Error('このメソッドは直接呼び出せません。createメソッドで取得したインスタンスより呼び出してください。');
}

/**
 * 指定したTask内のSubTaskを取得する<br>
 * https://developers.asana.com/docs/get-subtasks-from-a-task
 * @param {string} taskId
 * @param {?Object} params
 *   @param {?boolean} params.opt_pretty
 *   @param {?Array<string>} params.opt_fields
 *   @param {?number} params.limit
 *   @param {?string} params.offset
 * @return {Object}
 */
function getSubTasksInTask(taskId, params) { // eslint-disable-line no-unused-vars
  throw new Error('このメソッドは直接呼び出せません。createメソッドで取得したインスタンスより呼び出してください。');
}

/**
 * 指定したWorkspace内のTaskを検索する<br>
 * https://developers.asana.com/docs/search-tasks-in-a-workspace
 * @param {?string} workspaceId
 * @param {Object} keys ドキュメント参照
 * @param {?Object} params
 *   @param {?boolean} params.opt_pretty
 *   @param {?Array<string>} params.opt_fields
 *   @param {?number} params.limit
 *   @param {?string} params.offset
 * @return {Object}
 */
function searchTaskInWorkspace(workspaceId, keys, params) { // eslint-disable-line no-unused-vars
  throw new Error('このメソッドは直接呼び出せません。createメソッドで取得したインスタンスより呼び出してください。');
}

/**
 * 指定したSectionの情報を取得する<br>
 * https://developers.asana.com/docs/get-a-section
 * @param {string} sectionId
 * @param {?Object} params
 *   @param {?boolean} params.opt_pretty
 *   @param {?Array<string>} params.opt_fields
 * @return {Object}
 */
function getSpecificSection(sectionId, params) { // eslint-disable-line no-unused-vars
  throw new Error('このメソッドは直接呼び出せません。createメソッドで取得したインスタンスより呼び出してください。');
}

/**
 * 指定したProject内のSectionを取得する<br>
 * https://developers.asana.com/docs/get-sections-in-a-project
 * @param {?string} projectId
 * @param {?Object} params
 *   @param {?boolean} params.opt_pretty
 *   @param {?Array<string>} params.opt_fields
 *   @param {?number} params.limit
 *   @param {?string} params.offset
 * @return {Object}
 */
function getSectionsInProject(projectId, params) { // eslint-disable-line no-unused-vars
  throw new Error('このメソッドは直接呼び出せません。createメソッドで取得したインスタンスより呼び出してください。');
}

/**
 * 指定したタスクにコメントする<br>
 * https://developers.asana.com/docs/create-a-story-on-a-task
 * @param {string} taskId
 * @param {string} text
 * @param {string} htmlText
 * @param {?boolean} isPinned
 * @param {Object} params
 *    @param {?boolean} params.optPretty
 *    @param {?Array<string>} params.optFields
 * @return {Object}
 */
 function postCommentToTask(taskId, text, htmlText, isPinned, params) { // eslint-disable-line no-unused-vars
  throw new Error('このメソッドは直接呼び出せません。createメソッドで取得したインスタンスより呼び出してください。');
}

/**
 * 指定したタスクにステッカーを送る<br>
 * https://developers.asana.com/docs/create-a-story-on-a-task
 * @param {string} taskId
 * @param {string} stickerName
 * @param {?boolean} isPinned
 * @param {Object} params
 *    @param {?boolean} params.optPretty
 *    @param {?Array<string>} params.optFields
 * @return {Object}
 */
 function postStickerToTask(taskId, stickerName, isPinned, params) { // eslint-disable-line no-unused-vars
  throw new Error('このメソッドは直接呼び出せません。createメソッドで取得したインスタンスより呼び出してください。');
}