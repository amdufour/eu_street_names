<script>
  export let yScale;
  export let labels;
  export let leftMargin;
</script>

<g class="axis axis-y">
  {#each labels as label}
    <text x={-leftMargin} y={yScale(label)}>{label}</text>
  {/each}
</g>

<style lang="scss">
  text {
    font-size: 1.6rem;
  }
</style>
