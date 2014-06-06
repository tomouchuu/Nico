# Nico

## A website to download NND Videos and MP3s

Similar to how NicoSound / NicoMimi used to work but focusing more on ease of use and a nicer interface which this current version doesn't have. At the moment you type in the sm code of a video and then get a link which you then 'right click, save as...' to download. The mp3 is 128k and has no metadata at the moment and there is no way for users to download the video yet. Anyway...

### Install

1. Grab [NodeJS](http://nodejs.org/) & [FFmpeg](http://www.ffmpeg.org/).
2. Next clone this repo to a folder somewhere on your machine.
3. Run `npm install && bower install` to get the dependencies.
4. Edit `/lib/controllers/api.js` to contain your NND Email & Password.
5. Lastly you should be able to run `grunt serve` to set up a webserver with livereload and such to work in. `grunt` will build the site and stick it in `/dist`

### Roadmap

- Ability to download the video too, it does it anyway just making the `/videos` path available
- Progress bars for downloading / conversions etc.
- Info on the video when entering the sm code. Maybe as a while you wait thing, or just before you click download or something.
- Queuing System, if this goes live then I'll probably need to get another NND account and set it up with premium but it can only do so many at a time I belive so a queuing system will have to be implemented to stop stuff failing everywhere.
- Improve ease of use / design
