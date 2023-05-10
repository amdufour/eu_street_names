<script>
  import foreignNames from "../data/foreign-names.json";
  import Map from "../chartComponents/Map.svelte";
  import LeftColumnIntro from "../texts/LeftColumnIntro.svelte";
  import BarChart from "../chartComponents/BarChart.svelte";
  import NamesList from "../chartComponents/NamesList.svelte";
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

  $: namesListIsInViewport = false;
</script>

<section>
  <h2>EU street names of foreign origin</h2>
  <div class="row">
    <div class="col-12 col-md-7">
      <div class="sticky-container">
        <div class="sticky">
          <Map {selectedRegion} {maxNamesPerCity} {namesListIsInViewport} />
        </div>
      </div>
    </div>
    <div class="col-12 col-md-5">
      <div class="left-col-container">
        <LeftColumnIntro />
        <BarChart {foreignNames} {namesListIsInViewport} bind:selectedRegion />
        <NamesList {foreignNames} bind:namesListIsInViewport />
      </div>
    </div>
  </div>
</section>

<style>
  .sticky-container {
    display: flex;
    height: 100%;
    position: relative;
    z-index: 10;
  }
  .sticky {
    align-self: flex-end;
    bottom: calc((100vh - 800px) / 2 - 30px);
    position: -webkit-sticky;
    position: sticky;
  }
</style>
