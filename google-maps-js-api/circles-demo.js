/*
 * Configuration.
 */

planvineAPIRoot = "http://planvine.com/api/v1"
planvineAPIKey = "8a33569b01b94d71b8817a29b3256843"
categoryColours = {
  3: "#FF0000", // Film
  4: "#00FF00", // Food & Drink
  6: "#0000FF", // Comedy
  22: "#F0F000" // Sport
}
resultsPerPage = 1000

/*
 * Behaviour.
 */

// function getPlanvineEvents(categoryID) {
//   return eventsByCategory[categoryID]
// }

function getPlanvineEventsByCategory(categoryID, success) {
    $.ajax({
        url: planvineAPIRoot + "/category/" + categoryID + "/events",
        data: {
            api_key: planvineAPIKey,
            results_per_page: resultsPerPage
        },
        success: success,
        dataType: 'jsonp'
    })
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

// function plotImage(map, position, imageURL) {
//   new google.maps.Marker({
//       position: position,
//       map: map,
//       icon: new google.maps.Icon({
//         scaledSize: new google.maps.Size(100, 100),
//         url: imageURL
//       })
//   })
// }

function plotEvents(map, events, colour) {
  for( var i in events ) {
    event_ = events[i]
    plotCircle(
      map,
      new google.maps.LatLng(event_.venue.lat, event_.venue.lng),
      800,
      colour
    )
    // plotImage(
    //   map,
    //   new google.maps.LatLng(event_.venue.lat, event_.venue.lng),
    //   event_.photo.url
    // )
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
    var categoryID = categoryIDs[i]

    //response = getPlanvineEvents(categoryID)
    //events = response.data

    //plotEvents(map, events, categoryColours[categoryID])
    plotEventsCallback = function(categoryID) {
      return function(data, textStatus, jqXHR) {
        plotEvents(map, data.data, categoryColours[categoryID])
      }
    }
    getPlanvineEventsByCategory(categoryID, plotEventsCallback(categoryID))
  }

}

google.maps.event.addDomListener(window, 'load', initialize);

    