const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// 정적 파일 제공 (빌드된 JS, 테스트 페이지)
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "../dist"))); // Webpack 빌드 결과

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.listen(PORT, () => {
    console.log(`Dev server running at http://localhost:${PORT}`);
});
