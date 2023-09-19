import React from 'react';
import { Button, Form, Input } from 'antd';
import * as yup from 'yup';
import { useFormik } from 'formik';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const initialValues = {
  username: 'user',
  password: 'Helloworld1!'
};

interface AccountWrapper {
  onPrev: () => void;
}

const validationSchema = yup.object({
  username: yup.string().required('Username is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=]).*$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (@#$%^&+=)'
    ),
});

const AccountForm: React.FC<AccountWrapper> = ({ onPrev }) => {
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const submit = () => {
    formik.handleSubmit();
  };

  return (
    <Form
      {...layout}
      onFinish={formik.handleSubmit}
      style={{ maxWidth: 600, padding: '3rem', borderRadius: '9999px' }}
    >
      <Form.Item
        name="username"
        label="Username"
        rules={[{ required: true, message: 'Username is required' }]}
        hasFeedback 
        validateStatus={formik.touched.username && formik.errors.username ? 'error' : ''}
        help={formik.touched.username && formik.errors.username}
      >
        <Input
          name="username"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          status={formik.errors.username ? 'error' : undefined} 
        />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          { required: true, message: 'Password is required' },
          { min: 8, message: 'Password must be at least 8 characters' },
        ]}
        hasFeedback 
        validateStatus={formik.touched.password && formik.errors.password ? 'error' : ''}
        help={formik.touched.password && formik.errors.password}
      >
        <Input.Password
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          status={formik.errors.password ? 'error' : undefined} 
        />
      </Form.Item>

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button htmlType="submit" onClick={onPrev} style={{ margin: '12px' }}>
          Previous
        </Button>
        <Button type="primary" htmlType="submit" onClick={submit} style={{ margin: '12px' }}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AccountForm;
