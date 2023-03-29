<script>
  import { exportsPerEuCountry } from "./data/exportsPerEuCountry";
  import { cities } from "./data/cities";
  import { euCountries } from "./data/countries";
  import Header from "./layout/Header.svelte";
  import Footer from "./layout/Footer.svelte";
  import WomenMenComparison from "./layout/WomenMenComparison.svelte";
</script>

<Header />
<main>
  <div class="container">
    <WomenMenComparison data={exportsPerEuCountry} />
  </div>
</main>
<Footer />

<style lang="scss">
</style>
