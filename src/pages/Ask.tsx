import React from 'react';
import Layout from '../components/Layout';

const Ask: React.FC = () => {
  return (
    <Layout pageTitle="お問い合わせ" pageTitleColor="#4bb7ff">
      <div className="mainPosition">
        <div className="p-center importMainFont">
          <div>
            <iframe 
              width="100%" 
              height="700px" 
              src="https://docs.google.com/forms/d/e/1FAIpQLSf85ZRMFTfF9l7uUT_edYCHxYr4ji17L-m20wAV5N89mZKrXQ/viewform?usp=sf_link" 
              frameBorder="0"
            ></iframe>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Ask;