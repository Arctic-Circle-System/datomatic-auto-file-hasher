# DAT-o-MATIC Auto File Hasher
Tampermonkey userscript that auto-hashes and auto-inputs the Size, CRC32, MD5, SHA-1, and SHA-256 fields when you drag and drop a file onto the file hash pages on No-Intro's DAT-o-MATIC. This script minimizes user error when datting.

To Use:
1. Install the [Tampermonkey](https://www.tampermonkey.net/) extension.
2. [Download](https://github.com/rarenight/datomatic-auto-file-hasher/raw/main/dom-hasher.js) this script to your hard drive (right click + save file).
3. Open Tampermonkey's Dashboard, drag the script file into it, and press "Install."
4. When datting on DAT-o-MATIC in the Submit File or Edit File page, drag and drop the file onto the page.
6. Wait for the hashes to auto-populate on-screen in the first set of fields (e.g. Decrypted).  **This takes a while for large files. I am not responsible for Out of Memory crashes.**
7. If you drag a second file onto the screen, hashes will auto-populate on-screen in the second set of fields (e.g. Encrypted). Repeat if there are extra fields on-screen or refresh thr page to reset.
