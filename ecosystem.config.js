module.exports = {
  apps: [
    {
      name: 'what-do-you-say',
      script: 'dist/.',
      instances: 4,
      exec_mode: 'cluster',
    },
  ],
}
