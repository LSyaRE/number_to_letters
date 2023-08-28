import { mapNumber } from "../scripts/number-mapping.js";

// export const NUMBERS =  mapNumber();
const { base, exceptions } = mapNumber();
export const BASE_NUMBERS = Object.keys(base);
export const EXCEPTION_NUMBERS = Object.keys(exceptions);

