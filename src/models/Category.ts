import {
  Table,
  Column,
  Model,
  DataType,
  Default,
  DefaultScope,
} from "sequelize-typescript";
import type { Optional } from "sequelize";
import type {
  CategorySchema,
  NewCategorySchema,
} from "@schemas/category.schema";
import { ensureError } from "../utils";

interface CategoryCreationAttributes
  extends Optional<CategorySchema, "id" | "status"> {}

@Table({
  tableName: "categories",
  timestamps: true,
  paranoid: true,
})
@DefaultScope(() => ({
  where: { status: "active" },
  attributes: {
    exclude: ["status", "createdAt", "updatedAt", "deletedAt"],
  },
}))
class Category extends Model<CategorySchema, CategoryCreationAttributes> {
  @Column({
    autoIncrement: true,
    primaryKey: true,
    type: DataType.INTEGER,
    comment: "This is the primary key",
  })
  id!: number;

  @Column({
    unique: true,
    type: DataType.STRING(100),
    allowNull: false,
    comment: "This is the category name",
  })
  name!: string;

  @Column({
    type: DataType.STRING(300),
    allowNull: false,
    comment: "This is the category description",
  })
  description!: string;

  @Default("active")
  @Column({
    type: DataType.ENUM("active", "inactive"),
    allowNull: false,
    comment: "This is the category status",
  })
  status!: string;
}

export default Category;

const getCategories = async () => {
  try {
    const categories = await Category.findAll();
    if (categories.length === 0) {
      return {
        message: "No categories found",
        success: false,
      };
    }
    return {
      data: categories,
      message: "Categories found",
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      message: ensureError(error),
    };
  }
};

const getCategoryById = async (id: CategorySchema["id"]) => {
  try {
    const category = await Category.findByPk(id);
    if (!category) {
      return {
        message: "Category not found",
        success: false,
      };
    }
    return {
      data: category,
      message: "Category found",
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      message: ensureError(error),
    };
  }
};

const createCategory = async (category: NewCategorySchema) => {
  try {
    const existCategory = await Category.findOne({
      where: {
        name: category.name,
      },
    });

    if (existCategory) {
      return {
        message: "Category already exists",
        success: false,
      };
    }

    const newCategory = await Category.create(category);
    if (!newCategory) {
      return {
        message: "Category not created",
        success: false,
      };
    }

    return {
      data: newCategory,
      message: "Category created",
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      message: ensureError(error),
    };
  }
};

export const CategoryModel = {
  getCategories,
  getCategoryById,
  createCategory,
};
