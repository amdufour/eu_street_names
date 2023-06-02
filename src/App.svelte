<script>
  import exportsPerEuCountry from "./data/exportsPerEuCountry.json";
  import euCountries from "./data/countries.json";
  import Header from "./layout/Header.svelte";
  import Footer from "./layout/Footer.svelte";
  import WomenMenComparison from "./layout/WomenMenComparison.svelte";
  import EuInfluence from "./layout/EuInfluence.svelte";
  import ForeignOrigin from "./layout/ForeignOrigin.svelte";
  import Tooltip from "./UI/Tooltip.svelte";

  let isTooltipVisible = false;
  let tooltipMetadata = {
    x: 0,
    y: 0,
    name: "",
    birth_year: "",
    death_year: "",
    description: "",
    citizenship: "",
    cities: [],
    image_url: "",
  };
</script>

<div class="page-container">
  <Header />
  <main>
    <div class="container">
      <!-- <ForeignOrigin /> -->
      <EuInfluence
        data={exportsPerEuCountry}
        {euCountries}
        bind:isTooltipVisible
        bind:tooltipMetadata
      />
      <WomenMenComparison data={exportsPerEuCountry} />
    </div>
  </main>
  <Footer />
  {#if isTooltipVisible}
    <Tooltip {...tooltipMetadata} />
  {/if}
</div>

<style lang="scss">
  .page-container {
    position: relative;
  }
</style>
