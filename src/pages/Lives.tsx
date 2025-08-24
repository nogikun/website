import React from 'react';
import Layout from '../components/Layout';

const Lives: React.FC = () => {
  return (
    <Layout pageTitle="配信" pageTitleColor="#90EE90">
      <div className="mainPosition">
        <div className="p-center">
          <div className="importMainFont">
            <p>配信ページです。</p>
            <p>今後配信に関する情報を掲載予定です。</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Lives;