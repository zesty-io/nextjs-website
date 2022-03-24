/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Box from '@mui/material/Box';

import { useFormik } from 'formik';
import * as yup from 'yup';

import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Container from 'components/Container';


/* validation for form component */

const validationSchema = yup.object({
  firstName: yup
    .string()
    .trim()
    .min(2, 'Please enter a valid name')
    .max(50, 'Please enter a valid name')
    .required('Please specify your first name'),
  lastName: yup
    .string()
    .trim()
    .min(2, 'Please enter a valid name')
    .max(50, 'Please enter a valid name')
    .required('Please specify your last name'),
  email: yup
    .string()
    .trim()
    .email('Please enter a valid email address')
    .required('Email is required.'),
  message: yup
    .string()
    .trim()
    .required('Please specify your message'),
});

/* Begin Left Side Component */

function ContactFormWithSidebarMap({title, description, image,selectedValue=0}) {
 
  let inquiryReasons = [
    'General',
    'Agency Signup',
    'Request a Demo',
    'Support',
    'Billing',
    'Press Relations',
    
  ]
  const [selectValue, setSelectValue] = React.useState(inquiryReasons[selectedValue]);

  const handleChange = (event) => {
    setSelectValue(event.target.value);
  };

  const theme = useTheme();

  const LeftSide = () => {
    const initialValues = {
      firstName: '',
      lastName: '',
      email: '',
      message: '',
    };

    const onSubmit = (values) => {
      return values;
    };

    const formik = useFormik({
      initialValues,
      validationSchema: validationSchema,
      onSubmit,
    });

    return (
      <Box>
        <Box marginBottom={4}>
          <Typography variant={'h3'} sx={{ fontWeight: 700 }} gutterBottom>
            {title}
          </Typography>
          <Typography color="text.secondary">
            {description}
          </Typography>
        </Box>
        <Box>
          <form noValidate onSubmit={formik.handleSubmit}>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6}>
                <TextField
                  sx={{ height: 54 }}
                  label="First name"
                  variant="outlined"
                  color="primary"
                  size="medium"
                  name="firstName"
                  fullWidth
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.firstName && Boolean(formik.errors.firstName)
                  }
                  helperText={
                    formik.touched.firstName && formik.errors.firstName
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  sx={{ height: 54 }}
                  label="Last name"
                  variant="outlined"
                  color="primary"
                  size="medium"
                  name="lastName"
                  fullWidth
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.lastName && Boolean(formik.errors.lastName)
                  }
                  helperText={formik.touched.lastName && formik.errors.lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  sx={{ height: 54 }}
                  label="Email"
                  type="email"
                  variant="outlined"
                  color="primary"
                  size="medium"
                  name="email"
                  fullWidth
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Inquiry Reason</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectValue}
                  label="select"
                  onChange={handleChange}
                >
                  {inquiryReasons.map(value => <MenuItem value={value}>{value}</MenuItem>)}
                </Select>
              </FormControl>
            </Box>
              <Grid item xs={12}>
                <TextField
                  label="Message"
                  multiline
                  rows={6}
                  variant="outlined"
                  color="primary"
                  size="medium"
                  name="message"
                  fullWidth
                  value={formik.values.message}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.message && Boolean(formik.errors.message)
                  }
                  helperText={formik.touched.message && formik.errors.message}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  sx={{ height: 54, minWidth: 150 }}
                  variant="contained"
                  color="secondary"
                  size="medium"
                  type="submit"
                >
                  Submit
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Typography color="text.secondary">
                  We'll get back to you in 1-2 business days.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <Box>
                  <Typography component="p" variant="body2" align="left">
                    By clicking on "submit" you agree to our{' '}
                    <Box
                      component="a"
                      href="/legal/privacy-policy/"
                      color={theme.palette.text.primary}
                      fontWeight={'700'}
                    >
                      Privacy Policy
                    </Box>
                    .
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>
    );
  };

  /* End Left Side Component*/
  /* Begin Right Side Component */

  const RightSide = () => {
    return (
      <Box>
        <img
          src={image}
          alt="Zesty Office"
          width="100%"
          height="100%"
          frameBorder="0"
          marginHeight={0}
          marginWidth={0}
          style={{
            minHeight: 300,
            // maxWidth: 600,
            paddingTop: 135,
            filter:
              theme.palette.mode === 'dark'
                ? 'grayscale(0.5) opacity(0.7)'
                : 'none',
            }} />
      </Box>
    );
  };

/* End Right Side Component */
/* Begin Form Component */
  return (
    <Box
      sx={{
        width: 1,
        height: 1,
        overflow: 'hidden',
      }}
    >
      <Container paddingX={0} paddingY={0} maxWidth={{ sm: 1, md: 1236 }}>
        <Box
          display={'flex'}
          flexDirection={{ xs: 'column', md: 'row' }}
          position={'relative'}
        >
          <Box
            display={'flex'}
            alignItems={'center'}
            width={1}
            order={{ xs: 2, md: 1 }}
          >
            <Container>
              <LeftSide />
            </Container>
          </Box>
          <Box
            sx={{
              flex: { xs: '0 0 100%', md: '0 0 50%' },
              position: 'relative',
              maxWidth: { xs: '100%', md: '50%' },
              minHeight: { xs: 300, md: 600 },
              order: { xs: 1, md: 2 },
            }}
          >
            <Box
              sx={{
                width: { xs: 1, md: '50vw' },
                height: '100%',
                position: 'relative',
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  overflow: 'hidden',
                }}
              >
                <Box
                  sx={{
                    overflow: 'hidden',
                    left: '0%',
                    width: 1,
                    height: 1,
                    position: { xs: 'relative', md: 'absolute' },
                  }}
                >
                  <RightSide />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
      <Divider />
    </Box>
  );
};

export default ContactFormWithSidebarMap;