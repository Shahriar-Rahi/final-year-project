'use strict'

const m = require('mithril')
const L = require('leaflet')

const MapWidget = {

  view (vnode) {
    return m('#map',  { style: "height:440px;" })
  },

  oncreate (vnode) {
    vnode.state.map = new L.map('map', {
      center: new L.LatLng(44.982853, -93.271967),
      zoom: 10
    })

    L.tileLayer( 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      subdomains: ['a','b','c']
    }).addTo(vnode.state.map)
  },

  onbeforeupdate (vnode, old) {
    // Coordinates exist and have changed
    return vnode.attrs.coordinates &&
      vnode.attrs.coordinates.length !== old.attrs.coordinates.length
  },

  onupdate (vnode) {
    const coordinates = _.sortBy(_.get(vnode.attrs, 'coordinates', []), 'timestamp')
    const latlngs = []
    coordinates.forEach(coord => {
      L.marker([
        coord.latitude / 1e6,
        coord.longitude / 1e6]).addTo(vnode.state.map),
      latlngs.push([coord.latitude / 1e6, coord.longitude / 1e6])
    })
    const path = L.polyline(latlngs).addTo(vnode.state.map)
    vnode.state.map.fitBounds(path.getBounds())
  }
}

module.exports = MapWidget
