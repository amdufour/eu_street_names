<script>
  export let data;
  export let euCountries;
</script>

<section>
  <h2>EU countries Influencing their Neighbors</h2>
  <div class="row">
    <div class="col-12 col-md-9">
      {#each data as d}
        <div class="country">
          <div class="label-container">
            <img
              src="./src/assets/countries/{euCountries.find(
                (c) => c.name === d.country
              ).code}.svg"
              alt="Map of {d.country}"
            />
            <div class="label">{d.country}</div>
          </div>
        </div>
      {/each}
    </div>
    <div class="col-12 col-md-3" />
  </div>
</section>

<style lang="scss">
  .country {
    margin-top: 3.5rem;
  }
  .label-container,
  .label-container img {
    width: 27rem;
  }
  .label {
    width: 23rem;
    margin-bottom: 5px;
    font-size: 1.6rem;
    text-align: center;
  }
</style>
