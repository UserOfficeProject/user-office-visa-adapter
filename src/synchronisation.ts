import net from 'net';

import knex, { Knex } from 'knex';
import ssh2 from 'ssh2';

export const connectWithUserOffice = (callback: (connection: Knex) => void) => {
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

    const conString = `postgres://${process.env.VISA_DB_USERNAME}:${
      process.env.VISA_DB_PASSWORD
    }@127.0.0.1:${9091}/${process.env.VISA_DB_NAME}`;

    const connection = knex({
      client: 'pg',
      connection: conString,
    });
    connection.client
      .acquireConnection()
      .then(() => {
        callback(connection);
        connection
          .select('*')
          .from('users')
          .then((users) => {
            sshClient1.destroy();
            sshClient2.destroy();
            proxy.close();
          });
      })
      .catch((err: any) => {
        console.error('Error acquiring connection:', err);
      });
  });
};

export const connectWithVisa = (callback: Knex) => {
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
    const conString = `postgres://${process.env.USEROFFICE_DB_USERNAME}:${
      process.env.USEROFFICE_DB_PASSWORD
    }@127.0.0.1:${9090}/${process.env.USEROFFICE_DB_NAME}`;

    const connection = knex({
      client: 'pg',
      connection: conString,
    });

    connection.client
      .acquireConnection()
      .then(() => {
        // callback(connection);
        // connection
        //   .select('*')
        //   .from('users')
        //   .then((users) => {
        //     sshClient.destroy();
        //     proxy.close();
        //   });
      })
      .catch((err: any) => {
        console.error('Error acquiring connection:', err);
      });
  });
};

export const synchronization = () => {
  connectWithUserOffice((connection) => {
    connection
      .select('*')
      .from('proposals as p')
      .join(
        'proposal_statuses as ps',
        'proposals.status_id',
        'proposal_statuses.proposal_status_id'
      )
      .whereIn('ps.name', ['ALLOCATED', 'SCHEDULING']);
  });
  // connectWithVisa((connection) => {
  //   connection
  //     .select('*')
  //     .from('users')
  //     .then((users) => {
  //     });
  // });
};
