const path = require("path");

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "djsutil.js",
        path: path.resolve(__dirname, "dist"),
        library: "DJSUtil", // ✅ Webpack에서 전역 변수로 설정
        libraryTarget: "umd", // ✅ UMD 모듈 형식 (브라우저 & Node.js 지원)
        globalObject: "this", // ✅ 브라우저 & Node.js 환경 지원
        libraryExport: "default", // ✅ export default 제거 (e로 변환되는 문제 해결)
    },
    externals: {
        jquery: "jQuery", // ✅ jQuery는 외부 의존성으로 설정
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            },
            // ✅ CSS 파일을 JavaScript 번들에 포함
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"], // CSS를 번들에 포함
            }
        ]
    },
};
