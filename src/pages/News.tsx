import React from 'react';
import Layout from '../components/Layout';

const News: React.FC = () => {
  return (
    <Layout pageTitle="NEWS" pageTitleColor="#c898ff">
      <div className="mainPosition">
        <div className="p-center">
          <div className="importMainFont">
            <p>ニュースページです。</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default News;