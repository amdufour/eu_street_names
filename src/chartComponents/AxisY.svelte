<script>
  export let yScale;
  export let labels;
</script>

<g class="axis axis-y">
  {#each labels as label}
    <text x={-20} y={yScale(label)} text-anchor="end" dominant-baseline="middle"
      >{label}</text
    >
  {/each}
</g>

<style lang="scss">
  text {
    font-size: 1.6rem;
  }
</style>
