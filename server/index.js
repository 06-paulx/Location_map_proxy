const express = require('express');
const morgan = require('morgan');
const path = require('path');
const proxy = require('express-http-proxy');
const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, 'public')));

// first arg - host/port for server to proxy
// creates the full path (api calls) for the server to proxy to
//TODO
//find endponits that need to be proxied
//link css/ bundle.js
//update div name to match proxy's html div names

//map ajax
app.use(
  'localhost:3007',
  proxy('localhost:3007', {
    proxyReqPathResolver: req => {
      return 'localhost:3007' + req.url;
    },
  }),
);

//for map icon
// app.use(
//   '/css/map_icon.png',
//   proxy('localhost:3007', {
//     proxyReqPathResolver: req => {
//       return '/css/map_icon.png';
//     },
//   }),
// );

//other listings
//api/listing/:listingId/otherlistings

app.use(
  '/localhost:3012',
  proxy('localhost:3012', {
    proxyReqPathResolver: req => '/localhost:3012' + req.url,
  }),
);

app.get('/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

//other listings

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
