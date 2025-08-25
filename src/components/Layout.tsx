import React from 'react';
import Header from './Header';
import PageHeader from './PageHeader';

interface LayoutProps {
  children: React.ReactNode;
  pageTitle?: string;
  pageTitleColor?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, pageTitle, pageTitleColor }) => {
  return (
    <div>
      <Header />
      {pageTitle && <PageHeader title={pageTitle} color={pageTitleColor} />}
      <main>
        {children}
      </main>
      {/* フッター */}
      <div>
        <div style={{ width: '100%', height: '60px' }}>
        </div>
      </div>
    </div>
  );
};

export default Layout;