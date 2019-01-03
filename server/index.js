const express = require('express');
const morgan = require('morgan');
const path = require('path');
const proxy = require('express-http-proxy');
const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, 'public')));

// first arg - host/port for server to proxy
// creates the full path for the server to proxy to
//TODO update all urls
//client indexjs split by 3
//all static links css/map icon/initmap etc

//map ajax
app.use(
  '/api/location',
  proxy('localhost:3007', {
    proxyReqPathResolver: req => {
      return '/api/location' + req.url;
    },
  }),
);

//for map icon
app.use(
  '/css/map_icon.png',
  proxy('localhost:3007', {
    proxyReqPathResolver: req => {
      return '/css/map_icon.png';
    },
  }),
);

//other listings
//api/listing/:listingId/otherlistings

app.use(
  '/api/listing',
  proxy('localhost:3012', {
    proxyReqPathResolver: req => '/api/listing' + req.url,
  }),
);

app.get('/listing/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

//other listings

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
