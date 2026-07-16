"use client";

type StyleSnapshot = {
  el: HTMLElement;
  transform: string;
  opacity: string;
};

function prepareElementForCapture(element: HTMLElement): () => void {
  const snapshots: StyleSnapshot[] = [];
  const nodes = [element, ...element.querySelectorAll("*")];

  for (const node of nodes) {
    if (!(node instanceof HTMLElement)) continue;

    snapshots.push({
      el: node,
      transform: node.style.transform,
      opacity: node.style.opacity,
    });
    node.style.transform = "none";
    if (node.style.opacity && node.style.opacity !== "1") {
      node.style.opacity = "1";
    }
  }

  // Flatten couple-name-initial spans so the letter gap disappears in capture
  element.querySelectorAll(".couple-name-initial").forEach((span) => {
    if (span instanceof HTMLElement) {
      span.style.display = "inline";
      span.style.marginRight = "0";
    }
  });

  return () => {
    for (const { el, transform, opacity } of snapshots) {
      el.style.transform = transform;
      el.style.opacity = opacity;
    }
    element.querySelectorAll(".couple-name-initial").forEach((span) => {
      if (span instanceof HTMLElement) {
        span.style.display = "";
        span.style.marginRight = "";
      }
    });
  };
}

function hideExportExcludedElements(element: HTMLElement): () => void {
  const hidden: HTMLElement[] = [];

  element.querySelectorAll("[data-export-hide]").forEach((node) => {
    if (node instanceof HTMLElement) {
      hidden.push(node);
      node.style.visibility = "hidden";
    }
  });

  return () => {
    for (const el of hidden) {
      el.style.visibility = "";
    }
  };
}

import { FONTS_CSS_TEMPLATE } from "./fonts-base64";

/**
 * Returns preloaded base64 font-face declarations to guarantee font style rendering on all devices (bypasses CORS)
 */
async function getEmbeddedFontFaces(): Promise<string> {
  return FONTS_CSS_TEMPLATE;
}

function copyCssVariables(source: HTMLElement, target: HTMLElement) {
  const computed = getComputedStyle(source);
  const vars = [
    "--font-cormorant",
    "--font-calligraphy",
    "--font-scheherazade",
    "--font-inter",
    "--off-white",
    "--ivory",
    "--gold",
    "--gold-soft",
    "--gold-deep",
    "--champagne",
    "--pearl",
    "--linen",
    "--text-primary",
    "--text-secondary",
    "--border"
  ];
  for (const v of vars) {
    const val = computed.getPropertyValue(v);
    if (val) {
      target.style.setProperty(v, val);
    }
  }
}

/**
 * Synchronously grabs the base64 data URL from a pre-loaded img element using an offscreen canvas.
 * This is 100% offline-compatible, same-origin safe, and does not require network fetches.
 */
function getBase64FromImageElement(img: HTMLImageElement): string | null {
  try {
    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth || img.width;
    canvas.height = img.naturalHeight || img.height;
    if (canvas.width === 0 || canvas.height === 0) return null;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    ctx.drawImage(img, 0, 0);
    return canvas.toDataURL("image/png");
  } catch (err) {
    console.warn("Failed canvas serialization for image:", img.src, err);
    return null;
  }
}

async function inlineAllImages(element: HTMLElement): Promise<() => void> {
  const originalSrcs = new Map<HTMLImageElement, string>();
  const images = Array.from(element.querySelectorAll("img"));

  for (const img of images) {
    const src = img.getAttribute("src");
    if (src && !src.startsWith("data:")) {
      // First try synchronous same-origin canvas extraction
      let base64 = getBase64FromImageElement(img);

      // If canvas serialization failed (e.g. image not fully loaded yet), fallback to network fetch
      if (!base64) {
        try {
          const absoluteUrl = new URL(src, window.location.origin).href;
          const response = await fetch(absoluteUrl);
          const blob = await response.blob();
          base64 = await new Promise<string>((resolve, reject) => {
            const windowReader = new FileReader();
            windowReader.onloadend = () => resolve(windowReader.result as string);
            windowReader.onerror = reject;
            windowReader.readAsDataURL(blob);
          });
        } catch (err) {
          console.warn("Image fallback fetch failed:", src, err);
        }
      }

      if (base64) {
        originalSrcs.set(img, src);
        img.setAttribute("src", base64);
      }
    }
  }

  return () => {
    for (const [img, src] of originalSrcs.entries()) {
      img.setAttribute("src", src);
    }
  };
}

/**
 * Generates a PNG data URL of the invitation card, scaling it to desktop width and inlining fonts
 */
export async function generateInvitationPng(): Promise<string | null> {
  const element = document.getElementById("invitation-card");
  if (!element) {
    console.warn("Invitation card element not found");
    return null;
  }

  const { toPng } = await import("html-to-image");

  // Copy font variables from root html element so they are available in sandboxed capture
  copyCssVariables(document.documentElement, element);

  // Embed active local fonts as base64 to bypass browser SVG sandboxing
  const embeddedFontsCss = await getEmbeddedFontFaces();

  const styleTag = document.createElement("style");
  styleTag.textContent = embeddedFontsCss;
  element.appendChild(styleTag);

  // Inline all image elements inside the card as base64 to prevent sandbox image blocking
  const restoreImages = await inlineAllImages(element);
  const restoreStyles = prepareElementForCapture(element);
  const restoreVisibility = hideExportExcludedElements(element);

  // ── Force desktop-width layout for a clean, consistent captured image ──
  const EXPORT_WIDTH = 700;
  const savedWidth    = element.style.width;
  const savedMaxWidth = element.style.maxWidth;
  const savedPosition = element.style.position;
  const savedLeft     = element.style.left;

  element.style.position = "fixed";
  element.style.left     = "-9999px";
  element.style.width    = `${EXPORT_WIDTH}px`;
  element.style.maxWidth = "none";

  // Double requestAnimationFrame to ensure Next.js/Tailwind styles layout updates
  await new Promise<void>((r) => requestAnimationFrame(() => requestAnimationFrame(() => r())));
  await new Promise((r) => setTimeout(r, 150));

  try {
    await document.fonts.ready;
    await new Promise((r) => setTimeout(r, 250));

    const height = element.scrollHeight;
    const dpr    = Math.min(window.devicePixelRatio || 1, 3);

    const dataUrl = await toPng(element, {
      width:       EXPORT_WIDTH,
      height,
      canvasWidth:  EXPORT_WIDTH * dpr,
      canvasHeight: height * dpr,
      pixelRatio:   1,
      cacheBust:    true,
      backgroundColor: "#FFFDF9",
      style: {
        margin:    "0",
        transform: "none",
        width:     `${EXPORT_WIDTH}px`,
        maxWidth:  "none",
        position:  "static",
        left:      "auto",
      },
      filter: (node) =>
        !(node instanceof HTMLElement && node.dataset.exportHide !== undefined),
    });

    return dataUrl;
  } catch (error) {
    console.error("Failed to generate invitation card image:", error);
    return null;
  } finally {
    element.style.width    = savedWidth;
    element.style.maxWidth = savedMaxWidth;
    element.style.position = savedPosition;
    element.style.left     = savedLeft;
    element.removeChild(styleTag);
    restoreVisibility();
    restoreStyles();
    restoreImages();
  }
}

/**
 * Downloads the invitation card directly
 */
export async function downloadInvitationCard(): Promise<void> {
  const dataUrl = await generateInvitationPng();
  if (!dataUrl) return;

  const link = document.createElement("a");
  link.download = "nikah-invitation.png";
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
