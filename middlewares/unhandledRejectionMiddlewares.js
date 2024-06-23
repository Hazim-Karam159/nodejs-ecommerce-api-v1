const unhandledRejection =  (err) => {
  console.error(`Unhandled Rejection: ${err.name} | ${err.message}`);
  server.close(
    () => {
      console.error(`Shutting down the server due to Unhandled Rejection`);
    process.exit(1);
    }
  )
}

module.exports = unhandledRejection;