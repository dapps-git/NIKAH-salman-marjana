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

/**
 * Dynamically scans document stylesheets, extracts all @font-face rules,
 * fetches the font files from the local server, and converts them to base64
 * data URIs so they render perfectly inside the sandboxed capture SVG canvas.
 */
async function getEmbeddedFontFaces(): Promise<string> {
  let fontRules = "";
  try {
    for (const sheet of Array.from(document.styleSheets)) {
      try {
        const rules = Array.from(sheet.cssRules || sheet.rules || []);
        for (const rule of rules) {
          if (rule instanceof CSSFontFaceRule) {
            let cssText = rule.cssText;
            const matches = cssText.match(/url\((['"]?)([^'")]+)\1\)/g);
            if (matches) {
              for (const match of matches) {
                const urlMatch = match.match(/url\((['"]?)([^'")]+)\1\)/);
                if (urlMatch) {
                  const fontUrl = urlMatch[2];
                  if (!fontUrl.startsWith("data:")) {
                    try {
                      // Resolve local font relative URL to absolute URL on local dev server
                      const absoluteUrl = new URL(fontUrl, sheet.href || document.baseURI).href;
                      const response = await fetch(absoluteUrl);
                      const blob = await response.blob();
                      const base64 = await new Promise<string>((resolve, reject) => {
                        const reader = new FileReader();
                        reader.onloadend = () => resolve(reader.result as string);
                        reader.onerror = reject;
                        reader.readAsDataURL(blob);
                      });
                      cssText = cssText.replace(match, `url("${base64}")`);
                    } catch (err) {
                      console.warn("Failed to inline font locally:", fontUrl, err);
                    }
                  }
                }
              }
            }
            fontRules += cssText + "\n";
          }
        }
      } catch (e) {
        // Skip cross-origin stylesheet errors (Next.js CSS is local, so this passes)
      }
    }
  } catch (e) {
    console.error("Error embedding font-faces:", e);
  }
  return fontRules;
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

async function inlineAllImages(element: HTMLElement): Promise<() => void> {
  const originalSrcs = new Map<HTMLImageElement, string>();
  const images = Array.from(element.querySelectorAll("img"));

  for (const img of images) {
    const src = img.getAttribute("src");
    if (src && !src.startsWith("data:")) {
      try {
        const absoluteUrl = new URL(src, window.location.origin).href;
        const response = await fetch(absoluteUrl);
        const blob = await response.blob();
        const base64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
        originalSrcs.set(img, src);
        img.setAttribute("src", base64);
      } catch (err) {
        console.warn("Failed to inline image:", src, err);
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
