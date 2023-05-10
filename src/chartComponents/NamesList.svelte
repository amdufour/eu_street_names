<script>
  import viewport from "../helper/useViewportAction";
  export let foreignNames;
  export let namesListIsInViewport;

  $: namesToDisplay = foreignNames;
  console.log(foreignNames);

  const handleEnterViewport = () => {
    namesListIsInViewport = true;
  };
  const handleLeaveViewport = () => {
    namesListIsInViewport = false;
  };
</script>

<h3>Most common foreign names</h3>
<div class="number">
  {namesToDisplay.length} name{namesToDisplay.length > 1 ? "s" : ""}
</div>
<ul
  use:viewport
  on:enterViewport={() => handleEnterViewport()}
  on:exitViewport={() => handleLeaveViewport()}
>
  {#each namesToDisplay as name}
    <li>
      <div class="name">
        {name.name}
        <span class="number"
          >({name["n. of streets dedicated to the individual"]} street{+name[
            "n. of streets dedicated to the individual"
          ] > 1
            ? "s"
            : ""})</span
        >
      </div>
    </li>
  {/each}
</ul>

<style lang="scss">
  .number {
    font-family: $fontSecondary;
    font-size: 1.6rem;
  }
  .name .number {
    margin-left: 6px;
  }
</style>
