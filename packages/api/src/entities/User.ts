import "reflect-metadata";
import { Model, Column, Table, DataType } from "sequelize-typescript";
import { Field, ID, ObjectType, FieldResolver } from "type-graphql";
import { setUserEntity } from "../containers";

@ObjectType()
@Table({
  tableName: "users",
  comment: "Users of the app. Used for authentication"
})
class User extends Model<User> {
  @Field(() => ID)
  @Column({
    primaryKey: true,
    allowNull: true,
    defaultValue: DataType.UUIDV4
  })
  id: string;

  @Field()
  @Column({
    allowNull: false
  })
  emailAddress: string;

  // @Field() make sure you don't expose the password
  @Column({
    allowNull: false
  })
  password: string;

  @Field({ nullable: true })
  jwt?: string;
}

setUserEntity(User);

export { User };
