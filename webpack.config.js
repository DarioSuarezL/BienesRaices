import path from 'path';

export default {
    mode: 'development',
    entry: {
        map: './src/public/js/map.js',
    },
    output: {
        filename: '[name]Bundle.js',
        path: path.resolve('src/public/js'),
    }
}