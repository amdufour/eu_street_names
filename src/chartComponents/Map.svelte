<script>
  import { fade, fly } from "svelte/transition";
  import * as topojson from "topojson-client";
  import { geoPath, geoMercator } from "d3-geo";
  import { scaleRadial } from "d3-scale";
  import countries from "../data/eu-topojson.json";
  import citiesInfo from "../data/cities.json";
  import RadiusLegend from "./RadiusLegend.svelte";

  export let selectedRegion = null;
  export let maxNamesPerCity;
  export let namesListIsInViewport;

  const width = 800;
  const height = 800;

  // Convert TopoJSON to GeoJSON
  let countriesMap = topojson.feature(countries, countries.objects.eu).features;

  // Extract borders
  let borders = topojson.mesh(countries, countries.objects.eu);

  // Define projection
  const projection = geoMercator()
    .scale(0.7 * width)
    .translate([width / 4 + 50, 1.28 * height]);

  // Initialize the path generator
  const geoPathGenerator = geoPath().projection(projection);

  // Initialize the radial scale
  const radiusScale = scaleRadial().domain([0, maxNamesPerCity]).range([0, 60]);

  // Handle cities display
  let cities = [];
  $: tooltipIsVisible = false;
  $: if (selectedRegion !== null) {
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

    cities.forEach((city) => {
      const relatedCity = citiesInfo.find((c) => c.city === city.id);
      city["label"] = relatedCity.cityEN;
      city["latitude"] = relatedCity.latitude;
      city["longitude"] = relatedCity.longitude;
    });
  }

  const tooltipMeta = {
    x: 0,
    y: 0,
    city: "",
    names: [],
  };
  const handleMouseEnter = (e, city) => {
    tooltipMeta.x = e.offsetX;
    tooltipMeta.y = e.offsetY;
    tooltipMeta.city = city.label;
    tooltipMeta.names = city.names;
    tooltipIsVisible = true;
  };

  const handleMouseLeave = () => {
    tooltipIsVisible = false;
  };
</script>

<div class="map-container" on:mouseleave={() => handleMouseLeave()}>
  <svg {width} {height}>
    <path
      d={geoPathGenerator(borders)}
      fill="none"
      stroke="#3A3939"
      stroke-width={0.5}
    />
    {#if selectedRegion !== null && !namesListIsInViewport}
      {#each cities as city}
        <circle
          cx={projection([city.longitude, city.latitude])[0]}
          cy={projection([city.longitude, city.latitude])[1]}
          r={radiusScale(city.names.length)}
          transition:fade
          on:mouseenter={(e) => handleMouseEnter(e, city)}
          on:focus={(e) => handleMouseEnter(e, city)}
        />
      {/each}
      <RadiusLegend {radiusScale} {height} />
    {/if}
  </svg>
  {#if tooltipIsVisible}
    <div
      class="map-tooltip"
      style="left: {tooltipMeta.x + 10}px; top: {tooltipMeta.y + 10}px;"
      in:fly={{ y: 10, duration: 200, delay: 200 }}
      out:fade
    >
      <div class="city">
        {tooltipMeta.city}, {tooltipMeta.names.length} street name{tooltipMeta
          .names.length > 1
          ? "s"
          : ""} originating from
        {selectedRegion.id}
      </div>
      <ul>
        {#each tooltipMeta.names as name}
          <li class:female={name.gender === "female"}>
            <span class="name-label">{name.name}: </span>
            <span class="name-label">{name["description (from Wikidata)"]}</span
            >
          </li>
        {/each}
      </ul>
    </div>
  {/if}
</div>

<style lang="scss">
  circle {
    fill: $selection;
    fill-opacity: 0.4;
    transition: r 350ms ease;
  }
  .map-tooltip {
    position: relative;
    width: 400px;
    position: absolute;
    z-index: 10;
    padding: 20px 25px 5px;
    line-height: 1.2;
    background-color: #fff;
    border: 1px solid $text;
    border-radius: 3px;
    box-shadow: 0 2px 6px 0 rgba($text, 0.2);
    &:after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 60px;
      background: linear-gradient(
        0deg,
        rgba(255, 255, 255, 1) 0%,
        rgba(255, 255, 255, 0) 100%
      );
    }
    .city {
      margin-left: -2px;
      font-size: 1.8rem;
    }
    ul {
      position: relative;
      max-height: 280px;
      margin-bottom: 15px;
      margin-left: -20px;
      padding-left: 20px;
      overflow-y: scroll;
    }
    li {
      margin: 15px 0;
      font-family: $fontSecondary;
      font-size: 1.6rem;
      &.female {
        position: relative;
        &:before {
          content: "";
          position: absolute;
          left: -17px;
          top: 0;
          width: 15px;
          height: 18px;
          background-image: url("../assets/female_sm.svg");
          background-repeat: no-repeat;
          background-position: center;
          background-size: contain;
        }
      }
    }
  }
</style>
