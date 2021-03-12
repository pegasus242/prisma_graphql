export const configuration = () => ({
    environment: process.env.NODE_ENV,
    port: parseInt(process.env.PORT || '3000', 10),
    admin: {
      username: 'Rohit' || process.env.ADMIN_USERNAME,  
      password: '1234567' || process.env.ADMIN_PASSWORD,
    },
  })