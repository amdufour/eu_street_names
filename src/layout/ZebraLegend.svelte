<script>
  import { range } from "d3-array";
  import { fields } from "../data/fields";

  export let xScale;
  export let minNumCities;
  export let maxExports;

  const nameWidths = range(minNumCities, maxExports + 1, 3);
</script>

<div class="sticky-container">
  <div class="sticky legend">
    <div class="legend-section">
      <h4>Explore</h4>
    </div>
    <div class="legend-section">
      <h4>Colors</h4>
      <ul class="color-legend">
        {#each fields as field}
          <li>
            <span class="color" style="background-color: {field.color};" />
            <span class="label">{field.label}</span>
          </li>
        {/each}
      </ul>
    </div>
    <div class="legend-section">
      <h4>Number of streets</h4>
      <ul class="width-legend">
        {#each nameWidths as width}
          <li>
            <span class="name" style="width: {xScale(width)}px;" />
            <span class="label">{width}</span>
          </li>
        {/each}
      </ul>
    </div>
  </div>
</div>

<style lang="scss">
  .sticky-container {
    display: flex;
    height: 100%;
  }
  .sticky {
    align-self: flex-end;
    bottom: 2rem;
    position: -webkit-sticky;
    position: sticky;
    padding-left: 30px;
  }
  .label {
    font-size: 1.8rem;
  }
  .color-legend {
    li {
      display: flex;
      align-items: center;
      margin: 10px 0;
    }
    .color {
      width: 20px;
      height: 40px;
      border-radius: $radius;
    }
    .label {
      margin-left: 10px;
    }
  }
  .width-legend {
    display: flex;
    li {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-right: 10px;
    }
    .name {
      height: 55px;
      background-color: $gray;
      opacity: $grayOpacity;
      border-radius: $radius;
    }
  }
</style>
