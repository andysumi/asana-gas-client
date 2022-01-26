[![clasp](https://img.shields.io/badge/built%20with-clasp-4285f4.svg)](https://github.com/google/clasp) ![Test](https://github.com/andysumi/asana-gas-client/workflows/Test/badge.svg) ![Deploy](https://github.com/andysumi/asana-gas-client/workflows/Deploy/badge.svg)

# asana-gas-client

Google Apps Script用のAsana APIライブラリ

## スクリプトID

`11vXblD12jJuyfnjeAFcGGR1IJ4XZa0IIomX1pDn6JxO5q3VL7oTbfEb_`

## 使い方

### 事前準備

1. [ライブラリをプロジェクトに追加する](https://developers.google.com/apps-script/guides/libraries)
1. APIトークンを取得し、PropertiesServiceを使って保存する

### コードサンプル

```js
function myFunction() {
  var app = AsanaClient.create(PropertiesService.getUserProperties().getProperty('TOKEN'), 'your_workspace_id', 'your_team_id', 'your_project_id');

  var res = app.getAllWorkspaces({ limit: 3});
  Logger.log(JSON.stringify(res, null , '\t'));
}
```

## リファレンス

- [Asana Developers](https://asana.com/developers)
- test
