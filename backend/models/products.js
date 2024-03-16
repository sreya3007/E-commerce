const mongoose = require ('mongoose');

const productSchema = new mongoose.Schema ({
 
          user: {
            type: mongoose.Schema.Types.ObjectId, // identification of user or admin 
            required: true,
            ref: 'User', // obtained from the user model 
          },
          name: {
            type: String,
            required: true,
          },
          image: {
            type: String,
            required: true,
          },
          brand: {
            type: String,
            required: true,
          },
          category: {
            type: String,
            required: true,
          },
          description: {
            type: String,
            required: true,
          },
          
          rating: {
            type: Number,
            required: true,
            default: 0,
          },
          numReviews: {
            type: Number,
            required: true,
            default: 0,
          },
          price: {
            type: Number,
            required: true,
            default: 0,
          },
          countInStock: {
            type: Number,
            required: true,
            default: 0,
          },
          
        },
        {
          timestamps: true,
        }
      );
      
      const Product = mongoose.model('Product', productSchema);
      
     module.exports=Product;




