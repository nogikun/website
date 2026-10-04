# NOGI's Illustration Website

旧HTMLサイトを参照用に保存し、React + Vite + Storybookで開発するイラストサイトです。GitHub Pagesで独自ドメインの運用を継続します。

## フォルダ

- `legacy/`: 旧HTML・CSS・JavaScript・画像・英語ページ・React試作。旧サイトの48ファイルは内容を変えずに移動しています。
- `web/`: 今後開発するReactサイト。ひとつのnpmプロジェクトでサイトとStorybookを管理します。
- `web/index.html`: Reactサイトの唯一のHTML入口。ページの切り替えは`web/src/App.tsx`のReact Routerで管理します。
- `web/src/components/`: サイトとStorybookで共有する実際のコンポーネント。各コンポーネントの隣に`*.stories.tsx`を置きます。
- `web/src/pages/`: Reactのページ。
- `web/src/i18n/ja.json`: 日本語の正本。翻訳キーの型もこのファイルから決まります。
- `web/src/i18n/en.json`: 日本語を基にした英訳。
- `web/public/images/`: 新サイトで使用するローカル画像。ギャラリーの5作品も旧サイトの画像URLから保存しています。

フォントは旧サイトと同じ`Zen Maru Gothic`です。太さ300・400・500・700・900をGoogle Fontsから読み込み、サイトとStorybookのプレビューに適用しています。

## 起動

Node.js 22.12以降が必要です。確認した環境はNode.js 22.15.0、npm 10.9.2です。

```powershell
cd web
npm ci
npm run dev
```

サイト: <http://127.0.0.1:5173/>

別のターミナルで:

```powershell
cd web
npm run storybook
```

Storybook: <http://127.0.0.1:6006/>

旧サイトを比較するときは、リポジトリのルートから:

```powershell
python -m http.server 8000 --bind 127.0.0.1 --directory legacy
```

旧サイト: <http://127.0.0.1:8000/>。外部画像・CDN・旧URLの参照は当時のままです。

## 検証

`web/`で実行します。

```powershell
npm test
npm run build
npm run build-storybook
```

- `npm test`: 言語切り替え・URL保持・翻訳、Pages成果物の検証、計測の初期化に関するテストを実行します。
- `npm run build`: TypeScriptチェックとサイトのビルドを行います。成果物は`web/dist/`です。
- `npm run build-storybook`: Storybookをビルドします。成果物は`web/storybook-static/`です。

公開用成果物の確認:

```powershell
Copy-Item dist/index.html dist/404.html
npm run check:pages
```

ビルドしたサイトをブラウザで確認:

```powershell
npm run preview
```

プレビュー: <http://127.0.0.1:4173/>。ページ移動・言語切り替え・作品選択・再読み込みを確認します。Storybookでは各コンポーネントの表示と操作を確認できます。

[Notion](https://www.notion.so/WEB-1977c4bfb3b18075a4a3f3783d7b7709?pvs=4) / [Figma](https://www.figma.com/design/l1ZthWLEGk9pkLHrQ3crd7/WEB?node-id=0-1&t=r45cnAqTgbF7nOsg-1)
