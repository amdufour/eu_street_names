<script>
  import { fix_position } from "svelte/internal";

  export let width;
  export let height;
  export let xScale;
  export let position;

  $: divider = width <= 600 ? 100 : 250;
  $: numberOfTicks = width / divider;
  $: ticks = xScale.ticks(numberOfTicks);
</script>

<g
  class="axis axis-x"
  transform="translate(0, {position === 'bottom' ? height : 0})"
>
  {#each ticks as tick}
    <text
      x={xScale(tick)}
      y={position === "bottom" ? 0 : -25}
      text-anchor="center"
      dominant-baseline="hanging">{tick}</text
    >
  {/each}
</g>

<style lang="scss">
  text {
    font-size: 1.6rem;
  }
</style>
