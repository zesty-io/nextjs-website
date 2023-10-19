/* eslint-disable no-undef */
/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { useFormik } from 'formik';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { getCookie } from 'cookies-next';
import { accountsValidations } from 'components/accounts';

import {
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TwitterShareButton,
} from 'react-share';

import {
  FacebookIcon,
  LinkedinIcon,
  RedditIcon,
  TwitterIcon,
} from 'react-share';
/**
 * Possible field option in ZOHO https://crm.zoho.com/crm/org749642405/settings/api/modules/Leads?step=FieldsList
 * Note, if a custom field need to be added speak to todd.sabo@zesty.io
 * For testing new changes, please work with katie.moser@zesty.io
 */

/* validation for form component */

const getLeadObjectZOHO = (
  obj,
  select,
  leadDetail,
  businessType,
  leadSource = 'Website',
) => {
  // let acLeadtype = 'Marketing Website';
  let acRole = 'Marketer';

  return {
    First_Name: obj.firstName,
    Last_Name: obj.lastName,
    Email: obj.email,
    Phone: obj.phoneNumber,
    Inquiry_Reason: select,
    Description: obj.message,
    Zesty_User_Account: obj?.user && obj.user ? true : false,
    newsletter_signup: obj.newsletter_signup,
    Lead_Source: getCookie('utm_source') ? getCookie('utm_source') : leadSource,
    Role: getCookie('persona') ? getCookie('persona') : acRole,
    Captured_URL:
      window.location.href.match(/localhost/gi) == null
        ? window.location.href
        : 'https://www.testcapurl.com',
    UTM_Campaign: getCookie('utm_campaign')
      ? getCookie('utm_campaign')
      : 'unknown',
    UTM_Source: getCookie('utm_source') ? getCookie('utm_source') : 'unknown',
    UTM_Term: getCookie('utm_term') ? getCookie('utm_term') : 'unknown',
    UTM_Medium: getCookie('utm_medium') ? getCookie('utm_medium') : 'unknown',
    $gclid: getCookie('gclid') ? getCookie('gclid') : '',
    Lead_Source_Detail: getCookie('utm_medium')
      ? getCookie('utm_medium')
      : leadDetail,
    Lead_Source_Topic: getCookie('utm_campaign')
      ? getCookie('utm_campaign')
      : 'none',
    Business_Type: businessType,
    Lead_Status: 'Not Contacted',
    Designation: obj.jobTitle,
    Company: obj.company,
  };
};

const postToZOHO = async (payloadJSON) => {
  return fetch('https://us-central1-zesty-prod.cloudfunctions.net/zoho', {
    method: 'POST',
    body: JSON.stringify(payloadJSON),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((data) => {
      // google data
      dataLayer.push({ event: 'formCaptureSuccess', value: '1' });
      return data;
    })
    .catch((error) => {
      throw new Error(`HTTP error: ${error}`);
    });
};

const subscribeToZoho = async (payload) => {
  const { Email, First_Name, Last_Name } = payload;
  await fetch(
    `https://us-central1-zesty-dev.cloudfunctions.net/zohoEmailSubscribe?email=${Email}&name=${First_Name}_${Last_Name}`,
    {
      method: 'GET',
    },
  )
    .then((res) => res.json())
    .then(() => {
      dataLayer.push({ event: 'emailSubscribeSubmitted', value: '1' });
      acSENT = true;
    });
};

function BetaSignupCta({
  leadDetail = 'Contact Us',
  leadSource = 'Website',
  businessType = 'Direct',
  additionalTextfield = {},
  buttonFullWidth = false,
  ctaButton = 'Submit',
  downloadLink = '',
  phoneNumber = false,
  capterraTracking = null,
  meta,
}) {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    message: '',
    company: '',
    jobTitle: '',
    phoneNumber: '',
    newsletter_signup: false,
  };

  const onSubmit = async (values) => {
    // download link
    setLoading(true);
    downloadLink && window.open(downloadLink, '_blank');
    capterraTracking && capterraTracking();

    let payload = await getLeadObjectZOHO(
      values,
      leadDetail,
      businessType,
      leadSource,
    );
    // post to leads section
    await postToZOHO(payload);

    //post to email marketing signup
    if (payload.newsletter_signup) {
      await subscribeToZoho(payload);
    }

    setLoading(false);
    setIsFormSubmitted(true);
    return values;
  };

  const formik = useFormik({
    initialValues,
    validationSchema: accountsValidations.BetaSignupSchema,
    onSubmit,
  });

  return (
    <Box>
      {!isFormSubmitted ? (
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
                helperText={formik.touched.firstName && formik.errors.firstName}
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
            {additionalTextfield.company && (
              <Grid item xs={12}>
                <TextField
                  sx={{ height: 54 }}
                  label="Company"
                  type="text"
                  variant="outlined"
                  color="primary"
                  size="medium"
                  name="company"
                  fullWidth
                  value={formik.values.company}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.company && Boolean(formik.errors.company)
                  }
                  helperText={formik.touched.company && formik.errors.company}
                />
              </Grid>
            )}
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
            {phoneNumber && (
              <Grid item xs={12}>
                <TextField
                  sx={{ height: 54 }}
                  label="Phone Number"
                  type="tel"
                  variant="outlined"
                  color="primary"
                  size="medium"
                  name="phoneNumber"
                  fullWidth
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.phoneNumber &&
                    Boolean(formik.errors.phoneNumber)
                  }
                  helperText={
                    formik.touched.phoneNumber && formik.errors.phoneNumber
                  }
                />
              </Grid>
            )}
            {additionalTextfield.jobTitle && (
              <Grid item xs={12}>
                <TextField
                  sx={{ height: 54 }}
                  label="Job Title"
                  type="test"
                  variant="outlined"
                  color="primary"
                  size="medium"
                  name="jobTitle"
                  fullWidth
                  value={formik.values.jobTitle}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.jobTitle && Boolean(formik.errors.jobTitle)
                  }
                  helperText={formik.touched.jobTitle && formik.errors.jobTitle}
                />
              </Grid>
            )}

            <input value={leadDetail} name="inquiryReason" type="hidden" />

            <Grid item xs={12}>
              <Button
                fullWidth={buttonFullWidth}
                sx={{ height: 54, minWidth: 150 }}
                variant="contained"
                color="secondary"
                className="contactButton"
                size="medium"
                type="submit"
              >
                {loading ? 'Submitting...' : ctaButton}
              </Button>
            </Grid>
          </Grid>
        </form>
      ) : (
        <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center' }}>
          <FacebookShareButton
            quote={meta.web.seo_meta_title}
            title={meta.web.seo_meta_title}
            url={meta?.web?.url}
          >
            <FacebookIcon round />
          </FacebookShareButton>
          <LinkedinShareButton
            source={meta?.web?.url}
            summary={meta.web.seo_meta_description}
            title={meta.web.seo_meta_title}
            url={meta?.web?.url}
          >
            <LinkedinIcon round />
          </LinkedinShareButton>

          <TwitterShareButton
            title={meta.web.seo_meta_title}
            url={meta?.web?.url}
          >
            <TwitterIcon round />
          </TwitterShareButton>

          <RedditShareButton
            title={meta.web.seo_meta_title}
            url={meta?.web?.url}
          >
            <RedditIcon round />
          </RedditShareButton>
        </Box>
      )}
    </Box>
  );
}

export default BetaSignupCta;
