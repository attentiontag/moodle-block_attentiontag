# AttentionTag - Moodle Plugin

## Overview
**AttentionTag** is an AI-powered assistant designed to enhance students' learning experiences by helping them maintain focus on study materials. It employs various triggers, including **Visual Prompts** and **Auditory Cues**, to improve concentration and engagement.

## Plugin Information
- **Plugin Type:** Block
- **Repository:** [GitHub - AttentionTag Moodle Plugin](https://github.com/attentiontag/moodle-block_attentiontag)
- **Issue Tracker:** [Report Issues](https://github.com/attentiontag/moodle-block_attentiontag/issues)
- **Moodle Documentation:** [Moodle Docs](https://docs.moodle.org/405/en/index.php?title=AttentionTag&action=edit)
- **Maintainer:** [team@attentiontag.com](mailto:team@attentiontag.com)

## Installation
Follow these steps to install the AttentionTag plugin on your Moodle instance:

1. **Clone the Repository**  
   ```sh
   git clone https://github.com/attentiontag/moodle-block_attentiontag.git
   ```

2. **Create a Zip File**  
   Compress the `moodle-block_attentiontag` directory into a `.zip` file.

3. **Upload to Moodle**  
   - Navigate to your Moodle instance.
   - Go to **Site Administration > Plugins > Install Plugins**.
   - Upload the zipped file.
   - Complete the installation process.

4. **Verify Installation**  
   Ensure that the plugin is installed by checking for an `attentiontag` folder inside `moodle/blocks`.

5. **Install Dependencies**  
   ```sh
   cd /var/www/html/moodle/blocks/attentiontag
   npm install
   npm install @attention_tag/attentiontag
   npm run build
   ```

## Setup & Configuration
1. **Request Credentials**  
   - Contact **team@attentiontag.com** to receive your **Client ID**, **Client Secret**, and **Project ID**.
   - These credentials are required for communication with the AttentionTag backend.

2. **Enter Credentials in Moodle**  
   - Navigate to **Site Administration > Plugins > Blocks > Manage Blocks > AttentionTag > Settings**.
   - Enter the **Client ID**, **Client Secret**, and **Project ID** provided.

3. **Create an AttentionTag Account**  
   - Visit [AttentionTag](https://app.attentiontag.com) and create your account in your respective organization.
   - Navigate to the **Assistants Tab** to configure **Visual Prompts** or **Auditory Cues**(more triggers comming soon).

4. **Enable the Plugin in Moodle**  
   - Go to any **course module page** in Moodle.
   - Enable **Edit Mode** (top right corner).
   - Add the **AttentionTag block** to the page.

## How It Works
1. **Student Interaction**
   - When a student accesses a course module page with AttentionTag enabled, the plugin captures their webcam feed.
   - ML models analyze the feed to assess **concentration levels, sleepiness, and focus effectiveness** and other factors.
   - These attributes are compared against the thresholds defined in the **Assistants Tab**.
   - If necessary, **Visual Prompts** or **Auditory Cues** are triggered.

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

