import React from 'react';
import Layout from '../components/Layout';

const News: React.FC = () => {
  return (
    <Layout pageTitle="NEWS" pageTitleColor="#c898ff">
      <div className="mainPosition flex center">
        <div className="p-center importMainFont">
          
          {/* NEWS */}
          <div className="menu" id="news2">
            <label className="p-left" htmlFor="menu_bar02">
              <p>[3/16]　更新情報</p>
              <p>サイトのデザインを変更しました。</p>
            </label>
            <input type="checkbox" id="menu_bar02" />
            <ul id="links02">
              <div className="NEWScontent">
                <div className="p-left centence">
                  <p>こんにちは、いかがお過ごしですか。</p>
                  <p>今回は更新した内容をお伝えします。</p>
                  <br />
                  <p>更新内容：</p>
                  <p>・index.html内のデザインの調整を行いました。</p>
                  <p>・各ページのタイトルのデザインを変更しました。</p>
                  <p>・新たにLivesという配信ページを作成しました。</p>
                  <p>・一部の不具合を修正しました。</p>
                  <br />
                  <p>以上です！</p>
                </div>
                <div className="p-right">
                  <p>編集:2022/03/16</p>
                </div>
              </div>
            </ul>
          </div>

          {/* NEWS */}
          <div className="menu" id="news1">
            <label className="p-left" htmlFor="menu_bar01">
              <p>[3/5]</p>
              <p>サイトを試験的に公開しました。</p>
            </label>
            <input type="checkbox" id="menu_bar01" />
            <ul id="links01">
              <div className="NEWScontent">
                <div className="p-left centence">
                  <p>はじめまして、禾です。</p>
                  <p>今回、ポートフォリオサイトを作成しました。</p>
                  <br />
                  <p>このサイトでは、私の作品や活動について紹介しています。</p>
                  <p>まだまだ未完成な部分も多いですが、これからコンテンツを充実させていく予定です。</p>
                  <br />
                  <p>よろしくお願いします。</p>
                </div>
                <div className="p-right">
                  <p>編集:2022/03/05</p>
                </div>
              </div>
            </ul>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default News;