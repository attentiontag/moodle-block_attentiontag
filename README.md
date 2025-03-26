- Name: AttentionTag
- Plugin Type: block
- Entry link: https://github.com/attentiontag/moodle-block_attentiontag
- Issue tracker: https://github.com/attentiontag/moodle-block_attentiontag/issues
- Moodle doc Link: https://docs.moodle.org/405/en/index.php?title=AttentionTag&action=edit
- Maintainer: team@attentiontag.com

Summary:
AttentionTag is an AI assistant that helps in students’ learning process by helping them retain their focus on the study material with the help of various triggers.

How to install:
- Clone the AttentionTag plugin repo from https://github.com/attentiontag/moodle-block_attentiontag
- Create a zip file and upload it to your Moodle instance
- After successful installation, there should be a folder named attentiontag inside moodle/blocks
- Run npm install to install all the necessary dependencies
- Run npm install @attention_tag/attentiontag inside /attentiontag directory to install our SDK.
- Run npm run build

-----CONTACT team@attentiontag.com for the following steps-----
- You will be provided with a Client ID, Client Secret and a Project ID which is needed to communicate with our backend server. Mention these credentials in the settings page of AttentionTag. 
 Site Administration > Plugins > Blocks > Manage Blocks > AttentionTag > settings

- Visit https://app.attentiontag.com and create an account with your organization.
- Go to the Assistants Tab, and configure the settings for alerting learners with Visual Prompts or Auditory Cues (currently only these 2 are supported).
- In your Moodle instance, add the AttentionTag block to any course_module page using the Edit Mode on top right.
- The plugin is ready to be used.


How it works:
- When the AttentionTag plugin is enabled on a course_module page and the logged in user is a “student” of this course_module, it captures the webcam feed and runs various ML models to generate inferences and tags. These are then used to compute different mental attributes such as concentration levels, sleepiness, effective focus etc. These levels are then compared with the thresholds defined in the Assistants tab and Visual Prompts/Auditory Cues are triggered corresponding to the results.
- The Visual Prompt pops up the image uploaded in the Assistants tab on the bottom left while the Auditory Cue plays an audio both of which can be closed by the user.
- These triggers are reset every 15 minutes.
- We also provide our DART icon at the bottom right which when given the required permission, resembles the average emotion of the learner (every 30 seconds) with various emotion emojis like Happy, Sad, Fear, Anger and so on.







