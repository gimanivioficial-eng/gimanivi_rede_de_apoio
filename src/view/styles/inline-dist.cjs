const fs = require("fs");
const path = require("path");

const dist = path.join(__dirname, "..", "..", "dist");
let html = fs.readFileSync(path.join(dist, "index.html"), "utf8");

html = html.replace(
  /<link rel="stylesheet" crossorigin href="\.\/assets\/([^"]+\.css)">/,
  (_, cssFile) => {
    const css = fs.readFileSync(path.join(dist, "assets", cssFile), "utf8");
    return `<style>\n${css}\n</style>`;
  }
);

html = html.replace(
  /<script type="module" crossorigin src="\.\/assets\/([^"]+\.js)"><\/script>/,
  (_, jsFile) => {
    const js = fs.readFileSync(path.join(dist, "assets", jsFile), "utf8");
    return `<script type="module">\n${js}\n</script>`;
  }
);

fs.writeFileSync(path.join(dist, "index.html"), html);
console.log("Pronto! index.html virou arquivo único.");