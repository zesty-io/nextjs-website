/**
 * Zesty.io Content Model Component
 * When the ZestyLoader [..slug].js file is used, this component will autoload if it associated with the URL
 * 
 * Label: Integrations-Individual Pages 
 * Name: integrations_individual_pages 
 * Model ZUID: 6-88e5918e85-tmg13p
 * File Created On: Thu Apr 07 2022 01:46:58 GMT+0800 (Philippine Standard Time)
 * 
 * Model Fields:
 * 
  * hero_h1 (text)
 * hero_description (text)
 * cta_primary_text (text)
 * cta_secondary_text (text)
 * integration_benefits_h2 (text)
 * integration_benefits (one_to_many)
 * feature_description_1 (wysiwyg_basic)
 * feature_description_2 (wysiwyg_basic)
 * feature_description_3 (wysiwyg_basic)
 * testimonial (one_to_one)
 * logos_title (text)
 * logos (one_to_many)

 * 
 * In the render function, text fields can be accessed like {content.field_name}, relationships are arrays,
 * images are objects {content.image_name.data[0].url}
 * 
 * This file is expected to be customized; because of that, it is not overwritten by the integration script.
 * Model and field changes in Zesty.io will not be reflected in this comment.
 * 
 * View and Edit this model's current schema on Zesty.io at https://8-aaeffee09b-7w6v22.manager.zesty.io/schema/6-88e5918e85-tmg13p
 * 
 * Data Output Example: https://zesty.org/services/web-engine/introduction-to-parsley/parsley-index#tojson
 * Images API: https://zesty.org/services/media-storage-micro-dam/on-the-fly-media-optimization-and-dynamic-image-manipulation
 */

import React from 'react';
import LogoGridSimpleCentered from 'blocks/logoGrid/LogoGridSimpleCentered';
import HeroWithIllustrationAndSearchBar from 'blocks/heroes/HeroWithIllustrationAndSearchBar';
import FeatureGridWithBackgrounds from 'blocks/features/FeatureGridWithBackgrounds';
import Container from 'components/Container';
import { alpha, useTheme } from '@mui/material/styles';
import Icon from '@mui/material/Icon';
import StandardFormWithSelect from 'components/cta/StandardFormWithSelect';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import TryFreeButton from 'components/cta/TryFreeButton';
import FillerContent from 'components/FillerContent';
import CodeBlock from 'components/cta/CodeBlock';
import ReactPlayer from 'react-player';
import { textAlign } from '@mui/system';
import { CtaSimpleCentered } from 'blocks/cta';

const ContactUs = ({ title, description, content, isMobile }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        // background: theme.palette.common.white,
        paddingTop: '3rem',
        paddingBottom: '1rem',
        borderRadius: '15px',
        paddingX: isMobile ? '1rem' : '3rem',
      }}
      maxWidth={600}
      margin={'0 auto'}
    >
      <CtaSimpleCentered
        headerColor={theme.palette.common.white}
        ctaTitle={content.cta_title || FillerContent.header}
        description={content.cta_description || FillerContent.description}
        ctaLeft={content.cta_left || FillerContent.cta}
        ctaRight={content.cta_right || FillerContent.cta}
      />
      {/* <Box marginBottom={4}>
        <Typography
          variant={'h3'}
          sx={{
            fontWeight: 700,
            color: theme.palette.common.black,
          }}
          align={'center'}
          gutterBottom
        >
          {title}
        </Typography>
        <Typography
          sx={{
            color: theme.palette.common.black,
          }}
          align={'center'}
        >
          {description}
        </Typography>
      </Box>
      <Box paddingBottom={6} textAlign="center">
        <StandardFormWithSelect
          leadDetail="Adwords"
          businessType="Direct"
          leadSource="Advertisement"
          selectedValue={2}
          hideSelect={true}
          hideMessage={true}
          ctaText={content.cta_footer_cta || FillerContent.cta}
          modalTitle="Thank you for submitting your information."
          modalMessage="Our team will be in touch soon to discuss next steps."
          displayMsgUnderButton=" "
          additionalTextfield={{ company: true, jobTitle: true }}
          customButtonStyle={{ display: 'flex', justifyContent: 'center' }}
        />
      </Box> */}
    </Box>
  );
};

const NewsletterWithImage = ({ image, header, testimonial }) => {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const testimonials = testimonial || FillerContent.testimonialCard;

  return (
    <Container>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box>
            <Box marginBottom={3}>
              <Grid item xs={12} md={9}>
                <Box
                  sx={{
                    fontSize: isMobile ? '.8rem' : '1rem',
                    whiteSpace: 'normal',
                  }}
                  dangerouslySetInnerHTML={{
                    __html: header || FillerContent.rich_text,
                  }}
                ></Box>
              </Grid>
            </Box>
            <Box marginTop={{ xs: 4, sm: 6, md: 8 }} textAlign={'left'}>
              <Grid container spacing={4}>
                {testimonials.map((item, i) => (
                  <Grid item xs={12} md={12} key={i}>
                    <Box
                      width={1}
                      height={1}
                      component={Card}
                      display={'flex'}
                      flexDirection={'column'}
                      boxShadow={1}
                      bgcolor={i === 1 ? 'primary.main' : 'none'}
                    >
                      <CardContent
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                        }}
                      >
                        <Box marginBottom={1}>
                          <Box display={'flex'} justifyContent={'flex-start'}>
                            {[1, 2, 3, 4, 5].map((item) => (
                              <Box
                                key={item}
                                color={theme.palette.secondary.main}
                              >
                                <svg
                                  width={18}
                                  height={18}
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              </Box>
                            ))}
                          </Box>
                        </Box>
                        <Typography
                          color={
                            i === 1
                              ? theme.palette.common.white
                              : 'text.secondary'
                          }
                        >
                          {item.review || item.feedback}
                        </Typography>
                      </CardContent>
                      <Box flexGrow={1} />
                      <CardActions sx={{ paddingBottom: 2 }}>
                        <ListItem
                          component="div"
                          disableGutters
                          sx={{ padding: 0 }}
                        >
                          <ListItemAvatar>
                            <Avatar
                              src={
                                (item.reviewer_headshot?.data &&
                                  item.reviewer_headshot?.data[0]?.url) ||
                                item.avatar
                              }
                            />
                          </ListItemAvatar>
                          <ListItemText
                            sx={{ margin: 0 }}
                            primary={item.reviewer_title || item.name}
                            secondary={item.company || item.title}
                            primaryTypographyProps={{
                              color:
                                i === 1
                                  ? theme.palette.common.white
                                  : 'text.primary',
                            }}
                            secondaryTypographyProps={{
                              color:
                                i === 1
                                  ? theme.palette.common.white
                                  : 'text.secondary',
                            }}
                          />
                        </ListItem>
                      </CardActions>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          container
          justifyContent="center"
          alignItems="center"
          xs={12}
          md={6}
        >
          <Box
            component="img"
            height={1}
            width={1}
            src={
              image || 'https://assets.maccarianagency.com/backgrounds/img4.jpg'
            }
          />
          {/* <Box component={Card} boxShadow={3} height={1} width={1}></Box> */}
        </Grid>
      </Grid>
    </Container>
  );
};

const SimpleCentered = ({ header, description, cards = [] }) => {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Container>
      <Box paddingTop={isMobile ? 25 : 40}>
        <Box marginBottom={4}>
          <Box marginBottom={2}>
            <Typography
              variant={'p'}
              component="h2"
              sx={{
                fontWeight: 700,
                fontSize: isMobile ? '24px' : '35px',
                color: theme.palette.common.white,
                textAlign: 'center',
              }}
            >
              {header || FillerContent.header}
            </Typography>
          </Box>
        </Box>
        <Grid container spacing={isMobile ? 4 : 8}>
          {cards?.map((item, i) => (
            <Grid item xs={12} md={4} key={i}>
              <Box width={1} height={1}>
                <Box
                  display={'flex'}
                  flexDirection={'column'}
                  alignItems={'center'}
                  marginTop={4}
                >
                  <Box
                    component={Avatar}
                    width={60}
                    height={60}
                    marginBottom={2}
                    bgcolor={alpha(theme.palette.primary.main, 0.4)}
                    color={theme.palette.primary.main}
                  >
                    <Icon>{item.icon_name}</Icon>
                  </Box>
                  <Typography
                    variant={'h6'}
                    gutterBottom
                    sx={{ fontWeight: 500, marginTop: '1rem' }}
                    align={'center'}
                    color={theme.palette.zesty.white}
                  >
                    {item.title || FillerContent.header}
                  </Typography>
                  <Typography
                    align={'center'}
                    color={theme.palette.zesty.white}
                  >
                    {item.description || FillerContent.description}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

const HowItWorks = ({
  // header is dangerouse title and description
  header,
  images,
}) => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });
  const styleSx = {
    position: 'relative',
    '&::after': {
      position: 'absolute',
      content: '""',
      width: '20%',
      zIndex: 1,
      top: 0,
      left: 0,
      height: '100%',
    },
  };

  return (
    <>
      <Container sx={styleSx}>
        <Box position={'relative'} zIndex={2}>
          <Grid item xs={12} md={9}>
            <Box
              dangerouslySetInnerHTML={{
                __html: header || FillerContent.rich_text,
              }}
            ></Box>
          </Grid>
        </Box>
      </Container>
      <FeatureGridWithBackgrounds images={images || FillerContent.demos} />
    </>
  );
};

const SimpleHeroWithCta = ({
  title,
  subtitle,
  description,
  primaryCta,
  secondaryCTA,
  onClick,
  videoUrl,
}) => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container
      style={{ marginTop: isMobile ? '0rem' : '1rem', marginBottom: '1rem' }}
      sx={{
        position: 'relative',
        '&::after': {
          position: 'absolute',
          content: '""',
          width: '20%',
          zIndex: 1,
          top: 0,
          left: 0,
          height: '100%',
          backgroundSize: '18px 18px',
          backgroundImage: `radial-gradient(${alpha(
            theme.palette.primary.dark,
            0.4,
          )} 20%, transparent 20%)`,
          opacity: 0.2,
        },
      }}
    >
      <VideoPlayer videoUrl={videoUrl} isMobile={isMobile} theme={theme} />
      <Box paddingTop={isMobile ? 0 : 1} position={'relative'} zIndex={2}>
        <Box marginBottom={4}>
          <Typography
            variant="p"
            component={'h1'}
            color="text.primary"
            align={'center'}
            sx={{
              fontSize: isMobile ? '35px' : '48px',
              fontWeight: 700,
              marginBottom: '2rem',
            }}
          >
            {title}
            <br />
            {subtitle}
          </Typography>
          <Typography
            variant="p"
            component="h2"
            color="text.secondary"
            sx={{
              fontSize: '20px',
              fontWeight: 400,
              whiteSpace: isMobile ? 'normal' : 'nowrap',
            }}
            align={'center'}
          >
            {description}
          </Typography>
        </Box>
        <Box
          display="block"
          sx={{ width: isMobile ? 'auto' : '33vw' }}
          marginX={'auto'}
        >
          <CodeBlock
            bgcolor={theme.palette.common.white}
            border={`1px solid ${theme.palette.zesty.zestyOrange}`}
            fontSize="14px"
            color={theme.palette.zesty.zestyOrange}
          />
        </Box>
      </Box>
      <Box
        component={'svg'}
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 1920 100.1"
        sx={{
          width: '100%',
          marginBottom: theme.spacing(-1),
        }}
      >
        <path
          fill={theme.palette.background.paper}
          d="M0,0c0,0,934.4,93.4,1920,0v100.1H0L0,0z"
        ></path>
      </Box>
    </Container>
  );
};

const BgDecorations = ({ theme }) => {
  return (
    <Box
      component={'svg'}
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 1920 100.1"
      sx={{
        width: '100%',
        marginBottom: theme.spacing(-1),
      }}
    >
      <path
        fill={theme.palette.background.paper}
        d="M0,0c0,0,934.4,93.4,1920,0v100.1H0L0,0z"
      ></path>
    </Box>
  );
};

const ContactUsForm = ({ theme, content }) => {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Box
      height={'auto'}
      position={'relative'}
      sx={{
        backgroundColor: theme.palette.alternate.main,
        background: `url(${
          (content.form_background_image?.data &&
            content.form_background_image?.data[0]?.url) ||
          FillerContent.image
        }) no-repeat center`,
        backgroundSize: 'cover',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: 1,
          height: 1,
          backgroundColor: theme.palette.primary.main,
          backgroundImage: `linear-gradient(315deg, ${theme.palette.primary.main} 0%, #000000 74%)`,
          opacity: '0.8',
          zIndex: 1,
        }}
      />

      <Box
        id="contact-us"
        sx={{
          position: 'relative',
          padding: isMobile ? '5rem 1rem' : '10rem 0',
          zIndex: 2,
        }}
      >
        <ContactUs
          title={content.contact_form_h3 || FillerContent.header}
          description={
            content.contact_form_description || FillerContent.description
          }
          content={content}
          isMobile={isMobile}
        />
      </Box>
    </Box>
  );
};

const VideoPlayer = ({ videoUrl, theme, isMobile }) => {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: isMobile ? '-40vh' : '-55vh',
        left: '50%',
        transform: 'translate(-50%,0)',
        borderRadius: '7px',
        boxShadow: '-3px 2px 37px -1px rgba(0,0,0,0.30)',
        backgroundClip: 'padding-box ',
      }}
    >
      <ReactPlayer
        width={isMobile ? '90vw' : '50vw'}
        height={isMobile ? '33vh' : '60vh'}
        url={videoUrl}
        muted={false}
        playing={false}
        loop={true}
        controls={true}
        // light
      />
    </div>
  );
};
function IntegrationsIndividualPage({ content }) {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const scrollToContactUs = () => {
    document
      .getElementById('contact-us')
      .scrollIntoView({ behavior: 'smooth' });
  };

  console.log(content, 'CONTENT');
  return (
    <>
      {/* HERO */}
      <Box paddingBottom={1}>
        <SimpleHeroWithCta
          title={content.hero_h1 || FillerContent.header}
          description={content.hero_description || FillerContent.description}
          primaryCta={content.hero_cta_primary_text || FillerContent.cta}
          secondaryCTA={content.hero_cta_secondary_text || FillerContent.cta}
          onClick={scrollToContactUs}
          videoUrl={content.video_link || FillerContent.videoUrl}
        />
      </Box>

      {/* Developer Benefits */}
      <Box
        marginTop={isMobile ? 20 : 25}
        paddingBottom={10}
        sx={{
          background: theme.palette.zesty.zestyDarkBlue,
        }}
      >
        <SimpleCentered
          header={content.integration_benefits_h2 || FillerContent.header}
          cards={
            content.integration_benefits?.data || [
              FillerContent.header,
              FillerContent.header,
              FillerContent.header,
            ]
          }
        />
      </Box>

      {/* Platform Description */}
      <Box paddingY={isMobile ? 4 : 10} bgcolor={'alternate.main'}>
        <Container>
          <Box
            textAlign={'center'}
            dangerouslySetInnerHTML={{
              __html: content.integration_platform_description,
            }}
          ></Box>
        </Container>
      </Box>

      {/* Marketer Benefits*/}
      <Box bgcolor={'alternate.secondary'}>
        <HeroWithIllustrationAndSearchBar
          bgColor={theme.palette.common.white}
          titleAndDescription={
            content.feature_description_1 || FillerContent.rich_text
          }
          image={
            (content.feature_1_image?.data &&
              content.feature_1_image?.data[0].url) ||
            FillerContent.image
          }
        />
      </Box>

      {/* Marketer Benefits*/}
      <Box bgcolor={'alternate.main'}>
        <HeroWithIllustrationAndSearchBar
          titleAndDescription={
            content.feature_description_2 || FillerContent.rich_text
          }
          image={
            (content.feature_2_image?.data &&
              content.feature_2_image?.data[0].url) ||
            FillerContent.image
          }
          bgColor={'alternate.secondary'}
          rowReverse={true}
        />
        {/* <BgDecorations theme={theme} /> */}
      </Box>

      {/* Marketer Benefits*/}
      <Box bgcolor={'alternate.secondary'}>
        <HeroWithIllustrationAndSearchBar
          bgColor={theme.palette.common.white}
          titleAndDescription={
            content.feature_description_3 || FillerContent.rich_text
          }
          image={
            (content.feature_3_image?.data &&
              content.feature_3_image?.data[0].url) ||
            FillerContent.image
          }
        />
        {/* <BgDecorations theme={theme} /> */}
      </Box>

      {/* Easy to Get Started + Social Proof */}
      <Box marginTop={6} padding={isMobile ? 0 : 8} bgcolor={'alternate.main'}>
        <NewsletterWithImage
          header={content.outline_of_benefits || FillerContent.header}
          image={
            (content.testimonial?.data &&
              content.testimonial?.data[0]?.reviewer_headshot) ||
            FillerContent.image
          }
          testimonial={content.testimonial?.data}
        />
      </Box>

      {/* Logos */}
      <LogoGridSimpleCentered
        title={content.logos_title || FillerContent.header}
        imageCollection={content.logos?.data || [FillerContent.image]}
      />

      {/* Form */}
      <ContactUsForm theme={theme} content={content} />
      {/* <Box bgcolor={theme.palette.alternate.main}>
        <CtaSimpleCentered
          ctaTitle={content.cta_title || FillerContent.header}
          description={content.cta_description || FillerContent.description}
          ctaLeft={content.cta_left || FillerContent.cta}
          ctaRight={content.cta_right || FillerContent.cta}
        />
      </Box> */}
      {/* <CtaSimpleCentered /> */}
    </>
  );
}

export default IntegrationsIndividualPage;
