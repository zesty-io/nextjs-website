/**
 * Zesty.io Content Model Component
 * When the ZestyLoader [..slug].js file is used, this component will autoload if it associated with the URL
 *
 * Label: Articles
 * Name: articles
 * Model ZUID: 6-45a908-qfw88c
 * File Created On: Fri Mar 04 2022 12:16:05 GMT-0800 (Pacific Standard Time)
 *
 * Model Fields:
 *
  * hero_image (images)
 * article (wysiwyg_advanced)
 * title (text)
 * description (text)
 * author (one_to_one)
 * date (date)
 * tags (one_to_many)

 *
 * In the render function, text fields can be accessed like {content.field_name}, relationships are arrays,
 * images are objects {content.image_name.data[0].url}
 *
 * This file is expected to be customized; because of that, it is not overwritten by the integration script.
 * Model and field changes in Zesty.io will not be reflected in this comment.
 *
 * View and Edit this model's current schema on Zesty.io at https://8-aaeffee09b-7w6v22.manager.zesty.io/schema/6-45a908-qfw88c
 *
 * Data Output Example: https://zesty.org/services/web-engine/introduction-to-parsley/parsley-index#tojson
 * Images API: https://zesty.org/services/media-storage-micro-dam/on-the-fly-media-optimization-and-dynamic-image-manipulation
 */

import React from 'react';
import { Box, Button, Container, Link, Table, useTheme } from '@mui/material';
import FillerContent from 'components/globals/FillerContent';
import {
  List,
  ListItem,
  Stack,
  ThemeProvider,
  Typography,
} from '@mui/material';
import MuiMarkdown from 'markdown-to-jsx';
import { useEffect, useState } from 'react';
import BlogHero from 'revamp/ui/BlogHero';
import revampTheme from 'theme/revampTheme';
import dayjs from 'dayjs';
import 'react-medium-image-zoom/dist/styles.css';
import AuthorSection from 'revamp/ui/AuthorSection';
import useFetch from 'components/hooks/useFetch';
import BlogContent from 'revamp/ui/BlogContent';
import { CtaWithInputField } from 'blocks/cta';
import PopUpLeadCapture from 'components/marketing/PopupLeadCapture';
import { getCookie, hasCookie, setCookie } from 'cookies-next';

function Article({ content }) {
  const [newContent, setNewContent] = useState(content?.article);
  const [isClient, setIsClient] = useState(false);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const { palette } = useTheme();

  const { data: latestArticles } = useFetch(
    '/-/all-articles-hydrated.json?limit=4',
    content.zestyProductionMode,
  );

  const removeErrorHandlingString = /Error hydrating/gi;
  let cleanOutErrorHydrating;

  const authorImage =
    content.author?.data[0]?.headshot?.data[0]?.url || FillerContent.image;
  const authorName = content.author?.data[0]?.name || FillerContent.header;
  const authorDate =
    dayjs(content.date).format('MMMM DD, YYYY') || FillerContent.date;
  const categoryName =
    content?.category?.data[0]?.category || FillerContent.defaultCategoryName;
  const categoryLink =
    content?.category?.data[0]?.meta?.web?.uri ||
    FillerContent.defaultCategoryUrl;
  const authorLink = content?.author?.data[0]?.meta?.web?.uri;
  const authorDescription = content?.author?.data[0]?.description;
  const tags = content?.tags?.data?.map((c) => ({
    name: c?.tag,
    link: c?.meta?.web?.uri,
  }));
  const [showPopup, setShowPopup] = useState(false);
  const cookieName = 'DOWNLOADED_PDF';

  // Define a regular expression pattern to match [_CTA_]
  let regexPattern = /\[CALL TO ACTION (\d+)\]/g;

  useEffect(() => {
    const removeSpansInHeadings = (html) => {
      let tempDiv = document.createElement('div');
      tempDiv.innerHTML = html;

      let headings = tempDiv.querySelectorAll('h1, h2, h3, h4, h5, h6');

      headings.forEach((heading) => {
        let spans = heading.querySelectorAll('span');
        spans.forEach((span) => {
          span.replaceWith(...span.childNodes);
        });
      });

      return tempDiv.innerHTML;
    };

    setNewContent(removeSpansInHeadings(newContent));
  }, [newContent]);

  useEffect(() => {
    const validateWysiwyg = () => {
      if (newContent?.includes('Error hydrating')) {
        cleanOutErrorHydrating = content?.article.replaceAll(
          removeErrorHandlingString,
          '',
        );
        return cleanOutErrorHydrating;
      } else {
        return newContent;
      }
    };

    function decode(str) {
      let txt = document.createElement('textarea');
      txt.innerHTML = str;
      return txt.value;
    }
    setNewContent(
      decode(validateWysiwyg()).replace(
        regexPattern,
        (match, id) => `<acronym${id}  title="CALL TO ACTION" />`,
      ),
    );
    verifyPathnameInCookie(window.location.pathname);
  }, []);

  useEffect(() => {
    setRelatedArticles(
      getRelatedArticles(content?.related_articles, latestArticles),
    );
    setIsClient(true); // set inline styling in client not in server
  }, [latestArticles]);

  const verifyPathnameInCookie = (path) => {
    if (!hasCookie(cookieName)) {
      setShowPopup(true);
      return;
    }

    const value = JSON.parse(getCookie(cookieName));
    const newValue = value.filter((obj) => !isDateExpired(obj.expire));

    if (value.length !== newValue.length)
      setCookie(cookieName, newValue, { maxAge: 365 * 24 * 60 * 60 * 1000 });

    if (!newValue.some((item) => item.path === path)) setShowPopup(true);
  };

  const isDateExpired = (inputDate) => {
    const currentDate = new Date();
    return new Date(inputDate) < currentDate;
  };

  // Mutate and destructure related articles to match the structure of latestArticles
  // Prioritize to return related instead of latest articles
  const getRelatedArticles = (related, latest = []) => {
    const relatedData = [];
    let totalSliceCount = 4; // Default number of data to return
    let result;

    if (related?.data?.length > 4) {
      totalSliceCount = related.data.length;
      latest = [];
    }

    if (related !== null || related) {
      related?.data.map(
        ({ title, description, date, author, hero_image, meta }) => {
          const articleDate = new Date(date);
          relatedData.push({
            title,
            author: {
              name: author?.data[0]?.name,
              image: author?.data[0]?.headshot?.data[0].url,
            },
            description,
            date:
              articleDate.toLocaleString('default', { month: 'long' }) +
              ' ' +
              articleDate.getDate(),
            image: hero_image?.data
              ? hero_image.data[0].url
              : FillerContent.image,
            path: meta?.web?.uri,
          });
        },
      );
    }

    // Merge related and latest articles into one array
    // Removing duplicate and current article from result
    result = [...relatedData, ...latest].filter(
      (value, index, self) =>
        index ===
        self.findIndex(
          (t) => t.title === value.title && t.title !== content?.title,
        ),
    );
    return result.slice(0, totalSliceCount);
  };

  const popupLeadCaptureProps = {
    title: content?.pop_up_title || 'FREE CMS BUYING GUIDE',
    description: content?.pop_up_description || 'DOWNLOAD CMS BUYING GUIDE',
    ctaText: content?.pop_up_cta_text || 'DOWNLOAD NOW',
    thankYouMessage:
      content?.pop_up_thank_you ||
      'Thank you for downloading our CMS buying guide. Reach out to us for a free discovery call, demo call or a free trial',
    pdfLink:
      content?.pdf_link ||
      'https://kfg6bckb.media.zestyio.com/HeadlessCMS-Buyers-Guide-Zesty.H17lCRwtp.pdf',
    cookieName,
    setShowPopup,
  };

  const inlineStyles = isClient
    ? `:is(span, p, h1, h2, h3, h4, h5, h6) :is(img) {
  width: auto;
  max-width: 100%;
  }
  :h1 span, :h2 span {
    color: black;
  }`
    : ``;

  // Match CTA component sort order id from array to return its props
  const ctaComponentProps = (id) => {
    const callToActionsArray = content?.call_to_actions?.data || [];
    return callToActionsArray?.filter((item) => item.sort_order == id)[0];
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <ThemeProvider theme={() => revampTheme(palette.mode)}>
        <Stack>
          <BlogHero
            author={authorName}
            authorImage={authorImage}
            categoryLink={categoryLink}
            authorLink={authorLink}
            heading={content?.title || FillerContent.header}
            overline={categoryName}
            supportingText={authorDate}
            articleImage={
              content.hero_image?.data
                ? content.hero_image.data[0].url
                : FillerContent.image
            }
          />
          <Stack
            sx={(theme) => ({
              mb: 6,
              '& > :first-child': {
                marginTop: 6,
                '& > *:first-child': {
                  mt: 0,
                },
              },
              [theme.breakpoints.up('lg')]: {
                width: '800px',
                mx: 'auto',
              },
            })}
          >
            <style>{inlineStyles}</style>
            <MuiMarkdown
              options={{
                overrides: {
                  acronym1: {
                    component: CtaComponent,
                    props: ctaComponentProps(1),
                  },
                  acronym2: {
                    component: CtaComponent,
                    props: ctaComponentProps(2),
                  },
                  acronym3: {
                    component: CtaComponent,
                    props: ctaComponentProps(3),
                  },
                  acronym4: {
                    component: CtaComponent,
                    props: ctaComponentProps(4),
                  },
                  acronym5: {
                    component: CtaComponent,
                    props: ctaComponentProps(5),
                  },
                  acronym6: {
                    component: CtaComponent,
                    props: ctaComponentProps(6),
                  },
                  p: {
                    component: Typography,
                    props: {
                      fontSize: '18px',
                      lineHeight: '28px',
                      color: 'text.secondary',
                      mt: '20px',
                      px: 2,
                      sx: (theme) => ({
                        [theme.breakpoints.up('tablet')]: {
                          width: '640px',
                          mx: 'auto',
                          px: 0,
                        },
                      }),
                    },
                  },
                  strong: {
                    component: Typography,
                    props: {
                      component: 'strong',
                      sx: () => ({
                        color: 'text.primary',
                        fontSize: '18px',
                        lineHeight: '28px',
                        fontWeight: 700,
                      }),
                    },
                  },
                  h1: {
                    component: Typography,
                    props: {
                      component: 'h1',
                      variant: 'h1',
                      mt: 6,
                      color: 'text.primary',
                      fontWeight: 800,
                      px: 2,
                      letterSpacing: '-0.02em',
                      sx: (theme) => ({
                        [theme.breakpoints.up('xs')]: {
                          '&:has(img)': {
                            mt: '0',
                            px: 0,
                            width: '100%',
                          },
                        },
                        [theme.breakpoints.up('tablet')]: {
                          width: '640px',
                          mx: 'auto',
                          px: 0,
                        },
                        '& + p > span > span > img': {
                          mt: '20px !important',
                        },
                      }),
                    },
                  },
                  h2: {
                    component: Typography,
                    props: {
                      component: 'h2',
                      variant: 'h2',
                      mt: 6,
                      color: 'text.primary',
                      fontWeight: 800,
                      px: 2,
                      letterSpacing: '-0.02em',
                      sx: (theme) => ({
                        [theme.breakpoints.up('xs')]: {
                          '&:has(img)': {
                            mt: '0',
                            px: 0,
                            width: '100%',
                          },
                        },
                        [theme.breakpoints.up('tablet')]: {
                          width: '640px',
                          mx: 'auto',
                          px: 0,
                        },
                        '& + p > span > span > img': {
                          mt: '20px !important',
                        },
                      }),
                    },
                  },
                  h3: {
                    component: Typography,
                    props: {
                      component: 'h3',
                      variant: 'h3',
                      mt: 6,
                      color: 'text.primary',
                      fontWeight: 800,
                      px: 2,
                      sx: (theme) => ({
                        [theme.breakpoints.up('xs')]: {
                          '&:has(img)': {
                            mt: '0',
                            px: 0,
                            width: '100%',
                          },
                        },
                        [theme.breakpoints.up('tablet')]: {
                          width: '640px',
                          mx: 'auto',
                          px: 0,
                        },
                        '& + p > span > span > img': {
                          mt: '20px !important',
                        },
                      }),
                    },
                  },
                  h4: {
                    component: Typography,
                    props: {
                      component: 'h4',
                      variant: 'h4',
                      mt: '20px',
                      color: 'text.primary',
                      letterSpacing: '-0.02em',
                      px: 2,
                      sx: (theme) => ({
                        [theme.breakpoints.up('xs')]: {
                          '&:has(img)': {
                            mt: '0',
                            px: 0,
                            width: '100%',
                          },
                        },
                        [theme.breakpoints.up('tablet')]: {
                          width: '640px',
                          mx: 'auto',
                          px: 0,
                        },
                        '& + p > span > span > img': {
                          mt: '20px !important',
                        },
                      }),
                    },
                  },
                  h5: {
                    component: Typography,
                    props: {
                      component: 'h5',
                      variant: 'h5',
                      mt: '20px',
                      color: 'text.primary',
                      letterSpacing: '-0.02em',
                      px: 2,
                      sx: (theme) => ({
                        [theme.breakpoints.up('xs')]: {
                          '&:has(img)': {
                            mt: '0',
                            px: 0,
                            width: '100%',
                          },
                        },
                        [theme.breakpoints.up('tablet')]: {
                          width: '640px',
                          mx: 'auto',
                          px: 0,
                        },
                        '& + p > span > span > img': {
                          mt: '20px !important',
                        },
                      }),
                    },
                  },
                  h6: {
                    component: Typography,
                    props: {
                      component: 'h6',
                      variant: 'h6',
                      mt: '20px',
                      color: 'text.primary',
                      letterSpacing: '-0.02em',
                      px: 2,
                      sx: (theme) => ({
                        [theme.breakpoints.up('xs')]: {
                          '&:has(img)': {
                            mt: '0',
                            px: 0,
                            width: '100%',
                          },
                        },
                        [theme.breakpoints.up('tablet')]: {
                          width: '640px',
                          mx: 'auto',
                          px: 0,
                        },
                        '& + p > span > span > img': {
                          mt: '20px !important',
                        },
                      }),
                    },
                  },
                  img: {
                    component: 'img',
                  },
                  iframe: {
                    component: ({ children, ...props }) => (
                      <Box component="iframe" {...props}>
                        {children}
                      </Box>
                    ),
                    props: {
                      sx: (theme) => ({
                        [theme.breakpoints.up('xs')]: {
                          mt: 6,
                          width: '100%',
                          height: '210px',
                        },
                        [theme.breakpoints.up('tablet')]: {
                          height: '432px',
                        },
                        [theme.breakpoints.up('lg')]: {
                          height: '450px',
                        },
                      }),
                    },
                  },
                  ul: {
                    component: List,
                    props: {
                      sx: (theme) => ({
                        [theme.breakpoints.up('xs')]: {
                          color: 'text.secondary',
                          fontSize: '18px',
                          lineHeight: '28px',
                          fontWeight: 500,
                          py: 0,
                          mt: '20px',
                          '& .MuiListItem-root': {
                            display: 'list-item',
                            listStyleType: 'disc',
                          },
                          mx: 3,

                          '& ul': {
                            mt: '12px',
                            mx: 2,
                            p: 0,
                          },
                        },
                        [theme.breakpoints.up('tablet')]: {
                          width: '640px',
                          mx: 'auto',
                          px: 0,
                          '& ul': {
                            mx: 2,
                          },
                        },
                      }),
                    },
                  },
                  ol: {
                    component: List,

                    props: {
                      component: 'ol',
                      sx: (theme) => ({
                        [theme.breakpoints.up('xs')]: {
                          color: 'text.secondary',
                          fontSize: '18px',
                          lineHeight: '28px',
                          fontWeight: 500,
                          '& .MuiListItem-root': {
                            display: 'list-item',
                            listStyleType: 'auto',
                          },

                          mx: 3,
                        },
                        [theme.breakpoints.up('tablet')]: {
                          width: '640px',
                          mx: 'auto',
                          px: 0,
                        },
                      }),
                    },
                  },
                  li: {
                    component: ListItem,
                    props: {
                      sx: (theme) => ({
                        [theme.breakpoints.up('xs')]: {
                          listStyleType: 'initial',
                          px: 0,
                          pt: 0,
                          pb: '12px',
                          '& p': {
                            m: 0,
                            p: 0,
                          },
                        },
                        [theme.breakpoints.up('tablet')]: {
                          mx: 3,
                        },
                      }),
                    },
                  },
                  blockquote: {
                    component: Stack,
                    props: {
                      px: 2,
                      sx: (theme) => ({
                        mt: '20px',
                        borderLeft: `4px solid ${theme.palette.primary.main}`,

                        [theme.breakpoints.up('tablet')]: {
                          width: '640px',
                          mx: 'auto',
                        },
                        '& p,h1,h2,h3,h4,h5,h6': {
                          mt: 0,
                        },
                      }),
                    },
                  },
                  table: {
                    component: Table,
                    props: {
                      sx: (theme) => ({
                        overflowX: 'auto',
                        display: 'block',
                        height: 'auto !important',
                        width: '100% !important',
                        mt: '20px',
                        '& img, span': {
                          mt: '0px !important',
                          objectFit: 'contain',
                          height: '240px',
                        },
                        '& span': {
                          mt: '0px !important',
                          maxWidth: 'auto !important',
                        },
                        '& p': {
                          width: 'auto',
                        },
                        '& tr': {
                          bgcolor: 'transparent !important',
                        },
                        '& td': {
                          color:
                            theme.palette.mode === 'dark'
                              ? 'white'
                              : 'text.primary',
                        },
                      }),
                    },
                  },
                  a: {
                    component: Link,
                    props: {
                      color: 'info.main',
                      sx: {
                        '& img': {
                          maxWidth: '100%',
                        },
                        '& > span > span:has(img)': {
                          height: '100%',
                          display: 'inline-block',
                          width: '100%',
                        },
                        '& > span > span > img': {
                          cursor: 'pointer',
                          pointerEvents: 'none',
                        },
                      },
                    },
                  },
                  sub: {
                    props: {
                      style: {
                        fontSize: '14px',
                        lineHeight: '14px',
                      },
                    },
                  },
                  sup: {
                    props: {
                      style: {
                        fontSize: '14px',
                        lineHeight: '14px',
                      },
                    },
                  },
                  code: {
                    props: {
                      style: {
                        backgroundColor:
                          palette.mode === 'dark' ? 'darkblue' : '#F5F7F9',
                      },
                    },
                  },
                  pre: {
                    props: {
                      style: {
                        backgroundColor:
                          palette.mode === 'dark' ? 'transparent' : '#F5F7F9',
                      },
                    },
                  },
                },
              }}
            >
              {newContent || FillerContent.rich_text}
            </MuiMarkdown>
          </Stack>

          <AuthorSection
            authorName={authorName}
            authorDescription={authorDescription}
            authorImage={authorImage}
            tags={tags}
            authorLink={authorLink}
          />
          <BlogContent title="Related Articles" articles={relatedArticles} />
        </Stack>
      </ThemeProvider>

      {(content?.enable_newsletter_subscription === null ||
        content?.enable_newsletter_subscription == '1') && (
        <Container position="relative" zIndex={3}>
          <CtaWithInputField
            title={'Subscribe to the zestiest newsletter in the industry'}
            description={
              'Get the latest from the Zesty team, from whitepapers to product updates.'
            }
            cta={'Subscribe'}
          />
        </Container>
      )}

      {/* Side PopUp */}
      {showPopup && <PopUpLeadCapture {...popupLeadCaptureProps} />}
    </Box>
  );
}

export default Article;

function CtaComponent({ cta_title, cta_description, cta_text, cta_link }) {
  return (
    <>
      {cta_title && cta_description && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            padding: 4,
            gap: 2,
            justifyContent: 'center',
            alignItems: 'start',
            height: 'auto',
            width: '100%',
            backgroundColor: '#101828',
            borderRadius: '8px',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            textAlign: 'left',
          }}
        >
          <Typography variant="h5" fontWeight={700} color="white">
            {cta_title || ''}
          </Typography>
          <MuiMarkdown
            options={{
              overrides: {
                p: {
                  component: Typography,
                  props: {
                    variant: 'body1',
                    color: '#D0D5DD',
                  },
                },
                span: {
                  component: Typography,
                  props: {
                    variant: 'body1',
                    color: '#D0D5DD',
                  },
                },
              },
            }}
          >
            {cta_description || ''}
          </MuiMarkdown>

          <Button
            target="_blank"
            href={cta_link || ''}
            component="a"
            variant="contained"
            color="primary"
          >
            {cta_text || ''}
          </Button>
        </Box>
      )}
    </>
  );
}
