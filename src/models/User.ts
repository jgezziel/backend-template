import {
  Table,
  Column,
  Model,
  DataType,
  Default,
  DefaultScope,
} from "sequelize-typescript";
import { type Optional, Op } from "sequelize";
import type { UserSchema } from "@schemas/user.schema";
import { ensureError } from "../utils";
import config from "config";
import bcrypt from "bcrypt";

interface UserCreationAttributes extends Optional<UserSchema, "id"> {}

@Table({
  tableName: "users",
  timestamps: true,
  paranoid: true,
})
@DefaultScope(() => ({
  where: { status: "active" },
  attributes: {
    exclude: ["password", "status", "createdAt", "updatedAt", "deletedAt"],
  },
}))
class User extends Model<UserSchema, UserCreationAttributes> {
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
    comment: "This is the name of the user",
  })
  name!: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    comment: "This is the first last name of the user",
  })
  firstLastName!: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    comment: "This is the second last name of the user",
  })
  secondLastName!: string;

  @Column({
    unique: true,
    type: DataType.STRING(50),
    allowNull: false,
    comment: "This is the username of the user",
  })
  username!: string;

  @Column({
    unique: true,
    type: DataType.STRING(100),
    allowNull: false,
    comment: "This is the email of the user",
  })
  email!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    comment: "This is the password of the user",
  })
  password!: string;

  @Default("active")
  @Column({
    type: DataType.ENUM("active", "inactive"),
    allowNull: false,
    comment: "This is the status of the user",
  })
  status!: string;
}

export default User;

const readUsers = async () => {
  try {
    const users = await User.findAll();
    if (users.length === 0) {
      return {
        message: "No users found",
        success: false,
      };
    }
    return {
      data: users,
      message: "Users found",
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      message: ensureError(error),
    };
  }
};

const getUserById = async (id: UserSchema["id"]) => {
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return {
        message: "User not found",
        success: false,
      };
    }
    return {
      data: user,
      message: "User found",
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      message: ensureError(error),
    };
  }
};

const createUser = async (user: UserSchema) => {
  try {
    const userExists = await User.findOne({
      where: {
        [Op.or]: [{ username: user.username }, { email: user.email }],
      },
    });

    if (userExists) {
      return {
        message: "User already exists",
        success: false,
      };
    }

    const hashedPassword = await bcrypt.hash(user.password, config.bcryptSalt);
    if (!hashedPassword) {
      return {
        message: "Password not hashed, try again",
        success: false,
      };
    }
    user.password = hashedPassword;

    const newUser = await User.create(user);
    if (!newUser) {
      return {
        message: "User not created",
        success: false,
      };
    }

    const { password, ...userWithoutPassword } = newUser.toJSON();

    return {
      data: userWithoutPassword,
      message: "User created",
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      message: ensureError(error),
    };
  }
};

export const UserModel = {
  readUsers,
  getUserById,
  createUser,
};
