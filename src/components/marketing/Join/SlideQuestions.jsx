import React from 'react';
import { Container, Stack, Box, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';

function ActionAreaCard({
  question,
  _title = '',
  asset = '',
  storeValue,
  _animation,
  answer,
  callback,
  cardStyles = {},
  imageStyles = {},
}) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea
        //onMouseOver={() => animation(random_boolean(Math.random()) ? 'shake' : 'sway')}
        onClick={() => callback(question, answer, storeValue)}
      >
        <Box
          sx={{
            ...cardStyles,
          }}
        >
          <Box
            component="img"
            src={asset}
            alt={answer}
            sx={{
              ...imageStyles,
            }}
          />
        </Box>

        <CardContent>
          <Typography variant="h5" component="div">
            {answer}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export const SlideQuestions = ({
  question = 'What team are you from?',
  answers,
  why = '',
  answerCallBack,
  hoverAnimation,
  storeValue = false,
}) => {
  return (
    <Container>
      <Box
        sx={{
          textAlign: 'center',
        }}
      >
        <Box paddingY={4}>
          <Typography variant="h4">{question}</Typography>
          <Typography variant="p">{why}</Typography>
        </Box>
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          justifyContent="center"
        >
          {answers
            .sort((a, b) => a.value < b.value)
            .map((response) => (
              <ActionAreaCard
                key={`${response.answer.slice(0, 3)}${Math.random()}`}
                question={question}
                callback={answerCallBack}
                title={response.answer}
                asset={response.asset}
                answer={response.answer}
                animation={hoverAnimation}
                storeValue={storeValue}
                cardStyles={response.cardSX}
                imageStyles={response.imageSX}
              />
            ))}
        </Stack>
      </Box>
    </Container>
  );
};
