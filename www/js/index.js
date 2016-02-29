var app = angular.module("homeChef", []);

app.controller("formController", function($scope){
    $scope.collection = [];
    $scope.addEntry = function(){
        $scope.collection.push($scope.newData);
        $scope.newData = '';
    };
});

function alertFunction(){
    alert("Saved");
};

var FILENAME = 'database.txt',
                $ = function (id) {
                    return document.getElementById(id);
                },
                failCB = function (msg) {
                    return function () {
                        alert('[FAIL] ' + msg);
                    }
                },
                file = {
                    writer: { available: false },
                    reader: { available: false }
                },
                dbEntries = [];
            document.addEventListener('deviceready', function () {
                var fail = failCB('requestFileSystem');
                window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
            }, false);
            function gotFS(fs) {
                var fail = failCB('getFile');
                fs.root.getFile(FILENAME, {create: true, exclusive: false},
                                gotFileEntry, fail);
            }
            function gotFileEntry(fileEntry) {
                var fail = failCB('createWriter');
                file.entry = fileEntry;
                fileEntry.createWriter(gotFileWriter, fail);
                readText();
            }
            function gotFileWriter(fileWriter) {
                file.writer.available = true;
                file.writer.object = fileWriter;
            }
            function saveText(e) {
                var name = $('name').value,
                    content = $('content').value,
                    notes = $('notes').value,
                    fail;
//                dbEntries.push('<dt>' + name + '</dt><dd>' + content + '</dd>' + '<dd>' + notes + '</dd>')
                $('name').value = '';
                $('content').value = '';
                $('notes').value = '';
                $('definitions').innerHTML = dbEntries.join('');
                if (file.writer.available) {
                    file.writer.available = false;
                    file.writer.object.onwriteend = function (evt) {
                        file.writer.available = true;
                        file.writer.object.seek(0);
                    }
                    file.writer.object.write(dbEntries.join("\n"));
                }
                return false;
            }
            function readText() {
                if (file.entry) {
                    file.entry.file(function (dbFile) {
                        var reader = new FileReader();
                        reader.onloadend = function (evt) {
                            var textArray = evt.target.result.split("\n");
                            dbEntries = textArray.concat(dbEntries);
                            $('definitions').innerHTML = dbEntries.join('');
                        }
                        reader.readAsText(dbFile);
                    }, failCB("FileReader"));
                }
                return false;
            }
