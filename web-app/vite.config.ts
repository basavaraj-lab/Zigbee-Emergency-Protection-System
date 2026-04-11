import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { spawn } from 'child_process'
import path from 'path'
import fs from 'fs'

// https://vite.dev/config/
export default defineConfig({
  server: {
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin-allow-popups'
    }
  },
  plugins: [
    react(), 
    tailwindcss(),
    {
      name: 'cv-runner',
      configureServer(server) {
        // Register Email Endpoint
        server.middlewares.use('/api/register-email', (req, res) => {
          if (req.method === 'POST') {
            let body = '';
            req.on('data', chunk => {
              body += chunk.toString();
            });
            req.on('end', () => {
              try {
                const { email } = JSON.parse(body);
                if (email) {
                  const emailsFilePath = path.resolve(__dirname, '../cv-engine/registered_emails.json');
                  let emails: string[] = [];
                  if (fs.existsSync(emailsFilePath)) {
                    emails = JSON.parse(fs.readFileSync(emailsFilePath, 'utf8'));
                  }
                  if (!emails.includes(email)) {
                    emails.push(email);
                    fs.writeFileSync(emailsFilePath, JSON.stringify(emails));
                  }
                }
                res.statusCode = 200;
                res.end(JSON.stringify({ status: 'ok' }));
              } catch (e) {
                res.statusCode = 500;
                res.end(JSON.stringify({ error: String(e) }));
              }
            });
          }
        });

        // Run CV Engine Endpoint
        server.middlewares.use('/api/run-cv', (req, res) => {
          // @ts-ignore: req is defined but not used here
          req;
          try {
            const cvEnginePath = path.resolve(__dirname, '../cv-engine/SentinelMesh_Pipeline.py')
            const pythonPath = 'python3' // Using python3 command
            
            const cvProcess = spawn(pythonPath, [cvEnginePath], {
              cwd: path.resolve(__dirname, '../cv-engine'),
              stdio: 'ignore', // Properly ignore inputs to allow background run
              detached: true // Detach to ensure OpenCV window is given a proper main thread context
            })
            cvProcess.unref() // Don't hold up Vite server
            
            res.statusCode = 200
            res.end(JSON.stringify({ status: 'started' }))
          } catch (e) {
            res.statusCode = 500
            res.end(JSON.stringify({ error: String(e) }))
          }
        })
      }
    }
  ],
})
