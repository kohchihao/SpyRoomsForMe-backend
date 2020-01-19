const request = require('request');
const cheerio = require('cheerio');

const getBookingDataFor = (room, callback) => {

  if (room) {
    request.get(
      `https://mysoc.nus.edu.sg/~calendar/getBooking.cgi?room=${room}`,
      (error, response, data) => {
        let timings = [];
        let reasons = [];
        let parsed = [];
        const $ = cheerio.load(data);
        $('table tbody tr td').each((i, elem) => {
          parsed.push(elem.children[0].data);
        });

        for (let i = 0; i < parsed.length; i++) {
          if (i % 2 == 0) {
            timings.push(parsed[i]);
          } else {
            reasons.push(parsed[i]);
          }
        }

        callback(error, [timings, reasons])
      }
    );
  }
}

module.exports = { getBookingDataFor };
