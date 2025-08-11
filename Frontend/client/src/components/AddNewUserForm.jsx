

import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Paper,
  MenuItem,
  Stack
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AddNewUserForm = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      age: '',
      address: '',
      mobileNo: '',
      emailId: '',
      gender: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      age: Yup.number()
        .min(1, 'Enter valid age')
        .max(120, 'Age seems too high')
        .required('Age is required'),
      address: Yup.string().required('Address is required'),
      mobileNo: Yup.string()
        .matches(/^\d{10}$/, 'Enter valid 10-digit mobile number')
        .required('Mobile number is required'),
      emailId: Yup.string().email('Invalid email').required('Email is required'),
      gender: Yup.string()
        .oneOf(['MALE', 'FEMALE'], 'Select gender')
        .required('Gender is required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      setSubmitting(true);
      try {
        const res = await axios.post('http://localhost:8080/user/addNew', values);
        const userId = res.data.id;

        alert(' User registered successfully!');
        resetForm();

        navigate('/movies', {
          state: {
            userName: values.name,
            userId: userId,
          },
        });
      } catch (error) {
        console.error(' Registration failed:', error);
        alert('Something went wrong. Please try again.');
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div style={styles.page}>
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ padding: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ color: '#d32f2f', fontWeight: 'bold' }}>
             Register New User
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <Box mb={2}>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Box>
            <Box mb={2}>
              <TextField
                fullWidth
                id="age"
                name="age"
                label="Age"
                type="number"
                value={formik.values.age}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.age && Boolean(formik.errors.age)}
                helperText={formik.touched.age && formik.errors.age}
              />
            </Box>
            <Box mb={2}>
              <TextField
                fullWidth
                id="address"
                name="address"
                label="Address"
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
              />
            </Box>
            <Box mb={2}>
              <TextField
                fullWidth
                id="mobileNo"
                name="mobileNo"
                label="Mobile Number"
                value={formik.values.mobileNo}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.mobileNo && Boolean(formik.errors.mobileNo)}
                helperText={formik.touched.mobileNo && formik.errors.mobileNo}
              />
            </Box>
            <Box mb={2}>
              <TextField
                fullWidth
                id="emailId"
                name="emailId"
                label="Email"
                type="email"
                value={formik.values.emailId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.emailId && Boolean(formik.errors.emailId)}
                helperText={formik.touched.emailId && formik.errors.emailId}
              />
            </Box>
            <Box mb={3}>
              <TextField
                fullWidth
                select
                id="gender"
                name="gender"
                label="Gender"
                value={formik.values.gender}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.gender && Boolean(formik.errors.gender)}
                helperText={formik.touched.gender && formik.errors.gender}
              >
                <MenuItem value="MALE">Male</MenuItem>
                <MenuItem value="FEMALE">Female</MenuItem>
              </TextField>
            </Box>
            <Stack spacing={2}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
                disabled={submitting}
              >
                {submitting ? 'Registering...' : 'Register'}
              </Button>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => navigate('/')}
              >
                Back to Home
              </Button>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => navigate('/login')}
              >
                Go to Login
              </Button>
            </Stack>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

const styles = {
  page: {
    fontFamily: "'Segoe UI', sans-serif",
    backgroundColor: "#e3f2fd",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "2rem"
  }
};

export default AddNewUserForm;
