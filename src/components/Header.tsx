import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Apply z-index styles based on menu state
  useEffect(() => {
    const gNav = document.getElementById('g-nav');
    const gNavList = document.getElementById('g-nav-list');
    
    if (gNav && gNavList) {
      if (isMenuOpen) {
        gNav.style.zIndex = '999';
        gNavList.style.zIndex = '999';
      } else {
        gNav.style.zIndex = '-1';
        gNavList.style.zIndex = '-1';
      }
    }
  }, [isMenuOpen]);

  return (
    <div className="importMainFont">
      <div className="headerCentencePosition">
        <div className="flex">
          <Link className="not-urlline" to="/">
            <div>
              <h2>Illustration</h2>
              <h3>by NOGI</h3>
            </div>
          </Link>
        </div>
      </div>

      {/* ニューススクロール */}
      <div className="NEWS">
        <p className="ledText importMainFont">
          <span>
            ここにnewsが表示されます！　　　　　　　　　　　　　　　　　　　　　電光掲示板みたいでいいですよね!　　　　　　　　　　　　　　　　　　　　　　　
            <Link to="/news#links01">[3/5]サイトを試験的に公開しました。</Link>
            　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　
          </span>
        </p>
      </div>

      {/* ハンバーガーメニューボタン */}
      <div 
        className={`openbtn1 ${isMenuOpen ? 'active openMenu' : ''}`}
        onClick={toggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* ナビゲーションメニュー */}
      <nav id="g-nav" className={isMenuOpen ? 'panelactive' : ''}>
        <div id="g-nav-list" className="importMainFont">
          <ul>
            <li>
              <Link className={`url-list ${!isMenuOpen ? 'closeURL' : ''}`} to="/" onClick={closeMenu}>
                <div className="p">HOME</div>
              </Link>
            </li>
            <li>
              <Link className={`url-list ${!isMenuOpen ? 'closeURL' : ''}`} to="/works" onClick={closeMenu}>
                <div className="p">作品</div>
              </Link>
            </li>
            <li>
              <Link className={`url-list ${!isMenuOpen ? 'closeURL' : ''}`} to="/sns" onClick={closeMenu}>
                <div className="p">SNS</div>
              </Link>
            </li>
            <li>
              <a className={`url-list ${!isMenuOpen ? 'closeURL' : ''}`} href="https://twpf.jp/nogikun_" onClick={closeMenu}>
                <div className="p">ツイフィール</div>
              </a>
            </li>
            <li>
              <a className={`url-list ${!isMenuOpen ? 'closeURL' : ''}`} href="https://onogikun.hatenablog.com/" onClick={closeMenu}>
                <div className="p">Blog</div>
              </a>
            </li>
            <li>
              <Link className={`url-list ${!isMenuOpen ? 'closeURL' : ''}`} to="/filetree" onClick={closeMenu}>
                <div className="p">file tree</div>
              </Link>
            </li>
            <li>
              <Link className={`url-list ${!isMenuOpen ? 'closeURL' : ''}`} to="/en" onClick={closeMenu}>
                <div className="p">en</div>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <div className={`circle-bg ${isMenuOpen ? 'circleactive' : ''}`}></div>
    </div>
  );
};

export default Header;