import { startCase } from "lodash";

function formatBookName(s: string) {
  return startCase(s);
}

export { formatBookName };
