# DAT-o-MATIC Auto File Hasher
Tampermonkey userscript for Chromium browsers written in JavaScript that auto-calculates and auto-hashes the Size, CRC32, MD5, SHA-1, and SHA-256 fields when you drag and drop a file into the Submit File page on No-Intro's DAT-o-MATIC. This script minimizes user error when datting. Core hashing logic courtesy of [SpraxDev](https://github.com/SpraxDev/no-intro-dir2dat).

To-Use:
1. Install [Tampermonkey](https://www.tampermonkey.net/).
2. [Download](https://github.com/rarenight/datomatic-auto-file-hasher/raw/main/dom-hasher.js) this script to your hard drive (right click + save file).
3. Open Tampermonkey's Dashboard, drag the script file into it, and press "Install."
4. When datting on DAT-o-MATIC in the Submit File page, drag and drop the file onto the page. **This script is not compatible with files that are more than 2 GB in size (code hangs).**
6. Wait for the hashes to auto-populate on-screen in the first set of fields (e.g. Decrypted). 
7. If you drag a second file onto the screen, hashes will auto-populate on-screen in the second set of fields (e.g. Encrypted).
