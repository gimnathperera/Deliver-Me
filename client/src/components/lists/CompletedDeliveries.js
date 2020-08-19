import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Tooltip, Spin } from 'antd';
import _ from 'lodash';

import 'antd/dist/antd.css';
import {
  fetchAllDeliveriesForADriver,
  statusChangeDelivery
} from '../../actions/delivery';

export class CompletedDeliveries extends Component {
  componentDidMount() {
    this.props.fetchAllDeliveriesForADriver(localStorage.getItem('id'));
  }

  onChangeStatus = (status, id) => {
    console.log('OngoingBookings -> onChangeStatus -> status, id', status, id);
    this.props.statusChangeDelivery(id, status);
  };

  renderStatusList = (status, id) => {
    let allStatus = ['Collected', 'Delivered'];
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
              <option id={id} key={index} value={index + 2}>
                {sts}
              </option>
            );
          })}
        </select>
      </Tooltip>
    );
  };

  renderTableRow = () => {
    const { acceptions } = this.props;

    let status;

    let filtededDeliveries = _.filter(acceptions, { status: 3 });

    let created_date;
    if (filtededDeliveries.length !== 0) {
      return (
        filtededDeliveries &&
        filtededDeliveries.map((delivery, index) => {
          if (delivery.created_At !== null) {
            created_date = delivery.created_At;
          }

          if (delivery.created_At === null) {
            created_date = delivery.updated_At;
          }

          if (delivery.status === 3) {
            status = {
              status: 'Delivered',
              cn: 'badge badge-success',
              lock: true
            };
          }

          return (
            <tr key={index}>
              <td>{delivery.id}</td>
              <td>{delivery.location}</td>
              <td>{delivery.destination}</td>
              <td>{delivery.parcelOwner}</td>
              <td>{delivery.receiverInfo}</td>
              <td>{delivery.weight}</td>
              <td>{moment(created_date).format('YYYY-MM-DD HH:mm')}</td>
              <td style={{ textAlign: 'center' }}>
                <span className={`${status.cn}`}>
                  {this.renderStatusList(delivery.status, delivery.id)}
                </span>
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
      <table class='table table-hover'>
        <thead>
          <tr>
            <th scope='col'>Parcel ID</th>
            <th scope='col'>Location</th>
            <th scope='col'>Destination</th>
            <th scope='col'>Owner</th>
            <th scope='col'>Reciver info</th>
            <th scope='col'>Weight</th>
            <th scope='col'>Booked Date</th>
            <th scope='col'>Status</th>
          </tr>
        </thead>
        <tbody>{this.renderTableRow()}</tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => {
  return { acceptions: Object.values(state.acceptions) };
};

export default connect(mapStateToProps, {
  fetchAllDeliveriesForADriver,
  statusChangeDelivery
})(CompletedDeliveries);
