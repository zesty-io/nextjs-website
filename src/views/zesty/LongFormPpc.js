/**
 * Zesty.io Content Model Component
 * When the ZestyLoader [..slug].js file is used, this component will autoload if it associated with the URL
 *
 * Label: PPC-Long Form
 * Name: long_form_ppc
 * Model ZUID: 6-94f2effbd8-835mzf
 * File Created On: Tue Mar 29 2022 12:52:58 GMT+0800 (Philippine Standard Time)
 *
 * Model Fields:
 *
 * hero_h1 (text)
 * hero_h2 (text)
 * hero_cta_primary_text (text)
 * hero_cta_primary_link (link)
 * hero_cta_secondary_text (text)
 * hero_cta_secondary_link (link)
 * who_is_zesty_h2 (text)
 * zesty_benefits (one_to_many)
 * logos_h3 (text)
 * logos (one_to_many)
 * _what_is_image (images)
 * _what_is_title_and_description (wysiwyg_basic)
 * outline_of_benefits (wysiwyg_basic)
 * benefits_image (images)
 * how_it_works (wysiwyg_basic)
 * how_it_works_image (images)
 * testimonial (one_to_one)
 * contact_form_h3 (text)
 * contact_form_description (text)
 *
 * In the render function, text fields can be accessed like {content.field_name}, relationships are arrays,
 * images are objects {content.image_name.data[0].url}
 *
 * This file is expected to be customized; because of that, it is not overwritten by the integration script.
 * Model and field changes in Zesty.io will not be reflected in this comment.
 *
 * View and Edit this model's current schema on Zesty.io at https://8-aaeffee09b-7w6v22.manager.zesty.io/schema/6-94f2effbd8-835mzf
 *
 * Data Output Example: https://zesty.org/services/web-engine/introduction-to-parsley/parsley-index#tojson
 * Images API: https://zesty.org/services/media-storage-micro-dam/on-the-fly-media-optimization-and-dynamic-image-manipulation
 */

// React Imports
import { useRouter } from 'next/router';

// MUI Imports
import { useTheme } from '@mui/material/styles';
import { Box, Typography, useMediaQuery } from '@mui/material';

// Globals Imports
import ExploreZesty from './ExploreZestyPage';
import { zestyLink } from 'lib/zestyLink';
import FillerContent from 'components/globals/FillerContent';

// Components Imports

import SimpleCardLogo from 'blocks/zesty/LogoGrid/SimpleCardLogo';
import HeroWithIllustrationAndSearchBar from 'blocks/heroes/HeroWithIllustrationAndSearchBar';
import NewsletterWithImage from 'components/marketing/LongFormPpc/NewsletterWithImage';
import SimpleCentered from 'components/marketing/LongFormPpc/SimpleCentered';
import BgDecorations from 'components/marketing/LongFormPpc/BgDecorations';
import TechStack from 'blocks/integrations/TechStack';
import Hero from 'components/marketing/LongFormPpc/Hero';
import Features from 'blocks/zesty/PageLayouts/Features';
import SimpleHeroWithCta from 'components/marketing/LongFormPpc/SimpleHeroWithCta';
import HowItWorks from 'components/marketing/LongFormPpc/HowItWorks';
import ZohoFormEmbed from 'components/cta/ZohoFormEmbed';
import { Container, Grid, Divider } from '@mui/material';

function LongFormPpc({ content }) {
  const router = useRouter();

  if (router.asPath.includes('/ppc/explore/')) {
    return <ExploreZesty content={content} />;
  }
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const scrollToContactUs = () => {
    document
      .getElementById('contact-us')
      .scrollIntoView({ behavior: 'smooth' });
  };

  const headerProps = {
    title: content.title || FillerContent.header,
    subtitle: content.sub_title || FillerContent.description,
    description: content.header_description || FillerContent.description,
    image:
      (content.header_image?.data && content.header_image?.data[0]?.url) ||
      FillerContent.image,
    cta_right_text: content.cta_right_text || FillerContent.cta,
    cta_right_url:
      (content.cta_right_url &&
        zestyLink(content?.navigationTree, content.cta_right_url)) ||
      zestyLink(content?.navigationTree, FillerContent.contact_zuid),
    cta_left_text: content.cta_left_text || '',
    cta_left_url:
      (content.cta_left_url === '0' && '/join/') ||
      content.cta_left_url?.data[0]?.meta.web.uri ||
      '/join/',
  };

  /* Taking the data from the content model and converting it into a format that the Features component can use. */
  const feature_data =
    content?.features?.data.reduce((acc, item) => {
      acc.push({
        icon_image: item.icon_image?.data[0]?.url,
        feature_name: item.feature_name,
        content: item.content,
      });

      return acc;
    }, []) || [];

  const techStackData = {
    text_content: content.integrations_description,
    logos: content.integrations_logos?.data,
    cta_text: content.intergration_cta_text || FillerContent.cta,
    cta_link: content.integration_cta_link || FillerContent.href,
  };

  return (
    <>
      {/* HERO */}
      {router.asPath.includes('/ppc/headless-cms/') ||
      router.asPath.includes('/ppc/digital-experience-platform/') ? (
        <SimpleHeroWithCta
          title={content.hero_h1 || FillerContent.header}
          description={content.hero_h2 || FillerContent.description}
          primaryCta={content.hero_cta_primary_text || FillerContent.cta}
          secondaryCTA={content.hero_cta_secondary_text || FillerContent.cta}
          onClick={scrollToContactUs}
        />
      ) : (
        <Box sx={{ position: 'relative', py: 10 }}>
          <Hero scrollToContactUs={scrollToContactUs} {...headerProps} />
        </Box>
      )}

      {/* Who Zesty is */}
      <Box
        sx={{
          background: theme.palette.zesty.zestyDarkBlue,
          py: 15,
        }}
      >
        <SimpleCentered
          header={content.who_is_zesty_h2 || FillerContent.header}
          cards={content.zesty_benefits?.data || []}
        />
      </Box>

      {/* Who Zesty works with */}
      <Box sx={{ py: 10 }}>
        <SimpleCardLogo
          logoItems={content?.logos?.data}
          heading_text={content.logos_h3}
          maxWidth={1300}
        />
      </Box>

      {/* What is a DXP? */}
      <Box sx={{ pt: 10 }} bgcolor={'alternate.main'}>
        <HeroWithIllustrationAndSearchBar
          titleAndDescription={
            content._what_is_title_and_description || FillerContent.rich_text
          }
          image={
            (content._what_is_image?.data &&
              content._what_is_image?.data[0]?.url) ||
            FillerContent.image
          }
        />
        <BgDecorations theme={theme} />
      </Box>

      {/* How it works */}

      {router.asPath.includes('/ppc/headless-cms/') ||
      router.asPath.includes('/ppc/digital-experience-platform/') ? (
        <HowItWorks
          header={content.how_it_works || FillerContent.header}
          images={
            content.how_it_works_image?.data || FillerContent.photos[0].src
          }
        />
      ) : (
        <Features
          features_header={content.features_header}
          data={feature_data}
          content={content}
        />
      )}

      {/* Benefits */}
      <Box
        sx={{ py: isMobile ? 10 : 20 }}
        bgcolor={theme.palette.zesty.zestyDarkBlue}
      >
        <NewsletterWithImage
          header={content.outline_of_benefits || FillerContent.header}
          image={
            (content.benefits_image?.data &&
              content.benefits_image?.data[0]?.url) ||
            FillerContent.image
          }
          testimonial={content.testimonial?.data}
        />
      </Box>

      {router.asPath.includes('/ppc/headless-cms/') ? (
        <></>
      ) : (
        <TechStack {...techStackData} content={content} />
      )}

      {/* Form */}
      <Container>
        <Grid sx={{ py: 10 }} container>
          <Grid
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              flexDirection: 'column',
            }}
            item
            md={5}
            xs={12}
          >
            <Typography
              id="contact-us"
              variant="h4"
              style={{ marginTop: '30px' }}
            >
              Arrange a Demo
            </Typography>
            <br />
            <Divider />

            <Typography variant="body1">
              <p>
                Input your info and we will reach out immediately to arrange a
                personalized demo with you and your team.
              </p>
              <ul>
                <li>Tell us about your project</li>
                <li>Learn industry best practices</li>
                <li>Speak with a Solutions Engineer</li>
                <li>Explore the ease of data transfer</li>
                <li>Walk away with tailored Zesty platform</li>
              </ul>
            </Typography>
          </Grid>
          <Grid item md={7} xs={12}>
            <ZohoFormEmbed
              formURL="https://forms.zohopublic.com/zestyio/form/SalessignupformPPCCRM/formperma/G9oQMOrpqmdcg7rMbZ3tqucS8d9-92oA5HYh6fO96fM"
              height="650px"
            />
          </Grid>
        </Grid>
      </Container>
      {/*
        // the original form was commented out to use the zoho embed form url above
      {router.asPath.includes('/ppc/content-management-system/') ? (
        <PpcShortForm theme={theme} content={content} />
      ) : (
        <ContactUsForm
          theme={theme}
          content={content}
          formContent={formContent}
        />
      )}
      */}
    </>
  );
}

export default LongFormPpc;
