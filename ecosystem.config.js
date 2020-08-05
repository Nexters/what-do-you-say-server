module.exports = {
  apps: [
    {
      name: 'what-do-you-say',
      script: 'dist/.',
      instances: 8,
      exec_mode: 'cluster',
    },
  ],
}
