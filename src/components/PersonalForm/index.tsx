import React from 'react';
import { Button, Form, Input, DatePicker } from 'antd';
import * as yup from 'yup';
import { useFormik } from 'formik';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

interface PersonalWrapper {
  onNext: () => void;
}

const initialValues = {
  fullname: 'Ayu Ting Ting',
  email: 'email@example.com',
  birthday: null,
};

const validationSchema = yup.object({
  fullname: yup.string().required('Fullname is required'),
  email: yup.string().required('Email is required').email('Invalid email format'),
  birthday: yup.date().required('Date of birth is required'),
});

const PersonalForm: React.FC<PersonalWrapper> = ({ onNext }) => {
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      onNext();
    },
  });

  return (
    <Form
      {...layout}
      onFinish={formik.handleSubmit}
      style={{ maxWidth: 600, padding: '3rem', borderRadius: '9999px' }}
    >
      <Form.Item
        name="fullname"
        label="Full name"
        rules={[{ required: true, message: 'Fullname is required' }]}
        hasFeedback  
        validateStatus={formik.touched.fullname && formik.errors.fullname ? 'error' : ''}
        help={formik.touched.fullname && formik.errors.fullname}
      >
        <Input
          name="fullname"
          value={formik.values.fullname}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </Form.Item>

      <Form.Item
        name="email"
        label="Email"
        rules={[
          { required: true, message: 'Email is required' },
          { type: 'email', message: 'Invalid email format' },
        ]}
        hasFeedback 
        validateStatus={formik.touched.email && formik.errors.email ? 'error' : ''}
        help={formik.touched.email && formik.errors.email}
      >
        <Input
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </Form.Item>

      <Form.Item
        name="birthday"
        label="Date of Birth"
        rules={[{ required: true, message: 'Date of birth is required' }]}
        hasFeedback 
        validateStatus={formik.touched.birthday && formik.errors.birthday ? 'error' : ''}
        help={formik.touched.birthday && formik.errors.birthday}
      >
        <DatePicker
          name="birthday"
          value={formik.values.birthday}
          onChange={(date) => formik.setFieldValue('birthday', date)}
          onBlur={formik.handleBlur}
        />
      </Form.Item>

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button style={{ margin: '12px' }} type="primary" htmlType="submit">
          Next
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PersonalForm;
