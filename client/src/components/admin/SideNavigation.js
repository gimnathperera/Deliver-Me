import React, { Component } from 'react';
import { Link } from 'react-router-dom';
export class SideNavigation extends Component {
  render() {
    return (
      <ul
        className='navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled'
        id='accordionSidebar'
      >
        <Link
          className='sidebar-brand d-flex align-items-center justify-content-center'
          to='/admin-dashboard'
        >
          <div
            className='sidebar-brand-icon rotate-n-15'
            style={{ textAlign: 'center' }}
          >
            <i className='fa fa-cogs' aria-hidden='true'></i>
          </div>
          <div className='sidebar-brand-text mx-3'>
            Admin <sup>2</sup>
          </div>
        </Link>

        <hr className='sidebar-divider my-0' />

        <li className='nav-item active'>
          <Link className='nav-link' to='/admin-dashboard'>
            <i className='fa fa-wrench' style={{ paddingLeft: 'inherit' }} />
            <span style={{ fontSize: 14, paddingLeft: '8px' }}>Dashboard</span>
          </Link>
        </li>

        <hr className='sidebar-divider' />

        <li className='nav-item'>
          <Link className='nav-link' to='/admin-customers'>
            <i
              className='fa fa-user fa-3x'
              style={{ paddingLeft: 'inherit' }}
            ></i>
            <span style={{ fontSize: 14, width: 'min-content' }}>
              Customer Management
            </span>
          </Link>
        </li>
        <li className='nav-item'>
          <Link className='nav-link' to='/admin-drivers'>
            <i
              className='fa fa-id-card fa-3x'
              style={{ paddingLeft: 'inherit' }}
            ></i>
            <span style={{ fontSize: 14, width: 'min-content' }}>
              Driver Management
            </span>
          </Link>
        </li>
        <li className='nav-item'>
          <Link className='nav-link' to='/admin-deliveries'>
            <i
              className='fa fa-truck fa-lg'
              style={{ paddingLeft: 'inherit' }}
            ></i>
            <span style={{ fontSize: 14, width: 'min-content' }}>
              Delivery Management
            </span>
          </Link>
        </li>
      </ul>
    );
  }
}

export default SideNavigation;
