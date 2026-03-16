# Exporting VowTrack for Wix

Since **VowTrack** is a modern React application built with Vite and Tailwind CSS, it operates differently than a standard Wix website. Wix is a proprietary website builder, so you cannot directly "import" this source code into the Wix Editor.

However, you can easily integrate this application into a Wix site using the **Embed Method**.

## Step 1: Build the Application
First, you need to generate the static files (HTML, CSS, and JavaScript) that browsers understand.

1. Open the terminal.
2. Run the build command:
   ```bash
   npm run build
   ```
3. This will create a `dist` folder in your project directory. This folder contains your optimized application.

## Step 2: Host the Application
Before you can put it on Wix, the app needs to live somewhere on the internet. We recommend free, high-performance hosting services designed for React:

*   **Vercel** (Recommended): Drag and drop your project folder or connect your GitHub repository.
*   **Netlify**: Similar drag-and-drop deployment.
*   **GitHub Pages**: Great if you are already using GitHub.

Once deployed, you will get a URL (e.g., `https://vowtrack-app.vercel.app`).

## Step 3: Embed in Wix
Now that your app is live, you can display it inside your Wix site.

1. Log in to your **Wix Editor**.
2. Go to the page where you want the app to appear.
3. Click **Add Elements** (+) on the left sidebar.
4. Select **Embed Code** > **Embed a Site**.
5. Paste your application's URL (from Step 2) into the "Website Address" field.
6. Resize the embed window to fit your design.

## Alternative: Wix Velo (Advanced)
If you are a developer using **Wix Velo**, you cannot copy the React components directly. Wix Velo uses a different architecture. You would need to:
1. Use Wix "Custom Elements" to wrap your React components.
2. This is a complex process requiring significant code refactoring to turn your React components into standard Web Components.

**Recommendation:** The "Embed a Site" method (Step 3) is the fastest and most reliable way to display your full React application within a Wix website.
