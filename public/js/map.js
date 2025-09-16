maptilerClient.config.apiKey = mapToken;

(async () => {
  const result = await maptilerClient.geocoding.forward(loc);

  if (result.features && result.features.length > 0) {
    const [lng, lat] = result.features[0].geometry.coordinates;

    // Now create the map after we have coordinates
    maptilersdk.config.apiKey = mapToken;
    const map = new maptilersdk.Map({
      container: "map",
      style: maptilersdk.MapStyle.STREETS,
      center: [lng, lat], // use geocoded coordinates
      zoom: 10,
      projectionControl: true,
    });

    const popup = new maptilersdk.Popup({ offset: 25 }).setText(
      "Construction on the Washington Monument began in 1848."
    );
    new maptilersdk.Marker({ color: "red" })
      .setLngLat([lng, lat])
      .setPopup(popup)
      .addTo(map);

    // console.log("Latitude:", lat, "Longitude:", lng, "marker : ", marker);
  } else {
    console.log("No results found for", loc);
  }
})();
