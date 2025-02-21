import puppeteer from "@cloudflare/puppeteer";

/**
 * Web Screenshot Service using Cloudflare Workers
 *
 * Endpoints:
 * - GET /capture?url=<encoded-url> : Captures a screenshot of the specified URL
 */

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST",
};

export async function onRequest(context) {
  // Handle CORS
  if (context.request.method === "OPTIONS") {
    return new Response(null, {
      headers: CORS_HEADERS,
    });
  }

  const url = new URL(context.request.url);

  if (context.request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const { url, device, userAgent, fullPage } = await context.request.json();

    if (!url) {
      return new Response(
        JSON.stringify({
          message: "Missing URL parameter",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Validate URL
    new URL(url);

    const browser = await puppeteer.launch(context.env.MYBROWSER);
    const page = await browser.newPage();

    // Set viewport based on device
    const viewport =
      device === "mobile"
        ? { width: 393, height: 852 }
        : device === "tablet"
        ? { width: 1024, height: 1366 }
        : { width: 1920, height: 1080 };

    await page.setViewport(viewport);

    // Set custom user agent if provided
    if (userAgent) {
      await page.setUserAgent(userAgent);
    }

    await page.goto(url);
    const screenshot = await page.screenshot({ fullPage });
    await browser.close();

    // Convert screenshot to base64 URL
    const base64Image = `data:image/png;base64,${screenshot.toString(
      "base64"
    )}`;

    return new Response(
      JSON.stringify({
        success: true,
        screenshot_url: base64Image,
      }),
      {
        headers: { "Content-Type": "application/json", ...CORS_HEADERS },
      }
    );
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({
        message: "Failed to capture screenshot",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...CORS_HEADERS },
      }
    );
  }
}
