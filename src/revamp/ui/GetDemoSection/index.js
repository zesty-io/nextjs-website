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
import { useRouter } from 'next/router';
import ZestyImage from 'blocks/Image/ZestyImage';

const rocketLeague = `https://storage.googleapis.com/assets.zesty.io/website/images/assets/demo/Horizontal_Text.svg`,
  phoenixSuns = `https://storage.googleapis.com/assets.zesty.io/website/images/assets/demo/Phoenix%20Suns.svg`,
  singlife = `https://storage.googleapis.com/assets.zesty.io/website/images/assets/demo/Singlife%20Logo.svg`,
  sony = `https://storage.googleapis.com/assets.zesty.io/website/images/assets/demo/Sony%20Logo.svg`,
  wattpad = `https://storage.googleapis.com/assets.zesty.io/website/images/assets/demo/Wattpad-logo-vector%201.svg`,
  pic1 = `https://kfg6bckb.media.zestyio.com/WebContentManagement_EasiestToDoBusinessWith_EaseOfDoingBusinessWith.png`,
  pic2 = `https://kfg6bckb.media.zestyio.com/WebContentManagement_EasiestToDoBusinessWith_Small-Business_EaseOfDoingBusinessWith.svg`,
  pic3 = `https://kfg6bckb.media.zestyio.com/WebContentManagement_HighPerformer_HighPerformer.png`,
  pic4 = `https://kfg6bckb.media.zestyio.com/WebContentManagement_HighPerformer_Americas_HighPerformer.svg`;

const GetDemoSection = ({
  title = 'Connect with Content Experts',
  supportingText = `<p>Book a free 15-minute consultation with a content expert.  Discuss your application, pain points and requirements.  Understand how Zesty's lower total cost of ownership, features, functionality can elevate your business by creating extraordinary digital experiences.</p>`,
  isLong = true,
  redirect = '/meet',
  isContact = false,
  formTitle = 'Enter your details to connect with a Content Expert',
  cta,
  id,
  review,
}) => {
  const router = useRouter();
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

  const getLeadSourceDetail = () => {
    if (router.asPath.includes('contact')) return 'Contact Us';

    return 'Demo Sign Up';
  };

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
      getLeadSourceDetail(),
      '',
      'Website', // leadsource
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
    <>
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
            spacing={10}
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
                        lineHeight: '24px',
                      },
                    },
                  },
                }}
              >
                {data?.description || supportingText}
              </MuiMarkdown>
            </Stack>
            {review && <Testimonial review={review} />}
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
                              cta,
                              id,
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
                              cta,
                              id,
                            }}
                          />
                        </>
                      )}
                    </Stack>
                  </Form>
                )}
              </Formik>
            </Stack>
            <Box sx={{ mt: 4 }}>
              <G2Awards alignLeft />
            </Box>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default GetDemoSection;

function Testimonial({ review }) {
  return (
    <Stack gap={2}>
      <Typography color={'white'} fontStyle={'italic'} fontSize={18}>
        {review?.review}
      </Typography>
      <Stack direction={'row'} gap={2} sx={{ alignItems: 'center' }}>
        <ZestyImage
          width={64}
          height={64}
          style={{ borderRadius: '50%' }}
          src={review?.reviewer_headshot.data[0].url}
          alt={generateAlt('')}
        />
        <Box>
          <Typography color={'white'} fontWeight={'bold'}>
            {review?.reviewer_name}
          </Typography>
          <Typography color={'white'}>{review?.reviewer_title}</Typography>
        </Box>
      </Stack>
    </Stack>
  );
}

function TrustLogos() {
  return (
    <Stack>
      <Logos alignLeft />
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
        <img
          alt={generateAlt('')}
          loading="lazy"
          src={pic4}
          width="92.2px"
          height="120px"
        />
      </Stack>
    </Stack>
  );
}
