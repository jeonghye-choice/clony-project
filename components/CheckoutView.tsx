
import React, { useState, useEffect, useRef } from 'react';
import DaumPostcode from 'react-daum-postcode';
import { PulseButton } from './Motion';

interface CheckoutViewProps {
    selectedPlan: {
        days: number;
        price: number;
        label: string;
        kitName: string;
    } | null;
    onBack: () => void;
    onComplete: () => void;
    user?: {
        nickname: string;
        age: string;
        gender: string;
        skinConcern: string;
        address: string;
    } | null;
}

const CLIENT_KEY = "test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq";

// Declare TossPayments global type
declare global {
    interface Window {
        TossPayments: any;
    }
}

export const CheckoutView: React.FC<CheckoutViewProps> = ({ selectedPlan, onBack, onComplete, user }) => {
    const [step, setStep] = useState<'form' | 'processing' | 'success'>('form');
    const [formData, setFormData] = useState({
        name: user?.nickname || '',
        phone: '',
        address: user?.address || ''
    });
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
    const [tossPayments, setTossPayments] = useState<any>(null);

    const plan = selectedPlan || { days: 7, price: 2450, label: '7일 체험', kitName: '[커스텀] 7일 체험 키트' };

    // Load Toss Payments SDK (v1 - same as mobile)
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://js.tosspayments.com/v1/payment';
        script.async = true;
        script.onload = () => {
            if (window.TossPayments) {
                const instance = window.TossPayments(CLIENT_KEY);
                setTossPayments(instance);
                console.log('✅ Toss Payments v1 SDK loaded successfully');
            }
        };
        script.onerror = () => {
            console.error('❌ Failed to load Toss Payments SDK');
            alert('결제 모듈 로딩에 실패했습니다. 페이지를 새로고침해주세요.');
        };
        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, []);

    // Payment Success Handler
    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const paymentKey = searchParams.get('paymentKey');
        const orderId = searchParams.get('orderId');
        const amount = searchParams.get('amount');

        if (paymentKey && orderId && amount) {
            setStep('success');
            // Clear URL params
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }, []);

    const formatPhoneNumber = (value: string) => {
        const cleaned = value.replace(/\D/g, '');
        if (cleaned.length <= 3) return cleaned;
        if (cleaned.length <= 7) return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
        return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(7, 11)}`;
    };

    const handleAddressComplete = (data: any) => {
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') extraAddress += data.bname;
            if (data.buildingName !== '') extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
            fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }

        setFormData({ ...formData, address: fullAddress });
        setIsAddressModalOpen(false);
    };

    const handleSubmit = async () => {
        if (!tossPayments) {
            alert('결제 모듈을 불러오는 중입니다. 잠시만 기다려주세요.');
            return;
        }

        if (!formData.name || !formData.phone || !formData.address) {
            alert('배송지 정보를 모두 입력해주세요.');
            return;
        }

        try {
            setStep('processing');

            const orderId = 'ORDER_' + Math.random().toString(36).slice(2);

            await tossPayments.requestPayment('카드', {
                amount: plan.price,
                orderId: orderId,
                orderName: plan.kitName,
                customerName: formData.name,
                successUrl: window.location.origin + window.location.pathname + '?payment=success',
                failUrl: window.location.origin + window.location.pathname + '?payment=fail',
            });
        } catch (error: any) {
            console.error(error);
            setStep('form');

            if (error.code === 'USER_CANCEL') {
                // 사용자가 취소한 경우 조용히 처리
                return;
            }

            alert(`결제 요청 실패: ${error.message || '알 수 없는 오류가 발생했습니다'}`);
        }
    };

    if (step === 'success') {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-20">
                <div className="bg-white rounded-3xl p-8 md:p-12 max-w-lg w-full text-center shadow-xl border border-gray-100">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span className="text-4xl">🎉</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">주문이 완료되었습니다!</h2>
                    <p className="text-gray-500 mb-6">
                        {formData.name}님, 맞춤 솔루션 키트가<br />
                        곧 발송될 예정입니다.
                    </p>
                    <div className="bg-teal-50 border border-teal-100 rounded-2xl p-6 mb-8">
                        <p className="text-teal-900 font-bold text-lg mb-2">
                            ✨ 당신의 {plan.days}일 가이드는<br />
                            CLONY 앱에서 확인하세요!
                        </p>
                        <p className="text-teal-600 text-sm mb-4">
                            앱을 설치하고 맞춤 루틴 알림을 받아보세요
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <a
                                href="#"
                                className="bg-black text-white px-5 py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-800 transition-all font-bold text-sm"
                            >
                                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.1 2.45-1.39 0-1.83-.84-3.41-.84-1.59 0-2.08.82-3.41.82-1.33 0-2.28-1.26-3.1-2.45-1.66-2.42-2.92-6.85-1.2-9.77.85-1.46 2.37-2.38 4.02-2.41 1.27-.02 2.46.86 3.23.86.77 0 2.21-.11 3.73.43 1.52.54 2.61 1.54 3.23 2.44-3.41 1.44-2.86 6.32 1 7.92-.6 1.45-1.26 2.85-2.23 4.29zM12.91 5.3c-.63.78-1.7 1.3-2.67 1.24-.12-1 .36-2.07 1-2.85.64-.78 1.84-1.35 2.81-1.28.1 1.05-.51 2.11-1.14 2.89z" /></svg>
                                App Store
                            </a>
                            <a
                                href="#"
                                className="bg-gray-900 text-white px-5 py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-black transition-all font-bold text-sm border border-gray-700"
                            >
                                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M3 20.5v-17c0-.28.22-.5.5-.5.1 0 .21.03.3.08l15.5 8.5c.24.13.33.43.2.67-.05.1-.12.18-.2.23L3.8 20.92c-.24.13-.54.04-.67-.2a.49.49 0 0 1-.13-.22z" /></svg>
                                Google Play
                            </a>
                        </div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4 mb-8 text-left text-sm text-gray-600">
                        <div className="flex justify-between mb-2">
                            <span>주문 상품</span>
                            <span className="font-bold">{plan.kitName}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>결제 금액</span>
                            <span className="font-bold text-teal-600">{plan.price.toLocaleString()}원</span>
                        </div>
                    </div>
                    <PulseButton
                        onClick={onComplete}
                        className="w-full bg-black text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition-colors"
                    >
                        메인으로 돌아가기
                    </PulseButton>
                </div>
            </div>
        );
    }

    if (step === 'processing') {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center z-50 fixed inset-0">
                <div className="w-16 h-16 border-4 border-gray-100 border-t-teal-500 rounded-full animate-spin mb-4"></div>
                <h2 className="text-xl font-bold text-gray-900">결제 진행 중입니다...</h2>
                <p className="text-gray-500 text-sm mt-2">잠시만 기다려주세요.</p>
            </div>
        );
    }

    return (
        <>
            <div className="min-h-screen bg-gray-50 pt-24 pb-40 px-4">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-8">
                        <button onClick={onBack} className="p-2 hover:bg-white rounded-full transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                            </svg>
                        </button>
                        <h1 className="text-2xl font-bold text-gray-900">주문서 작성</h1>
                    </div>

                    <div className="max-w-xl mx-auto flex flex-col gap-8">
                        {/* 1. Shipping Info */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <span className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-xs">1</span>
                                배송지 정보
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">이름</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                                        placeholder="홍길동"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">연락처</label>
                                    <input
                                        type="tel"
                                        required
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                                        placeholder="010-0000-0000"
                                        value={formData.phone}
                                        onChange={e => {
                                            const formatted = formatPhoneNumber(e.target.value);
                                            if (formatted.length <= 13) {
                                                setFormData({ ...formData, phone: formatted });
                                            }
                                        }}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">주소</label>
                                    <div className="flex gap-2 w-full">
                                        <input
                                            type="text"
                                            required
                                            readOnly
                                            className="flex-1 w-full min-w-0 px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none cursor-pointer"
                                            placeholder="주소를 검색해주세요"
                                            value={formData.address}
                                            onClick={() => setIsAddressModalOpen(true)}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setIsAddressModalOpen(true)}
                                            className="px-4 py-2 bg-gray-900 text-white text-sm font-bold rounded-lg hover:bg-gray-800 transition-colors shrink-0 whitespace-nowrap"
                                        >
                                            주소 검색
                                        </button>
                                    </div>
                                    <input
                                        type="text"
                                        className="w-full mt-2 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                                        placeholder="상세 주소를 입력해주세요"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* 2. Payment Method Selection */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <span className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs">2</span>
                                결제 수단
                            </h3>

                            <div className="space-y-3">
                                <div className="flex items-center gap-3 p-4 border-2 border-teal-500 rounded-xl bg-teal-50">
                                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm">
                                        <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <rect x="2" y="5" width="20" height="14" rx="2" strokeWidth="2" />
                                            <path d="M2 10h20" strokeWidth="2" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-bold text-gray-900">신용/체크카드</p>
                                        <p className="text-sm text-gray-500">안전한 카드 결제</p>
                                    </div>
                                    <div className="w-5 h-5 rounded-full bg-teal-500 flex items-center justify-center">
                                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                </div>

                                <p className="text-xs text-gray-400 text-center mt-2">
                                    {tossPayments ? '✅ 결제 모듈 준비 완료' : '⏳ 결제 모듈 로딩 중...'}
                                </p>
                            </div>
                        </div>

                        {/* 3. Payment Info Summary */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <span className="w-6 h-6 bg-teal-500 text-white rounded-full flex items-center justify-center text-xs">3</span>
                                결제 정보
                            </h3>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>상품명</span>
                                    <span className="font-medium text-gray-900">{plan.kitName}</span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>상품 금액</span>
                                    <span>{plan.price.toLocaleString()}원</span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>배송비</span>
                                    <span className="text-teal-600 font-bold">무료</span>
                                </div>
                                <div className="h-px bg-gray-100 my-2"></div>
                                <div className="flex justify-center items-center gap-4 text-lg font-bold text-gray-900 whitespace-nowrap">
                                    <span>최종 결제 금액</span>
                                    <span className="text-teal-600">{plan.price.toLocaleString()}원</span>
                                </div>
                            </div>

                            <PulseButton
                                onClick={handleSubmit}
                                className="w-full bg-black text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition-colors shadow-lg"
                            >
                                {plan.price.toLocaleString()}원 결제하기
                            </PulseButton>

                            <p className="text-xs text-gray-400 text-center mt-3">
                                위 주문 내용을 확인하였으며,<br />결제에 동의합니다.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Address Search Modal */}
            {isAddressModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsAddressModalOpen(false)}></div>
                    <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden relative z-10">
                        <div className="flex justify-between items-center p-4 border-b border-gray-100">
                            <h3 className="font-bold text-lg">주소 검색</h3>
                            <button onClick={() => setIsAddressModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="h-[400px]">
                            <DaumPostcode onComplete={handleAddressComplete} style={{ height: '100%' }} />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
