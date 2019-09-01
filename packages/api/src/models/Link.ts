import { Model, Column, Table, DataType } from "sequelize-typescript";

@Table({
  tableName: "link",
  comment: "Links saved by a user"
})
class Link extends Model<Link> {
  @Column({
    primaryKey: true,
    allowNull: true,
    defaultValue: DataType.UUIDV4
  })
  id: string;

  @Column({
    allowNull: false
  })
  uri: string;
}

export { Link };
