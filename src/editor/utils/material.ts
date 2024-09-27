import { pick, omit } from "lodash-es";

export function extraCommonProps(props: Record<string, any>) {
  return pick(props, ["style", "data-component-id"]);
}

export function omitProps(props: Record<string, any>, omitKeys: string[]) {
  return omit(props, omitKeys);
}
