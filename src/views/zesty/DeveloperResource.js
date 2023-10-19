/**
 * Zesty.io Content Model Component
 * When the ZestyLoader [..slug].js file is used, this component will autoload if it associated with the URL
 * 
 * Label: Developer Resources 
 * Name: developer_resources 
 * Model ZUID: 6-f4a7b9ccce-jzhgz2
 * File Created On: Mon Mar 07 2022 18:56:13 GMT-0800 (Pacific Standard Time)
 * 
 * Model Fields:
 * 
  * title (text)

 * 
 * In the render function, text fields can be accessed like {content.field_name}, relationships are arrays,
 * images are objects {content.image_name.data[0].url}
 * 
 * This file is expected to be customized; because of that, it is not overwritten by the integration script.
 * Model and field changes in Zesty.io will not be reflected in this comment.
 * 
 * View and Edit this model's current schema on Zesty.io at https://8-aaeffee09b-7w6v22.manager.zesty.io/schema/6-f4a7b9ccce-jzhgz2
 * 
 * Data Output Example: https://zesty.org/services/web-engine/introduction-to-parsley/parsley-index#tojson
 * Images API: https://zesty.org/services/media-storage-micro-dam/on-the-fly-media-optimization-and-dynamic-image-manipulation
 */

import React from 'react';
// mui
import Box from '@mui/material/Box';
// container component
import Container from 'components/Container';
// blocks
import { SimpleHeroWithCta } from 'blocks/heroes';
import { VerticalMinimalDesignedBlogCardsNoFooter } from 'blocks/blog';
// Filler content
import FillerContent from 'components/globals/FillerContent';

function DeveloperResource({ content }) {
  return (
    <>
      <Box>
        <SimpleHeroWithCta
          secondaryCTA={content.header_cta_secondary || FillerContent.cta}
          secondaryCtaLink={
            content.header_cta_secondary_link?.data[0]?.meta?.web?.uri ||
            FillerContent.cta
          }
          title={content.title || FillerContent.header}
          description={content.header_description || FillerContent.description}
        />
        <Container>
          <VerticalMinimalDesignedBlogCardsNoFooter
            cards={content.developer_cards?.data || []}
          />
          {/* <ContactUs
          title={content.contact_title || FillerContent.header}
          description={content.contact_description || FillerContent.description} /> */}
        </Container>
        {/* Zesty.io Output Example and accessible JSON object for this component. Delete or comment out when needed.  */}
        {/* <div
          style={{
            background: '#eee',
            border: '1px #000 solid',
            margin: '10px',
            padding: '20px',
          }}
        >
          <h2>Accessible Zesty.io JSON Object</h2>
          <pre>{JSON.stringify(content, null, 2)}</pre>
        </div> */}
        {/* End of Zesty.io output example */}
      </Box>
    </>
  );
}

export default DeveloperResource;
