<script>
  import { geoPath, geoMercator } from "d3-geo";
  import countries from "../data/eu.json";

  const width = 800;
  const height = 800;

  // Define projection
  const projection = geoMercator()
    .scale(0.75 * width)
    .translate([width / 4, 1.35 * height]);

  // Initialize the path generator
  const geoPathGenerator = geoPath().projection(projection);
</script>

<svg {width} {height}>
  {#each countries.features as country}
    <path
      d={geoPathGenerator(country)}
      fill="none"
      stroke="#3A3939"
      stroke-width={0.5}
    />
  {/each}
</svg>
