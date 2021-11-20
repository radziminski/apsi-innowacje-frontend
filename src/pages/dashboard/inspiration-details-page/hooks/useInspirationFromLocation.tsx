import * as H from 'history';
import React from 'react';
import { InspirationModel } from '~/pages/dashboard/inspiration-page/InspirationPage';
import { InspirationDetailsLocationState } from '~/pages/dashboard/inspiration-details-page/InspirationDetailsPage';

export const useInspirationFromLocation = (
  location: H.Location<InspirationDetailsLocationState>
): [boolean, InspirationModel | undefined] => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [inspiration, setInspiration] = React.useState<InspirationModel | undefined>(undefined);
  if (!location.state) {
    // const inspirationId = location.pathname.split('/').pop();
    // TODO fetch from API
    return [isLoading, inspiration];
  } else {
    const { inspiration } = location.state;
    return [false, inspiration];
  }
};
