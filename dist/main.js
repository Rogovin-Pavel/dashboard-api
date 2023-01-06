"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const logger_service_1 = require("./logger/logger.service");
const bootstrap = () => {
    const logger = new logger_service_1.LoggerService();
    const app = new app_1.App(logger);
    app.init();
};
bootstrap();
