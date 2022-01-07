import { AuthApiFactory, UsersApiFactory, PostApiFactory } from './dotnet';
import { Configuration as DotnetConfiguration } from './dotnet/configuration';
import { DOTNET_API_URL, JAVA_API_URL } from '~/constants/constants';
import { Configuration as JavaConfiguration, BackendApiApiFactory } from '~/api-client/java';

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

const javaConfig = new JavaConfiguration({ baseOptions: globalAxiosOptions, basePath: JAVA_API_URL });

const apiClient = {
  ...AuthApiFactory(dotnetConfig),
  ...UsersApiFactory(dotnetConfig),
  ...PostApiFactory(dotnetConfig),
  ...BackendApiApiFactory(javaConfig)
};

export default apiClient;
