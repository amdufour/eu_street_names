<script>
  import { geoPath, geoMercator } from "d3-geo";
  import countries from "../data/eu.json";

  export let selectedRegion = null;

  const width = 800;
  const height = 800;

  // Define projection
  const projection = geoMercator()
    .scale(0.75 * width)
    .translate([width / 4, 1.35 * height]);

  // Initialize the path generator
  const geoPathGenerator = geoPath().projection(projection);

  // Handle cities display
  let cities = [];
  $: if (selectedRegion !== null) {
    console.log(selectedRegion);

    cities = [];
    selectedRegion.names.forEach((name) => {
      const celebratingCities =
        name[
          "list of cities celebrating the individual with one or more streets"
        ].split("|");
      celebratingCities.forEach((city) => {
        if (cities.find((c) => c.id === city)) {
          cities.find((c) => c.id === city).names.push(name);
        } else {
          cities.push({
            id: city,
            names: [name],
          });
        }
      });
    });
    console.log("cities", cities);
  }
</script>

<svg {width} {height}>
  {#each countries.features as country}
    <path
      d={geoPathGenerator(country)}
      fill="none"
      stroke="#3A3939"
      stroke-width={0.5}
    />
  {/each}
</svg>
