// biblioteca file stream
import fs from 'node:fs'
//biblioteca de rutas
import path from 'node:path'
import { fileURLToPath } from 'node:url';
//creando las variables 
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
/**Helper para handlebars que genera las etiquestas de Vite. 
 * EN DESARROLLO: conecta al servidor de desarrollo de vite.
 * EN PRODUCCION: Usa los compilados de vite.
 */
export function viteAssets() {
//obtener modo ejecucion

const isDev = process.env.NODE_ENV !== 'production';
//rescatando la url del servidor de desarrollo 

const viteDevServer = process.env.VITE_DEV_SERVER || 'http://localhost:5173';
//si estanos en modo de desarrollo
if (isDev) {
 // En desarrollo cargamos los archivos del front-end directamente desde el servidor de Vite.

 return ` <script type="module" src="${viteDevServer}/@vite/client"></script>
 <script type="module" src="${viteDevServer}/main.js"></script> `
}
//En produccion leemos el manifest
// y generamois las etiquetas finales de prodcuccion

const manifestPath = path.join(__dirname, '..','..', 'dist','vite', 'manifest.json');
// si no existe
if (!fs.existsSync(manifestPath)) {
 console.warn("Vite manifest not fun . Run'npm run  build' ");
 return '';
}
}