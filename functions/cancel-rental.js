'use strict';

const co = require('co');
const AWS = require('aws-sdk');
const Promise = require('bluebird');
const dynamodb = Promise.promisifyAll(new AWS.DynamoDB.DocumentClient());

/* input example:
 *  { trip_id: some_guid,
 *    depart: london,
 *    depart_at: some_date,
 *    arrive: dublin,
 *    arrive_at: some_date,
 *    hotel: holiday inn,
 *    check_in: some_date,
 *    check_out: some_date,
 *    rental: volvo,
 *    rental_from: some_date,
 *    rental_to: some_date
 *  }
 */
module.exports.handler = co.wrap(function*(input, context, callback) {
  function BookRentalError(message) {
    this.message = message;
  }
  BookRentalError().prototype = new Error();

  if (Math.random() < 0.6) {
    //callback("error");
    const error = new BookRentalError('can not book rental');
    callback(error);
  }
  else {
    let req = {
      TableName: "rental_bookings",
      Key: {
        trip_id: input.trip_id
      }
    }
    yield dynamodb.deleteAsync(req);
    callback(null, "ok");
  }
});
