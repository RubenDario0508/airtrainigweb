const { Client } = require('ssh2');

const conn = new Client();

const execCommand = (cmd) => {
  return new Promise((resolve, reject) => {
    conn.exec(cmd, (err, stream) => {
      if (err) return reject(err);
      let out = '';
      stream.on('close', (code, signal) => {
        resolve({ out, code });
      }).on('data', (data) => {
        out += data;
        process.stdout.write(data);
      }).stderr.on('data', (data) => {
        out += data;
        process.stderr.write(data);
      });
    });
  });
};

conn.on('ready', async () => {
  console.log('Client :: ready');
  try {
    // Check whoami
    let res = await execCommand('whoami');
    console.log('whoami:', res.out.trim());

    // Check if hestia is available
    res = await execCommand('ls -la /usr/local/hestia/bin/v-add-domain');
    console.log('v-add-domain:', res.out.trim());

  } catch(e) {
    console.error(e);
  }
  conn.end();
}).connect({
  host: '2.24.106.31',
  port: 22,
  username: 'root',
  password: 'Ati2027-1',
  readyTimeout: 20000
});
