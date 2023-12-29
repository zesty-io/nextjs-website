import { Box, Stack, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import MuiMarkdown from 'markdown-to-jsx';
import {
  shortValidationSchema,
  validationSchema,
  contactPageValidation,
} from 'revamp/utils/validation';

import {
  getLeadObjectZOHO,
  postToZOHO,
  subscribeToZoho,
} from 'revamp/utils/helper';
import { MultiFieldForm } from './MultiFieldForm';
import getLastVisitedPathAndUrl from 'revamp/utils/getLastVisitedPathAndUrl';
import { generateAlt } from 'utils';
import useGetDynamicData from './useGetDynamicData';

const acorns =
    'https://storage.googleapis.com/assets.zesty.io/website/images/assets/demo/Acorns%20Logo.svg',
  bjs = `https://storage.googleapis.com/assets.zesty.io/website/images/assets/demo/BJ's%20Logo.svg`,
  rocketLeague = `https://storage.googleapis.com/assets.zesty.io/website/images/assets/demo/Horizontal_Text.svg`,
  cornershop = `https://storage.googleapis.com/assets.zesty.io/website/images/assets/demo/Logo_de_Cornershop%201.svg`,
  phoenixSuns = `https://storage.googleapis.com/assets.zesty.io/website/images/assets/demo/Phoenix%20Suns.svg`,
  singlife = `https://storage.googleapis.com/assets.zesty.io/website/images/assets/demo/Singlife%20Logo.svg`,
  sony = `https://storage.googleapis.com/assets.zesty.io/website/images/assets/demo/Sony%20Logo.svg`,
  wattpad = `https://storage.googleapis.com/assets.zesty.io/website/images/assets/demo/Wattpad-logo-vector%201.svg`,
  pic1 = `https://storage.googleapis.com/assets.zesty.io/website/images/assets/demo/HeadlessCMS_HighPerformer_HighPerformer.svg`,
  pic2 = `https://storage.googleapis.com/assets.zesty.io/website/images/assets/demo/HeadlessCMS_EasiestToDoBusinessWith_EaseOfDoingBusinessWith.svg`,
  pic3 = `https://storage.googleapis.com/assets.zesty.io/website/images/assets/demo/WebContentManagement_MomentumLeader_Leader.svg`;

const GetDemoSection = ({
  title = 'Connect with Content Experts',
  supportingText = `<p>Book a free 15-minute consultation with a content expert.  Discuss your application, pain points and requirements.  Understand how Zesty's lower total cost of ownership, features, functionality can elevate your business by creating extraordinary digital experiences.</p>`,
  isLong = true,
  redirect = '/meet',
  isContact = false,
  formTitle = 'Enter your details to connect with a Content Expert',
}) => {
  const { lastVisitedPath, lastVisitedURL } = getLastVisitedPathAndUrl();
  const { data } = useGetDynamicData();
  let inquiryReasons = [
    'General',
    'Agency Sign Up',
    'Request a Demo',
    'Support',
    'Billing',
    'Press Relations',
  ];

  const onSubmit = async (values) => {
    if (values.firstName === '') {
      values.firstName = 'Unknown';
    }
    if (values.lastName === '') {
      values.lastName = 'N/A in Zoominfo';
    }
    let payload = getLeadObjectZOHO(
      values,
      values?.inquiryReason,
      'Demo Sign Up',
      '',
      data?.lead_source_detail || 'Contact Us', // leadsource
      lastVisitedPath,
      lastVisitedURL,
    );

    // post to leads section
    await postToZOHO(payload);

    //post to email marketing signup
    if (payload.newsletter_signup) {
      await subscribeToZoho(payload);
    }

    window.location = redirect;
    return values;
  };

  return (
    <Stack bgcolor="grey.900">
      <Stack
        sx={(theme) => ({
          [theme.breakpoints.up('xs')]: {
            maxWidth: theme.maxWidth,
            mx: 'auto',
            py: 4,
            px: 2,
          },
          [theme.breakpoints.up('tablet')]: {
            py: 6,
            px: 4,
          },
          [theme.breakpoints.up('lg')]: {
            flexDirection: 'row',
            py: 10,
            px: 14,
            gap: 8,
          },
          [theme.breakpoints.up('desktopWide')]: {
            gap: 15,
          },
        })}
      >
        <Stack
          spacing={8}
          mb={{ xs: 8, lg: 0 }}
          width={{ lg: '456px', desktopWide: '548px' }}
        >
          <Stack>
            <Typography
              variant="h1"
              fontWeight={800}
              letterSpacing="-0.02em"
              color="white"
            >
              {data?.title || title}
            </Typography>

            <MuiMarkdown
              options={{
                overrides: {
                  p: {
                    component: Typography,
                    props: {
                      mt: 2,
                      component: 'p',
                      variant: 'h6',
                      whiteSpace: 'pre-line',
                      color: 'grey.300',
                      fontSize: '18px',
                      lineHeight: '28px',
                    },
                  },
                },
              }}
            >
              {data?.description || supportingText}
            </MuiMarkdown>
          </Stack>
          <TrustLogos />
        </Stack>

        <Stack>
          <Stack
            borderRadius="8px"
            sx={(theme) => ({
              height: '100%',
              alignSelf: { lg: !isLong && 'center' },
              p: 4,
              bgcolor: theme.palette.mode === 'light' ? 'white' : 'grey.800',
              width: { xs: '100%', lg: '456px', desktopWide: '548px' },
            })}
          >
            <Formik
              enableReinitialize
              initialValues={{
                firstName: '',
                lastName: '',
                company: '',
                email: '',
                phoneNumber: '',
                message: '',
                jobTitle: '',
                businessEmail: '',
                linkedIn: '',
                inquiryReason: isContact ? 'General' : '',
              }}
              validationSchema={
                isLong && !isContact
                  ? validationSchema
                  : isContact
                  ? contactPageValidation
                  : shortValidationSchema
              }
              onSubmit={async (values) => {
                await onSubmit(values);
              }}
            >
              {({
                handleSubmit,
                getFieldProps,
                errors,
                touched,
                initialValues,
                isSubmitting,
                setFieldValue,
                values,
              }) => (
                <Form id="site-form" onSubmit={handleSubmit}>
                  <Stack>
                    <Typography
                      component={'p'}
                      variant="h4"
                      letterSpacing="-0.02em"
                      color="text.primary"
                      fontWeight={800}
                      mb={3}
                    >
                      {formTitle}
                    </Typography>

                    {/* Save this component as backup */}

                    {isContact ? (
                      <>
                        <MultiFieldForm
                          {...{
                            isLong,
                            isContact,
                            handleSubmit,
                            getFieldProps,
                            errors,
                            touched,
                            initialValues,
                            isSubmitting,
                            setFieldValue,
                            values,
                            inquiryReasons,
                          }}
                        />
                      </>
                    ) : (
                      <>
                        {/* Singleform field component */}
                        {/* <SingleFieldForm
                          formButtonText={formCtaText}
                          {...{
                            isLong,
                            isContact,
                            handleSubmit,
                            getFieldProps,
                            errors,
                            touched,
                            initialValues,
                            isSubmitting,
                            setFieldValue,
                            values,
                            inquiryReasons,
                          }}
                        /> */}

                        <MultiFieldForm
                          {...{
                            isLong,
                            isContact,
                            handleSubmit,
                            getFieldProps,
                            errors,
                            touched,
                            initialValues,
                            isSubmitting,
                            setFieldValue,
                            values,
                            inquiryReasons,
                          }}
                        />
                      </>
                    )}
                  </Stack>
                </Form>
              )}
            </Formik>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default GetDemoSection;

function TrustLogos() {
  return (
    <Stack>
      <Logos alignLeft />
      <Box sx={{ mt: 8 }}>
        <G2Awards alignLeft />
      </Box>
    </Stack>
  );
}

export function Logos({ invert = false, alignLeft }) {
  return (
    <Stack>
      <Typography
        variant="body2"
        color="primary"
        mb="12px"
        textTransform="uppercase"
        textAlign={alignLeft ? 'left' : 'center'}
      >
        Trusted By
      </Typography>
      <Stack
        justifyContent={alignLeft ? '' : 'center'}
        flexWrap="wrap"
        direction="row"
        gap={{ xs: '20px', desktopWide: '30px' }}
      >
        <img
          style={{ filter: invert ? 'invert(0.5)' : 'none' }}
          loading="lazy"
          src={sony}
          width="91px"
          height="32px"
          alt={generateAlt('Sony')}
        />
        <img
          style={{ filter: invert ? 'invert(0.5)' : 'none' }}
          loading="lazy"
          src={rocketLeague}
          width="60px"
          height="32px"
          alt={generateAlt('Rocket League')}
        />
        <img
          style={{ filter: invert ? 'invert(0.5)' : 'none' }}
          loading="lazy"
          src={singlife}
          width="102.12px"
          height="32px"
          alt={generateAlt('Singlife')}
        />
        <img
          style={{ filter: invert ? 'invert(0.5)' : 'none' }}
          loading="lazy"
          src={acorns}
          width="94px"
          height="32px"
          alt={generateAlt('Acorns')}
        />
        <img
          style={{ filter: invert ? 'invert(0.5)' : 'none' }}
          loading="lazy"
          src={phoenixSuns}
          width="107.54px"
          height="32px"
          alt={generateAlt('Phoenix Suns')}
        />
        <img
          style={{ filter: invert ? 'invert(0.5)' : 'none' }}
          loading="lazy"
          src={wattpad}
          width="115.91px"
          height="32px"
          alt={generateAlt('Wattpad')}
        />
        <img
          style={{ filter: invert ? 'invert(0.5)' : 'none' }}
          loading="lazy"
          src={cornershop}
          width="96.69px"
          height="32px"
          alt={generateAlt('Corner Shop')}
        />
        <img
          style={{ filter: invert ? 'invert(0.5)' : 'none' }}
          loading="lazy"
          src={bjs}
          width="36.48px"
          height="32px"
          alt={generateAlt('Bjs')}
        />
      </Stack>
    </Stack>
  );
}

export function G2Awards({ alignLeft }) {
  return (
    <Stack>
      <Typography
        color="primary"
        variant="body2"
        mb="12px"
        textTransform="uppercase"
        textAlign={alignLeft ? 'left' : 'center'}
      >
        G2 MOMENTUM LEADER
      </Typography>
      <Stack
        flexWrap="wrap"
        justifyContent={alignLeft ? '' : 'center'}
        direction="row"
        gap="20px"
      >
        <img
          alt={generateAlt('')}
          loading="lazy"
          src={pic1}
          width="92.2px"
          height="120px"
        />
        <img
          alt={generateAlt('')}
          loading="lazy"
          src={pic2}
          width="92.2px"
          height="120px"
        />
        <img
          alt={generateAlt('')}
          loading="lazy"
          src={pic3}
          width="92.2px"
          height="120px"
        />
      </Stack>
    </Stack>
  );
}
