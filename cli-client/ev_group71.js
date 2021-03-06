#!/usr/bin/env node
const program = require("commander");

const { healthcheck } = require("./src/admin/healthcheck_c.js");
const { resetsessions } = require("./src/admin/resetsessions_c.js");
const { login } = require("./src/login_c.js");
const { logout } = require("./src/logout_c.js");
const { sessionsPerPoint } = require("./src/SessionsPerPoint_c.js");
const { sessionsPerStation } = require("./src/SessionsPerStation_c.js");
const { sessionsPerEV } = require("./src/SessionsPerEV_c.js");
const { sessionsPerProvider } = require("./src/SessionsPerProvider_c.js");
const { usermod } = require("./src/admin/usermod_c.js");
const { users } = require("./src/admin/users_c.js");
const { sessionsupd } = require("./src/admin/sessionsupd_c.js");
const { companies } = require("./src/companies_c.js");
const { findStation } = require("./src/findStation_c.js");

program.version("1.0.0").description("CLI");
//COMMANDS - SCOPE
//healthcheck
program
  .command("healthcheck")
  .alias("h")
  .description("Checks Database's health")
  .action(() => {
    healthcheck();
  });
//resetsessions
program
  .command("resetsessions")
  .alias("rs")
  .description("Resets all sessions")
  .action(() => {
    resetsessions();
  });
//login
program
  .command("login")
  .requiredOption("-u, --username <user>")
  .requiredOption("-p, --password <pass>")
  .alias("l")
  .description(
    "If logged in successfully \
returns token in file ${HOME}/softeng20bAPI.token"
  )
  .action((options) => {
    login(options.username, options.password)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  });

//logout
program
  .command("logout")
  .alias("o")
  .description(
    "If logged out successfully \
deletes file ${HOME}/softeng20bAPI.token"
  )
  .action(() => {
    logout();
  });

//SessionsPerPoint -spp
program
  .command("SessionsPerPoint")
  .requiredOption("-p, --point <point>")
  .requiredOption("-from, --datefrom <datefrom>")
  .requiredOption("-to, --dateto <dateto>")
  .requiredOption(
    "-f, --format <format>",
    "The format of the response.\
Can be json or csv. Default is json."
  )
  .alias("spp")
  .description(
    "Returns list with statistical analysis of charging \
sessions for a point during a time period which are given as parameters.\
in the URL."
  )
  .action((options) => {
    sessionsPerPoint(
      options.point,
      options.datefrom,
      options.dateto,
      options.format
    )
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  });

//SessionsPerStation -sps
program
  .command("SessionsPerStation")
  .requiredOption("-s, --station <station>")
  .requiredOption("-from, --datefrom <datefrom>")
  .requiredOption("-to, --dateto <dateto>")
  .requiredOption("-f, --format <format>")
  .alias("sps")
  .description(
    "Returns list with group of points of charging \
sessions for a station during a time period which are given as parameters \
in the URL. For every point the number of events and the amount of energy spent \
is returned"
  )
  .action((options) => {
    sessionsPerStation(
      options.station,
      options.datefrom,
      options.dateto,
      options.format
    )
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  });

//SessionsPerEV -spev
program
  .command("SessionsPerEV")
  .requiredOption("-ev, --ev <EV>")
  .requiredOption("-from, --datefrom <datefrom>")
  .requiredOption("-to, --dateto <dateto>")
  .requiredOption("-f, --format <format>")
  .alias("spev")
  .description(
    "Returns list with statistical analysis of charging \
sessions for an Electric Vehicle (EV) during a time period which are given as parameters\
in the URL."
  )
  .action((options) => {
    sessionsPerEV(options.ev, options.datefrom, options.dateto, options.format)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  });

//SessionsPerProvider -sppr
program
  .command("SessionsPerProvider")
  .requiredOption("-pr, --provider <provider>")
  .requiredOption("-from, --datefrom <datefrom>")
  .requiredOption("-to, --dateto <dateto>")
  .requiredOption("-f, --format <format>")
  .alias("sppr")
  .description(
    "Returns list with statistical analysis of charging \
sessions for an Electrical Energy Provider (Provider) during a time \
period which are given as parameters in the URL."
  )
  .action((options) => {
    sessionsPerProvider(
      options.provider,
      options.datefrom,
      options.dateto,
      options.format
    )
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  });

//findStation -fs
program
.command("findStation")
.requiredOption("-c, --city <city>", 'city to find nearby stations')
.alias("fs")
.description(
  "Returns list with stations nearby city, which is given as parameter"
)
.action((options) => {
  findStation(
    options.city
  )
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
});

//Companies -co
program
.command("companies")
.requiredOption("-m, --manufacturer <manufacturer>", 'car manufacturer for companies')
.requiredOption("-from, --datefrom <datefrom>")
.requiredOption("-to, --dateto <dateto>")
.alias("co")
.description(
  "Returns sessions of cars of one manufacturer, which is given as parameter"
)
.action((options) => {
  companies(
  options.manufacturer,
  options.datefrom,
  options.dateto
  )
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
});

//admin endpoints
program
  .command("Admin")
  .option("--usermod", "Create new user or change password of existing user")
  .option("--users", "Show User's state")
  .option("--username <username>", "User's username")
  .option("--passw <password>", "User's password")
  .option("-supd, --sessionsupd", "Add new sessions from csv file")
  .option("--source <file>", "Source file")
  .option("--healthcheck")
  .option("--resetsessions")
  .description("Administrative commands")
  .alias("admin")
  .action((options) => {
    if (options.usermod) {
      if (options.username === undefined || options.passw === undefined) {
        console.log(
          "Username(--username) and password(--passw) are required options for --usermod"
        );
      } else {
        usermod(options.username, options.passw);
      }
    } else if (options.users) {
      if (options.username === undefined) {
        console.log("Username(--username) is required option for --users");
      } else {
        users(options.username, options.passw);
      }
    } else if (options.sessionsupd) {
      if (options.source === undefined) {
        console.log("Source(--source) is required option for --sessionsupd");
      } else {
        sessionsupd(options.source);
        //console.log(`Username ${options.source}`)
      }
    } 
    else if (options.healthcheck) {
      healthcheck();
    } 
    else if (options.resetsessions) {
      resetsessions();
    }
  });
program.parse(process.argv);
