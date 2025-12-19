
import React from 'react';
import { createPortal } from 'react-dom';

/**
 * Advanced CRT Monitor Overlay
 * Implements standard retro screen effects found in open source "CRT CSS" libraries.
 * Features:
 * - Scanlines (Interlaced pattern)
 * - Phosphor RGB Shift (Chromatic Aberration)
 * - Tube Curvature (Vignette & Inset Shadow)
 * - Signal Noise (Film grain)
 * - Refresh Rate Bar (Rolling scanline)
 * - Bezel Mask (User provided)
 */
export const CRTMonitorOverlay = () => {
  // Use createPortal to render the overlay directly into document.body.
  // This ensures the bezel/overlay stays fixed at full viewport size,
  // while the #root element (which contains the App UI) can be scaled down
  // to fit inside the bezel's clear area without shrinking the bezel itself.
  return createPortal(
    <>
      <style>{`
        :root {
           --crt-scanline-opacity: 0.15;
           --crt-curvature-opacity: 0.4;
        }

        /* --- 1. The Container (Glass Tube Surface) --- */
        .crt-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            z-index: 2147483647; /* Max Z-Index */
            pointer-events: none;
            overflow: hidden;
            
            /* Curvature & Bezel Shadow mixed with Scanlines */
            background: radial-gradient(
                circle,
                rgba(0,0,0,0) 55%,
                rgba(0,0,0,0.1) 80%,
                rgba(0,0,0,0.4) 100%
            );
        }

        /* --- 2. Bezel Mask (The User Provided Image) --- */
        .crt-mask {
            position: absolute;
            inset: 0;
            z-index: 100; /* Topmost layer of the CRT effect */
            background-image: url('https://i.imgur.com/o7L6SLJ.png');
            background-size: 100% 100%;
            background-repeat: no-repeat;
            pointer-events: none;
        }

        /* --- 3. Scanlines (Interlaced) --- */
        .crt-scanlines {
            position: absolute;
            inset: 0;
            background: linear-gradient(
                to bottom,
                rgba(255,255,255,0),
                rgba(255,255,255,0) 50%,
                rgba(0,0,0,0.2) 50%,
                rgba(0,0,0,0.2)
            );
            background-size: 100% 4px; /* 2px line, 2px gap */
            z-index: 10;
            pointer-events: none;
        }

        /* --- 4. RGB Phosphor Mesh (The "Screen Door") --- */
        /* Simulates the physical RGB dots on the screen */
        .crt-mesh {
            position: absolute;
            inset: 0;
            background-image: linear-gradient(90deg, 
                rgba(255, 0, 0, 0.06), 
                rgba(0, 255, 0, 0.02), 
                rgba(0, 0, 255, 0.06)
            );
            background-size: 3px 100%;
            z-index: 20;
            mix-blend-mode: multiply;
            pointer-events: none;
        }

        /* --- 5. Refresh Rate Bar (Rolling Line) --- */
        .crt-refresh-line {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 5%;
            background: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0.08), rgba(255,255,255,0));
            animation: scanlineScroll 8s linear infinite;
            z-index: 30;
            pointer-events: none;
            opacity: 0.6;
        }

        /* --- 6. Signal Noise (Static) --- */
        .crt-noise {
            position: absolute;
            inset: 0;
            opacity: 0.035;
            z-index: 5;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
            animation: noiseShift 0.2s steps(4) infinite;
            pointer-events: none;
        }

        /* --- Global Effects Injected into Body --- */
        body {
            /* 
               Phosphor Bleed / Chromatic Aberration 
               Creating a slight Red/Blue offset for text to simulate beam misalignment
            */
            text-shadow: 0.5px 0 1px rgba(255,0,0,0.3), -0.5px 0 1px rgba(0,0,255,0.3);
            
            /* Overdrive: Slight saturation and contrast bump to mimic glowing phosphors */
            filter: contrast(1.1) brightness(1.1) saturate(1.15);
            
            /* Hide overflow to prevent scrollbars outside the frame */
            background-color: #000; /* Dark background to blend with scaled content */
            margin: 0;
            height: 100vh;
            overflow: hidden;
        }

        /* --- Turn-on Animation & Curvature Feel for Content --- */
        @keyframes scanlineScroll {
            0% { top: -10%; opacity: 0; }
            10% { opacity: 0.5; }
            90% { opacity: 0.5; }
            100% { top: 110%; opacity: 0; }
        }

        @keyframes noiseShift {
            0% { transform: translate(0,0); }
            25% { transform: translate(-2px, 2px); }
            50% { transform: translate(2px, -2px); }
            75% { transform: translate(-2px, -2px); }
            100% { transform: translate(0,0); }
        }

        @keyframes turnOn {
            0% { transform: scale(1, 0.002); opacity: 0; filter: brightness(30); }
            30% { transform: scale(1, 0.002); opacity: 1; filter: brightness(10); }
            60% { transform: scale(1, 1); opacity: 1; filter: brightness(5); }
            /* Adjusted scaling to 0.925 to ensure content fits within the bezel mask's safe area */
            100% { transform: scale(0.925); opacity: 1; filter: brightness(1); }
        }
        
        #root {
            width: 100vw;
            height: 100vh;
            overflow: hidden;
            background-color: #000;
            
            /* 
               Curvature Feel:
               1. Round corners to match the physical tube mask
               2. Inset shadow to create depth (the screen sits 'inside' the bezel)
               3. Scale down to fit within the mask boundaries
            */
            border-radius: 20px; 
            box-shadow: inset 0 0 100px rgba(0,0,0,0.9); 
            transform-origin: center;
            
            animation: turnOn 0.3s cubic-bezier(0.23, 1, 0.32, 1) forwards;
        }

      `}</style>
      
      <div className="crt-container">
          <div className="crt-mask"></div>
          <div className="crt-scanlines"></div>
          <div className="crt-mesh"></div>
          <div className="crt-refresh-line"></div>
          <div className="crt-noise"></div>
      </div>
    </>,
    document.body
  );
};
