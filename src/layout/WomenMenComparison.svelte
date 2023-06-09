<script>
  import { scaleLinear, scalePoint } from "d3-scale";
  import { max } from "d3-array";
  import { fly } from "svelte/transition";

  import AxisX from "../chartComponents/AxisX.svelte";
  import AxisY from "../chartComponents/AxisY.svelte";

  export let data;

  // Prepare data
  const dumbbellData = [...data];
  dumbbellData.forEach((d) => {
    d["womenNames"] = d.exportedNames.filter(
      (name) => name.gender === "female"
    );
    d["menNames"] = d.exportedNames.filter((name) => name.gender === "male");
  });
  dumbbellData.sort((a, b) => b.womenNames.length - a.womenNames.length);

  // Chart Dimensions
  let width = 1000;
  let height = 1800;
  const margin = { top: 30, rigth: 20, bottom: 20, left: 155 };
  $: innerWidth = width - margin.left - margin.rigth;
  const innerHeight = height - margin.top - margin.bottom;

  // Scales
  const maxNames = max(dumbbellData, (d) => d.menNames.length);
  const countries = dumbbellData.map((d) => d.country);
  $: xScale = scaleLinear().domain([0, maxNames]).range([0, innerWidth]);
  const yScale = scalePoint()
    .domain(countries)
    .range([0, innerHeight])
    .padding(0.3);

  // Handle mouse events
  let isTooltipActive = false;
  let activeCountry = "";
  const mouseEnterHandler = (data) => {
    isTooltipActive = true;
    activeCountry = data.country;
  };
  const mouseLeaveHandler = () => {
    isTooltipActive = false;
  };
</script>

<section>
  <h2>How women are (under)Exported</h2>
  <div class="dumbell-container" bind:clientWidth={width}>
    <svg {width} {height} on:mouseleave={mouseLeaveHandler}>
      <g transform="translate({margin.left}, {margin.top})">
        <AxisX
          width={innerWidth}
          height={innerHeight}
          {xScale}
          position="top"
        />
        <AxisX
          width={innerWidth}
          height={innerHeight}
          {xScale}
          position="bottom"
        />
        <AxisY {yScale} labels={countries} leftMargin={margin.left} />
        {#each dumbbellData as d}
          <g transform="translate(0, {yScale(d.country)})">
            <line
              x1={xScale(d.womenNames.length)}
              x2={xScale(d.menNames.length)}
            />
            {#if d.womenNames.length > 0}
              <g
                transform="translate({xScale(d.womenNames.length) - 7}, -24.5)"
              >
                <path
                  d="m16.03,7.89c0-4.35-3.59-7.89-8.01-7.89S0,3.54,0,7.89c0,4.03,3.08,7.35,7.04,7.83v3.54h-3.89v1.91h3.89v3.83h1.94v-3.83h3.89v-1.91h-3.89v-3.54c3.96-.47,7.04-3.8,7.04-7.83Zm-14.08,0c0-3.3,2.72-5.98,6.07-5.98s6.07,2.68,6.07,5.98-2.72,5.98-6.07,5.98S1.94,11.19,1.94,7.89Z"
                />
              </g>
            {/if}
            <g
              transform="translate({xScale(d.menNames.length) - 7}, {d.menNames
                .length -
                d.womenNames.length >=
              10
                ? -21.5
                : d.womenNames.length === 0
                ? -21.5
                : -45})"
            >
              <path
                d="m14.13,0v1.99h4.26l-5.13,5.13c-1.39-1.09-3.15-1.75-5.05-1.75C3.68,5.37,0,9.05,0,13.58s3.68,8.21,8.21,8.21,8.21-3.68,8.21-8.21c0-1.91-.66-3.66-1.75-5.05l5.13-5.13v4.26h1.99V0h-7.66Zm-5.92,19.8c-3.43,0-6.22-2.79-6.22-6.22s2.79-6.22,6.22-6.22,6.22,2.79,6.22,6.22-2.79,6.22-6.22,6.22Z"
              />
            </g>
            {#if isTooltipActive && activeCountry === d.country}
              <g
                class="tooltip"
                text-anchor="middle"
                dominant-baseline="middle"
                transition:fly={{ y: 8, duration: 250 }}
              >
                {#if d.womenNames.length > 0}
                  <text
                    x={d.menNames.length - d.womenNames.length >= 15
                      ? xScale(d.womenNames.length)
                      : xScale(d.womenNames.length) - 5}
                    y={11}>{d.womenNames.length}</text
                  >
                {/if}
                <text
                  x={d.menNames.length - d.womenNames.length >= 15
                    ? xScale(d.menNames.length)
                    : d.womenNames.length === 0
                    ? xScale(d.menNames.length)
                    : xScale(d.menNames.length) + 5}
                  y={11}>{d.menNames.length}</text
                >
              </g>
            {/if}
            <rect
              x={-margin.left}
              y={-yScale.step() / 2}
              width={margin.left + xScale(d.menNames.length) + 20}
              height={yScale.step()}
              fill="rgba(255,255,255,0)"
              on:mouseover={() => mouseEnterHandler(d)}
            />
          </g>
        {/each}
      </g>
    </svg>
  </div>
</section>

<style lang="scss">
  line {
    stroke: $gray;
    stroke-opacity: $grayOpacity;
  }
  path {
    fill: $gray;
  }
  .tooltip text {
    font-size: 1.4rem;
  }
</style>
