import "reflect-metadata";
import { Model, Column, Table, DataType } from "sequelize-typescript";
import { Field, ID, ObjectType } from "type-graphql";
import { setLinkEntity } from "../containers";

@ObjectType()
@Table({
  tableName: "link",
  comment: "Links saved by a user"
})
class Link extends Model<Link> {
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
  uri: string;

  @Field()
  @Column({
    allowNull: false
  })
  userId: string;
}

setLinkEntity(Link);

export { Link };
