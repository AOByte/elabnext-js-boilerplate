import path from 'path';
import { fileURLToPath } from 'url';
import webpack from 'webpack';
import TerserPlugin from 'terser-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default (env) => {
  const isProduction = env.NODE_ENV === 'production';

  return {
    entry: './src/index.js',
    mode: env.NODE_ENV,
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'add-on.js',
    },
    resolve: {
      extensions: ['.js'],
    },
    optimization: {
      minimize: isProduction,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            output: {
              comments: true,
            },
            mangle: {
              reserved: ['SAMPLE_ADDON'],
            },
          },
        }),
      ],
    },
    plugins: [
      new webpack.BannerPlugin({
        raw: true,
        banner: () => {
          return '/*! \n'
            + '@preserve\n'
            + '@rootVar: SAMPLE_ADDON\n'
            + '@name: Sample Addon\n'
            + '@version: 1.0.0\n'
            + '@description: Sample add-on will build task table\n'
            + '@requiredElabVersion:\n'
            + '@author: AОByte\n'
            + '@class: SampleAddon\n'
            + '@capabilities:\n'
            + '@consentMessage:\n'
            + '@description: Sample Addon description\n'
            + '@requiredDependencies:\n'
            + '*/ \n'
            + 'var SAMPLE_ADDON = {};';
        },
      }),
    ],
  };
};
