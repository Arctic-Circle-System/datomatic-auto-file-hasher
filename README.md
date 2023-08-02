# DAT-o-MATIC Auto File Hasher
JavaScript intended as a Tampermonkey script for Chromium browsers that auto-calculates and auto-hashes Size, CRC32, MD5, SHA-1, and SHA-256 hashes when you drag and drop a file into the File Submit page on No-Intro's DAT-o-MATIC.

To-Use:
1. Install [Tampermonkey](https://www.tampermonkey.net/).
2. [Download](https://github.com/rarenight/datomatic-auto-file-hasher/raw/main/dom-hasher.js) this script to your hard drive.
3. Open Tampermonkey's [Dashboard](chrome-extension://dhdgffkkebhmkfjojejmpbldmpobfkfo/options.html#nav=dashboard) and drag the script file into it and press "Install."
4. When you add an entry in DAT-o-MATIC and you click the "Add File" button, you are brought to the File Submit page.
5. When in the File Submit page, drag and drop the file you want to hash.
6. Wait for the hashes to auto-populate. This may take a while for large files. **I am not responsible for Out of Memory crashes.**

To-Do: Add functionality for the second set of hashes on a webpage
