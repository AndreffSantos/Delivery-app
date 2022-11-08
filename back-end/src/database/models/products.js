const ProductsModel = (sequelize, DataTypes) => {
  const products = sequelize.define('products', {
    id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL(4,2),
    urlImage: DataTypes.STRING
  },
  {
    timestamps: false,
    tableName: 'products',
    underscored: true,
  }
  );

  products.associate = (models) => {
    products.hasMany(models.salesProducts,
      { foreignKey: 'productId', as: 'products' });
  };


  return products;
};

module.exports = ProductsModel; 