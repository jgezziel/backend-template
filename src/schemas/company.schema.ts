import { z } from "zod";

const Company = z.object({
	id: z.number({ required_error: "Company id is required" }),
	name: z.string({ required_error: "Company name is required" }).min(3, {
		message: "Name must be at least 3 characters long",
	}),
	RFC: z
		.string({ required_error: "Company RFC is required" })
		.min(12, {
			message: "RFC must be 12 characters long",
		})
		.max(13, {
			message: "RFC must be 13 characters long",
		}),
	rznSocial: z.string({ required_error: "Company rznSocial is required" }),
	regimenFiscal: z.number({
		required_error: "Company regimenFiscal is required",
	}),
	img: z.string({ required_error: "Company img is required" }),
	street: z.string({ required_error: "Company street is required" }),
	numExt: z.string({ required_error: "Company numExt is required" }),
	crossOne: z.string({ required_error: "Company crossOne is required" }),
	crossTwo: z.string({ required_error: "Company crossTwo is required" }),
	CP: z.string({ required_error: "Company CP is required" }).max(5, {
		message: "CP must be 5 characters long",
	}),
	colony: z.string({ required_error: "Company colony is required" }),
	city: z.string({ required_error: "Company city is required" }),
	stockControl: z.boolean({
		required_error: "Company stockControl is required",
	}),
	integersQ: z.number({ required_error: "Company integersQ is required" }),
	decimalsQ: z.number({ required_error: "Company decimalsQ is required" }),
	status: z.enum(["active", "inactive"], {
		required_error: "Company status is required",
	}),
});

export type CompanySchema = z.infer<typeof Company>;

const newCompany = Company.omit({ id: true, status: true });

export const validateCompany = (data: unknown) => {
	return newCompany.safeParse(data);
};
