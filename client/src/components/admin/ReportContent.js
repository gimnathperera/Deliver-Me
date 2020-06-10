import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { fetchDrivers } from '../../actions/driver';
import { fetchCustomers } from '../../actions/customer';
import { fetchAllParcels } from '../../actions/parcel';

export class ReportContent extends Component {
  componentDidMount() {
    this.props.fetchAllParcels();
    this.props.fetchDrivers();
    this.props.fetchCustomers();
  }

  getTotalUsers = () => {
    const { drivers } = this.props;
    const { customers } = this.props;

    let _total = drivers.length + customers.length;
    return _total;
  };

  getSuccessfullDeliveries = () => {
    const { parcels } = this.props;
    let filtededDeliveries = _.filter(parcels, { status: 3 });
    return filtededDeliveries.length;
  };

  getOngoingfullDeliveries = () => {
    const { parcels } = this.props;
    let filtededDeliveries = _.filter(parcels, { status: 2 });
    return filtededDeliveries.length;
  };

  getSubmittedParcels = () => {
    const { parcels } = this.props;
    let filtededDeliveries = _.filter(parcels, { status: 1 });
    return filtededDeliveries.length;
  };

  render() {
    return (
      <table class='table table-hover'>
        <thead></thead>
        <tbody>
          <tr>
            <td>Number of users:</td>
            <td>{this.getTotalUsers()}</td>
          </tr>
          <tr>
            <td>Successfull deliveries:</td>
            <td>{this.getSuccessfullDeliveries()}</td>
          </tr>
          <tr>
            <td>Ongoing deliveries:</td>
            <td>{this.getOngoingfullDeliveries()}</td>
          </tr>
          <tr>
            <td>Not collected deliveries:</td>
            <td>{this.getSubmittedParcels()}</td>
          </tr>
        </tbody>
      </table>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    customers: Object.values(state.customers),
    drivers: Object.values(state.drivers),
    parcels: Object.values(state.parcels)
  };
};
export default connect(mapStateToProps, {
  fetchAllParcels,
  fetchCustomers,
  fetchDrivers
})(ReportContent);
