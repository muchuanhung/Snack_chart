import React from 'react';
import '../styles/Footer.css';
import footericon from '../assets/source/logo-light.svg';
import footerlogo from '../assets/source/logotype-sm-dark.svg';
import footerslogn from '../assets/source/sm-今天是個吃甜點的好日子.svg';
import iconline from '../assets/source/ic-line@.svg';
import iconfacebook from '../assets/source/ic-facebook.svg';

const Footer = () => {
  return (
    <>
      <footer>
        {/* Logo 與訂閱區域 */}
        <div className="subscribe d-flex flex-column flex-md-row justify-content-between align-items-center">
          <div className="subscribe-text d-flex align-items-center justify-content-center pt-4 pt-md-0">
            <img
              className="footericon px-2"
              src={footericon}
              alt="FooterIcon"
            />
            <div>訂閱你我的甜蜜郵件</div>
          </div>
          <div className="subscribe-form d-flex align-items-center">
            <form
              className="d-flex"
              onSubmit={(e) => {
                e.preventDefault();
                alert('感謝訂閱！');
              }}
            >
              <div className="input-group d-flex my-4">
                <span className="input-group-text d-flex align-items-center justify-content-between p-0">
                  <div className="d-flex align-items-center ps-3">
                    <i className="pe-2 bi bi-envelope-fill"></i>
                    <input type="email" placeholder="輸入您的電子郵件" />
                  </div>
                  <button type="submit" className="input-group-arrow">
                    <i className="bi bi-arrow-right"></i>
                  </button>
                </span>
              </div>
            </form>
          </div>
        </div>
        {/* 聯絡資訊 */}
        <div className="info d-flex flex-column flex-md-row p-4">
          <div className="col-md-6 d-flex flex-column justify-content-between">
            <img className="footerlogo" src={footerlogo} alt="FooterLogo" />
            <div className="info-text d-flex flex-column my-4">
              {[
                '07-1234-5678',
                'sweettaste@email.com',
                '800 高雄市新興區幸福路 520 號',
              ].map((info, index) => (
                <div key={index}>{info}</div>
              ))}
            </div>
            <div className="info-icon d-flex">
              <img
                className="info-icon-line me-2"
                src={iconline}
                alt="icon-line"
              />
              <img
                className="info-icon-facebook"
                src={iconfacebook}
                alt="icon-facebook"
              />
            </div>
          </div>
          <div className="col-md-6 d-flex flex-column align-items-start align-items-md-end">
            <img
              className="footerslogn d-none d-md-block"
              src={footerslogn}
              alt="footer-slogn"
            />
            <div className="info-copyright">
              © 2018 Sweetaste* All Rights Reserved
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
