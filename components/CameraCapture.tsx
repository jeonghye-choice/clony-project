import React, { useRef, useState, useEffect } from 'react';

interface CameraCaptureProps {
  onCapture: (image: string) => void;
  onCancel: () => void;
}

export const CameraCapture: React.FC<CameraCaptureProps> = ({ onCapture, onCancel }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user' }
        });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        setError("Unable to access camera. Please allow permissions.");
        console.error(err);
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const context = canvas.getContext('2d');
      if (context) {
        context.translate(canvas.width, 0);
        context.scale(-1, 1);
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageData = canvas.toDataURL('image/jpeg', 0.8);
        onCapture(imageData);
      }
    }
  };

  if (error) {
    return (
      <div className="flex flex-col items-center gap-4 text-center p-8 bg-white/50 rounded-xl backdrop-blur-md">
        <p className="text-red-500 font-bold">{error}</p>
        <button onClick={onCancel} className="px-6 py-2 bg-gray-800 text-white rounded-full">Go Back</button>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[100vh] bg-black overflow-hidden">
      <style>{`
        /* Spline 모델 컨테이너 */
        .container { position: relative; width: 100%; height: 100vh; }
        iframe { width: 100%; height: 100%; border: none; }

        /* 카메라 오버레이 전체 레이어 */
        .overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none; /* 클릭 방해 금지 */
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: #00ff88;
            font-family: 'Courier New', Courier, monospace;
            z-index: 20;
        }

        /* 얼굴 인식 프레임 */
        .face-frame {
            position: relative;
            width: 280px;
            height: 360px;
            border: 2px solid rgba(0, 255, 136, 0.3);
            border-radius: 40px;
        }

        .face-frame::before, .face-frame::after {
            content: '';
            position: absolute;
            width: 30px;
            height: 30px;
            border: 4px solid #00ff88;
        }
        /* 모서리 디자인 */
        .face-frame::before { top: -5px; left: -5px; border-right: 0; border-bottom: 0; }
        .face-frame::after { top: -5px; right: -5px; border-left: 0; border-bottom: 0; }
        
        .corner-bl { position: absolute; bottom: -5px; left: -5px; width: 30px; height: 30px; border: 4px solid #00ff88; border-right: 0; border-top: 0; }
        .corner-br { position: absolute; bottom: -5px; right: -5px; width: 30px; height: 30px; border: 4px solid #00ff88; border-left: 0; border-top: 0; }

        /* 스캔 라인 애니메이션 */
        .scan-line {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 4px;
            background: linear-gradient(to bottom, rgba(0, 255, 136, 0), #00ff88, rgba(0, 255, 136, 0));
            box-shadow: 0 0 15px #00ff88;
            animation: scanning 3s ease-in-out infinite;
        }

        @keyframes scanning {
            0% { top: 5%; opacity: 0; }
            50% { opacity: 1; }
            100% { top: 95%; opacity: 0; }
        }

        /* 데이터 분석 텍스트 */
        .analysis-data {
            position: absolute;
            bottom: 40px;
            left: 30px;
            font-size: 14px;
            text-shadow: 0 0 5px #00ff88;
        }

        .status {
            position: absolute;
            top: 40px;
            right: 30px;
            font-weight: bold;
            font-size: 16px;
            animation: blink 1s step-end infinite;
        }

        @keyframes blink { 50% { opacity: 0; } }

        /* Video Feed positioning to sit inside the phone screen */
        .video-feed {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            z-index: -1;
            /* opacity: 0.8; REMOVED opacity for clear camera view */
            transform: scaleX(-1);
        }
      `}</style>

      <div className="container">
        {/* Spline Iframe REMOVED */}

        <div className="overlay">
          {/* Live Video inserted into the overlay container */}
          <video ref={videoRef} autoPlay playsInline className="video-feed" />
          <canvas ref={canvasRef} className="hidden" />

          <div className="status">● ANALYZING...</div>
          <div className="face-frame">
            <div className="scan-line"></div>
            <div className="corner-bl"></div>
            <div className="corner-br"></div>
          </div>
          <div className="analysis-data">
            <p>SKIN_MOISTURE: SCANNING...</p>
            <p>SENSITIVITY: CALCULATING</p>
            <p>ELASTICITY: OPTIMAL</p>
            <p>PORE_INDEX: 0.12</p>
          </div>
        </div>

        {/* Buttons - Placed outside overlay for interaction, but styled to fit the theme */}
        <div className="absolute bottom-12 left-0 right-0 z-30 flex justify-center gap-8 pointer-events-auto">
          <button
            onClick={onCancel}
            className="px-6 py-2 bg-black/50 text-[#00ff88] border border-[#00ff88] rounded-full font-mono hover:bg-[#00ff88] hover:text-black transition-all"
          >
            CANCEL
          </button>
          <button
            onClick={handleCapture}
            className="w-16 h-16 rounded-full border-4 border-[#00ff88] bg-[#00ff88]/20 flex items-center justify-center hover:bg-[#00ff88]/40 hover:scale-105 transition-all shadow-[0_0_15px_#00ff88]"
          >
            <div className="w-12 h-12 bg-white rounded-full shadow-inner"></div>
          </button>
        </div>
      </div>
    </div>
  );
};