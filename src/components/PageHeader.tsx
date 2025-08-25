import React from 'react';

interface PageHeaderProps {
  title: string;
  color?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, color = '#F3C7C4' }) => {
  return (
    <div className="flex center">
      <div className="sub_title_flame page-title flex center">
        <h3 className="sub_title color_w line-Height_S" style={{ color }}>
          {title}
        </h3>
      </div>
    </div>
  );
};

export default PageHeader;