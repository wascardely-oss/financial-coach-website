#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Crear el archivo prerender-manifest.json si no existe
const manifestPath = path.join(__dirname, '../.next/prerender-manifest.json');
const manifest = {
  version: 3,
  routes: {},
  dynamicRoutes: {},
  notFoundRoutes: [],
  preview: {
    previewModeId: '',
    previewModeSigningKey: '',
    previewModeEncryptionKey: ''
  }
};

try {
  if (!fs.existsSync(manifestPath)) {
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
    console.log('✓ prerender-manifest.json creado exitosamente');
  } else {
    console.log('✓ prerender-manifest.json ya existe');
  }
} catch (error) {
  console.error('Error al crear prerender-manifest.json:', error);
  process.exit(1);
}
