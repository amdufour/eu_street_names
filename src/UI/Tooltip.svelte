<script>
  import { fly, fade } from "svelte/transition";
  import citiesData from "../data/cities.json";

  export let x;
  export let y;
  export let name;
  export let birth_year;
  export let death_year;
  export let description;
  export let citizenship;
  export let cities;
</script>

<div
  class="tooltip"
  in:fly={{ y: 10, duration: 200, delay: 200 }}
  out:fade
  style="top: {y + 15}px; left: {x + 10}px"
>
  <div class="image-container" />
  <div class="metadata-container">
    <div class="name">
      {name}{birth_year !== "NA" && death_year !== "NA"
        ? ` (${birth_year} - ${death_year})`
        : ""}
    </div>
    <div class="section description">{description}</div>
    <div class="section description">{citizenship}</div>
    <div class="section description">
      <span class="label"
        >{cities.length} street{cities.length > 1 ? "s" : ""} celebrate this person:
      </span>
      {#each cities as city, i}
        <span
          >{citiesData.find((c) => c.city === city).cityEN}{i ===
          cities.length - 1
            ? ""
            : ", "}</span
        >
      {/each}
    </div>
  </div>
</div>

<style lang="scss">
  .tooltip {
    display: flex;
    position: absolute;
    width: 800px;
    background-color: $white;
    border: 1px solid $gray;
    border-radius: 3px;
  }
  .image-container {
    flex-shrink: 0;
    width: 250px;
    height: 100%;
  }
  .metadata-container {
    padding: 45px 35px;
    font-size: 1.8rem;
    line-height: 1.6;
    .name {
      font-family: $fontSecondary;
      font-size: 2.2rem;
      font-weight: 500;
    }
    .section {
      margin: 8px 0;
    }
  }
</style>
