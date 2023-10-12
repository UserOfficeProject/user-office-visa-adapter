import net from 'net';

import ssh2 from 'ssh2';

const connectWithUserOffice: () => Promise<boolean> = () => {
  console.log('----connect with user office----');

  return new Promise((resolve, reject) => {
    let ready = false;
    const sshClient = new ssh2.Client();
    const userOfficeDBHost = process.env.USEROFFICE_DB_HOST;
    const userOfficeDBPort = process.env.USEROFFICE_DB_PORT
      ? +process.env.USEROFFICE_DB_PORT
      : null;

    const proxy = net.createServer(function (sock) {
      if (!ready) return sock.destroy();
      if (
        !sock.remoteAddress ||
        !sock.remotePort ||
        !userOfficeDBHost ||
        !userOfficeDBPort
      )
        return sock.destroy();

      sshClient.forwardOut(
        sock.remoteAddress,
        sock.remotePort,
        userOfficeDBHost,
        userOfficeDBPort,
        function (err, stream) {
          if (err) return sock.destroy();
          sock.pipe(stream);
          stream.pipe(sock);
        }
      );
    });

    proxy.listen(9090, '127.0.0.1');

    sshClient.connect({
      host: process.env.USEROFFICE_SERVER_HOST,
      port: process.env.USEROFFICE_SERVER_PORT
        ? +process.env.USEROFFICE_SERVER_PORT
        : undefined,
      username: process.env.USEROFFICE_SERVER_USERNAME,
      password: process.env.USEROFFICE_SERVER_PASSWORD,
    });

    sshClient.on('ready', function () {
      ready = true;
      resolve(true);
    });
  });
};

export default connectWithUserOffice;
