import { z } from "zod";
import countrySchema from "./Country";

const addressSchema = z.object({
    id: z.number(),
    countryId: z.number(),
    town: z.string(),
    stateProvinceRegion: z.string(),
    address1: z.string(),
    address2: z.string(),
    zipCode: z.string(),
    contactPhone: z.string(),
    country: countrySchema
})

export default addressSchema