<script>
  import { Button, Dropdown, DropdownItem, Chevron } from "flowbite-svelte";
  import fields from "../data/fields.json";
  import regions from "../data/regions.json";
  export let selectedFilters;
  export let onSelectFilter;
  export let onReset;

  const handleGenderSelection = (gender) => {
    if (selectedFilters.gender !== gender) {
      onSelectFilter("gender", gender);
    }
  };
  const handleFieldSelection = (field) => {
    if (selectedFilters.field !== field) {
      onSelectFilter("field", field);
    }
  };
  const handleRegionSelection = (region) => {
    if (selectedFilters.region !== region) {
      onSelectFilter("region", region);
    }
  };

  const handleReset = () => {
    onReset();
  };
</script>

<div class="instructions">Filter the street names</div>
<div class="filters">
  <div class="filter-section gender">
    <button
      class="filter-women"
      class:selected={selectedFilters.gender === "female"}
      on:click={() => handleGenderSelection("female")}>Women</button
    >
    <button
      class="filter-men"
      class:selected={selectedFilters.gender === "male"}
      on:click={() => handleGenderSelection("male")}>Men</button
    >
  </div>
  <div class="filter-section field">
    <div class="filter-label">Field of practice</div>
    <Button
      ><Chevron
        >{selectedFilters.field !== ""
          ? fields.find((field) => field.id === selectedFilters.field).label
          : "Select a field of practice"}</Chevron
      ></Button
    >
    <Dropdown>
      {#each fields as field}
        <DropdownItem on:click={() => handleFieldSelection(field.id)}
          >{field.label}</DropdownItem
        >
      {/each}
    </Dropdown>
  </div>
  <div class="filter-section region">
    <div class="filter-label">Region</div>
    <Button
      ><Chevron
        >{selectedFilters.region !== ""
          ? selectedFilters.region
          : "Select a region"}</Chevron
      ></Button
    >
    <Dropdown>
      {#each regions as region}
        <DropdownItem on:click={() => handleRegionSelection(region.id)}
          >{region.id}</DropdownItem
        >
      {/each}
    </Dropdown>
  </div>
  {#if selectedFilters.gender !== "" || selectedFilters.field !== "" || selectedFilters.region !== ""}
    <div class="reset" on:click={handleReset}>
      <svg
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-x"
        viewBox="0 0 16 16"
      >
        <path
          d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
        />
      </svg>
      <span>Reset filters</span>
    </div>
  {/if}
</div>

<style lang="scss">
  .filters {
    position: relative;
    margin-bottom: 3rem;
    padding-left: 2px;
    font-size: 1.6rem;
  }
  .filter-section {
    margin-bottom: 15px;
  }
  .filter-section.gender {
    margin-top: 12px;
  }
  button.filter-women,
  button.filter-men {
    padding: 0;
    color: $text;
    background-color: transparent;
    border: none;
    cursor: pointer;
    transition: font-weight 200ms ease;
    &.selected {
      font-weight: 700;
      text-decoration: underline;
      cursor: default;
    }
  }
  button.filter-women {
    position: relative;
    padding-right: 10px;
    &:after {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      width: 1px;
      height: 16px;
      background-color: $text;
    }
  }
  button.filter-men {
    padding-left: 7px;
  }
  .reset {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 1.4rem;
    cursor: pointer;
    svg {
      position: relative;
      top: 3px;
    }
  }
</style>
