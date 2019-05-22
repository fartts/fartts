module.exports = ({ experimentName }) => `\
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, user-scalable=no"
    />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>𝑓Art.ᴛꜱ - ${experimentName}</title>
  </head>

  <body>
    <main role="main">
      <canvas></canvas>
    </main>
    <script src="./src/entry.ts"></script>
  </body>
</html>
`;
