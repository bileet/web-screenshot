# Web Screenshot  
**A simple, no-fuss tool to capture screenshots of any website using Cloudflare's Browser Rendering.**  

Built with Cloudflare Pages and Workers, Web Screenshot is lightweight, easy to deploy, and perfect for developers who need a quick way to snap website images without the hassle of complex setups.  

---

## Before You Start  
**Important:** You’ll need a Cloudflare account with a **Workers Paid plan** to use this tool, as it relies on Cloudflare’s Browser Rendering feature.  

---

## How to Deploy Web Screenshot  

1. Fork the repo to your GitHub account.  
2. Go to your Cloudflare dashboard, then **Compute** > **Workers & Pages**.  
3. Create a new **Pages** project.  
4. Select **Connect to Git**.  
5. Pick your forked repo and start the setup.  
6. In Build settings, use `npm i` for the build command and `dist` for the output folder.  
7. Click **Save and Deploy**.   

In just a few minutes, your very own screenshot tool will be live, complete with both a web interface and an API!  

---

## Web Interface  
Visit `https://your-project-name.pages.dev/` to use the web interface. Just enter the URL you want to capture, tweak your options, and grab your screenshot.  

---

## Using the API  
You can also capture screenshots programmatically by sending a POST request to the `/capture` endpoint with these parameters in JSON format:  

- **`url`** (required): The URL of the website you want to screenshot.  
- **`device`** (optional): Pick a device type—`desktop`, `tablet`, or `mobile`. Defaults to `desktop` if you skip it.  
- **`userAgent`** (optional): Add a custom User-Agent string if you want.  
- **`fullPage`** (optional): Set to `true` to capture the whole page, not just what’s visible.  

### Example Request  
```bash
curl -X POST https://your-project-name.pages.dev/capture \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://example.com",
    "device": "desktop",
    "fullPage": true
  }'
```