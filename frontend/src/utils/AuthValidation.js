import * as yup from 'yup';
const valid = require('card-validator')

export const signUpSchema = yup.object().shape({
  name: yup.string().required('Please provide a name!'),
  email: yup
    .string()
    .email('Please provide a valid email!')
    .required('Please provide a email!'),
  password: yup.string().min(8).required('Please provide a password!'),
  confirmPassword: yup.string().required('Please provide a confirm password!'),
});

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('email must valid')
    .required('Please provide a email!'),
  password: yup.string().min(6).required('Please provide a password!'),
});

export const discountSchema = yup.object().shape({
  discount: yup
    .string()
    .length(8, "coupon code must be at least 8 characters")
})

export const orderSchema = yup.object().shape({
  name: yup.string().required('please provide name'),
  number_phone: yup.string().required('please provide a numberphone').length(10, 'please provide valid number phone'),
  address: yup.string().required('please provide address'),
  postal_code: yup.number().required('please provide a portal code').min(3, 'portal code must be at least 3 characters'),
  city: yup.string().required('please provide a city name'),
})

export const paymentSchema = yup.object().shape({
  number: yup.string().required('please provide credit card number').test('test-number', 'credit card number is invalid', value => valid.number(value).isValid),
  cvv: yup.string().required('please provide cvv').test('test-number', 'cvv is invalid', value => valid.cvv(value).isValid),
  expire_date: yup.string().required('please provide expride date').test('test-date', 'expire date is invalid', value => valid.expirationDate(value).isValid)
})