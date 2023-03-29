<script>
  import { data } from "./data/data";
  import { cities } from "./data/cities";
  import { euCountries } from "./data/countries";
  import Header from "./layout/Header.svelte";
  import Footer from "./layout/Footer.svelte";
  import WomenMenComparison from "./layout/WomenMenComparison.svelte";

  console.log("all data", data);
  const exportedNames = data.filter(
    (d) =>
      d.region === "EU" &&
      +d[
        "n. of foreign cities celebrating the individual with one or more streets (current country borders)"
      ] > 0
  );
  console.log("exportedNames", exportedNames);
</script>

<Header />
<main>
  <div class="container">
    <WomenMenComparison />
  </div>
</main>
<Footer />

<style lang="scss">
</style>
