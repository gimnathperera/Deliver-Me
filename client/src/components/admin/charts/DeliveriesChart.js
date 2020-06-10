import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Doughnut } from 'react-chartjs-2';
import { fetchAllParcels } from '../../../actions/parcel';

export class DeliveriesChart extends Component {
  componentDidMount() {
    this.props.fetchAllParcels();
  }

  setData = () => {
    const { parcels } = this.props;
    if (!_.isEmpty(parcels)) {
      let _collected = 0;
      let _delivered = 0;

      for (const parcel of parcels) {
        if (parcel.status === 2) {
          _collected++;
        } else if (parcel.status === 3) {
          _delivered++;
        }
      }
      let chartData = {
        labels: ['Collected', 'Delivered'],
        datasets: [
          {
            data: [_collected, _delivered],
            backgroundColor: [
              'rgba(75, 192, 192, 0.6)',
              'rgba(54, 162, 235, 0.6)',
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
            text: 'Delivery status',
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
    parcels: Object.values(state.parcels)
  };
};
export default connect(mapStateToProps, { fetchAllParcels })(DeliveriesChart);
