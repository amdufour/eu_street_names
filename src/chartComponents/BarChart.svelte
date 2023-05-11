<script>
  import { scaleLinear } from "d3-scale";
  import foreignRegions from "../data/regions.json";

  export let foreignNames;
  export let selectedRegion = null;
  export let namesListIsInViewport;

  foreignRegions.forEach((region) => {
    region["names"] = foreignNames.filter((name) => name.region === region.id);
  });
  console.log("foreignRegions", foreignRegions);

  const barWidthScale = scaleLinear().domain([0, 250]).range([0, 540]);

  $: windowWidth = 1400;
  $: euBarWidth = (windowWidth - 1400) / 2 - 80 + (0.4167 * 1400 - 15);

  const handleBarClick = (region) => {
    selectedRegion = region;
  };
</script>

<svelte:window bind:innerWidth={windowWidth} />

<div class="bar-chart-container">
  <div class="instructions">Select a region</div>
  {#each foreignRegions as region, i}
    <div
      class="bar"
      class:selected={selectedRegion !== null &&
        selectedRegion.id === region.id &&
        !namesListIsInViewport}
      on:click={() => handleBarClick(region)}
    >
      <div
        class="rect"
        style="width: {i === 0 && windowWidth > 1400
          ? euBarWidth
          : barWidthScale(region.names.length)}px"
      />
      {#if i === 0 && windowWidth > 1400}
        <svg
          class="bar-extension"
          viewBox="0 0 47.47 57"
          style="left: {euBarWidth - 6}px"
        >
          <path
            d="m45.79,25.47c2.25,1.39,2.25,4.66,0,6.05L5.43,56.46C3.06,57.93,0,56.22,0,53.44V3.56C0,.78,3.06-.93,5.43.54l40.36,24.94Z"
            style="fill: #e0e4ea;"
          />
        </svg>
      {/if}
      <div class="label-container">
        <div class="label">{region.id} ({region.names.length})</div>
      </div>
    </div>
  {/each}
</div>

<style lang="scss">
  .bar {
    position: relative;
    cursor: pointer;
    &.selected {
      .rect {
        background-color: $selection;
        @include easeSineOut;
      }
      .bar-extension path {
        fill: $selection !important;
        @include easeSineOut;
      }
    }
  }
  .rect {
    margin-bottom: 1.7rem;
    height: 50px;
    background-color: $grayPale;
    border-radius: 5px;
    transition-property: background-color;
    @include easeSineIn;
  }
  .bar-extension {
    position: absolute;
    top: 0;
    height: 50px;
    width: auto;
    path {
      @include easeSineIn;
    }
  }
  .label-container {
    display: flex;
    align-items: center;
    position: absolute;
    top: 0;
    left: 20px;
    height: 100%;
    .label {
      position: relative;
      margin-top: 1px;
      line-height: 1.2;
    }
  }
</style>
