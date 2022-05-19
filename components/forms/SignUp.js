import React from 'react'
import axios from 'axios'
import * as Yup from 'yup'
import { useRouter } from 'next/dist/client/router'
import toast from 'react-hot-toast'
import Form from 'components/Form'
import Field from 'components/Field'
import Button from 'components/Button'

const SignUp = () => {
  const { push } = useRouter()

  const handleSubmit = (values) => {
    axios
      .post('/api/auth/signup', values)
      .then((data) => {
        toast.success('Sign up successful')
        push('/')
      })
      .catch((e) => {
        console.log(e)
        toast.error(e.response.data.message)
      })
  }

  return (
    <Form
      initialValues={{ firstName: '', lastName: '', email: '', password: '' }}
      onSubmit={handleSubmit}
      validationSchema={Yup.object({
        firstName: Yup.string().min(1).required('Required'),
        lastName: Yup.string().min(1).required('Required'),
        email: Yup.string().min(1).required('Required'),
        password: Yup.string().min(1).required('Required'),
      })}
      className='max-w-sm p-4'
    >
      {({ isSubmitting }) => (
        <>
          <div className='flex'>
            <Field name='firstName' className='pr-[6px]' />
            <Field name='lastName' className='pl-[6px]' />
          </div>

          <Field name='email' />
          <Field name='password' type='password' />

          <Button type='submit' variant='primary' className='mt-6' loading={isSubmitting}>
            Je m'inscris
          </Button>
        </>
      )}
    </Form>
  )
}

export default SignUp
