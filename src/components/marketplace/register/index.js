import {
  Typography,
  useTheme,
  Box,
  Grid,
  Button,
  TextField,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';
import { useFormik } from 'formik';
import { getCookie } from 'cookies-next';
import * as yup from 'yup';
import TransitionsModal from '../../modal/modal';
import { useFetchWrapper } from 'components/hooks/useFetchWrapper';
const URL =
  /^((https?|ftp):\/\/)?(www.)?(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;

const validations = yup.object({
  name: yup
    .string()
    .trim()
    .min(2, 'Please enter a valid name')
    .max(50, 'Please enter a valid name')
    .required('Please specify your name name'),
  label: yup
    .string()
    .trim()
    .min(2, 'Please enter a valid label')
    .max(50, 'Please enter a valid label')
    .required('Please specify your label'),
  url: yup
    .string()
    .matches(URL, 'url is not valid')
    .trim()
    .required('url is required.'),
  publisher: yup
    .string()
    .trim()
    .min(2, 'Please enter a valid publisher')
    .max(50, 'Please enter a valid publisher')
    .required('Please specify your Publisher'),
});

const CustomTextField = React.memo(({ name, formik }) => {
  const label = (name && name[0].toUpperCase() + name.slice(1)) || '';
  return (
    <Box sx={{ marginBottom: '2rem' }}>
      <TextField
        sx={{ height: 54 }}
        label={label}
        variant="outlined"
        color="primary"
        size="medium"
        name={name}
        fullWidth
        value={formik.values[name]}
        onChange={formik.handleChange}
        error={formik.touched[name] && Boolean(formik.errors[name])}
        helperText={formik.touched[name] && formik.errors[name]}
      />
    </Box>
  );
});

const initialValues = {
  name: '',
  url: '',
  label: '',
  publisher: '',
};

const FormComp = React.memo(({}) => {
  const [modal, setmodal] = React.useState(false);
  const [error, seterror] = React.useState('');
  const [success, setsucces] = React.useState('');
  const [loading, setloading] = React.useState(false);
  const instanceZUID = getCookie('ZESTY_WORKING_INSTANCE');
  const userAppSID = getCookie('APP_SID');
  const ZestyAPI = new Zesty.FetchWrapper(instanceZUID, userAppSID);

  const { verifySuccess } = useFetchWrapper(userAppSID, instanceZUID);
  const isLogin = verifySuccess.userZuid ? true : false;

  const handleRegisterSuccess = (data) => {
    console.log(data, 'succ');
    setmodal(true);
    setsucces('App successfully registered');
    setloading(false);
  };
  const handleRegisterError = (error) => {
    console.log(error, 'error');
    setmodal(true);
    seterror(error);
    setloading(false);
  };
  const registerApp = async (payload) => {
    setloading(true);
    const { name, url, label, publisher } = payload;
    const res = await ZestyAPI.registerApp(name, label, url, publisher);
    !res.error && handleRegisterSuccess(res.data);
    res.error && handleRegisterError(res.error);
  };

  const onSubmit = async (values) => {
    await registerApp(values);
    formik.resetForm();
  };

  const formik = useFormik({
    validationSchema: validations,
    initialValues,
    onSubmit,
  });

  const clear = () => {
    seterror('');
    setloading(false);
    setsucces('');
  };
  React.useEffect(() => {
    if (isLogin) {
      setmodal(false);
    }
    if (!isLogin) {
      setmodal(true);
    }
  }, [isLogin]);

  return (
    <Box>
      <form noValidate onSubmit={formik.handleSubmit}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <CustomTextField name={'name'} formik={formik} />
            <CustomTextField name={'label'} formik={formik} />
            <CustomTextField name={'url'} formik={formik} />
            <CustomTextField name={'publisher'} formik={formik} />
          </Grid>

          <Grid item xs={12}>
            <Button
              disabled={!isLogin}
              fullWidth
              sx={{ height: 54, minWidth: 150 }}
              variant="contained"
              color="secondary"
              className="contactButton"
              size="medium"
              type="submit"
            >
              {loading ? (
                <Box
                  sx={{ color: '#fff', display: 'flex', alignItems: 'center' }}
                >
                  <CircularProgress color="inherit" />
                </Box>
              ) : (
                <>{!isLogin ? 'Please Login to Zesty.io' : 'Submit'}</>
              )}
            </Button>
          </Grid>
        </Grid>
      </form>
      <TransitionsModal
        title={success ? 'Success' : 'Error'}
        message={success || error}
        open={modal}
        setOpen={setmodal}
        clear={clear}
        isLogin={isLogin}
      />
    </Box>
  );
});

const RegisterPage = ({}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        background: theme.palette.common.white,
        paddingTop: '3rem',
        paddingBottom: '1rem',
        borderRadius: '15px',
        paddingX: '3rem',
      }}
      maxWidth={600}
      margin={'0 auto'}
    >
      <Box marginBottom={4}>
        <Typography
          variant={'h3'}
          sx={{
            fontWeight: 700,
            color: theme.palette.common.black,
          }}
          align={'center'}
          gutterBottom
        >
          Register an App
        </Typography>
      </Box>
      <Box paddingBottom={6} textAlign="center">
        <FormComp title={'Register'} />
      </Box>
    </Box>
  );
};

export default RegisterPage;
