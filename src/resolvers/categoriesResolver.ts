import categories from "../typeDefs/categories";
import Categorys from "../models/category";

export default {
  Mutation: {
    addCategory: (_: any, { inputCategory }: any) => {
      const { title, description } = inputCategory;
      try {
        const category = new Categorys({
          title: title,
          description: description,
        });
        category.save();
        return {
          code: 200,
          success: true,
          message: "Successfully added Category to the database",
        };
      } catch (err) {
        return {
          code: err.extensions.response.status,
          success: false,
          message: err.extensions.response.body,
        };
      }
    },

    updateCategory: async(_: any, args: any) => {
      try {
        const { ID, inputCategory } = args;
        const category =  await Categorys.updateOne(
          { id: ID },
          {
              title: inputCategory.title,
              description: inputCategory.description,
          }
        );  
        const cat = await Categorys.findById(ID)
        return cat;
      } catch (e) {
        return e.message;
      }
    },
  },
  Query:{
    getAllCategory:async()=>{

        try{
            const category = await Categorys.find();
            return category;
        }catch(e){
            return e.message;
        }
    }
  }
};
