# Javatari modifications

Javatari 0.91, Copyright 2015 Paulo Augusto Peccin, is included under AGPL-3.0. Its complete supplied source is in `javatari-original-source.zip`; the license is in `LICENSE-javatari.txt`.

The release bundle has two loader changes: `XMLHttpRequest.withCredentials` is false for public Wix CORS requests, and the network timeout is increased from 2 to 20 seconds for classroom networks. No game bytes or disassembly exports are bundled.

The separate player wrapper configures manual startup, disables cartridge changes, controls pause/reset through the console API, resizes the screen and visible console panel together, and displays loading errors. The wrapper and lesson source are included in this folder.


## AI class adaptation
Preserved the original lesson and modern examples, adding a six-question bilingual reflection page about students' AI game-making process, quality, consumer protection, spending, and market predictions. Ocarina opens the reflection; atari5600 unlocks all pages. Separate browser storage. Students download their answers as a PDF and manually upload it to Google Classroom; the AI lesson does not send answers to Google Sheets. See AI-CLASS-QUICKSTART.md.
