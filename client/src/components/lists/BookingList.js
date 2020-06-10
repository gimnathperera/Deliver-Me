import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Button, Tooltip, Spin, Modal } from 'antd';
import _ from 'lodash';
import 'antd/dist/antd.css';
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';
import {
  fetchUserBookings,
  deletUserBooking,
  statusChangeBooking
} from '../../actions/booking';
import UpdateBookingForm from '../forms/UpdateBookingForm';
export class BookingList extends Component {
  state = {
    visible: false,
    booking_id: null,
    booking: {}
  };

  componentDidMount() {
    this.props.fetchUserBookings();
  }

  onChangeStatus = (status, id) => {
    this.props.statusChangeBooking(id, status);
  };

  onDeleteClick = (id) => {
    const { confirm } = Modal;
    confirm({
      title: 'Are you sure delete this booking?',
      icon: <ExclamationCircleOutlined />,
      content: 'some content',
      okText: 'Yes',
      okType: 'danger',
      centered: true,
      cancelText: 'No',
      onOk: () => {
        this.props.deletUserBooking(id);
      },
      onCancel: () => {}
    });
  };
  handleCancel = () => {
    this.setState({
      visible: false
    });
  };

  handleEdit = (booking) => {
    let prevData = {
      location: booking.location,
      destination: booking.destination,
      weight: parseInt(booking.weight, 10)
    };

    this.setState({
      booking_id: booking.id,
      booking: prevData,
      visible: true
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

  renderTableRow = () => {
    const { bookings } = this.props;

    _.remove(bookings, { status: 3 });

    let status;
    let created_date;
    if (bookings.length !== 0) {
      return (
        bookings &&
        bookings.map((booking, index) => {
          if (booking.status === 1) {
            status = {
              status: 'Not Collected',
              cn: 'badge badge-info',
              lock: false
            };
          }
          if (booking.status === 2) {
            status = {
              status: 'Collected',
              cn: 'badge badge-warning',
              lock: true
            };
          }
          if (booking.status === 3) {
            status = {
              status: 'Delivered',
              cn: 'badge badge-success',
              lock: true
            };
          }

          if (booking.created_At !== null) {
            created_date = booking.created_At;
          }

          if (booking.created_At === null) {
            created_date = booking.updated_At;
          }
          if (booking.updated_At === null) {
            created_date = moment(Date.now()).format('YYYY-MM-DD HH:mm');
          }

          return (
            <tr key={index} className={status.clz}>
              <td>{booking.id}</td>
              <td>{booking.location}</td>
              <td>{booking.destination}</td>
              <td>{booking.weight}</td>
              <td>{moment(created_date).format('YYYY-MM-DD HH:mm')}</td>
              <td style={{ textAlign: 'center' }}>
                <span className={`${status.cn}`}>
                  {this.renderStatusList(booking.status, booking.id)}
                </span>
              </td>

              <td>
                <Tooltip title='edit'>
                  <Button
                    type='primary'
                    icon={<EditOutlined />}
                    disabled={status.lock}
                    onClick={() => this.handleEdit(booking)}
                  />
                </Tooltip>
                <Tooltip title='delete'>
                  <Button
                    type='danger'
                    icon={<DeleteOutlined />}
                    disabled={status.lock}
                    onClick={() => {
                      this.onDeleteClick(booking.id);
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

  render() {
    const modalTitle = (
      <h4 class='d-flex justify-content-between align-items-center mb-3'>
        <span class='text-muted'>Edit Bookings</span>
      </h4>
    );
    return (
      <table class='table'>
        <thead>
          <tr>
            <th scope='col'>Parcel ID</th>
            <th scope='col'>Location</th>
            <th scope='col'>Destination</th>
            <th scope='col'>Weight</th>
            <th scope='col'>Booked Date</th>
            <th scope='col'>Status</th>
            <th scope='col'>Action</th>
          </tr>
        </thead>
        <tbody>
          {this.renderTableRow()}
          <Modal
            title={modalTitle}
            visible={this.state.visible}
            onCancel={this.handleCancel}
            footer={false}
          >
            <UpdateBookingForm
              initialValues={this.state.booking}
              onCancel={this.handleCancel}
              booking_id={this.state.booking_id}
            />
          </Modal>
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => {
  return { bookings: Object.values(state.bookings) };
};

export default connect(mapStateToProps, {
  fetchUserBookings,
  deletUserBooking,
  statusChangeBooking
})(BookingList);
