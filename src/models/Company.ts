import {
	Table,
	Column,
	Model,
	DataType,
	Default,
	DefaultScope,
} from "sequelize-typescript";
import { Op, type Optional } from "sequelize";
import type { CompanySchema } from "@schemas/company.schema";
import { ensureError } from "../utils";

interface CompanyCreationAttributes extends Optional<CompanySchema, "id"> {}

@Table({
	tableName: "companies",
	timestamps: true,
	paranoid: true,
})
@DefaultScope(() => ({
	where: { status: "active" },
	attributes: {
		exclude: ["status", "updatedAt", "deletedAt"],
	},
}))
class Company extends Model<CompanySchema, CompanyCreationAttributes> {
	@Column({
		autoIncrement: true,
		primaryKey: true,
		type: DataType.INTEGER,
		comment: "This is the primary key",
	})
	id!: number;

	@Column({
		type: DataType.STRING(100),
		allowNull: false,
		comment: "This is the name of the company",
	})
	name!: string;

	@Column({
		type: DataType.STRING(13),
		allowNull: false,
		comment: "This is the RFC of the company",
		unique: true,
	})
	RFC!: string;

	@Column({
		type: DataType.STRING(100),
		allowNull: false,
		comment: "This is the social reason of the company",
		unique: true,
	})
	rznSocial!: string;

	@Column({
		type: DataType.INTEGER,
		allowNull: false,
		comment: "This is the fiscal regime of the company",
	})
	regimenFiscal!: number;

	@Column({
		type: DataType.TEXT,
		allowNull: false,
		comment: "This is the image of the company",
	})
	img!: string;

	@Column({
		type: DataType.STRING(100),
		allowNull: false,
		comment: "This is the street of the company",
	})
	street!: string;

	@Column({
		type: DataType.STRING(100),
		allowNull: false,
		comment: "This is the external number of the company",
	})
	numExt!: string;

	@Column({
		type: DataType.STRING(100),
		allowNull: false,
		comment: "This is the first cross of the company",
	})
	crossOne!: string;

	@Column({
		type: DataType.STRING(100),
		allowNull: false,
		comment: "This is the second cross of the company",
	})
	crossTwo!: string;

	@Column({
		type: DataType.STRING(5),
		allowNull: false,
		comment: "This is the postal code of the company",
	})
	CP!: string;

	@Column({
		type: DataType.STRING(100),
		allowNull: false,
		comment: "This is the colony of the company",
	})
	colony!: string;

	@Column({
		type: DataType.STRING(100),
		allowNull: false,
		comment: "This is the city of the company",
	})
	city!: string;

	@Column({
		type: DataType.BOOLEAN,
		allowNull: false,
		comment: "This is the stock control of the company",
	})
	stockControl!: boolean;

	@Column({
		type: DataType.INTEGER,
		allowNull: false,
		comment: "This is the quantity of integers of the company",
	})
	integersQ!: number;

	@Column({
		type: DataType.INTEGER,
		allowNull: false,
		comment: "This is the quantity of decimals of the company",
	})
	decimalsQ!: number;

	@Default("active")
	@Column({
		type: DataType.ENUM("active", "inactive"),
		allowNull: false,
		comment: "This is the status of the company",
	})
	status!: string;
}

export default Company;

const getCompanies = async () => {
	try {
		const companies = await Company.findAll();
		if (companies.length === 0) {
			return {
				message: "There are no companies",
				success: false,
			};
		}
		return {
			data: companies,
			message: "Companies found",
			success: true,
		};
	} catch (error) {
		return {
			success: false,
			message: ensureError(error),
		};
	}
};

const getCompanyById = async (id: CompanySchema["id"]) => {
	try {
		const company = await Company.findByPk(id);
		if (!company) {
			return {
				message: "Company not found",
				success: false,
			};
		}
		return {
			data: company,
			message: "Company found",
			success: true,
		};
	} catch (error) {
		return {
			success: false,
			message: ensureError(error),
		};
	}
};

const createCompany = async (company: CompanySchema) => {
	try {
		const existRFCORRznSocial = await Company.findOne({
			where: {
				[Op.or]: [{ RFC: company.RFC }, { rznSocial: company.rznSocial }],
			},
		});

		if (existRFCORRznSocial) {
			return {
				message: "RFC or social reason already exists",
				success: false,
			};
		}

		const newCompany = await Company.create(company);
		if (!newCompany) {
			return {
				message: "Company could not be created",
				success: false,
			};
		}
		return {
			data: newCompany,
			message: "Company created",
			success: true,
		};
	} catch (error) {
		return {
			success: false,
			message: ensureError(error),
		};
	}
};

export const CompanyModel = {
	getCompanies,
	getCompanyById,
	createCompany,
};

//TODO Update and delete company
