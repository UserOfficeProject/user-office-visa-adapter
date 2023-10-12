import net from 'net';

import ssh2 from 'ssh2';

const connectWithVisa: () => Promise<boolean> = () => {
  console.log('----connect with visa----');

  return new Promise((resolve, reject) => {
    let ready = false;

    const sshClient1 = new ssh2.Client();
    const sshClient2 = new ssh2.Client();

    sshClient1
      .on('ready', () => {
        sshClient1.forwardOut(
          '127.0.0.1',
          12345,
          process.env.VISA_HOST ?? '',
          22,
          (err, stream) => {
            if (err) {
              return sshClient1.end();
            }
            sshClient2.connect({
              sock: stream,
              username: process.env.VISA_SERVER_USERNAME,
              password: process.env.VISA_SERVER_PASSWORD,
            });
          }
        );
      })
      .connect({
        host: process.env.ESSS_HOST,
        username: process.env.ESSS_USERNAME,
        password: process.env.ESSS_PASSWORD,
      });

    const proxy = net.createServer(function (sock) {
      if (!ready) return sock.destroy();
      if (!sock.remoteAddress || !sock.remotePort) return sock.destroy();

      sshClient2.forwardOut(
        sock.remoteAddress,
        sock.remotePort,
        process.env.VISA_DB_HOST ?? '',
        process.env.VISA_DB_PORT ? +process.env.VISA_DB_PORT : 5432,
        function (err, stream) {
          if (err) {
            return sock.destroy();
          }
          sock.pipe(stream);
          stream.pipe(sock);
        }
      );
    });
    proxy.listen(9091, '127.0.0.1');

    sshClient2.on('ready', () => {
      ready = true;

      resolve(true);
    });
  });
};

export default connectWithVisa;
