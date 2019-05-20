module.exports = ({ name }) => `\
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>𝑓Art.ᴛꜱ - ${name}</title>
</head>

<body>
  <main role="main">
    <canvas />
  </main>
  <script src="./src/entry.ts"></script>
</body>

</html>
`;