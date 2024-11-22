import { Grid, Skeleton, Typography } from '@mui/material';
import ZInstanceItem from './ZInstanceItem';
import * as helpers from 'utils';

const ZInstancesContainer = ({
  instances,
  isInstancesLoading,
  isTogglingFavorites,
  toggleFavorites,
  instancesFavorites,
  firstName,
}) => {
  const dayTime = () => {
    const hour = new Date().getHours();
    if (hour >= 0 && hour <= 12) return 'Good Morning, ';
    else if (hour > 12 && hour <= 17) return 'Good Afternoon, ';
    else if (hour > 17 && hour <= 23) return 'Good Evening, ';
  };
  return (
    <>
      <Typography
        mb={2}
        variant="h6"
        color="text.secondary"
        data-testid="instancesContainer"
      >
        {firstName ? (
          dayTime() + firstName
        ) : (
          <Skeleton sx={{ mb: 2 }} width="150px" />
        )}
      </Typography>

      <Grid container spacing={{ xs: 2, xl: 4 }}>
        {isInstancesLoading
          ? [...new Array(3)].map((i) => (
              <Grid key={i} item xs={12} md={4}>
                <ZInstanceItem isLoading={isInstancesLoading} />
              </Grid>
            ))
          : instances?.map((instance) => (
              <Grid key={instance?.ZUID} item xs={12} md={4}>
                <ZInstanceItem
                  isTogglingFavorites={isTogglingFavorites}
                  isLoading={isInstancesLoading}
                  image={instance?.screenshotURL}
                  title={instance?.name}
                  zuidLink={`/instances/${instance.ZUID}/`}
                  previewLink={`https://${instance?.randomHashID}-dev${
                    helpers?.isProd
                      ? '.webengine.zesty.io'
                      : '.preview.dev.zesty.io'
                  }`}
                  managerLink={`https://${instance?.ZUID}.manager${
                    helpers?.isProd ? '' : '.dev'
                  }.zesty.io/`}
                  isFavorite={instancesFavorites?.find(
                    (c) => c === instance.ZUID,
                  )}
                  toggleFavorites={() => toggleFavorites(instance.ZUID)}
                />
              </Grid>
            ))}
      </Grid>
    </>
  );
};

export default ZInstancesContainer;
