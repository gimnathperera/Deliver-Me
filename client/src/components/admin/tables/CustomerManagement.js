import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { BackTop, Tooltip, Button, Spin, Modal } from 'antd';
import {
  EyeOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';

import {
  fetchCustomers,
  deleteCustomer,
  statusChange
} from '../../../actions/customer';
import SideNavigation from '../SideNavigation';
import AdminHeader from '../AdminHeader';
import '../../../assets/css/sb-admin-2.css';
import '../../../assets/css/sb-admin-2.min.css';
import 'antd/dist/antd.css';

export class CustomerManagement extends Component {
  state = { visible: false, parcels: [] };

  componentDidMount() {
    this.props.fetchCustomers();
  }
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

  onDeleteClick = (id) => {
    const { confirm } = Modal;
    confirm({
      title: 'Are you sure delete this customer?',
      icon: <ExclamationCircleOutlined />,
      content: 'some content',
      okText: 'Yes',
      okType: 'danger',
      centered: true,
      cancelText: 'No',
      onOk: () => {
        this.props.deleteCustomer(id);
      },
      onCancel: () => {}
    });
  };

  onChangeStatus = (status, id) => {
    this.props.statusChange(id, status);
  };

  renderStatusList = (status, id) => {
    let allStatus = ['Normal', 'Black Listed'];
    return (
      <Tooltip title='change status'>
        <select
          className='form-control form-control-sm'
          defaultValue={status}
          onChange={(e) => {
            this.onChangeStatus(e.target.value, id);
          }}
        >
          {allStatus.map((sts, index) => {
            return (
              <option id={id} key={index} value={index + 1}>
                {sts}
              </option>
            );
          })}
        </select>
      </Tooltip>
    );
  };

  renderCustomer = () => {
    const { customers } = this.props;

    let status;
    if (customers.length !== 0) {
      return (
        customers &&
        customers.map((customer, index) => {
          if (customer.status === 1) {
            status = {
              status: 'Normal',
              cn: 'badge badge-info'
            };
          }
          if (customer.status === 2) {
            status = {
              status: 'Black Listed',
              cn: 'badge badge-danger'
            };
          }

          return (
            <tr key={index}>
              <td>{customer.fullName}</td>
              <td>{customer.username}</td>
              <td>{customer.mobile}</td>
              <td>{moment(customer.created_At).format('YYYY-MM-DD HH:mm')}</td>
              <td style={{ textAlign: 'center' }}>
                <span className={`${status.cn}`}>
                  {this.renderStatusList(customer.status, customer.id)}
                </span>
              </td>
              <td style={{ textAlign: 'center' }}>
                <Tooltip title='view parcels'>
                  <Button
                    type='primary'
                    icon={<EyeOutlined />}
                    onClick={() => this.showModal(customer.parcels)}
                  />
                </Tooltip>
                <Tooltip title='delete'>
                  <Button
                    type='danger'
                    icon={<DeleteOutlined />}
                    onClick={() => {
                      this.onDeleteClick(customer.id);
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
                <h1 className='h3 mb-0 text-gray-800'>Customer Management</h1>
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
                            <th scope='col'>Mobile Number</th>
                            <th scope='col'>Joined Date</th>
                            <th scope='col'>Status</th>
                            <th scope='col'>Action</th>
                          </tr>
                        </thead>
                        <tbody>{this.renderCustomer()}</tbody>
                      </table>
                      <div></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal
          title='Parcels of the customer'
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
    );
  }
}

const mapStateToProps = (state) => {
  return { customers: Object.values(state.customers) };
};

export default connect(mapStateToProps, {
  fetchCustomers,
  deleteCustomer,
  statusChange
})(CustomerManagement);
