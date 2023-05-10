<script>
  import { fade } from "svelte/transition";
  import { geoPath, geoMercator } from "d3-geo";
  import { scaleRadial } from "d3-scale";
  import countries from "../data/eu.json";
  import citiesInfo from "../data/cities.json";
  import RadiusLegend from "./RadiusLegend.svelte";

  export let selectedRegion = null;
  export let maxNamesPerCity;

  const width = 800;
  const height = 800;

  // Define projection
  const projection = geoMercator()
    .scale(0.75 * width)
    .translate([width / 4, 1.35 * height]);

  // Initialize the path generator
  const geoPathGenerator = geoPath().projection(projection);

  // Initialize the radial scale
  const radiusScale = scaleRadial().domain([0, maxNamesPerCity]).range([0, 60]);

  // Handle cities display
  let cities = [];
  $: if (selectedRegion !== null) {
    console.log("selectedRegion", selectedRegion);

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

    cities.forEach((city) => {
      const relatedCity = citiesInfo.find((c) => c.city === city.id);
      city["label"] = relatedCity.cityEN;
      city["latitude"] = relatedCity.latitude;
      city["longitude"] = relatedCity.longitude;
    });
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
  {#if selectedRegion !== null}
    {#each cities as city}
      <circle
        cx={projection([city.longitude, city.latitude])[0]}
        cy={projection([city.longitude, city.latitude])[1]}
        r={radiusScale(city.names.length)}
        transition:fade
      />
    {/each}
    <RadiusLegend {radiusScale} {height} />
  {/if}
</svg>

<style lang="scss">
  circle {
    fill: $selection;
    fill-opacity: 0.4;
    transition: r 350ms ease;
  }
</style>
