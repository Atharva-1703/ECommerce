const mongoose=require('mongoose');

const userSchema={
    username: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      isAdmin: {
        type: Boolean,
        required: true,
        default: false,
      },
      favourites:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product"
        }
      ],
      
}