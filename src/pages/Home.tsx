import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const Home: React.FC = () => {
  return (
    <Layout>
      <div className="mainPosition">
        {/* メイン背景 */}
        <div>
          <div className="flex center">
            <div className="mainbg">
              <img 
                className="mainBsize" 
                src="https://nogikun.github.io/website/images/mainBackground.png" 
                alt="The picture is main background in my homepage." 
              />
            </div>
          </div>
        </div>

        {/* メイン文章 */}
        <div className="p-center">
          <div className="importMainFont">
            <p style={{ fontSize: '40px' }}>I'm NOGI !</p>

            <div className="flex center">
              <Link id="leftest" className="contentName" to="/works">作品</Link>
              <a className="contentName" href="https://linktr.ee/nogikun">Profile</a>
              <a className="contentName" href="https://onogikun.hatenablog.com/">Blog</a>
            </div>

            <p>-はじめに-</p>
            <p>まずここでは自己紹介をしたいと思います。</p>
            <p>こんにちは！</p>
            <p>私の名前は禾(のぎ)と申します。</p>
            <p>現在、大学生でAIを専攻しています。</p>
            <p>絵を描くのが好きで、</p>
            <p>普段はX ( <a href="https://twitter.com/nogikun_">@nogikun_</a> )に投稿しています。</p>
            <br />
            <p>また、ここでは自分の絵などを掲載できたらなと思います。</p>
            <p>お手すきの際にどうぞ。</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;