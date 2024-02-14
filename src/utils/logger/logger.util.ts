import { createLogger, format, transports } from "winston";
// import 'winston-mongodb';

interface TransformableInfo {
  level: string;
  message: string;
  [key: string | symbol]: string;
}

const logConfiguration = {
  transports: [
    new transports.Console(),
    // new transports.MongoDB({
    //     level: 'error',
    //     db: 'mongodb+srv://roper:nzFYKDY15cA9y6Wj@rope101cluster.ioxtox5.mongodb.net/Logger?retryWrites=true&w=majority',
    //     options: {
    //         useUnifiedTopology: true,
    //     },
    //     // A collection to save json formatted logs
    //     collection: 'logs',
    //     format: format.combine(
    //         format.timestamp(),
    //         // Convert logs to a json format
    //         format.json()
    //     ),
    // }),
  ],
  format: format.combine(
    format.label({
      label: `Label🏷️`,
    }),
    format.timestamp({
      format: "MMM-DD-YYYY HH:mm:ss",
    }),
    format.printf(
      (info: TransformableInfo) =>
        `${info.level}: ${info.label}: ${info.timestamp}: ${info.message}`
    )
  ),
};

export const logger = createLogger(logConfiguration);
