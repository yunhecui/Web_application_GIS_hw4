
mapboxgl.accessToken = 'pk.eyJ1IjoieXVuaGVjdWkiLCJhIjoiY2p1NDhncHp3MGJwNTQ1bnd5aTEyODdxNCJ9.8XO2bpiop4ue0tLtzDbcig';
var map = new mapboxgl.Map({
container: 'mapContainer',
style: 'mapbox://styles/mapbox/streets-v9',
center: [150, 35],
zoom: 0.55,
});
// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());


map.on('load', function() {
 map.addLayer({
    'id': 'world population',
    'source': {
      type: 'vector',
      url: 'mapbox://yunhecui.dl0osnql'},
    'source-layer' : 'world_border-dvzyjk',
    'maxzoom': 5,
    'type': 'fill',
    'paint': {
      'fill-color': [
          'interpolate',
          ['linear'],
          ['get', 'POP2005'],
          0, '#F2F12D',
          100000, '#EED322',
          1000000, '#E6B71E',
          5000000, '#DA9C20',
          10000000, '#CA8323',
          50000000, '#B86B25',
          100000000, '#A25626',
          500000000, '#8B4225',
          1000000000, '#723122'
        ],

        'fill-opacity': 1
      }

    });

      // map.addLayer({
      // 'id': 'maine',
      // 'type': 'fill',
      // 'source':
      // {
      //   'type': 'geojson',
      //   'data': {
      //     'type': 'Feature',
      //     'geometry': {
      //       'type': 'Polygon',
      //       'coordinates': [[
      //         [286.0112428665161,40.696225281781494],
      //         [286.0109853744507,40.69215797767899],
      //         [286.0190963745117,40.68880633250933],
      //         [286.0154914855957,40.69609513189582],
      //         [286.0112428665161,40.696225281781494]]]
      //         }
      //       }
      //     },
      // 'layout': {},
      // 'paint': {
      //       'fill-color': '#088',
      //       'fill-opacity': 0.8
      //     }
      //   });
      map.addSource('borough-shp', {
        type: 'geojson',
        data: './data/borough.geojson',
      });
      map.addLayer({
        id: 'borough',
        type: 'fill',
        source: 'borough-shp',
        paint: {
          'fill-opacity': 0.7,
          'fill-color': '#f4f455',
        }
      }, 'waterway-label');


});


var popup = new mapboxgl.Popup({ offset: 40 })
  .setText('Welcome to the world population map!');


Captial.forEach(function(cap) {
  new mapboxgl.Marker({
    color: 'green',
    size: 'small'
  })
    .setLngLat([cap.long, cap.lat])
    .setPopup(new mapboxgl.Popup({ offset: 5 })
    .setText(`country name is: ${cap.country}; City name is: ${cap.city}`))
    .addTo(map);
})
