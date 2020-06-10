import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { BackTop, Tooltip, Button, Spin, Modal } from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';

import {
  fetchAllParcels,
  statusChange,
  deleteParcel
} from '../../../actions/parcel';

import SideNavigation from '../SideNavigation';
import AdminHeader from '../AdminHeader';
import '../../../assets/css/sb-admin-2.css';
import '../../../assets/css/sb-admin-2.min.css';
import 'antd/dist/antd.css';

export class DeliveryManagement extends Component {
  componentDidMount() {
    this.props.fetchAllParcels();
  }

  onChangeStatus = (status, id) => {
    this.props.statusChange(id, status);
  };

  onDeleteClick = (id) => {
    const { confirm } = Modal;
    confirm({
      title: 'Are you sure delete this delivery?',
      icon: <ExclamationCircleOutlined />,
      content: 'some content',
      okText: 'Yes',
      okType: 'danger',
      centered: true,
      cancelText: 'No',
      onOk: () => {
        this.props.deleteParcel(id);
      },
      onCancel: () => {}
    });
  };

  renderStatusList = (status, id) => {
    let allStatus = ['Not Collected', 'Collected', 'Delivered'];
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

  renderDelivery = () => {
    const { parcels } = this.props;
    let status;
    if (parcels.length !== 0) {
      return (
        parcels &&
        parcels.map((parcel, index) => {
          if (parcel.status === 1) {
            status = {
              status: 'Not Collected',
              cn: 'badge badge-info',
              lock: false
            };
          }
          if (parcel.status === 2) {
            status = {
              status: 'Collected',
              cn: 'badge badge-warning',
              lock: true
            };
          }
          if (parcel.status === 3) {
            status = {
              status: 'Delivered',
              cn: 'badge badge-success',
              lock: true
            };
          }

          return (
            <tr key={index}>
              <td>{parcel.id}</td>
              <td>{parcel.parcelOwner}</td>
              <td>{parcel.location}</td>
              <td>{parcel.destination}</td>
              <td>{parcel.weight}</td>
              <td>{moment(parcel.created_At).format('YYYY-MM-DD HH:mm')}</td>
              <td style={{ textAlign: 'center' }}>
                <span className={`${status.cn}`}>
                  {this.renderStatusList(parcel.status, parcel.id)}
                </span>
              </td>

              <td style={{ textAlign: 'center' }}>
                <Tooltip title='delete'>
                  <Button
                    type='danger'
                    icon={<DeleteOutlined />}
                    onClick={() => {
                      this.onDeleteClick(parcel.id);
                    }}
                    disabled={status.lock}
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
                <h1 className='h3 mb-0 text-gray-800'>Delivery Management</h1>
              </div>

              <div className='row'>
                <div className='col-xl-12  mb-4 '>
                  <div className='card  shadow h-100 py-2'>
                    <div className='card-body'>
                      <table class='table table-striped table-bordered'>
                        <thead>
                          <tr>
                            <th scope='col'>Parcel ID</th>
                            <th scope='col'>Owner</th>
                            <th scope='col'>Location</th>
                            <th scope='col'>Destination</th>
                            <th scope='col'>Weight</th>
                            <th scope='col'>Booked date</th>
                            <th scope='col'>Status</th>
                            <th scope='col'>Action</th>
                          </tr>
                        </thead>
                        <tbody>{this.renderDelivery()}</tbody>
                      </table>
                      <div></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { parcels: Object.values(state.parcels) };
};

export default connect(mapStateToProps, {
  fetchAllParcels,
  statusChange,
  deleteParcel
})(DeliveryManagement);
