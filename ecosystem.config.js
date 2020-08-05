module.exports = {
  apps: [
    {
      name: 'what-do-you-say',
      script: 'dist/.',
      instances: 8,
      exec_mode: 'cluster',
      wait_ready: true,
      listen_timeout: 50000,
      kill_timeout: 5000,
    },
  ],
}
