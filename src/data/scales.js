import { scaleOrdinal } from "d3-scale";
import { fields } from "./fields";

export const colorScale = scaleOrdinal()
  .domain(fields.map(field => field.id))
  .range(fields.map(field => field.color));