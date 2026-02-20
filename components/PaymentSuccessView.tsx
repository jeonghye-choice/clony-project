import React from 'react';
import { PulseButton } from './Motion';

interface PaymentSuccessViewProps {
    orderId: string;
    amount: number;
    paymentKey: string;
    onHome: () => void;
}

export const PaymentSuccessView: React.FC<PaymentSuccessViewProps> = ({ orderId, amount, onHome }) => {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-20">
            <div className="bg-white rounded-3xl p-8 md:p-12 max-w-lg w-full text-center shadow-xl border border-gray-100">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-4xl">🎉</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">결제가 완료되었습니다!</h2>
                <p className="text-gray-500 mb-8">
                    주문번호: {orderId}<br />
                    Clony 맞춤 솔루션 키트가 곧 발송됩니다.
                </p>
                <div className="bg-gray-50 rounded-xl p-4 mb-8 text-left text-sm text-gray-600">
                    <div className="flex justify-between">
                        <span>결제 금액</span>
                        <span className="font-bold text-teal-600">{amount.toLocaleString()}원</span>
                    </div>
                </div>
                <PulseButton
                    onClick={onHome}
                    className="w-full bg-black text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition-colors"
                >
                    메인으로 돌아가기
                </PulseButton>
            </div>
        </div>
    );
};
