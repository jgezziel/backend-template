import {
  Table,
  Column,
  Model,
  DataType,
  Default,
  DefaultScope,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import type { Optional } from "sequelize";
import type { SessionSchema } from "@schemas/session.schema";
import User from "./User";
import type { UserLoginSchema } from "@schemas/user.schema";
import createToken from "@services/auth.services";
import { ensureError } from "../utils";
import bcrypt from "bcrypt";

interface SessionCreationAttributes
  extends Optional<SessionSchema, "id" | "sessionKey" | "status"> {}

@Table({
  tableName: "sessions",
  timestamps: true,
  paranoid: true,
})
@DefaultScope(() => ({
  where: { status: "active" },
  attributes: {
    exclude: ["id", "createdAt", "updatedAt", "deletedAt"],
  },
}))
class Session extends Model<SessionSchema, SessionCreationAttributes> {
  @Column({
    autoIncrement: true,
    primaryKey: true,
    type: DataType.INTEGER,
    comment: "This is the primary key",
  })
  id!: number;

  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    comment: "This is the session key",
  })
  sessionKey!: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    comment: "This is the user id",
  })
  userId!: number;

  @Column({
    type: DataType.STRING(300),
    allowNull: false,
    comment: "This is the token",
  })
  token!: string;

  @Default("active")
  @Column({
    type: DataType.ENUM("active", "inactive"),
    allowNull: false,
    comment: "This is the status",
  })
  status!: "active" | "inactive";

  @BelongsTo(() => User)
  user!: User;
}

export default Session;

const login = async (login: UserLoginSchema) => {
  try {
    const user = await User.findOne({
      where: {
        email: login.email,
      },
      attributes: {
        include: ["password"],
      },
    });

    if (!user) {
      return {
        message: "User not found",
        success: false,
      };
    }

    const isPasswordValid = await bcrypt.compare(login.password, user.password);
    if (!isPasswordValid) {
      return {
        message: "Invalid password",
        success: false,
      };
    }

    const { password, ...userWithoutPassword } = user.toJSON();

    const existSession = await Session.findOne({
      where: {
        userId: userWithoutPassword.id,
      },
    });

    if (existSession) {
      const token = existSession.token;

      return {
        message: "User logged in",
        success: true,
        token,
      };
    }

    const token = createToken(userWithoutPassword);
    const newSession = await Session.create({
      userId: userWithoutPassword.id,
      token,
    });

    if (!newSession) {
      return {
        message: "Session not created",
        success: false,
      };
    }

    return {
      message: "User logged in",
      success: true,
      token,
    };
  } catch (error) {
    return {
      success: false,
      message: ensureError(error),
    };
  }
};

const logout = async (token: SessionSchema["token"]) => {
  const existsSession = await Session.findOne({
    where: { token },
  });

  if (!existsSession) {
    return {
      message: "Session not found",
      success: false,
    };
  }

  const sessionInactive = await Session.update(
    { status: "inactive" },
    {
      where: { token },
    }
  );

  if (!sessionInactive) {
    return {
      message: "Session could not be logged out",
      success: false,
    };
  }

  return {
    message: "Session logged out",
    success: true,
  };
};

export const SessionModel = {
  login,
  logout,
};
