<script>
  import { fade } from "svelte/transition";

  export let radiusScale;
  export let height;

  const max = 400;
  const numbers = [20, 100, max];
  const maxRadius = radiusScale(max);
</script>

<g
  class="radius-legend"
  transition:fade
  transform="translate(2, {height - 2 * maxRadius - 2})"
>
  <g class="legend-circles">
    {#each numbers as number}
      <circle
        cx={maxRadius}
        cy={2 * maxRadius - radiusScale(number)}
        r={radiusScale(number)}
      />
    {/each}
  </g>
  <g class="legend-bars">
    {#each numbers as number}
      <line
        x1={maxRadius}
        y1={2 * (maxRadius - radiusScale(number))}
        x2={maxRadius + 80}
        y2={2 * (maxRadius - radiusScale(number))}
        stroke-linecap="round"
        stroke-dasharray="6 4"
      />
    {/each}
  </g>
  <g class="legend-labels">
    {#each numbers as number}
      <text
        x={maxRadius + 85}
        y={2 * (maxRadius - radiusScale(number))}
        dominant-baseline="middle">{number}</text
      >
    {/each}
  </g>
</g>

<style lang="scss">
  circle {
    fill: $selection;
    fill-opacity: 0.4;
  }
  line {
    stroke: $text;
  }
  text {
    font-size: 1.6rem;
  }
</style>
