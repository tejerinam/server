export const config = {
    user: 'martin',
    password: 'martin',
    server: 'localhost',
    port: 1433,
    database: 'SistemaGastos',
    options: {
        encrypt: false, // Cambia a true si usas Azure
        trustServerCertificate: false //Cambia a true si usas un certificado autofirmado
    },  
  };