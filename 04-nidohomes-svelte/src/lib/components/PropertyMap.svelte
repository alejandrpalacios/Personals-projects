<script>
  // Mapa real usando el servidor de tiles oficial de OpenStreetMap — sin API key.
  // Muestra un único tile centrado en lat/lon con un pin superpuesto en la posición exacta.
  export let lat;
  export let lon;
  export let zoom = 13;

  const TILE_SIZE = 256;

  function lonToPixelX(longitude, z) {
    return ((longitude + 180) / 360) * TILE_SIZE * 2 ** z;
  }
  function latToPixelY(latitude, z) {
    const rad = (latitude * Math.PI) / 180;
    return ((1 - Math.log(Math.tan(rad) + 1 / Math.cos(rad)) / Math.PI) / 2) * TILE_SIZE * 2 ** z;
  }

  $: pxX = lonToPixelX(lon, zoom);
  $: pxY = latToPixelY(lat, zoom);
  $: tileX = Math.floor(pxX / TILE_SIZE);
  $: tileY = Math.floor(pxY / TILE_SIZE);
  $: markerLeft = pxX - tileX * TILE_SIZE;
  $: markerTop = pxY - tileY * TILE_SIZE;
  $: tileUrl = `https://tile.openstreetmap.org/${zoom}/${tileX}/${tileY}.png`;
</script>

<div class="map">
  <img src={tileUrl} alt="" width="256" height="256" loading="lazy" />
  <span class="map__pin" style="left:{markerLeft}px; top:{markerTop}px" aria-hidden="true">
    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C7.6 0 4 3.6 4 8c0 5.4 6.7 13.2 7.4 14 .3.4.9.4 1.2 0 .7-.8 7.4-8.6 7.4-14 0-4.4-3.6-8-8-8zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
    </svg>
  </span>
</div>
<p class="map__caption">Approximate location</p>

<style>
  .map {
    position: relative;
    width: 100%;
    aspect-ratio: 1 / 1;
    max-width: 256px;
    border-radius: var(--radius);
    overflow: hidden;
    border: 1px solid var(--color-border);
    background: var(--color-surface);
  }

  .map img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .map__pin {
    position: absolute;
    transform: translate(-50%, -100%);
    color: var(--color-accent);
    filter: drop-shadow(0 2px 3px rgba(0,0,0,0.35));
  }

  .map__caption {
    font-size: 0.72rem;
    color: var(--color-muted);
    margin-top: 0.4rem;
  }
</style>
