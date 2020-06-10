import React, { Component } from 'react';

import { connect } from 'react-redux';
import moment from 'moment';
import { BackTop, Tooltip, Button, Spin, Modal } from 'antd';
import {
  EyeOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';

import { fetchDrivers, deleteDriver } from '../../../actions/driver';
import SideNavigation from '../SideNavigation';
import AdminHeader from '../AdminHeader';
import '../../../assets/css/sb-admin-2.css';
import '../../../assets/css/sb-admin-2.min.css';

export class DriverManagement extends Component {
  state = { visible: false, parcels: [] };

  componentDidMount() {
    this.props.fetchDrivers();
  }

  onDeleteClick = (id) => {
    const { confirm } = Modal;
    confirm({
      title: 'Are you sure delete this booking?',
      icon: <ExclamationCircleOutlined />,
      content: 'some content',
      okText: 'Yes',
      okType: 'danger',
      centered: true,
      cancelText: 'No',
      onOk: () => {
        this.props.deleteDriver(id);
      },
      onCancel: () => {}
    });
  };
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
  modalContent = () => {
    return (
      this.state.parcels &&
      this.state.parcels.map((parcel, index) => {
        return (
          <tr key={index}>
            <td>{moment(parcel.created_At).format('YYYY-MM-DD HH:mm')}</td>
            <td>{parcel.location}</td>
            <td>{parcel.destination}</td>
          </tr>
        );
      })
    );
  };
  renderDriver = () => {
    const { drivers } = this.props;

    if (drivers.length !== 0) {
      return (
        drivers &&
        drivers.map((driver, index) => {
          return (
            <tr key={index}>
              <td>{driver.fullName}</td>
              <td>{driver.username}</td>
              <td>{moment(driver.created_At).format('YYYY-MM-DD HH:mm')}</td>
              <td>Active</td>
              <td style={{ textAlign: 'center' }}>
                <Tooltip title='view deliveris'>
                  <Button
                    type='primary'
                    icon={<EyeOutlined />}
                    onClick={() => this.showModal(driver.parcels)}
                  />
                </Tooltip>
                <Tooltip title='delete'>
                  <Button
                    type='danger'
                    icon={<DeleteOutlined />}
                    onClick={() => {
                      this.onDeleteClick(driver.id);
                    }}
                    style={{ marginLeft: 5 }}
                  />
                </Tooltip>
              </td>
            </tr>
          );
        })
      );
    } else {
      return (
        <tr>
          <td colSpan='7' style={{ textAlign: 'center' }}>
            <Spin size='large' />
          </td>
        </tr>
      );
    }
  };
  render() {
    return (
      <div id='wrapper'>
        <BackTop />
        <SideNavigation />

        <div id='content-wrapper' className='d-flex flex-column'>
          <div id='content'>
            <AdminHeader />

            <div className='container-fluid'>
              <div className='d-sm-flex align-items-center justify-content-between mb-4'>
                <h1 className='h3 mb-0 text-gray-800'>Driver Management</h1>
              </div>

              <div className='row'>
                <div className='col-xl-12  mb-4 '>
                  <div className='card  shadow h-100 py-2'>
                    <div className='card-body'>
                      <table class='table table-striped table-bordered'>
                        <thead>
                          <tr>
                            <th scope='col'>Full name</th>
                            <th scope='col'>Email</th>
                            <th scope='col'>Joined Date</th>
                            <th scope='col'>Status</th>
                            <th scope='col'>Action</th>
                          </tr>
                        </thead>
                        <tbody>{this.renderDriver()}</tbody>
                      </table>
                      <div></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Modal
            title='Deliveries of the driver'
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <table class='table table-striped table-bordered'>
              <thead>
                <tr>
                  <th scope='col'>Date</th>
                  <th scope='col'>Location</th>
                  <th scope='col'>Destination</th>
                </tr>
              </thead>
              <tbody> {this.modalContent()}</tbody>
            </table>
          </Modal>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { drivers: Object.values(state.drivers) };
};

export default connect(mapStateToProps, { fetchDrivers, deleteDriver })(
  DriverManagement
);
