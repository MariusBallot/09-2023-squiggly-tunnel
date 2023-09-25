/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (
        config,
        { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
    ) => {
        config.module.rules.push({
            test: /\.(frag|vert|glsl)$/,
            exclude: /node_modules/,
            use: ['raw-loader','glslify-loader'],
        })
        return config
    },
}

module.exports = nextConfig
