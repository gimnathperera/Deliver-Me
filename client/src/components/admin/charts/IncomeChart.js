import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import { Line } from 'react-chartjs-2';

import { fetchAllParcels } from '../../../actions/parcel';

export class IncomeChart extends Component {
  componentDidMount() {
    this.props.fetchAllParcels();
  }

  setData = () => {
    const { parcels } = this.props;
    let mon = [];
    let tue = [];
    let wed = [];
    let thr = [];
    let fri = [];
    let sat = [];
    let sun = [];
    if (!_.isEmpty(parcels)) {
      for (const parcel of parcels) {
        if (moment(parcel.created_At).format('dddd') === 'Monday') {
          mon.push(parcel);
        } else if (moment(parcel.created_At).format('dddd') === 'Tuesday') {
          tue.push(parcel);
        } else if (moment(parcel.created_At).format('dddd') === 'Wednesday') {
          wed.push(parcel);
        } else if (moment(parcel.created_At).format('dddd') === 'Thursday') {
          thr.push(parcel);
        } else if (moment(parcel.created_At).format('dddd') === 'Friday') {
          fri.push(parcel);
        } else if (moment(parcel.created_At).format('dddd') === 'Saturday') {
          sat.push(parcel);
        } else if (moment(parcel.created_At).format('dddd') === 'Sunday') {
          sun.push(parcel);
        }
      }
      let chartData = {
        labels: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday'
        ],
        datasets: [
          {
            label: 'Parcels',
            data: [
              mon.length,
              tue.length,
              wed.length,
              thr.length,
              fri.length,
              sat.length,
              sun.length
            ],
            backgroundColor: [
              'rgba(75, 192, 192, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(255, 99, 132, 0.6)'
            ]
          }
        ]
      };
      return chartData;
    }
  };

  render() {
    const { parcels } = this.props;
    return (
      parcels && (
        <Line
          data={this.setData()}
          options={{
            title: {
              display: true,
              text: 'Weekly Parcels',
              fontSize: 20
            },
            legend: {
              display: true,
              position: 'bottom'
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                    min: 0,
                    max: 10
                  }
                }
              ]
            }
          }}
          width={750}
          height={320}
        />
      )
    );
  }
}
const mapStateToProps = (state) => {
  return {
    parcels: Object.values(state.parcels)
  };
};

export default connect(mapStateToProps, { fetchAllParcels })(IncomeChart);
