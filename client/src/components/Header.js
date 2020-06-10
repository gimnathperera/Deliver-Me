import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from 'antd';
import jwt_decode from 'jwt-decode';

import customer from '../assets/img/team/customer.png';
import driver from '../assets/img/team/driver.png';
import admin from '../assets/img/team/admin.png';
import 'antd/dist/antd.css';
import logo from '../assets/img/logo/logo.png';
import AddBookingForm from './forms/AddBookingForm';
import BookingList from './lists/BookingList';
import OngoingBookings from './lists/OngoingBookings';
import DeliveryList from './lists/DeliveryList';
import CompletedBookings from './lists/CompletedBookings';
import CompletedDeliveries from './lists/CompletedDeliveries';

export class Header extends Component {
  state = {
    visible: false,
    visibleAddBooking: false,
    visibleBooking: false,
    visibleDeliveries: false,
    visibleDelivery: false,
    visibleCompletedBookings: false,
    visibleCompletedDeliveries: false,
    isLoggedIn: false,
    username: null,
    isDriver: false
  };

  componentDidMount() {
    this.handleUserLogin();
  }

  handleUserLogin = () => {
    let token = localStorage.getItem('token');
    if (token !== null) {
      this.setState({
        isLoggedIn: true,
        username: localStorage.getItem('username')
      });

      let user = jwt_decode(token);
      if (user) {
        if (user.type === 'driver') {
          this.setState({
            isDriver: true
          });
        }
      }
    }
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleCancel = (e) => {
    this.setState({
      visible: false
    });
  };

  showModalCompletedBookings = () => {
    this.setState({
      visibleCompletedBookings: true
    });
  };

  handleCancelCompletedBookings = (e) => {
    this.setState({
      visibleCompletedBookings: false
    });
  };

  showModalAdd = () => {
    this.setState({
      visibleAddBooking: true
    });
  };

  handleCancelAdd = (e) => {
    this.setState({
      visibleAddBooking: false
    });
  };

  showModalBooking = () => {
    this.setState({
      visibleBooking: true
    });
  };

  handleCancelBooking = (e) => {
    this.setState({
      visibleBooking: false
    });
  };

  showModalDeliveries = () => {
    this.setState({
      visibleDeliveries: true
    });
  };

  handleCancelDeliveries = (e) => {
    this.setState({
      visibleDeliveries: false
    });
  };

  showModalDelivery = () => {
    this.setState({
      visibleDelivery: true
    });
  };

  handleCancelDelivery = (e) => {
    this.setState({
      visibleDelivery: false
    });
  };

  showModalCompletedDeliveries = () => {
    this.setState({
      visibleCompletedDeliveries: true
    });
  };

  handleCancelCompletedDeliveries = (e) => {
    this.setState({
      visibleCompletedDeliveries: false
    });
  };

  handleSignOut = () => {
    localStorage.clear();

    window.location.href = '/';
  };

  render() {
    const modalTitle = (
      <h4 class='d-flex justify-content-between align-items-center mb-3'>
        <span class='text-muted'>Add a booking</span>
      </h4>
    );
    const modalTitleBooking = (
      <h4 class='d-flex justify-content-between align-items-center mb-3'>
        <span class='text-muted'>Pending Bookings</span>
      </h4>
    );

    const modalTitleCompletedBookings = (
      <h4 class='d-flex justify-content-between align-items-center mb-3'>
        <span class='text-muted'>Completed Bookings</span>
      </h4>
    );

    const modalTitleDeliveries = (
      <h4 class='d-flex justify-content-between align-items-center mb-3'>
        <span class='text-muted'>Ongoing Bookings</span>
      </h4>
    );

    const modalTitleDelivery = (
      <h4 class='d-flex justify-content-between align-items-center mb-3'>
        <span class='text-muted'>Incompleted Deliveries</span>
      </h4>
    );

    const modalTitleCompletedDeliveries = (
      <h4 class='d-flex justify-content-between align-items-center mb-3'>
        <span class='text-muted'>Completed Deliveries</span>
      </h4>
    );

    const content = (
      <div className='row'>
        <div className='col'>
          <Link to='/register-driver' onClick={this.handleCancel}>
            <img
              src={driver}
              style={{ height: '334px', cursor: 'pointer' }}
              className='hvr-bob'
            />
          </Link>
        </div>
        <div className='col' style={{ borderLeft: '2px solid #CA202F' }}>
          <Link to='/register-customer' onClick={this.handleCancel}>
            <img
              src={customer}
              style={{ width: '100%', cursor: 'pointer' }}
              className='hvr-bob'
            />
          </Link>
        </div>
        <div className='col' style={{ borderLeft: '2px solid #CA202F' }}>
          <Link to='/login-admin' onClick={this.handleCancel}>
            <img
              src={admin}
              style={{ width: '100%', cursor: 'pointer' }}
              className='hvr-bob'
            />
          </Link>
        </div>
      </div>
    );

    return (
      <header>
        <div class='header-area header-transparrent '>
          <div class='main-header header-sticky'>
            <div class='container'>
              <div class='row align-items-center'>
                <div class='col-xl-2 col-lg-2 col-md-1'>
                  <div
                    class='logo'
                    className='animated infinite zoomInLeft slower'
                  >
                    <Link to='/'>
                      <img src={logo} alt='' />
                    </Link>
                  </div>
                </div>
                <div class='col-xl-8 col-lg-8 col-md-8'>
                  <div class='main-menu f-right d-none d-lg-block'>
                    <nav>
                      <ul id='navigation'>
                        <li className='hvr-grow'>
                          <Link to='/'>Home</Link>
                        </li>
                        <li className='hvr-grow'>
                          <a href='#aboutus'>About Us</a>
                        </li>
                        <li className='hvr-grow'>
                          <a href='#service'>Services</a>
                        </li>
                        <li className='hvr-grow'>
                          <a href='#contactus'>Contact</a>
                        </li>

                        {this.state.isLoggedIn && this.state.isDriver ? (
                          <li className='hvr-grow'>
                            <a>Deliveries</a>
                            <ul class='submenu'>
                              <li>
                                <a onClick={this.showModalDeliveries}>
                                  Ongoing Deliveries
                                </a>
                              </li>
                              <li>
                                <a onClick={this.showModalDelivery}>
                                  Incomplete Deliveries
                                </a>
                              </li>
                              <li>
                                <a onClick={this.showModalCompletedDeliveries}>
                                  Completed Deliveries
                                </a>
                              </li>
                            </ul>
                          </li>
                        ) : null}

                        {this.state.isLoggedIn && !this.state.isDriver ? (
                          <li className='hvr-grow'>
                            <a>Quote & Book</a>
                            <ul class='submenu'>
                              <li>
                                <a onClick={this.showModalAdd}>Add a Booking</a>
                              </li>
                              <li>
                                <a onClick={this.showModalBooking}>
                                  Pending Bookings
                                </a>
                              </li>
                              <li>
                                <a onClick={this.showModalCompletedBookings}>
                                  Completed Bookings
                                </a>
                              </li>
                            </ul>
                          </li>
                        ) : null}
                      </ul>
                    </nav>
                  </div>
                </div>
                <div class='col-xl-2 col-lg-2 col-md-3'>
                  <div class='header-right-btn f-right d-none d-lg-block'>
                    {this.state.isLoggedIn ? (
                      <div class='dropdown'>
                        <button
                          class='btn header-btn dropdown-toggle'
                          id='dropdownMenuButton'
                          data-toggle='dropdown'
                          aria-haspopup='true'
                          aria-expanded='false'
                          style={{
                            textTransform: 'none',
                            padding: '12px 11px'
                          }}
                        >
                          <span>
                            <i className='fa fa-user'></i>
                            {this.state.username}
                          </span>
                        </button>
                        <div
                          class='dropdown-menu'
                          aria-labelledby='dropdownMenuButton'
                        >
                          <a class='dropdown-item' onClick={this.handleSignOut}>
                            Logout
                          </a>
                        </div>
                      </div>
                    ) : (
                      <Link class='btn header-btn' onClick={this.showModal}>
                        Login/Register
                      </Link>
                    )}

                    <Modal
                      centered
                      visible={this.state.visible}
                      onCancel={this.handleCancel}
                      footer={null}
                      width={780}
                    >
                      {content}
                    </Modal>
                  </div>
                </div>
                <Modal
                  title={modalTitle}
                  centered
                  visible={this.state.visibleAddBooking}
                  onCancel={this.handleCancelAdd}
                  footer={null}
                >
                  <AddBookingForm onCancel={this.handleCancelAdd} />
                </Modal>

                <Modal
                  title={modalTitleBooking}
                  centered
                  visible={this.state.visibleBooking}
                  onCancel={this.handleCancelBooking}
                  footer={null}
                  width='max-content'
                >
                  <BookingList />
                </Modal>

                <Modal
                  title={modalTitleDeliveries}
                  centered
                  visible={this.state.visibleDeliveries}
                  onCancel={this.handleCancelDeliveries}
                  footer={null}
                  width='max-content'
                >
                  <OngoingBookings />
                </Modal>

                <Modal
                  title={modalTitleDelivery}
                  centered
                  visible={this.state.visibleDelivery}
                  onCancel={this.handleCancelDelivery}
                  footer={null}
                  width='max-content'
                >
                  <DeliveryList />
                </Modal>

                <Modal
                  title={modalTitleCompletedBookings}
                  centered
                  visible={this.state.visibleCompletedBookings}
                  onCancel={this.handleCancelCompletedBookings}
                  footer={null}
                  width='max-content'
                >
                  <CompletedBookings />
                </Modal>

                <Modal
                  title={modalTitleCompletedDeliveries}
                  centered
                  visible={this.state.visibleCompletedDeliveries}
                  onCancel={this.handleCancelCompletedDeliveries}
                  footer={null}
                  width='max-content'
                >
                  <CompletedDeliveries />
                </Modal>

                <div class='col-12'>
                  <div class='mobile_menu d-block d-lg-none'></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
