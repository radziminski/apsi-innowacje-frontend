import { AuthApiFactory, UsersApiFactory } from './dotnet';
import { Configuration as DotnetConfiguration } from './dotnet/configuration';
import { DOTNET_API_URL } from '~/constants/constants';

export * from './dotnet/api';
export * from './java/api';

export const globalAxiosOptions = {
  headers: {
    'Content-Type': 'application/json'
  }
};

const dotnetConfig = new DotnetConfiguration({
  baseOptions: globalAxiosOptions,
  basePath: DOTNET_API_URL ?? `${document.location.protocol}//${document.location.host}`
});

const apiClient = {
  ...AuthApiFactory(dotnetConfig),
  ...UsersApiFactory(dotnetConfig)
};

export default apiClient;
