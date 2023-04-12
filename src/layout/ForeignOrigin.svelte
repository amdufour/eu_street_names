<script>
  import { foreignNames } from "../data/foreign-names";
  import Map from "../chartComponents/Map.svelte";
  import LeftColumnIntro from "../texts/LeftColumnIntro.svelte";
  import BarChart from "../chartComponents/BarChart.svelte";
</script>

<section>
  <h2>EU street names of foreign origin</h2>
  <div class="row">
    <div class="col-12 col-md-7">
      <Map />
    </div>
    <div class="col-12 col-md-5">
      <div class="left-col-container">
        <LeftColumnIntro />
        <BarChart {foreignNames} />
      </div>
    </div>
  </div>
</section>
