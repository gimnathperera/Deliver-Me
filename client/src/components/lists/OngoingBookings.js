import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Tooltip, Button, Spin } from 'antd';

import _ from 'lodash';

import 'antd/dist/antd.css';
import { fetchAllDeliveries, acceptDelivery } from '../../actions/delivery';
export class OngoingBookings extends Component {
  componentDidMount() {
    this.props.fetchAllDeliveries();
  }

  onAcceptDelivery = (delivery_id) => {
    let delivery = {
      status: 2,
      driver_name: localStorage.getItem('username')
    };
    this.props.acceptDelivery(delivery_id, delivery);
  };

  renderTableRow = () => {
    const { deliveries } = this.props;

    let filtededDeliveries = _.filter(deliveries, { status: 1 });

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

          return (
            <tr key={index}>
              <td>{delivery.id}</td>
              <td>{delivery.location}</td>
              <td>{delivery.destination}</td>
              <td>{delivery.weight}</td>
              <td>{moment(created_date).format('YYYY-MM-DD HH:mm')}</td>
              <td style={{ textAlign: 'center' }}>
                <Tooltip title='accept delivery'>
                  <Button
                    type='primary'
                    shape='round'
                    size={'small'}
                    style={{ backgroundColor: 'rgb(5,219,116)' }}
                    className='hvr-grow'
                    onClick={() => this.onAcceptDelivery(delivery.id)}
                  >
                    <span style={{ marginRight: 2 }}>
                      <i class='fa fa-gift' aria-hidden='true'></i>
                    </span>
                    Accept
                  </Button>
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
      <table class='table table-hover'>
        <thead>
          <tr>
            <th scope='col'>Parcel ID</th>
            <th scope='col'>Location</th>
            <th scope='col'>Destination</th>
            <th scope='col'>Weight</th>
            <th scope='col'>Booked Date</th>
            <th scope='col'>Action</th>
          </tr>
        </thead>
        <tbody>{this.renderTableRow()}</tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => {
  return { deliveries: Object.values(state.deliveries) };
};

export default connect(mapStateToProps, {
  fetchAllDeliveries,
  acceptDelivery
})(OngoingBookings);
