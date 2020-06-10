import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Doughnut } from 'react-chartjs-2';
import { fetchCustomers } from '../../../actions/customer';
import { fetchDrivers } from '../../../actions/driver';

export class UsersChart extends Component {
  componentDidMount() {
    this.props.fetchCustomers();
    this.props.fetchDrivers();
  }

  setData = () => {
    const { drivers, customers } = this.props;

    if (!_.isEmpty(drivers)) {
      let _drivers = drivers.length;
      let _customers = customers.length;
      let chartData = {
        labels: ['Customers', 'Drivers'],
        datasets: [
          {
            label: 'Population',
            data: [_drivers, _customers],
            backgroundColor: [
              'rgba(75, 192, 192, 0.6)',
              'rgba(255, 206, 86, 0.6)'
            ]
          }
        ]
      };
      return chartData;
    }
  };

  render() {
    return (
      <Doughnut
        data={this.setData()}
        options={{
          title: {
            display: true,
            text: 'User status',
            fontSize: 20
          },
          legend: {
            display: true,
            position: 'bottom'
          }
        }}
        width={301}
        height={280}
      />
    );
  }
}
const mapStateToProps = (state) => {
  return {
    customers: Object.values(state.customers),
    drivers: Object.values(state.drivers)
  };
};
export default connect(mapStateToProps, { fetchCustomers, fetchDrivers })(
  UsersChart
);
