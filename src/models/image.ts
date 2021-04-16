import { Sequelize, Model, DataTypes, Optional } from 'sequelize';

interface ImageAttributes {
  id: number;
  uid: string;
  url: string;
  labels: string;
  description?: string | null;
}

type ImageCreationAttributes = Optional<ImageAttributes, 'id'>;

export class Image extends Model<ImageAttributes, ImageCreationAttributes>
  implements ImageAttributes {
  public id!: number;

  public uid!: string;

  public url!: string;

  public labels!: string;

  public description!: string | null;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;
}

const initImage = (sequelize: Sequelize): void => {
  Image.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      uid: {
        type: new DataTypes.STRING(64),
      },
      labels: {
        type: new DataTypes.TEXT(),
      },
      description: {
        allowNull: true,
        type: new DataTypes.TEXT(),
      },
      url: {
        type: new DataTypes.STRING(1024),
      },
    },
    {
      sequelize,
      tableName: 'Images',
    },
  );
};

export { initImage };
