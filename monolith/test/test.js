process.env.NODE_ENV = "test";
const db = require("../database/db");
var chai = require("chai");
var chaiHttp = require("chai-http");
var expect = chai.expect;
let should = require("chai").should();
var passportStub = require("passport-stub");
var User = require("../database/Schema/userSchema");
var app = require("../app");
chai.use(chaiHttp);
passportStub.install(app);

describe("Tests", done => {
  beforeEach(() => {
    db.setUPConnection();
  });

  describe("user data test", () => {
    describe("without user", () => {
      it("it should send 401 error", done => {
        chai
          .request(app)
          .get("/user")
          .redirects(0)
          .end((err, res) => {
            res.should.have.status(401);
            done();
          });
      });
    });

    describe("with user", () => {
      it("it should display user info", done => {
        User.findById("117830126358750470945", (err, user) => {
          passportStub.login(user);
          chai
            .request(app)
            .get("/user")
            .redirects(0)
            .end((err, res) => {
              expect(res.text).to.match(/117830126358750470945/);
              done();
            });
        });
      });
    });
  });

  describe("files test", function() {
    it("create file", done => {
      User.findById("117830126358750470945", (err, user) => {
        passportStub.login(user);
        chai
          .request(app)
          .post("/file/test")
          .redirects(0)
          .end((err, res) => {
            expect(res.text).to.match(/[a-fA-F0-9]{32}/);
            done();
          });
      });
    });

    it("delete file (run after create)", function(done) {
      User.findById("117830126358750470945", (err, user) => {
        passportStub.login(user);
        chai
          .request(app)
          .delete("/file/2fc86a7835550bd0c1833c30f0225111")
          .redirects(0)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });
  });


  describe("link test", function() {
    let file = null;
    it("create link", done => {
      User.findById("117830126358750470945", (err, user) => {
        passportStub.login(user);
        chai
          .request(app)
          .get("/link/"+user.ownFiles[0].nameHash)
          .redirects(0)
          .end((err, res) => {
            res.text.should.have.property('link');
            done();
          });
      });
    });

    it("delete link (run after create)", function(done) {
      User.findById("117830126358750470945", (err, user) => {
        passportStub.login(user);
        chai
          .request(app)
          .delete("/link/"+user.ownFiles[0].nameHash)
          .redirects(0)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });
  });

});
