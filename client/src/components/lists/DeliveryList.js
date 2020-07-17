import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Tooltip, Spin, Modal } from 'antd';
import _ from 'lodash';
import { toastr } from 'react-redux-toastr';
import MapComponent from '../MapComponent';
import 'antd/dist/antd.css';
import {
  fetchAllDeliveriesForADriver,
  statusChangeDelivery
} from '../../actions/delivery';

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
export class DeliveryList extends Component {
  state = {
    latitude: null,
    visibleModal: false,
    longitude: null
  };

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
    const { acceptions } = this.props;

    let status;

    _.remove(acceptions, { status: 3 });
    let created_date;
    if (acceptions.length !== 0) {
      return (
        acceptions &&
        acceptions.map((delivery, index) => {
          if (delivery.created_At !== null) {
            created_date = delivery.created_At;
          }

          if (delivery.created_At === null) {
            created_date = delivery.updated_At;
          }
          if (delivery.status === 2) {
            status = {
              status: 'Collected',
              cn: 'badge badge-warning',
              lock: true
            };
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
})(DeliveryList);
