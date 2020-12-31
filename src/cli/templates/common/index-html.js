module.exports = ({ labNumber }) => `\
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
    <title>&#x1D453;Art.&#x1D1B;&#xA731; - ${labNumber}</title>
  </head>

  <body>
    <main>
      <canvas></canvas>
    </main>
    <script src="./src/entry.ts" defer></script>
  </body>
</html>
`;
