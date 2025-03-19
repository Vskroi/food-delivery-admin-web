import * as yup from 'yup';
export const foodSchema = yup.object({
    foodName: yup.string().required("Food name is required"),
    ingredients: yup.string().required("Ingredients are required"),
    price: yup.number().required("Price is required").positive("Price must be positive"),
    category: yup.string().required("Category is required"),
    image: yup.string().url("Invalid image URL").required("Image is required"),
  });