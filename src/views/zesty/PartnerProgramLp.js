/**
 * Zesty.io Content Model Component
 * When the ZestyLoader [..slug].js file is used, this component will autoload if it associated with the URL
 * 
 * Label: Partner Program LP 
 * Name: partner_program_lp 
 * Model ZUID: 6-fea599839a-22hv90
 * File Created On: Wed Jul 27 2022 18:58:43 GMT+0800 (Philippine Standard Time)
 * 
 * Model Fields:
 * 
  * header_text (wysiwyg_basic)
 * header_graphic (images)
 * button_text (text)
 * logos_title (wysiwyg_basic)
 * logos (one_to_many)
 * benefits_header (wysiwyg_basic)
 * benefits (one_to_many)
 * open_text_area (wysiwyg_basic)
 * open_text_area_graphic (images)
 * features_titles (wysiwyg_basic)
 * features (one_to_many)
 * open_text_area_2 (wysiwyg_basic)
 * open_text_area_2_graphic (images)
 * testimonial (one_to_one)
 * open_text_area_3 (wysiwyg_basic)
 * open_text_area_3_graphic (images)
 * form_text_left (wysiwyg_basic)
 * form_title (text)

 * 
 * In the render function, text fields can be accessed like {content.field_name}, relationships are arrays,
 * images are objects {content.image_name.data[0].url}
 * 
 * This file is expected to be customized; because of that, it is not overwritten by the integration script.
 * Model and field changes in Zesty.io will not be reflected in this comment.
 * 
 * View and Edit this model's current schema on Zesty.io at https://8-aaeffee09b-7w6v22.manager.zesty.io/schema/6-fea599839a-22hv90
 * 
 * Data Output Example: https://zesty.org/services/web-engine/introduction-to-parsley/parsley-index#tojson
 * Images API: https://zesty.org/services/media-storage-micro-dam/on-the-fly-media-optimization-and-dynamic-image-manipulation
 */

import React from 'react';
import FillerContent from 'components/globals/FillerContent';

/**
 * Mui Imports
 */
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

/**
 * Components Imports
 */
import { SlashImageHeroWithCta } from 'blocks/heroes';
import WhyZesty from 'components/marketing/PartnerProgramLp/WhyZesty';
import Benefits from 'components/marketing/PartnerProgramLp/Benefits';
import Testimonial from 'blocks/testimonials/SingleTestimonial';
import Bottom from 'components/marketing/PartnerProgramLp/Bottom';
import SimpleCardLogo from 'blocks/zesty/LogoGrid/SimpleCardLogo';
import Features from 'blocks/zesty/PageLayouts/Features';

function PartnerProgramLp({ content }) {
  const theme = useTheme();
  const isMedium = useMediaQuery(theme.breakpoints.down('md'));
  const isDarkMode = theme.palette.mode === 'dark';

  const pageData = {
    theme,
    isMedium,
    isDarkMode,
    content,
    FillerContent,
  };

  const heroProps = {
    title: content.header_text,
    cta_left: content.button_text,
    cta_right: content.watch_demo_cta_button,
    cta_right_url: content.watch_demo_cta_button_link?.data[0]?.meta.web.uri,
    mainImage: content.header_graphic?.data[0]?.url,
  };

  const testimonialProps = {
    title: content.testimonial_title,
    testimonialData: content.testimonial,
  };

  const feature_data =
    content.features?.data.reduce((acc, item) => {
      acc.push({
        icon_image: item.icon_image?.data[0].url,
        feature_name: item.feature_name,
        content: item.content,
      });

      return acc;
    }, []) || [];

  return (
    <>
      <SlashImageHeroWithCta {...heroProps} />
      <Box sx={{ py: 10 }}>
        <SimpleCardLogo
          variant="outlined"
          heading_text={content.logos_title}
          logoItems={content.logos?.data}
          {...pageData}
        />
      </Box>
      <WhyZesty {...pageData} />
      <Benefits {...pageData} />
      <Testimonial {...testimonialProps} />
      <Features
        header_color={theme.palette.zesty.zestyZambezi}
        header_size={48}
        data={feature_data}
        features_header={content.features_header}
      />
      <Bottom {...pageData} />
    </>
  );
}

export default PartnerProgramLp;
