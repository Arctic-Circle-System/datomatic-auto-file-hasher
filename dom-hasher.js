// ==UserScript==
// @name         DAT-o-MATIC Auto File Hasher
// @namespace    http://tampermonkey.net/
// @author       rarenight
// @version      1.0
// @description  Auto-hashes and auto-inputs the Size, CRC32, MD5, SHA-1, and SHA-256 fields when you drag and drop a file onto the Submit File page in No-Intro's DAT-o-MATIC
// @match        https://datomatic.no-intro.org/*
// @grant        none
// @require      https://cdn.jsdelivr.net/npm/hash-wasm@4/dist/crc32.umd.min.js
// @require      https://cdn.jsdelivr.net/npm/hash-wasm@4/dist/md5.umd.min.js
// @require      https://cdn.jsdelivr.net/npm/hash-wasm@4/dist/sha1.umd.min.js
// @require      https://cdn.jsdelivr.net/npm/hash-wasm@4/dist/sha256.umd.min.js
// ==/UserScript==
/* globals hashwasm */

(function() {
    'use strict';

    let currentFormIndex = 0;

    const supported = (() => {
      try {
        if (typeof WebAssembly === 'object'
            && typeof WebAssembly.instantiate === 'function') {
          const module = new WebAssembly.Module(Uint8Array.of(0x0, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00));
          if (module instanceof WebAssembly.Module)
            return new WebAssembly.Instance(module) instanceof WebAssembly.Instance;
        }
      } catch (e) {
      }
      return false;
    })();

    console.log(supported ? 'WebAssembly is supported' : 'WebAssembly is not supported');

    window.ondrop = async (event) => {
      event.preventDefault();

      function setFormValue(fieldName, value) {
        const fieldElement = document.querySelector(fieldName);
        if (fieldElement) {
          fieldElement.value = value;
        }
      }

      async function createHash(hashFunc, file) {
        const hasher = await hashFunc();
        hasher.init();
        const reader = file.stream().getReader();
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            break;
          }
          hasher.update(new Uint8Array(value));
        }
        const hash = hasher.digest('hex');
        return hash;
      }

      const files = event.dataTransfer.files;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!(file instanceof File)) {
          alert("Not a file:", file);
          continue;
        }

        setFormValue(`input[name="f[${currentFormIndex}][file_size]"]`, "Calculating...");
        setFormValue(`input[name="f[${currentFormIndex}][file_crc32]"]`, "Calculating...");
        setFormValue(`input[name="f[${currentFormIndex}][file_md5]"]`, "Calculating...");
        setFormValue(`input[name="f[${currentFormIndex}][file_sha1]"]`, "Calculating...");
        setFormValue(`input[name="f[${currentFormIndex}][file_sha256]"]`, "Calculating...");

        setFormValue(`input[name="f[${currentFormIndex}][file_size]"]`, file.size);

        const crc32 = await createHash(hashwasm.createCRC32, file);
        setFormValue(`input[name="f[${currentFormIndex}][file_crc32]"]`, crc32);

        const md5 = await createHash(hashwasm.createMD5, file);
        setFormValue(`input[name="f[${currentFormIndex}][file_md5]"]`, md5);

        const sha1 = await createHash(hashwasm.createSHA1, file);
        setFormValue(`input[name="f[${currentFormIndex}][file_sha1]"]`, sha1);

        const sha256 = await createHash(hashwasm.createSHA256, file);
        setFormValue(`input[name="f[${currentFormIndex}][file_sha256]"]`, sha256);

        currentFormIndex = 1 - currentFormIndex;
      }
    };

    window.ondragover = (event) => {
      event.preventDefault();
    };
})();
