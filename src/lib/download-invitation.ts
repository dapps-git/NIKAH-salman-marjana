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

  return () => {
    for (const { el, transform, opacity } of snapshots) {
      el.style.transform = transform;
      el.style.opacity = opacity;
    }
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

export async function downloadInvitationCard(): Promise<void> {
  const element = document.getElementById("invitation-card");
  if (!element) {
    console.warn("Invitation card element not found");
    return;
  }

  const { toPng } = await import("html-to-image");

  const restoreStyles = prepareElementForCapture(element);
  const restoreVisibility = hideExportExcludedElements(element);

  try {
    await document.fonts.ready;

    const width = element.offsetWidth;
    const height = element.scrollHeight;
    const dpr = window.devicePixelRatio || 1;

    const dataUrl = await toPng(element, {
      width,
      height,
      canvasWidth: width * dpr,
      canvasHeight: height * dpr,
      pixelRatio: 1,
      cacheBust: true,
      backgroundColor: "#FFFDF9",
      style: {
        margin: "0",
        transform: "none",
        width: `${width}px`,
        maxWidth: "none",
      },
      filter: (node) =>
        !(node instanceof HTMLElement && node.dataset.exportHide !== undefined),
    });

    const link = document.createElement("a");
    link.download = "nikah-invitation.png";
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Failed to download invitation card:", error);
  } finally {
    restoreVisibility();
    restoreStyles();
  }
}
