import { z } from "zod";
import addressSchema from "./Country";

const partySchema = z.object({
    id: z.number(),
    partyTypeId: z.number(),
    nickName: z.string(),
    indFirstName: z.string(),
    indLastName: z.string(),
    orgName: z.string().nullish(),
    orgIdentNumber: z.string().nullish(),
    email: z.string(),
    verificationStatusId: z.number().nullish(),
    addressId: addressSchema.nullish(),
    billingAddressId: addressSchema.nullish(),
    avatarId: z.number().nullish(),
})

export default partySchema