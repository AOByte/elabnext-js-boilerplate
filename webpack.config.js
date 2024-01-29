import path from 'path';
import { fileURLToPath } from 'url';
import webpack from 'webpack';
import TerserPlugin from 'terser-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default (env, argv) => {
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
              reserved: ['MY_ADDON'],
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
            + '@rootVar: MY_ADDON\n'
            + '@name: My Addon\n'
            + '@version: 1.0.0\n'
            + '@description: \n'
            + '@requiredElabVersion:\n'
            + '@author: AОByte\n'
            + '@class: TranslationService\n'
            + '@capabilities:\n'
            + '@consentMessage:\n'
            + '@description: My Addon description\n'
            + '@requiredDependencies:\n'
            + '*/ \n'
            + 'var MY_ADDON = {};';
        },
      }),
    ],
  };
};
