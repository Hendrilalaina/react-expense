import * as yup from 'yup';

const loginValidationSchema = yup.object().shape({
    email: yup.string().required('Email is required').email('Email is not valid'),
    password: yup.string().required('Password is required').min(5, 'Password must be at least 5 characters'),
})

export default loginValidationSchema;