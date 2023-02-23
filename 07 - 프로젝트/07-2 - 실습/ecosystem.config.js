module.exports = {
  apps: [
    {
      name: "practice",
      script: "./bin.www",
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
