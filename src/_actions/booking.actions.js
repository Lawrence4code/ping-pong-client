import { bookingConstants } from '../_constants';
import { bookingService } from '../_services';
import { alertActions } from './';


export const bookingActions = {
  getAllBookings,
  addBooking
};

// action to get all bookings
function getAllBookings() {
  return dispatch => {
    dispatch(request());

    bookingService.getAllBookings()
      .then(
        bookings => {
          return dispatch(success(bookings))
        },
        error => dispatch(failure(error))
      );
  };

  function request(bookings) { return { type: bookingConstants.GET_ALLBOOKINGS_REQUEST, bookings } }
  function success(bookings) { return { type: bookingConstants.GET_ALLBOOKINGS_SUCCESS, bookings } }
  function failure(error) { return { type: bookingConstants.GET_ALLBOOKINGS_FAILURE, error } }
}

// action for adding a booking
function addBooking(bookingDetails) {
  return dispatch => {
    dispatch(request(bookingDetails));

    bookingService.addBooking(bookingDetails)
      .then(
        bookings => {
          dispatch(success(bookings));
          dispatch(alertActions.success('Booking successful'));
        },
        error => {
          dispatch(failure(error));
          dispatch(alertActions.error(error));
        }
      );
  };

  function request(bookingDetails) { return { type: bookingConstants.ADD_BOOKING_REQUEST, bookingDetails } }
  function success(bookingDetails) { return { type: bookingConstants.ADD_BOOKING_SUCCESS, bookingDetails } }
  function failure(error) { return { type: bookingConstants.ADD_BOOKING_FAILURE, error } }
}
