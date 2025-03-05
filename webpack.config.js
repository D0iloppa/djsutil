const path = require("path");

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "djsutil.js",
        path: path.resolve(__dirname, "dist"),
        library: "DjsUtil",
        libraryTarget: "umd",  // ✅ UMD 포맷으로 번들링 (브라우저 + Node.js 지원)
    },
    externals: {
        jquery: "jQuery" // ✅ jQuery는 번들에서 제외하고, 전역 jQuery 사용
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
            }
        ]
    }
};