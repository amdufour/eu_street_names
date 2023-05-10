<script>
  import { fade, fly } from "svelte/transition";
  import viewport from "../helper/useViewportAction";
  import cities from "../data/cities.json";
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
        <div class="row">
          <div class="col-8">
            <div class="info">
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
              <div
                class="meta-info"
                class:visible={indexToHighlight === i}
                in:fly={{ y: 10, duration: 200, delay: 200 }}
                out:fly={{ y: -10, duration: 200, delay: 200 }}
              >
                <div class="description">
                  <span>{name["description (from Wikidata)"]}</span>
                  {#if !name["description (from Wikidata)"].includes(name["Year of birth (from Wikidata)"]) && name["Year of birth (from Wikidata)"] !== "NA"}
                    ({name["Year of birth (from Wikidata)"]} - {name[
                      "Year of death (from Wikidata)"
                    ]})
                  {/if}
                </div>
                {#if name["country of citizenship (from Wikidata)"] !== "NA"}
                  <div class="region">
                    {name["country of citizenship (from Wikidata)"]}
                  </div>
                {/if}
                <div class="cities">
                  Cities celebrating this individual:
                  {#each name["list of cities celebrating the individual with one or more streets"].split("|") as city, j}
                    {`${cities.find((c) => c.city === city).cityEN}${
                      j ===
                      name[
                        "list of cities celebrating the individual with one or more streets"
                      ].split("|").length -
                        1
                        ? ""
                        : ", "
                    }`}
                  {/each}
                </div>
              </div>
            </div>
          </div>
          <div class="col-4">
            <div class="photo" class:visible={indexToHighlight === i}>
              <div>Photo</div>
            </div>
          </div>
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
    background-color: #fff;
    border-radius: 5px;
    transition: background-color 200ms ease;
    &.female {
      position: relative;
      &:before {
        content: "";
        position: absolute;
        left: 8px;
        top: 22px;
        width: 15px;
        height: 18px;
        background-image: url("../assets/female_sm.svg");
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
      }
    }
  }
  .info {
    padding: 15px 25px;
  }
  .name {
    font-family: $fontSecondary;
    font-size: 2rem;
  }
  .name .number {
    margin-left: 6px;
    font-size: 1.6rem;
  }
  .meta-info {
    font-size: 1.6rem;
    line-height: 1.4;
    div {
      margin: 15px 0;
    }
    &::first-letter {
      text-transform: capitalize;
    }
  }
  .highlighted {
    background-color: $grayPale;
    .name {
      font-family: $fontSecondary;
    }
  }
  .photo {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    color: $white;
    background-color: $text;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }
  .meta-info,
  .photo {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 200ms ease, transform 200ms ease;
    &.visible {
      opacity: 1;
      transform: translateY(0px);
    }
  }
</style>
