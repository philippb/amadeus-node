const env = process.env.BABEL_ENV || process.env.NODE_ENV || 'development';

if (env === 'esm') {
  // ESM build configuration
  module.exports = {
    presets: [
      ['@babel/preset-env', {
        modules: false, // Preserve ES modules
        targets: {
          node: '14' // Modern Node.js versions that support ESM
        }
      }]
    ],
    plugins: [
      // Custom plugin to add .js extensions to relative imports and fix package.json imports
      function() {
        return {
          visitor: {
            ImportDeclaration(path) {
              const source = path.node.source.value;
              
              // Skip package.json imports - they will need manual handling
              if (source.includes('package.json')) {
                // Skip transformation, will handle manually
                return;
              }
              
              // Only modify relative imports that don't already have .js extension
              if (source.startsWith('./') && !source.endsWith('.js')) {
                path.node.source.value = source + '.js';
              }
            },
            
            // Add named export after default export for ESM compatibility
            ExportDefaultDeclaration(path) {
              const t = require('@babel/types');
              const exportedIdentifier = path.node.declaration.name;
              
              if (exportedIdentifier === 'Amadeus') {
                // Add named export: export { Amadeus };
                const namedExport = t.exportNamedDeclaration(null, [
                  t.exportSpecifier(
                    t.identifier(exportedIdentifier),
                    t.identifier(exportedIdentifier)
                  )
                ]);
                path.insertAfter(namedExport);
              }
            }
          }
        };
      }
    ]
  };
} else {
  // Default CommonJS build configuration (existing)
  module.exports = {
    presets: ['@babel/preset-env'],
    plugins: ['add-module-exports']
  };
}