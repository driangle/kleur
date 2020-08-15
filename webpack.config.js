const path = require('path');

module.exports = {
    'mode': 'production',
    'entry': './src/kleur.js',
    'output': {
        'path': path.resolve(__dirname, 'dist'),
        'filename': 'kleur.js',
        'library': 'kleur',
        'libraryTarget': 'umd'
    },
};