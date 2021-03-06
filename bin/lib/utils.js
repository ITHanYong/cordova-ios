/*
    Licensed to the Apache Software Foundation (ASF) under one
    or more contributor license agreements. See the NOTICE file
    distributed with this work for additional information
    regarding copyright ownership. The ASF licenses this file
    to you under the Apache License, Version 2.0 (the
    "License"); you may not use this file except in compliance
    with the License. You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing,
    software distributed under the License is distributed on an
    "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, either express or implied. See the License for the
    specific language governing permissions and limitations
    under the License.
*/

/*
    Provides a set of utility methods, which can also be spied on during unit tests.
*/

// TODO: Perhaps this should live in cordova-common?

const fs = require('fs-extra');
const { events } = require('cordova-common');

/**
 * Reads, searches, and replaces the found occurences with replacementString and then writes the file back out.
 * A backup is not made.
 *
 * @param {string} file A file path to a readable & writable file
 * @param {RegExp} searchRegex The search regex
 * @param {string} replacementString The string to replace the found occurences
 * @returns {void}
 */
exports.replaceFileContents = function (file, searchRegex, replacementString) {
    let contents;
    try {
        contents = fs.readFileSync(file).toString();
    } catch (ex) {
        events.emit('verbose', `Trying to read file: ${file}`);
        throw ex;
    }
    contents = contents.replace(searchRegex, replacementString);
    fs.writeFileSync(file, contents);
};

/**
 * Reads a file and scans for regex. Returns the line of the first occurence or null if no occurences are found.
 *
 * @param {string} file A file path
 * @param {RegExp} regex A search regex
 * @returns string|null
 */
exports.grep = function (file, regex) {
    const contents = fs.readFileSync(file).toString().replace(/\\r/g, '').split('\n');
    for (let i = 0; i < contents.length; i++) {
        const line = contents[i];
        if (regex.test(line)) {
            return line;
        }
    }
    return null;
};
