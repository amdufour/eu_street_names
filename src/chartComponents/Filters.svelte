<script>
  import { Button, Dropdown, DropdownItem, Chevron } from "flowbite-svelte";
  import fields from "../data/fields.json";
  import regions from "../data/regions.json";
  export let selectedFilters;
  export let onSelectFilter;

  const handleGenderSelection = (gender) => {
    console.log(selectedFilters);
    if (selectedFilters.gender !== gender) {
      onSelectFilter("gender", gender);
    }
  };
</script>

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
          ? selectedFilters.field
          : "Select a field of practice"}</Chevron
      ></Button
    >
    <Dropdown>
      {#each fields as field}
        <DropdownItem>{field.label}</DropdownItem>
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
        <DropdownItem>{region.id}</DropdownItem>
      {/each}
    </Dropdown>
  </div>
</div>

<style lang="scss">
  .filters {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-bottom: 3rem;
    font-size: 1.6rem;
  }
  .filter-section {
    margin-bottom: 15px;
  }
  .filter-section.gender {
    margin-top: 35px;
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
</style>
