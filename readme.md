# Nico

## A website to download NND Videos and MP3s

Similar to how NicoSound / NicoMimi used to work but focusing more on ease of use and a nicer interface which this current version doesn't have. At the moment you type in the sm code of a video and then get a link which you then 'right click, save as...' to download. The mp3 is 128k and has no metadata at the moment and there is no way for users to download the video yet. Anyway...

### Install

1. Grab [NodeJS](http://nodejs.org/) & [FFmpeg](http://www.ffmpeg.org/).
2. Next clone this repo to a folder somewhere on your machine.
3. Run `npm install && bower install` to get the dependencies.
4. I made changes to the `nicovideo` npm package see: <https://gist.github.com/Tomo-san/0128d883f404d001568a> for changes. You can just overwrite the one that was downloaded with this one.
4. Edit `/lib/controllers/api.js` to contain your NND Email & Password.
5. Lastly you should be able to run `grunt serve` to set up a webserver with livereload and such to work in. `grunt` will build the site and stick it in `/dist`

### Roadmap

- Ability to download the video too, it does it anyway just making the `/videos` path available (DONE!)
- Info on the video when entering the sm code. Maybe as a while you wait thing, or just before you click download or something. (DONE!)
- If it already has the files it won't download them again. (DONE!)
- Fix issue with names being all messed up when downloading. (MAYBE DONE!)
- Progress bars for downloading / conversions etc.
- Queuing System, if this goes live then I'll probably need to get another NND account and set it up with premium but it can only do so many at a time I belive so a queuing system will have to be implemented to stop stuff failing everywhere.
- Other option is to maybe prompt for the users details when first viewing the site and use them in a session, option to use mine or the queue NND if prefered. Would need HTTPS definitely, wonder if I can show I can't see information.
- Improve ease of use / design
