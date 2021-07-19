/*
  Module dependencies
 */
  import express from 'express';
  import bodyParser from 'body-parser';
  import methodOverride from 'method-override';
  import cors from 'cors';
  import path from 'path';
  
  import * as pathUtils from './common/path-utils';
  import * as config from '../config/config';
  import { initDB } from './db/seeders';
  
  const API_BASE_PATH = config.API_BASE_PATH;
  const app = express();
  
  /**
   * Initialize express application
   *
   * @method init
   * @returns {Object} express user.app object
   */
  function init() {
    initMiddleware();
    initDatabaseConfig();
    initCrossDomain();
    initApiRoutes();
  
    return app;
  }
  
  /**
   * Initialize application middleware.
   *
   * @returns {undefined}
   * @method initMiddleware
   */
  let initMiddleware = () => {
    app.set('showStackError', true);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
      extended: true,
    }));
    app.use(methodOverride());
    app.use(cors());
    app.use(express.static(`${config.rootDir}/public`));
  };
  
  /**
   * Initialize Database setup config
   *
   * @returns {undefined}
   * @method initDatabaseConfig
   */
  let initDatabaseConfig = () => {
    initDB();
  };
  
  /**
   *Configure CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests.
   *
   * @returns {undefined}
   * @method initCrossDomain
   */
  let initCrossDomain = () => {
    // setup CORS
    app.use(cors());
    app.use((req, res, next) => {
      // Website you wish to allow to connect
      res.set('Access-Control-Allow-Origin', '*');
      // Request methods you wish to allow
      res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
      // Request headers you wish to allow
      res.set('Access-Control-Allow-Headers', 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token');
  
      // Pass to next layer of middleware
      next();
    });
  };
  
  /**
   * Configure API routes
   *
   * @method initApiRoutes
   * @returns {undefined}
   */
  let initApiRoutes = () => {
    // Globbing routing files
    const ROUTES_PATH = './modules/**/routes.js';
  
    pathUtils.getGlobbedPaths(path.join(__dirname, ROUTES_PATH)).forEach((routePath) => {
      require(path.resolve(routePath))(app);
    });
  };
  
  export default init;
  