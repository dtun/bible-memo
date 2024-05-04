import { setupServer } from "msw/node";

import { handlers } from "./handlers";

let server = setupServer(...handlers);

export { server };
