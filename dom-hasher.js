// ==UserScript==
// @name         DAT-o-MATIC Auto File Hasher
// @namespace    http://tampermonkey.net/
// @author       rarenight
// @version      1.0
// @description  Auto-calculates and auto-hashes the Size, CRC32, MD5, SHA-1, and SHA-256 fields when you drag and drop a file onto the Submit File page in No-Intro's DAT-o-MATIC
// @match        https://datomatic.no-intro.org/*
// @grant        none
// @require      https://cdn.jsdelivr.net/npm/hash-wasm@4/dist/md5.umd.min.js
// @require      https://cdn.jsdelivr.net/npm/hash-wasm@4/dist/crc32.umd.min.js
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

      async function createHash(algorithm, buffer) {
        const hashBuffer = await crypto.subtle.digest(algorithm, buffer);
        return Array.from(new Uint8Array(hashBuffer)).map((b) => b.toString(16).padStart(2, '0')).join('');
      }

      const files = event.dataTransfer.files;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!(file instanceof File)) {
          console.error('Not a file:', file);
          continue;
        }

        const buffer = await file.arrayBuffer();

        setFormValue(`input[name="f[${currentFormIndex}][file_size]"]`, file.size);

        const crc32 = await hashwasm.crc32(new Uint8Array(buffer));
        setFormValue(`input[name="f[${currentFormIndex}][file_crc32]"]`, crc32);

        const md5 = await hashwasm.md5(new Uint8Array(buffer));
        setFormValue(`input[name="f[${currentFormIndex}][file_md5]"]`, md5);

        const sha1 = await createHash('SHA-1', buffer);
        setFormValue(`input[name="f[${currentFormIndex}][file_sha1]"]`, sha1);

        const sha256 = await createHash('SHA-256', buffer);
        setFormValue(`input[name="f[${currentFormIndex}][file_sha256]"]`, sha256);

        // Toggle between 0 and 1 for the next file
        currentFormIndex = 1 - currentFormIndex;
      }
    };

    window.ondragover = (event) => {
      event.preventDefault();
    };
})();
