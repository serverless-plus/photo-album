export default {
  baseUrl:
    // @ts-ignore
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000/'
      : window.env.apiUrl,
  timeout: 10000,
};
