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

## 言語とURL

`react-i18next`を使用します。ブラウザの言語や保存済み設定による自動切り替えは行わず、指定がなければ日本語です。

| URL | 表示言語 |
| --- | --- |
| `/` | 日本語 |
| `/?lang=en` | 英語 |
| `/works` | 日本語 |
| `/works?lang=en#gallery` | 英語、ギャラリーの位置へ移動 |

- `?`以降がクエリパラメータ、`#`以降がページ内の位置です。言語は`?lang=en`、ページ内の位置は`#gallery`として共存できます。
- 日本語に戻すと`lang`を削除します。言語切り替えはページを再読み込みせず、現在の作品選択・他のクエリパラメータ・ハッシュを保持します。
- サイト内のページ移動でも英語指定を保持します。ブラウザの戻る・進む操作でも言語が戻ります。
- 不明な言語は日本語になります。英訳がないキーや空の英訳は日本語にフォールバックします。
- 旧`en/`のページは`legacy/en/`に保存しています。新サイトは日英で同じReactコンポーネントを使います。

ページのURLは`/`・`/works`・`/news`・`/sns`・`/lives`・`/requestedworks`・`/ask`・`/pages`です。サイト内の移動にはReact Routerの`Link`を使い、ページ全体を再読み込みしません。言語切り替えもRouterの履歴で管理します。ページ移動時は先頭へ、`#gallery`があればギャラリーへ移動します。

旧`/index.html`・`/works.html`などは対応する新URLへ履歴を置き換えて移動します。旧`/fileTree/fileTree.html`は`/pages`へ移動します。その際もクエリとハッシュを保持します。不明なURLは「ページが見つかりません」を表示します。

翻訳は`ja.json`のキーを先に追加し、対応する英訳を`en.json`へ追加してください。本文の大学生などの記述は旧日本語サイトの内容を引き継いだもので、現在のプロフィールを確認して更新したものではありません。

## Storybookで移植を評価する

Storybookの上部にある「表示言語」で日本語／Englishを選べます。各Storyは個別のi18nextインスタンスを持ち、別のStoryの言語や翻訳を書き換えません。

| 項目 | 確認する内容 |
| --- | --- |
| `Components/Button` | 旧試作のPropsを継承。`Primary`・`Secondary`・大小・無効状態・幅や高さ・翻訳を確認。ControlsでPropsを変更できます。 |
| `Components/LanguageSwitcher` | 日英切り替え。`SwitchToEnglish`で言語リンクとイベントを確認。 |
| `Components/SiteHeader` | 共通ヘッダーと旧サイトの全画面メニュー。`OpenMenu`で開閉、`Expanded`で展開後の表示を確認。三本線から×への変形、下から広がる背景、リンクのフェードをCSSで実装。Escapeキーは実ブラウザで確認。 |
| `Components/ArtworkGallery` | 5作品の選択、X/Pixivリンクの切り替え。`SelectArtwork`・`Empty`・`BrokenImage`を確認。 |
| `Components/ExternalEmbed` | 共通Buttonを使う埋め込み枠。`Loaded`は`about:blank`で外部通信なしに表示処理を確認。 |
| `Pages/HomePage` | 同じページの日本語／英語。`JapaneseFallback`は英語の挨拶を意図的に空にして日本語へのフォールバックを確認。 |
| `Pages/App` | `Navigation`でページ移動・言語変更時の作品選択保持・メニューの終了、`LegacyUrl`で旧URLのクエリ／ハッシュ保持、`NotFound`で不明なURLからHOMEへの復帰を確認。 |

`play`を持つStoryはCanvas表示時に操作チェックを実行します。アクセシビリティの検査結果はAccessibilityパネルで確認でき、「Rerun accessibility scan」で再検査できます。

Storybookには`MemoryRouter`を使い、各Story内のページ移動をStorybook自体のURLと分けています。`Pages/App`の下部にある「Current URL」は確認用で、実サイトには表示しません。

旧ButtonではStory側の`size`がPropsに存在しませんでした。移植後は大小を実装し、旧Propsに加えて`disabled`など通常のbutton属性を受け取れます。Storybook専用の複製コンポーネントはありません。

## 検証

```powershell
cd web
npm test
npm run build
npm run build-storybook
```

- `npm test`: Node.js標準のテスト。日本語既定・URL保持・フォールバック・i18nextインスタンスの独立性・翻訳キーと埋め込み変数を確認します。Node.js 22.15ではType Strippingの実験的機能に関する警告が出ます。
- Pages検証のテストも実行し、公開用成果物の不足、古いHTMLの配信、アセットの404、直接アクセス時のフォールバック不一致を検出できることを確認します。ローカルHTTPサーバーによるテストで、本番への接続は行いません。
- `npm run build`: コンポーネント・Story・設定のTypeScriptチェックとサイトビルド。成果物は`web/dist/`です。
- `npm run build-storybook`: Storybookビルド。成果物は`web/storybook-static/`です。
- `npm run preview`: サイトのビルド成果物を<http://127.0.0.1:4173/>で確認します。

2026年10月4日のChrome確認では、8ページの表示、全5作品のローカル画像、言語変更時の作品選択とURL保持、ページ移動時の言語保持、ブラウザの戻る操作、メニューのEscapeキー操作を確認しました。操作チェックを持つ6つのStoryも成功し、Controlsのラベル変更と旧Buttonの幅240px・高さ64px・角丸24pxの反映を確認しています。メニューは開閉アニメーションと閉じた後のボタンへのフォーカス復帰を確認しました。英語HomePageと展開状態のSiteHeaderはStorybookの320px幅で横方向にはみ出さず、アクセシビリティ検査は違反0件でした。メニューのアニメーションはOSの「動きを減らす」設定に従って無効になります。これはChromeとStorybook上での確認で、Safari・Firefox・実機や外部フォーム／配信の実サービスへの接続は未確認です。

React Routerへの変更後は、サイトの成果物のHTMLを`web/dist/index.html`ひとつに整理しました。ビルド成果物のローカルプレビューでも8ページの直接アクセス、`/works.html?ref=portfolio&lang=en#gallery`からの移動、`/works`での再読み込み、言語変更後の戻る操作と作品選択保持をChromeで確認しました。`Pages/App`の3つの操作チェックも成功しています。

新サイトはReact Routerの`BrowserRouter`で8ページを表示するSPAです。[公式のDeclarative構成](https://reactrouter.com/start/declarative/installation)に沿ってVite + Reactへ追加しています。ブラウザで本文を描画し、ビルド時に本文をHTMLへ事前出力する構成ではありません。`web/`のページ別HTMLは削除し、旧サイトのHTMLは`legacy/`に保存したままです。

jQueryのメニューと画像切り替えはReactの状態管理に移しました。ニュースは標準の`details`を使います。配信とフォームは「外部コンテンツを表示」から読み込み、SNSのタイムラインは元のアカウントへのリンクにしています。

## Google Analytics

旧サイトと同じGA4測定ID `G-YPELGCKR6R`を使用します。本番ビルドを`nogikun.com`または`www.nogikun.com`で表示した場合だけGoogleタグを非同期で読み込みます。開発サーバー、ローカルプレビュー、別ドメインのプレビュー、Storybookでは送信しません。ReactのStrictModeでも初期化は一度だけです。

初回表示はGoogleタグの標準のページビュー計測、React Routerのページ移動・戻る／進むはGA4の拡張計測に任せます。[Google公式のSPA計測手順](https://developers.google.com/analytics/devguides/collection/ga4/single-page-applications)に従い、GA管理画面の「管理 → データストリーム → ウェブ → 拡張計測機能 → ページビュー → 詳細設定」で「ブラウザの履歴イベントに基づくページの変更」を有効にしてください。現在の管理画面の設定は未確認です。自前の`page_view`イベントは追加せず、二重送信を避けています。

公開後はGA4のリアルタイムレポートまたはDebugViewで、初回表示とページ移動が届くことを確認してください。広告ブロッカーや通信制限でGoogleタグが取得できない場合、サイトは表示できますが計測は行われません。テストでは本番GAへの送信を行わず、管理画面での受信確認はマージ後の作業です。

## 公開作業

`.github/workflows/static.yml`で検証と公開を行います。GitHub Pagesの公開元はGitHub Actions、独自ドメインは`nogikun.com`です。独自ドメインのルートで配信するため、Viteの`base`は既定の`/`、React Routerは`BrowserRouter`を使います。

- `main`向けのPR: Node.js 22で`npm ci`、`npm test`、サイトとStorybookのビルド、Pages設定の読み取り、公開用成果物の検証とアップロードを実行します。`deploy`ジョブはスキップされ、公開は行いません。PRの成功は本番デプロイの成功を意味しません。
- PRを`main`へマージ: `main`へのpushを契機に同じ検証を実行し、成功したら`web/dist/`だけをGitHub Pagesへ公開します。`legacy/`とStorybookは公開対象に含みません。続けて公開URLをHTTPで確認し、配信HTMLが今回のビルドと一致すること、参照するJS・CSS・faviconが取得できること、各ページと旧URLの直接アクセスに同じSPA用HTMLが返ることを検証します。配信の反映待ちで失敗した場合は15秒間隔で最大6回試し、成功しなければ`deploy`ジョブが失敗します。この検証ではブラウザによるReactの描画・操作は確認しません。
- 手動実行: Actionsからこのworkflowを実行できます。公開するのは`main`を選んだ場合だけです。

workflowはビルドした`index.html`を`404.html`にもコピーします。GitHub Pagesで`/works`などへ直接アクセスした場合もReactがページを表示しますが、HTTPステータスは404です。検索エンジン向けに各URLでHTTP 200が必要になった場合は、ページごとのHTML出力を追加してください。言語指定の`?lang=en`とページ内の`#gallery`はそのまま使用します。

公開用成果物の検証では、`index.html`と`404.html`の一致、ビルド済みJS・CSSへの参照、HTMLが参照するローカルファイルの存在と内容が空でないことを確認します。ローカルではサイトをビルドした後、PowerShellで`Copy-Item dist/index.html dist/404.html`を実行してから`npm run check:pages`で確認できます。

通常の更新は`web/src/`や`web/public/`を編集し、PRの検証結果を確認してから`main`へマージします。初回の移行PRがマージされるまでは旧サイトが公開されます。CloudflareやDNSの設定変更は不要です。

[Notion](https://www.notion.so/WEB-1977c4bfb3b18075a4a3f3783d7b7709?pvs=4) / [Figma](https://www.figma.com/design/l1ZthWLEGk9pkLHrQ3crd7/WEB?node-id=0-1&t=r45cnAqTgbF7nOsg-1)
