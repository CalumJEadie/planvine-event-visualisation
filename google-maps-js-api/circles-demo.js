categoryColours = {
  3: "#FF0000", // Film
  4: "#00FF00", // Food & Drink
  6: "#0000FF", // Comedy
  22: "#F0F000" // Sport
}

function getPlanvineEvents(categoryID) {
  return eventsByCategory[categoryID]
}

function plotCircle(map, center, radius, colour) {
  cityCircle = new google.maps.Circle({
      strokeColor: colour,
      strokeOpacity: 0.8,
      strokeWeight: 0,
      fillColor: colour,
      fillOpacity: 0.35,
      map: map,
      center: center,
      radius: radius
    });
}

function plotEvents(map, events, colour) {
  for( var i in events ) {
    event_ = events[i]
    plotCircle(
      map,
      new google.maps.LatLng(event_.venue.lat, event_.venue.lng),
      800,
      colour
    )
  }
}

function initialize() {
  var mapOptions = {
    zoom: 11,
    center: new google.maps.LatLng(51.502714, -0.092291),
    mapTypeId: google.maps.MapTypeId.TERRAIN
  };

  var map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  categoryIDs = [3, 4, 6, 22] // Food and Drink

  for( var i in categoryIDs ) {
    var category = categoryIDs[i]

    response = getPlanvineEvents(category)
    events = response.data

    plotEvents(map, events, categoryColours[category])
  }

}

google.maps.event.addDomListener(window, 'load', initialize);

    