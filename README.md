### Tom Chung Studio
A static portfolio site for Tom Chung Studio.

### Sync your project
Open the github app and sync both the `tomchung.github.io` and `tomchung.net` projects to make sure you have the latest version on you computer.

### Run the website locally
Open terminal.app and type the following two commands:

`cd ~/Documents/Website/tomchung.github.io-source`

`jekyll serve --skip-initial-build --watch`

Navigate to `localhost:4000` in your web browser. The website is now running locally.

### Creating a new project
Open the `_Posts` folder and duplicate and rename any of the markdown files to your liking. The date prepended to the filename dictates the order in which the projects appear on the website menu, and the name of the file dictates the URL. This new file represents the content of your new project.

Your file has the following fields you need to edit:

`title` - Defines the title of your project.

`year` - Defines the year the project was completed.

`layout` - Keep this as ‘Post’.

`tags` - This used to be typologies but is no longer used on the site.

`images` - Defines the source of the images. Place images in the `public/images` folder.

`size` - Specifies whether an image is displayed full width or two up. Can be defined as `full` or `half`. Half size images must occur two in a row and have the same pixel dimensions to render properly.

Once you’ve saved your file your changes will be live at `localhost:4000` in your web browser. Once you’re happy with your changes you’re ready to publish them.

### Publishing your changes
Once you’re finished making your changes it’s time to publish them. Open the Github app and note that you have changes to both the `tomchung.github.io` and `tomchung.net` projects. Type a ‘summary’ of the changes you’ve made and hit the ‘commit to master’ button.

Lastly hit the ‘sync’ button in the top right, your changes will now be live on http://tomchung.net.


