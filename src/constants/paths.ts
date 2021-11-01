export const getRootPath = () => '/';

export const getLoginPath = () => '/login';

export const getDashboardPath = () => '/dashboard';

export const getExamplePagePath = () => `${getDashboardPath()}/przykladowy-ekran`;

export const getCreateIdeaPath = () => `${getDashboardPath()}/create`;

export const getExamplePagePathWithParams = (queryParam: string) => `${getExamplePagePath()}?query-param=${queryParam}`;
