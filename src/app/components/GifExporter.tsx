import React, { useState } from 'react';
import { toPng } from 'html-to-image';
import gifshot from 'gifshot';
import { Download, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export function GifExporter() {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    const element = document.getElementById('main-content');
    if (!element) {
      toast.error("Could not find content to export");
      return;
    }

    setIsExporting(true);
    toast.info("Starting capture... Please hold still.");

    const frames: string[] = [];
    const fps = 8; // Target FPS (balance between smoothness and performance)
    const duration = 5; // Seconds to capture
    const totalFrames = fps * duration;
    const interval = 1000 / fps; // ms per frame

    let frameCount = 0;

    const captureFrame = async () => {
      const startTime = Date.now();
      
      try {
        const dataUrl = await toPng(element, {
          cacheBust: true,
          pixelRatio: 1, // Use 1x resolution for better performance and less memory usage
          skipAutoScale: true,
          backgroundColor: '#f9fafb', // Force gray-50 background (matches app theme)
          width: element.offsetWidth,
          height: element.offsetHeight,
          style: {
            transform: 'none', // Ensure no transforms on the root affect capture
          }
        });
        
        frames.push(dataUrl);
        frameCount++;

        if (frameCount < totalFrames) {
          // Calculate delay for next frame to maintain consistent timing
          const elapsed = Date.now() - startTime;
          const delay = Math.max(0, interval - elapsed);
          setTimeout(captureFrame, delay);
        } else {
          generateGif();
        }
      } catch (error) {
        console.error("Capture error:", error);
        toast.error("Failed to capture frame.");
        setIsExporting(false);
      }
    };

    const generateGif = () => {
      toast.info("Compiling GIF...");
      
      gifshot.createGIF({
        images: frames,
        gifWidth: element.offsetWidth,
        gifHeight: element.offsetHeight,
        interval: 1 / fps, // seconds
        numFrames: totalFrames,
        frameDuration: 1, // irrelevant if interval is set? gifshot docs say interval takes precedence or calc'd
        sampleInterval: 10,
        fontWeight: 'normal',
        fontSize: '16px',
        fontFamily: 'sans-serif',
        text: '', // No text overlay
      }, (obj: any) => {
        if (!obj.error) {
          const image = obj.image;
          const link = document.createElement('a');
          link.href = image;
          link.download = `vowtrack-export-${Date.now()}.gif`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          toast.success("GIF Downloaded!");
        } else {
          console.error("GIF generation error:", obj.errorMsg);
          toast.error("Failed to generate GIF");
        }
        setIsExporting(false);
      });
    };

    // Start capture
    // Small delay to allow toast to render and UI to settle
    setTimeout(captureFrame, 100);
  };

  return (
    <button
      onClick={handleExport}
      disabled={isExporting}
      className="px-3 py-1.5 rounded-md text-sm font-bold flex items-center gap-2 transition-all border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      title="Download 5s GIF recording"
    >
      {isExporting ? (
        <Loader2 size={16} className="animate-spin" />
      ) : (
        <Download size={16} />
      )}
      <span className="hidden sm:inline">{isExporting ? "Recording..." : "Export GIF"}</span>
    </button>
  );
}
