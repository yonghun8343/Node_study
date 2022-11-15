module.exports = {
  apps: [
    {
      name: "express",
      script: "./bin/www",
      watch: true,
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
