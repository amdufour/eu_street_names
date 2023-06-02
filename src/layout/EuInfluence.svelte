<script>
  import { scaleLinear } from "d3-scale";
  import { max } from "d3-array";

  import { colorScale } from "../data/scales";
  import fields from "../data/fields.json";
  import ZebraLegend from "./ZebraLegend.svelte";
  import zebraData from "../data/zebraData.json";

  export let data;
  export let euCountries;
  export let isTooltipVisible;
  export let tooltipMetadata;

  // Prepare data
  // const zebraData = [...data];
  const minNumCities = 3;
  const numForeignCities =
    "n. of foreign cities celebrating the individual with one or more streets (current country borders)";
  const maxExportsPerCountry = [];
  zebraData.forEach((country) => {
    // country["exportsInMoreThanThree"] = [];
    // const allNames = country.exportedNames.sort(
    //   (a, b) => +b[numForeignCities] - +a[numForeignCities]
    // );
    // fields.forEach((field) => {
    //   allNames.forEach((name) => {
    //     if (name.field === field.id && name[numForeignCities] >= minNumCities) {
    //       country.exportsInMoreThanThree.push(name);
    //     }
    //   });
    // });

    if (country.exportsInMoreThanThree.length > 0) {
      maxExportsPerCountry.push(
        max(country.exportsInMoreThanThree, (d) => +d[numForeignCities])
      );
    }
  });
  const maxExports = max(maxExportsPerCountry);

  // zebraData.sort(
  //   (a, b) => b.exportsInMoreThanThree.length - a.exportsInMoreThanThree.length
  // );
  // const dataToDisplay = zebraData
  //   .filter((d) => d.exportsInMoreThanThree.length > 0)
  //   .slice(0, 10);
  // console.log("dataToDisplay", dataToDisplay);
  // dataToDisplay.forEach((d) => {
  //   d.exportsInMoreThanThree.forEach((name) => {
  //     name["isHovered"] = false;
  //   });
  // });

  // async function getImageUrlFromWikidata(wikidataId) {
  //   const url = `https://www.wikidata.org/w/api.php?action=wbgetentities&format=json&ids=${wikidataId}&props=claims`;

  //   try {
  //     const response = await fetch(url);
  //     const data = await response.json();

  //     // Extract the image URL from the response
  //     const imageUrl =
  //       data.entities[wikidataId].claims.P18[0].mainsnak.datavalue.value;

  //     return imageUrl;
  //   } catch (error) {
  //     console.error("Error fetching image URL:", error);
  //     return null;
  //   }
  // }

  // dataToDisplay.forEach((c) => {
  //   c.exportsInMoreThanThree.forEach((n) => {
  //     const wikidataId = n["Wikidata ID"]; // Replace with the desired Wikidata ID
  //     getImageUrlFromWikidata(wikidataId)
  //       .then((imageUrl) => {
  //         if (imageUrl) {
  //           const imageTitle = imageUrl.replaceAll(" ", "_");
  //           n[
  //             "image_url"
  //           ] = `https://commons.wikimedia.org/w/thumb.php?width=500&f=${imageTitle}`;
  //         }
  //       })
  //       .catch((error) => {
  //         console.error("Error:", error);
  //       });
  //   });
  // });

  // Dimensions
  const rectHeight = 25;

  // Scales
  const xScale = scaleLinear().domain([0, maxExports]).range([0, 25]);

  // Handle mouse events
  const handleMouseEnter = (e, country, name) => {
    isTooltipVisible = true;
    tooltipMetadata = {
      x: e.pageX,
      y: e.pageY,
      screenY: e.clientY,
      name: name.name,
      birth_year: name["Year of birth (from Wikidata)"],
      death_year: name["Year of death (from Wikidata)"],
      description: name["description (from Wikidata)"],
      citizenship: country,
      cities:
        name[
          "list of cities celebrating the individual with one or more streets"
        ].split("|"),
      image_url: name.image_url,
    };
  };
  const handleMouseLeave = (e, country, name) => {
    isTooltipVisible = false;
  };
</script>

<section>
  <h2>EU countries Influencing their Neighbors</h2>
  <div class="row">
    <div class="col-12 col-md-9">
      {#each zebraData as d}
        <div class="country">
          <div class="label-container">
            <img
              src="./assets/countries/{euCountries.find(
                (c) => c.name === d.country
              ).code}.svg"
              alt="Map of {d.country}"
            />
            <div class="label">{d.country}</div>
          </div>
          <div class="street-names">
            {#each d.exportsInMoreThanThree as name}
              <div
                class="street-name"
                on:mouseover={(e) => handleMouseEnter(e, d.country, name)}
                on:focus={(e) => handleMouseEnter(e, d.country, name)}
                on:mouseleave={(e) => handleMouseLeave(e, d.country, name)}
              >
                <span
                  style="
                    width: {xScale(+name[numForeignCities])}px; 
                    background: {colorScale(name.field)};"
                  class="rect"
                />
                {#if name.gender === "female"}
                  <svg viewBox="0 0 11 17">
                    <path
                      d="m11,5.37c0-2.96-2.47-5.37-5.5-5.37S0,2.41,0,5.37c0,2.74,2.11,5,4.83,5.32v2.41h-2.67v1.3h2.67v2.6h1.33v-2.6h2.67v-1.3h-2.67v-2.41c2.72-.32,4.83-2.58,4.83-5.32Zm-9.67,0C1.33,3.12,3.2,1.3,5.5,1.3s4.17,1.82,4.17,4.06-1.87,4.06-4.17,4.06S1.33,7.61,1.33,5.37Z"
                      style="fill: #445165;"
                    />
                  </svg>
                {/if}
              </div>
            {/each}
          </div>
        </div>
      {/each}
    </div>
    <div class="col-12 col-md-3">
      <ZebraLegend {xScale} {maxExports} {minNumCities} />
    </div>
  </div>
</section>

<style lang="scss">
  .country {
    display: flex;
    align-items: flex-end;
    margin-top: 3.5rem;
  }
  .label-container,
  .label-container img {
    width: 22rem;
  }
  .label {
    width: 23rem;
    margin-bottom: 5px;
    font-size: 1.6rem;
    text-align: center;
  }
  .street-names {
    display: flex;
    flex-wrap: wrap;
    margin-left: -40px;
    margin-bottom: -12px;
  }
  .street-name {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .rect {
    display: inline-block;
    margin: 6px 6px 4px 0;
    margin-right: 6px;
    height: 55px;
    border-radius: 1px;
  }
  svg {
    width: 11px;
    height: auto;
    margin-left: -5.5px;
  }
</style>
