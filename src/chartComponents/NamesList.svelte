<script>
  import viewport from "../helper/useViewportAction";
  export let foreignNames;
  export let namesListIsInViewport;

  $: namesToDisplay = foreignNames;
  console.log(foreignNames);
  let currentScroll = 0;
  let isScrollUp = true;
  let indexToHighlight = 0;

  const handleEnterViewport = () => {
    namesListIsInViewport = true;
    indexToHighlight = 0;
  };
  const handleLeaveViewport = () => {
    namesListIsInViewport = false;
  };

  const handleNameScroll = (newScroll) => {
    isScrollUp = newScroll > currentScroll ? true : false;
    currentScroll = newScroll;
  };
  const handleNameChange = (name, isLeave) => {
    if (isScrollUp && isLeave) {
      console.log("up leave");

      const currentIndex = namesToDisplay.findIndex(
        (n) => n.name === name.name && n["Wikidata ID"] === name["Wikidata ID"]
      );
      indexToHighlight = currentIndex + 1;
    } else if (!isScrollUp && !isLeave) {
      console.log("down leave");
      indexToHighlight -= 1;
    }
  };
</script>

<h3>Most common foreign names</h3>
<div class="number">
  {namesToDisplay.length} name{namesToDisplay.length > 1 ? "s" : ""}
</div>
<div class="list-container">
  <ul
    use:viewport
    on:enterViewport={() => handleEnterViewport()}
    on:exitViewport={() => handleLeaveViewport()}
    on:scroll={(e) => handleNameScroll(e.target.scrollTop)}
  >
    {#each namesToDisplay as name, i}
      <li
        use:viewport
        on:enterViewport={() => handleNameChange(name, false)}
        on:exitViewport={() => handleNameChange(name, true)}
        class:highlighted={indexToHighlight === i}
      >
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
</div>

<style lang="scss">
  .list-container {
    position: relative;
    max-height: 700px;
    &:before,
    &:after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      height: 60px;
    }
    &:before {
      top: 0;
      background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 1) 0%,
        rgba(255, 255, 255, 0) 100%
      );
    }
    &:after {
      bottom: 0;
      background: linear-gradient(
        0deg,
        rgba(255, 255, 255, 1) 0%,
        rgba(255, 255, 255, 0) 100%
      );
    }
  }
  ul {
    max-height: 700px;
    overflow-y: scroll;
  }
  li {
    margin: 15rem 0;
  }
  .number {
    font-family: $fontSecondary;
    font-size: 1.6rem;
  }
  .name {
    font-size: 1.8rem;
  }
  .name .number {
    margin-left: 6px;
  }
  .highlighted {
    color: pink;
  }
</style>
