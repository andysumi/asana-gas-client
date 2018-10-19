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
