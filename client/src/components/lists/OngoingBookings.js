import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Tooltip, Button, Spin, Modal } from 'antd';
import { toastr } from 'react-redux-toastr';
import MapComponent from '../MapComponent';

import _ from 'lodash';

import 'antd/dist/antd.css';
import { fetchAllDeliveries, acceptDelivery } from '../../actions/delivery';

const cities = [
  {
    name: 'Colombo',
    latitude: 6.927079,
    longitude: 79.861244
  },
  {
    name: 'Kalutara',
    latitude: 6.585395,
    longitude: 79.960739
  },
  {
    name: 'Hambantota',
    latitude: 6.124593,
    longitude: 81.101074
  },
  {
    name: 'Trincomalee',
    latitude: 8.5922,
    longitude: 81.196793
  },
  {
    name: 'Kandy',
    latitude: 7.290572,
    longitude: 80.633728
  },
  {
    name: 'Sri Jayawardenepura Kotte',
    latitude: 6.89407,
    longitude: 79.902481
  },
  {
    name: 'Negombo',
    latitude: 7.189464,
    longitude: 79.858734
  },
  {
    name: 'Galle',
    latitude: 6.053519,
    longitude: 80.220978
  },
  {
    name: 'Nugegoda',
    latitude: 6.872916,
    longitude: 79.888634
  },
  {
    name: 'Gampaha',
    latitude: 7.084,
    longitude: 80.0098
  }
];
export class OngoingBookings extends Component {
  state = {
    latitude: null,
    visibleModal: false,
    longitude: null
  };

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
  findLocation = (address) => {
    let location = _.filter(cities, { name: address });

    if (!_.isEmpty(location)) {
      this.setState({
        latitude: location[0].latitude,
        longitude: location[0].longitude
      });

      this.showModal();
    } else {
      toastr.error('Error', 'Location not found');
    }
  };
  showModal = () => {
    this.setState({
      visibleModal: true
    });
  };

  onCancel = () => {
    this.setState({
      visibleModal: false
    });
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
              <td
                onClick={() => this.findLocation(delivery.location)}
                style={{ cursor: 'pointer' }}
              >
                {delivery.location}
              </td>
              <td
                onClick={() => this.findLocation(delivery.destination)}
                style={{ cursor: 'pointer' }}
              >
                {delivery.destination}
              </td>
              <td>{delivery.parcelOwner}</td>
              <td>{delivery.receiverInfo}</td>
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
            <th scope='col'>Owner</th>
            <th scope='col'>Reciever Info</th>
            <th scope='col'>Weight</th>
            <th scope='col'>Booked Date</th>
            <th scope='col'>Action</th>
          </tr>
          <Modal
            title='View Location'
            visible={this.state.visibleModal}
            onCancel={this.onCancel}
            footer={false}
          >
            <MapComponent
              isMarkerShown
              googleMapURL='https://maps.googleapis.com/maps/api/js?key=AIzaSyC2clfJXgQCizOxtkE1CrydtXAfFp67JUE&v=3.exp&libraries=geometry,drawing,places'
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `400px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
              position={{ lat: this.state.latitude, lng: this.state.longitude }}
            />
          </Modal>
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
