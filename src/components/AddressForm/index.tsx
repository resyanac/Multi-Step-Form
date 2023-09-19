import React from 'react';
import { Button, Form, Input } from 'antd';
import * as yup from 'yup';
import { useFormik } from 'formik';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const initialValues = {
  streetAddress: '441 4th Street, NW',
  city: 'Los Angeles',
  state: 'United States',
  zipcode: '99501',
};

interface AddressWrapper {
  onNext: () => void;
  onPrev: () => void;
}

const validationSchema = yup.object({
  streetAddress: yup.string().required('Street Address is required'),
  city: yup.string().required('City is required'),
  state: yup.string().required('State is required'),
  zipcode: yup
    .string()
    .required('Zip Code is required')
    .matches(/^\d{5}$/, 'Zip Code must be a 5-digit number'),
});

const AddressForm: React.FC<AddressWrapper> = ({ onNext, onPrev }) => {
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
      onFinish={formik.handleSubmit} // You can use onFinish for form submission
      style={{ maxWidth: 600, padding: '3rem', borderRadius: '9999px' }}
    >
      <Form.Item
        name="streetAddress"
        label="Street Address"
        rules={[{ required: true, message: 'Street Address is required' }]}
        validateStatus={formik.touched.streetAddress && formik.errors.streetAddress ? 'error' : ''}
        // Help is not directly available in this version; you can display errors in a custom div
      >
        <Input
          name="streetAddress"
          value={formik.values.streetAddress}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.streetAddress && formik.errors.streetAddress && (
          <div style={{ color: 'red' }}>{formik.errors.streetAddress}</div>
        )}
      </Form.Item>

      <Form.Item
        name="city"
        label="City"
        rules={[{ required: true, message: 'City is required' }]}
        validateStatus={formik.touched.city && formik.errors.city ? 'error' : ''}
      >
        <Input
          name="city"
          value={formik.values.city}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.city && formik.errors.city && (
          <div style={{ color: 'red' }}>{formik.errors.city}</div>
        )}
      </Form.Item>

      <Form.Item
        name="state"
        label="State"
        rules={[{ required: true, message: 'State is required' }]}
        validateStatus={formik.touched.state && formik.errors.state ? 'error' : ''}
      >
        <Input
          name="state"
          value={formik.values.state}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.state && formik.errors.state && (
          <div style={{ color: 'red' }}>{formik.errors.state}</div>
        )}
      </Form.Item>

      <Form.Item
        name="zipcode"
        label="Zip Code"
        rules={[
          { required: true, message: 'Zip Code is required' },
          { len: 5, message: 'Zip Code must be a 5-digit number' },
        ]}
        validateStatus={formik.touched.zipcode && formik.errors.zipcode ? 'error' : ''}
      >
        <Input
          name="zipcode"
          value={formik.values.zipcode}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.zipcode && formik.errors.zipcode && (
          <div style={{ color: 'red' }}>{formik.errors.zipcode}</div>
        )}
      </Form.Item>

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button style={{ margin: '12px' }} htmlType="button" onClick={onPrev}>
          Previous
        </Button>
        <Button style={{ margin: '12px' }} type="primary" htmlType="submit">
          Next
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddressForm;
