<script>
  import { exportsPerEuCountry } from "./data/exportsPerEuCountry";
  import { cities } from "./data/cities";
  import { euCountries } from "./data/countries";
  import Header from "./layout/Header.svelte";
  import Footer from "./layout/Footer.svelte";
  import WomenMenComparison from "./layout/WomenMenComparison.svelte";
  import EuInfluence from "./layout/EuInfluence.svelte";
  import ForeignOrigin from "./layout/ForeignOrigin.svelte";
</script>

<Header />
<main>
  <div class="container">
    <ForeignOrigin />
    <EuInfluence data={exportsPerEuCountry} {euCountries} />
    <WomenMenComparison data={exportsPerEuCountry} />
  </div>
</main>
<Footer />

<style lang="scss">
</style>
