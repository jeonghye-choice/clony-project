import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DownloadModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({ isOpen, onClose }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
                    >
                        <div className="bg-white rounded-[40px] p-8 md:p-12 max-w-sm w-full shadow-2xl relative pointer-events-auto overflow-hidden">
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-gray-400">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            <div className="text-center space-y-8">
                                <div className="space-y-2">
                                    <span className="inline-block px-3 py-1 bg-clony-primary/10 text-clony-primary rounded-full text-xs font-bold tracking-tight">APP DOWNLOAD</span>
                                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                                        더 정확한 진단을 위해<br />
                                        <span className="text-clony-primary">앱을 설치</span>해주세요
                                    </h3>
                                    <p className="text-gray-500 text-sm">카메라로 QR코드를 스캔하세요 📸</p>
                                </div>

                                {/* QR Code Placeholder */}
                                <div className="flex justify-center">
                                    <div className="bg-white p-4 rounded-3xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 relative group">
                                        <div className="absolute inset-0 bg-clony-primary/5 rounded-3xl transform scale-90 group-hover:scale-110 transition-transform duration-500"></div>
                                        {/* Using a generic QR code API for visual representation */}
                                        <img
                                            src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https://clony.app&color=333333&bgcolor=ffffff"
                                            alt="Download QR Code"
                                            className="w-40 h-40 object-contain relative z-10"
                                        />
                                        <div className="absolute -bottom-3 -right-3 w-10 h-10 bg-clony-primary rounded-full flex items-center justify-center text-white text-xl shadow-lg z-20">
                                            📱
                                        </div>
                                    </div>
                                </div>

                                {/* Store Buttons */}
                                <div className="flex flex-col gap-3">
                                    <button className="flex items-center justify-center gap-3 bg-gray-900 text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition-colors shadow-lg active:scale-[0.98]">
                                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3.333 14.667H8.667v-1.334h6.666v1.334zm0-2.667H8.667v-1.333h6.666V14zm0-2.667H8.667v-1.333h6.666v1.333z" /></svg>
                                        App Store
                                    </button>
                                    <button className="flex items-center justify-center gap-3 bg-gray-100 text-gray-900 py-4 rounded-xl font-bold hover:bg-gray-200 transition-colors active:scale-[0.98]">
                                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M3 20.5v-17c0-.828.672-1.5 1.5-1.5h15c.828 0 1.5.672 1.5 1.5v17c0 .828-.672 1.5-1.5 1.5h-15c-.828 0-1.5-.672-1.5-1.5z" /></svg>
                                        Google Play
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
