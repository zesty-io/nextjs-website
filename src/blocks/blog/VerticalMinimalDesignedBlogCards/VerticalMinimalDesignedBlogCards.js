/**
 * props
 * list: any[]
 * hideLoadMore: Boolean // hide the loadmore button
 */
import React from 'react';
import { useTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Container from 'components/Container';
import { Pagination } from '@mui/material';

const mock = [
  {
    image: 'https://assets.maccarianagency.com/backgrounds/img2.jpg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    title: 'Lorem ipsum dolor sit amet,',
    author: {
      name: 'Clara Bertoletti',
      avatar: 'https://assets.maccarianagency.com/avatars/img4.jpg',
    },
    date: '04 Aug',
  },
  {
    image: 'https://assets.maccarianagency.com/backgrounds/img3.jpg',
    description: 'Excepteur sint occaecat cupidatat non proident',
    title: 'Consectetur adipiscing elit',
    author: {
      name: 'Jhon Anderson',
      avatar: 'https://assets.maccarianagency.com/avatars/img5.jpg',
    },
    date: '12 Sep',
  },
  {
    image: 'https://assets.maccarianagency.com/backgrounds/img4.jpg',
    description: 'Eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
    title: 'Labore et dolore magna aliqua',
    author: {
      name: 'Chary Smith',
      avatar: 'https://assets.maccarianagency.com/avatars/img6.jpg',
    },
    date: '22 Nov',
  },
];

const VerticalMinimalDesignedBlogCards = ({ hideLoadMore, cards, author }) => {
  const theme = useTheme();
  const cardsData = cards || mock;
  const scrollTo = (id) => {
    setTimeout(() => {
      const element = document.querySelector(`#${id}`);
      if (!element) {
        return;
      }

      window.scrollTo({
        left: 0,
        top: element.offsetTop,
        behavior: 'smooth',
      });
    });
  };

  // Pagination
  const [currentPage, setcurrentPage] = React.useState(1);
  const [postperPage, _setpostperPage] = React.useState(9);
  const indexoflast = currentPage * postperPage;
  const indexoffirst = indexoflast - postperPage;
  const pageNum = [];
  const cardsList = cardsData.slice(indexoffirst, indexoflast);
  for (let i = 1; i <= Math.ceil(cardsData.length / postperPage); i++) {
    pageNum.push(i);
  }
  const handleChange = (_event, value) => {
    setcurrentPage(value);
    scrollTo('scrollTop');
  };

  return (
    <Container id="scrollTop">
      <Box marginBottom={4}>
        {cards?.length >= 10 && (
          <Grid item container justifyContent={'center'} xs={12}>
            <Pagination
              count={pageNum?.length}
              size={'large'}
              color="primary"
              page={currentPage}
              onChange={handleChange}
            />
          </Grid>
        )}
      </Box>
      <Grid container spacing={4}>
        {cardsList?.map((item, i) => (
          <Grid item xs={12} md={4} key={i}>
            <Box
              component={'a'}
              href={item?.article?.url}
              display={'block'}
              width={1}
              height={1}
              sx={{
                textDecoration: 'none',
                transition: 'all .2s ease-in-out',
                '&:hover': {
                  transform: `translateY(-${theme.spacing(1 / 2)})`,
                },
              }}
            >
              <Box
                component={Card}
                width={1}
                height={1}
                boxShadow={4}
                display={'flex'}
                flexDirection={'column'}
                sx={{ backgroundImage: 'none' }}
              >
                <CardMedia
                  image={item?.article?.image}
                  title={item?.article?.title}
                  sx={{
                    height: { xs: 300, md: 360 },
                    position: 'relative',
                  }}
                />
                <Box component={CardContent} position={'relative'}>
                  <Typography variant={'h6'} gutterBottom>
                    {item?.article?.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {item?.article?.description}
                  </Typography>
                </Box>
                <Box flexGrow={1} />
                <Box padding={2} display={'flex'} flexDirection={'column'}>
                  <Box marginBottom={2}>
                    <Divider />
                  </Box>
                  <Box
                    display={'flex'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                  >
                    <Box display={'flex'} alignItems={'center'}>
                      <Avatar
                        src={author?.avatar || item?.article?.author?.avatar}
                        sx={{ marginRight: 1 }}
                      />
                      <Typography color={'text.secondary'}>
                        {author?.name || item?.article?.author?.name}
                      </Typography>
                    </Box>
                    <Typography color={'text.secondary'}>
                      {item?.article?.date}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
        ))}
        <Grid item container justifyContent={'center'} xs={12}>
          <Button
            fullWidth
            style={{ display: hideLoadMore ? 'none' : 'block' }}
            variant={'outlined'}
            size={'large'}
            sx={{ height: 54, maxWidth: 400, justifyContent: 'space-between' }}
            endIcon={
              <Box
                component={'svg'}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                width={24}
                height={24}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </Box>
            }
          >
            Load More
          </Button>
        </Grid>
      </Grid>
      {cards?.length >= 10 && (
        <Grid item container justifyContent={'center'} xs={12}>
          <Pagination
            count={pageNum?.length}
            size={'large'}
            color="primary"
            page={currentPage}
            onChange={handleChange}
          />
        </Grid>
      )}
    </Container>
  );
};

export default VerticalMinimalDesignedBlogCards;
