# DAT-o-MATIC Auto File Hasher
Tampermonkey script for Chromium browsers written in JavaScript that auto-calculates and auto-hashes Size, CRC32, MD5, SHA-1, and SHA-256 hashes when you drag and drop a file into the File Submit page on No-Intro's DAT-o-MATIC. This script minimizes user error when datting.

To-Use:
1. Install [Tampermonkey](https://www.tampermonkey.net/).
2. [Download](https://github.com/rarenight/datomatic-auto-file-hasher/raw/main/dom-hasher.js) this script to your hard drive (right click + save file).
3. Open Tampermonkey's Dashboard, drag the script file into it, and press "Install."
4. Now, in the File Submit / Add File page when datting, drag and drop the file you want to hash into the page.
5. Wait for the hashes to auto-populate on-screen. This may take a while for large files. **I am not responsible for Out of Memory crashes.**

To-Do:
Add functionality for the second set of hashes on the File Submit page.
