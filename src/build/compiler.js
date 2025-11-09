var del = require('delete');
var mkdirp = require('mkdirp');
var copy = require('copy');
var fs = require('fs');
var xmldom = require('xmldom').DOMParser;
var archiver = require('archiver');
var browserSync = require('browser-sync').create();

var jsonPATH = './src/map.json';
var xml = "";
var pasta = "dist";
var titulo = "Titulo para o manifesto.xml";
var padrao = "scorm1.2";
var scormData = {};

fs.readFile(jsonPATH, "utf-8", function (err, data) {

  const dataBase = JSON.parse(data);
  scormData = dataBase.scorm;

  titulo = scormData.organizationTitle;

  //
  initXML();
  initCompiler();

});


function initXML() {
    xml += '<?xml version="1.0" encoding="UTF-8"?>';
    xml += '<manifest xmlns="http://www.imsproject.org/xsd/imscp_rootv1p1p2" xmlns:imsmd="http://www.imsglobal.org/xsd/imsmd_rootv1p2p1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:adlcp="http://www.adlnet.org/xsd/adlcp_rootv1p2" identifier="MANIFEST01" xsi:schemaLocation="http://www.imsproject.org/xsd/imscp_rootv1p1p2 imscp_rootv1p1p2.xsd http://www.imsglobal.org/xsd/imsmd_rootv1p2p1 imsmd_rootv1p2p1.xsd http://www.adlnet.org/xsd/adlcp_rootv1p2 adlcp_rootv1p2.xsd">';
    xml += '<metadata>';
    xml += '<schema>ADL SCORM</schema>';
    xml += '<schemaversion>1.2</schemaversion>';
    //xml += '<adlcp:location>imsmetadata.xml</adlcp:location>';
    xml += '</metadata>';
    xml += '<organizations default="AE_01">';
    xml += '<organization identifier="AE_01" structure="hierarchical">';


    xml += "<title>" + scormData.organizationTitle + "</title>";

    var itens = "";
    var resources = "";
    var infoXML = {
        "item": {
            titulo: "#"
        }
    };

    Object.keys(infoXML.item).forEach(function (e, i) {
        var count = i < 10 ? '0' + i : i;

        itens += '<item identifier="ITEM_' + count + '" identifierref="RES_' + count + '" isvisible="true">';
        itens += "<title>" + scormData.itemTitle + "</title>";
        itens += '</item>';

        resources += '<resource identifier="RES_' + count + '" type="webcontent" adlcp:scormtype="sco" href="index.html" />';
    });

    xml += itens;
    xml += '</organization>';
    xml += '</organizations>';
    xml += '<resources>';
    xml += resources;
    xml += '</resources>';
    xml += '</manifest>';
}


function initCompiler() {
  var pathA = "src/build/content/";
  var imsmanifestPath = pasta + "/imsmanifest.xml";

  var pathAssets = {
    init: "src/assets/**",
    end: pasta + "/src/assets",
  };

  var pathViews = {
    init: "src/views/**",
    end: pasta + "/src/views",
  };

  var filesFlatten = [
    pathA + "index.html",
    pathA + "adlcp_rootv1p2.xsd",
    pathA + "ims_xml.xsd",
    pathA + "imscp_rootv1p1p2.xsd",
    pathA + "index.html",
  ];

  var filesNOFlatten = [
    "favicon.ico",

    "src/map.json",
    "src/structure/index.html",

    "src/views/*",

    "src/css/style.min.css",

    "src/scripts/script.min.js",
    "src/scripts/frameworks/require.min.js",
  ];

  // async
  del([pasta], function (err) {
    if (err) throw err;
    createDirp();
  });

  function createDirp() {
    mkdirp(pasta, function (err) {
      if (err) throw err;
      else copyFiles();
    });
  }

  function copyFiles() {
    copy.each(
      filesFlatten,
      pasta,
      {
        flatten: true,
      },
      function (err, files) {
        copy.each(
          filesNOFlatten,
          pasta,
          {
            flatten: false,
          },
          function (err, files) {
            copy(
              pathAssets.init,
              pathAssets.end,
              {
                expand: false,
              },
              function (err, files) {
                //   /* VIEWS */
                copy(
                  pathViews.init,
                  pathViews.end,
                  {
                    expand: false,
                  },
                  function (err, files) {
                    console.log("complete");

                    createMANIFESTO();
                  }
                );
              }
            );
          }
        );
      }
    );
  }

  function createMANIFESTO() {
    fs.writeFile(imsmanifestPath, xml, function (err) {
      if (err) return console.log(err);

      createZIP();
      loaderServer();
    });
  }

  function createZIP() {
    // create a file to stream archive data to.
    var output = fs.createWriteStream(`${pasta}/${pasta}.zip`);
    var archive = archiver("zip", {
      store: false, // Sets the compression method to STORE.
    });

    // listen for all archive data to be written
    output.on("close", function () {
      console.log(archive.pointer() + " total bytes");
      //console.log('archiver has been finalized and the output file descriptor has closed.');
    });

    // good practice to catch this error explicitly
    archive.on("error", function (err) {
      throw err;
    });

    // pipe archive data to the file
    archive.pipe(output);
    // append files from a directory
    archive.directory(pasta, false);
    archive.finalize();

    console.log("compilamento completo.");
  }

  function loaderServer() {
    var path = pasta + "/";

    browserSync.init({
      server: {
        baseDir: path,
      },
    });

    browserSync.stream({
      match: "**/*.css",
    });
  }
}
