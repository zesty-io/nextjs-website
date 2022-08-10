import { Box, Card, CardContent } from '@mui/material';
import Container from 'blocks/container/Container';

const SimpleCardLogo = ({ content, FillerContent, isDarkMode }) => {
  return (
    <Box component="section">
      <Container>
        <Card>
          <CardContent>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
                flexWrap: 'wrap',
                gap: 4,
              }}
            >
              {content.homepage_logos.data.map((item, index) => (
                <Box key={index} sx={{ display: 'flex' }}>
                  <Box
                    sx={{ filter: isDarkMode ? 'invert(100%)' : '' }}
                    component="img"
                    src={
                      item.customer_logo.data[0].url ||
                      FillerContent.logos[0].url
                    }
                  />
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default SimpleCardLogo;
