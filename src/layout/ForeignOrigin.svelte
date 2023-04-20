<script>
  import { foreignNames } from "../data/foreign-names";
  import Map from "../chartComponents/Map.svelte";
  import LeftColumnIntro from "../texts/LeftColumnIntro.svelte";
  import BarChart from "../chartComponents/BarChart.svelte";
  import { max } from "d3-array";

  $: selectedRegion = null;

  // Extract max names per city
  const cities = [];
  foreignNames.forEach((name) => {
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
  const maxNamesPerCity = max(cities, (d) => d.names.length);
</script>

<section>
  <h2>EU street names of foreign origin</h2>
  <div class="row">
    <div class="col-12 col-md-7">
      <Map {selectedRegion} {maxNamesPerCity} />
    </div>
    <div class="col-12 col-md-5">
      <div class="left-col-container">
        <LeftColumnIntro />
        <BarChart {foreignNames} bind:selectedRegion />
      </div>
    </div>
  </div>
</section>
