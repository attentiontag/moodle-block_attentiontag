# AttentionTag - Moodle Plugin

## Overview
**AttentionTag** is an AI-powered assistant designed to enhance students' learning experiences by helping them maintain focus on study materials. It employs various triggers, including **Visual Prompts** and **Auditory Cues**, to improve concentration and engagement.

## Plugin Information
- **Plugin Type:** Block
- **Repository:** [GitHub - AttentionTag Moodle Plugin](https://github.com/attentiontag/moodle-block_attentiontag)
- **Issue Tracker:** [Report Issues](https://github.com/attentiontag/moodle-block_attentiontag/issues)
- **Moodle Documentation:** [Moodle Docs](https://docs.moodle.org/405/en/index.php?title=AttentionTag&action=edit)
- **Maintainer:** [team@attentiontag.com](mailto:team@attentiontag.com)

## Subscriptions Required
   - Contact **team@attentiontag.com** to receive your **Client ID**, **Client Secret**, and **Project ID**.
   - These credentials are required for communication with the AttentionTag backend.
   - Your npm profile will also be added to the list of allowed users in the attention_tag organization so that you can download the SDK.
   - Visit [AttentionTag](https://app.attentiontag.com) and create your account in your respective organization.
   - Navigate to the **Assistants Tab** to configure **Visual Prompts** or **Auditory Cues**(more triggers comming soon).


## Installation
Follow these steps to install the AttentionTag plugin on your Moodle instance:

1. **Install the plugin**  
   Install the plugin directly from the Moodle Plugins directory or upload via ZIP file or install manually on the server
   For more detailed instructions, visit [Installing Plugins](https://docs.moodle.org/405/en/Installing_plugins#:~:text=Go%20to%20the%20Moodle%20plugins,Upload%20the%20ZIP%20file)


2. **Verify Installation**  
   Ensure that the plugin is installed by checking for an `attentiontag` folder inside `moodle/blocks`.

3. **Install Dependencies**  
   You have to manually install our AttentionTag SDK and other related packages.
   ```sh
   cd /var/www/html/moodle/blocks/attentiontag
   npm install
   npm install @attention_tag/attentiontag
   npm run build
   ```
   If you're using sudo(or any other user) to install the package, use sudo(or the same user) while logging into npm also.

4. **Purge Caches**
   Go to Site Administration > Development > Purge Caches > Purge All Cache

## Setup & Configuration
1. **Enter Credentials in Moodle**  
   - Navigate to **Site Administration > Plugins > Blocks > Manage Blocks > AttentionTag > Settings**.
   - Enter the **Client ID**, **Client Secret**, and **Project ID** provided.

2. **Enable the Plugin in Moodle**  
   - Go to any **course module page** in Moodle.
   - Enable **Edit Mode** (top right corner).
   - Add the **AttentionTag block** to the page.

## How It Works
1. **Student Interaction**
   When the AttentionTag plugin is enabled on a course_module page and the logged in user is a “student” of this course_module, it runs inferences on the webcam feed and runs various ML models to generate inferences and tags. These are then used to compute different mental attributes such as concentration levels, sleepiness, effective focus etc. These levels are then compared with the thresholds defined in the Assistants tab and Visual Prompts/Auditory Cues are triggered corresponding to the results.
2. **Triggers**
   - **Visual Prompt:** Displays an uploaded image at the bottom left of the screen.
   - **Auditory Cue:** Plays a sound to alert the student.
   - **Both triggers reset every 15 minutes**.

3. **DART Icon**
   - A **DART icon** appears at the bottom right.
   - When permissions are granted, it updates every 30 seconds to reflect the student’s **emotional state** (Happy, Sad, Fear, Anger, etc.).

## Support
For assistance, reach out to **[team@attentiontag.com](mailto:team@attentiontag.com)** or create an issue on our [GitHub Issue Tracker](https://github.com/attentiontag/moodle-block_attentiontag/issues).


---
*Enhance student engagement and focus with AttentionTag!*

