import React, { useState } from 'react'; // Import useState
import './LoginPage.css';
import loginIllustration from '../../assets/login-illustration.png';

const LoginPage = () => {
  // Tạo state để quản lý ẩn/hiện mật khẩu
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="login-form-wrapper">
          <div className="input-group">
            <label>Tên Đăng Nhập:</label>
            <input type="text" placeholder="Nhập tên đăng nhập" />
          </div>

          <div className="input-group">
            <label>Mật Khẩu:</label>
            <div className="password-wrapper">
              <input 
                type={showPassword ? "text" : "password"} // Thay đổi type dựa trên state
                placeholder="Nhập mật khẩu" 
              />
              {/* Nút bật tắt ẩn hiện */}
              <span className="password-toggle" onClick={togglePasswordVisibility}>
                {showPassword ? "🙈" : "👁️"} 
              </span>
            </div>
            
            <div className="forgot-password">
              <a href="#forgot">Quên mật khẩu?</a>
            </div>
          </div>

          <button className="login-button">Đăng Nhập</button>
        </div>
      </div>

      <div className="login-right">
        <div className="illustration-wrapper">
           <img src={loginIllustration} alt="Illustration" className="laptop-img" />
        </div>
        <div className="decoration-blob"></div>
      </div>
    </div>
  );
};

export default LoginPage;