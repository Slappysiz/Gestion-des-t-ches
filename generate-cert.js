// generate-cert.js
import fs from 'fs';
import path from 'path';
import selfsigned from 'selfsigned';

// Attributs du certificat — on le fait pour localhost
const attrs = [{ name: 'commonName', value: 'localhost' }];

// Génère un certificat valable 1 an
const pems = selfsigned.generate(attrs, { days: 365 });

// Crée le dossier certs s’il n’existe pas
const certDir = path.join(process.cwd(), 'certs');
if (!fs.existsSync(certDir)) {
  fs.mkdirSync(certDir);
}

// Sauve la clé privée et le certificat
fs.writeFileSync(path.join(certDir, 'key.pem'),  pems.private,  { mode: 0o600 });
fs.writeFileSync(path.join(certDir, 'cert.pem'), pems.cert,     { mode: 0o644 });

console.log('✅ Certificats générés dans ./certs');
