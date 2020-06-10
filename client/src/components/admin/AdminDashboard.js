import React, { Component } from 'react';

import { BackTop, Modal } from 'antd';

import '../../assets/css/sb-admin-2.css';
import '../../assets/css/sb-admin-2.min.css';
import AdminHeader from './AdminHeader';
import SideNavigation from './SideNavigation';
import UsersChart from './charts/UsersChart';
import DeliveriesChart from './charts/DeliveriesChart';
import BookingChart from './charts/BookingChart';
import IncomeChart from './charts/IncomeChart';
import ReportContent from './ReportContent';
export class AdminDashboard extends Component {
  state = { visible: false };
  showModal = (parcels) => {
    this.setState({
      parcels: parcels,
      visible: true
    });
  };

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false
    });
  };
  render() {
    return (
      <div id='wrapper'>
        {/* <!-- Sidebar --> */}
        <BackTop />
        <SideNavigation />
        {/* <!-- End of Sidebar --> */}

        {/* <!-- Content Wrapper --> */}
        <div id='content-wrapper' className='d-flex flex-column'>
          {/* <!-- Main Content --> */}
          <div id='content'>
            {/* <!-- Topbar --> */}
            <AdminHeader />
            {/* <!-- End of Topbar --> */}

            {/* <!-- Begin Page Content --> */}
            <div className='container-fluid'>
              {/* <!-- Page Heading --> */}
              <div className='d-sm-flex align-items-center justify-content-between mb-4'>
                <h1 className='h3 mb-0 text-gray-800'>Dashboard</h1>
                <a
                  href='#'
                  className='btn btn-primary'
                  style={{ background: '#007bff', padding: '10px 5px' }}
                  onClick={this.showModal}
                >
                  <i className='fa fa-download' aria-hidden='true'></i> Generate
                  Report
                </a>
              </div>

              {/* <!-- Content Row --> */}
              <div className='row'>
                {/* <!-- Earnings (Monthly) Card Example --> */}
              </div>

              {/* <!-- Content Row --> */}

              <div className='row'>
                {/* <!-- Area Chart --> */}
                <div
                  className='col-xl-8 col-lg-7 hvr-shrink'
                  style={{ cursor: 'pointer' }}
                >
                  <div className='card shadow mb-4'>
                    {/* <!-- Card Header - Dropdown --> */}
                    <div className='card-header py-3 d-flex flex-row align-items-center justify-content-between'>
                      <h6 className='m-0 font-weight-bold text-primary'>
                        Deliveries Overview
                      </h6>
                      <div className='dropdown no-arrow'>
                        <a>
                          <i className='fa fa-ellipsis-v fa-sm fa-fw text-gray-400'></i>
                        </a>
                      </div>
                    </div>
                    {/* <!-- Card Body --> */}
                    <div className='card-body'>
                      <div class='chart-area'>
                        <IncomeChart />
                      </div>
                    </div>
                  </div>
                </div>

                {/* <!-- Pie Chart --> */}
                <div className='col-xl-4 col-lg-5 hvr-shrink'>
                  <div className='card shadow mb-4'>
                    {/* <!-- Card Header - Dropdown --> */}
                    <div className='card-header py-3 d-flex flex-row align-items-center justify-content-between'>
                      <h6 className='m-0 font-weight-bold text-primary'>
                        Bookings
                      </h6>
                      <div className='dropdown no-arrow'>
                        <a>
                          <i className='fa fa-ellipsis-v fa-sm fa-fw text-gray-400'></i>
                        </a>
                      </div>
                    </div>
                    {/* <!-- Card Body --> */}
                    <div className='card-body'>
                      <div className='chart-area'>
                        <BookingChart />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Modal
                title='Weekly summary'
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
              >
                <ReportContent />
              </Modal>
              {/* <!-- Content Row --> */}
              <div className='row'>
                {/* <!-- Content Column --> */}
                <div className='col-lg-4 mb-4 hvr-shrink'>
                  {/* <!-- Project Card Example --> */}
                  <div className='card shadow mb-4'>
                    <div className='card-header py-3'>
                      <h6 className='m-0 font-weight-bold text-primary'>
                        Black-Listed Users
                      </h6>
                    </div>
                    <div className='card-body'>
                      <h4 className='small font-weight-bold'>
                        status
                        <span className='float-right'>20%</span>
                      </h4>
                      <div className='progress mb-4'>
                        <div
                          className='progress-bar bg-danger'
                          role='progressbar'
                          style={{ width: '20%' }}
                          aria-valuenow='20'
                          aria-valuemin='0'
                          aria-valuemax='100'
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-xl-4 col-lg-5 hvr-shrink'>
                  <div className='card shadow mb-4'>
                    {/* <!-- Card Header - Dropdown --> */}
                    <div className='card-header py-3 d-flex flex-row align-items-center justify-content-between'>
                      <h6 className='m-0 font-weight-bold text-primary'>
                        Users
                      </h6>
                      <div className='dropdown no-arrow'>
                        <a>
                          <i className='fa fa-ellipsis-v fa-sm fa-fw text-gray-400'></i>
                        </a>
                      </div>
                    </div>
                    {/* <!-- Card Body --> */}
                    <div className='card-body'>
                      <div className='chart-area'>
                        <UsersChart />
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-xl-4 col-lg-5 hvr-shrink'>
                  <div className='card shadow mb-4'>
                    {/* <!-- Card Header - Dropdown --> */}
                    <div className='card-header py-3 d-flex flex-row align-items-center justify-content-between'>
                      <h6 className='m-0 font-weight-bold text-primary'>
                        Deliveries
                      </h6>
                      <div className='dropdown no-arrow'>
                        <a>
                          <i className='fa fa-ellipsis-v fa-sm fa-fw text-gray-400'></i>
                        </a>
                      </div>
                    </div>
                    {/* <!-- Card Body --> */}
                    <div className='card-body'>
                      <div className='chart-area'>
                        <DeliveriesChart />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- /.container-fluid --> */}
          </div>
        </div>
      </div>
    );
  }
}

export default AdminDashboard;
