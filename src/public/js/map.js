(function() {
    const lat = -17.7834608
    const lng =  -63.1820754
    const map = L.map('map').setView([lat, lng ], 13)

    const geocodeService = L.esri.Geocoding.geocodeService()

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map)

    let marker = L.marker([lat, lng],{
        draggable: true,
        autoPan: true
    }).addTo(map)

    marker.on('moveend', function(e){
        marker = e.target
        const position = marker.getLatLng()
        map.panTo(position)
        geocodeService.reverse().latlng(position).run(function(err, result){
            if(err) return console.log(err)
            marker.bindPopup(result.address.LongLabel).openPopup()
            document.querySelector('#address').textContent = result.address.Address ?? ''
            document.querySelector('#lat').value = result.latlng.lat
            document.querySelector('#lng').value = result.latlng.lng
        })
    });


})()