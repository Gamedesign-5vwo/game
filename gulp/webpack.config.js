const path = require("path");
const webpack = require("webpack");
module.exports = (watch) => {
    return {
        mode: "development",
        entry: {
            "bundle.js": [path.resolve(__dirname, "../src/js/main.js")],
        },
        output: {
            filename: "bundle.js",
            path: path.resolve(__dirname, "..", "build"),
        },
        watch,
        module: {
            rules: [{
                test: /\.js$/,
                use: [
                    // "thread-loader",
                    {
                        loader: "babel-loader?cacheDirectory",
                        options: {
                            configFile: require.resolve("./babel.config.js"),
                        },
                    },
                    "uglify-template-string-loader", // Finally found this plugin
                    //TODO: later for config
                    // StringReplacePlugin.replace({
                    //     replacements: [
                    //         { pattern: /globalConfig\.tileSize/g, replacement: () => "32" },
                    //         { pattern: /globalConfig\.halfTileSize/g, replacement: () => "16" },
                    //         {
                    //             pattern: /globalConfig\.beltSpeedItemsPerSecond/g,
                    //             replacement: () => "2.0",
                    //         },
                    //         { pattern: /globalConfig\.debug/g, replacement: () => "''" },
                    //     ],
                    // }),
                ],
            }, ],
        },
    };
};