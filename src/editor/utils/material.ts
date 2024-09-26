import { pick } from "lodash-es";

export function extraCommonProps(props: any) {
  return pick(props, ["style", "data-component-id"]);
}
