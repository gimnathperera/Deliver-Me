import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from 'antd';
import { NotificationOutlined } from '@ant-design/icons';

// import Messages from './Messages';
// import jwt_decode from 'jwt-decode';

export class AdminHeader extends Component {
  // state = {
  //   username: null
  // };
  // componentDidMount() {
  //   this.handleUserLogin();
  // }

  // handleUserLogin = () => {
  //   let token = localStorage.getItem('token');
  //   if (token !== null) {
  //     let user = jwt_decode(token);
  //     if (user) {
  //       this.setState({ username: user.user.email });
  //     }
  //   }
  // };
  handleSignout = (e) => {
    e.preventDefault();
    localStorage.clear();

    window.location.href = '/';
  };
  render() {
    return (
      <nav className='navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow'>
        <button
          id='sidebarToggleTop'
          className='btn btn-link d-md-none rounded-circle mr-3'
        >
          <i className='fa fa-bars'></i>
        </button>

        <Link
          className='d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 nav-link hvr-pulse-grow'
          to='/'
          style={{ cursor: 'pointer' }}
        >
          <span class='fa-stack fa-lg' style={{ color: '#364D59' }}>
            <i class='fa fa-circle fa-stack-2x'></i>
            <i class='fa fa-home fa-stack-1x fa-inverse'></i>
          </span>
          <span>Back to home</span>
        </Link>

        <ul className='navbar-nav ml-auto'>
          <li className='nav-item dropdown no-arrow mx-1'>
            <a
              className='nav-link dropdown-toggle'
              href='#'
              id='messagesDropdown'
              role='button'
              data-toggle='dropdown'
              aria-haspopup='true'
              aria-expanded='false'
            >
              <Badge dot>
                <span class='fa-stack fa-lg' style={{ color: '#364D59' }}>
                  <i class='fa fa-circle fa-stack-2x'></i>
                  <i class='fa fa-envelope fa-stack-1x fa-inverse'></i>
                </span>
              </Badge>
            </a>

            <div
              className='dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in'
              aria-labelledby='messagesDropdown'
            >
              <h6
                className='dropdown-header'
                style={{
                  background: '#364D59',
                  border: ' 1px solid #364D59',
                  fontSize: '14px',
                  fontWeight: '400'
                }}
              >
                Message Center
              </h6>
              <div
                className='dropdown-item d-flex align-items-center'
                style={{ cursor: 'pointer' }}
              >
                <div className='dropdown-list-image mr-3'>
                  <img
                    className='rounded-circle'
                    src='https://source.unsplash.com/fn_BT9fwg_E/60x60'
                    alt=''
                  />
                  <div className='status-indicator bg-success'></div>
                </div>
                <div className='font-weight-bold'>
                  <div className='text-truncate'>Message content</div>

                  <div className='small text-gray-500'>
                    <span>Gimnath</span>
                  </div>
                </div>
              </div>
            </div>
          </li>

          <div className='topbar-divider d-none d-sm-block'></div>

          <li className='nav-item dropdown no-arrow'>
            <a
              className='nav-link dropdown-toggle'
              href='#'
              id='userDropdown'
              role='button'
              data-toggle='dropdown'
              aria-haspopup='true'
              aria-expanded='false'
            >
              <span className='mr-2 d-none d-lg-inline text-gray-600 small'>
                {/* {this.state.username} */}
              </span>
              <img
                className='img-profile rounded-circle'
                src='https://cdn.iconscout.com/icon/premium/png-512-thumb/admin-setting-5-559971.png'
              />
            </a>

            <div
              className='dropdown-menu dropdown-menu-right shadow animated--grow-in'
              aria-labelledby='userDropdown'
            >
              <Link
                className='dropdown-item'
                data-toggle='modal'
                data-target='#logoutModal'
                onClick={this.handleSignout}
              >
                <i className='fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400'></i>
                Logout
              </Link>
            </div>
          </li>
        </ul>
      </nav>
    );
  }
}

export default AdminHeader;
