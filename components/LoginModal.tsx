
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DaumPostcode from 'react-daum-postcode';

interface UserInfo {
    nickname: string;
    age: string;
    gender: 'male' | 'female' | 'other' | '';
    skinConcern: string;
    address: string;
}

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    onLogin: (user: UserInfo) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin }) => {
    const [nickname, setNickname] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState<'male' | 'female' | 'other' | ''>('');
    const [skinConcern, setSkinConcern] = useState('');
    const [address, setAddress] = useState('');
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState<'login' | 'profile'>('login');

    const handleSocialLogin = (platform: 'kakao' | 'naver') => {
        setIsLoading(true);
        // Simulate API calling delay/connection
        setTimeout(() => {
            setNickname(platform === 'kakao' ? '카카오사용자' : '네이버사용자');
            setAge('28');
            setGender('female');
            setSkinConcern('건조 / 속당김');
            setAddress('서울특별시 강남구 테헤란로 123 (클로니빌딩)');

            setIsLoading(false);
            setStep('profile'); // Move to profile verification/setup step
        }, 800);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onLogin({ nickname, age, gender, skinConcern, address });
        onClose();
    };

    const handleAddressComplete = (data: any) => {
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') extraAddress += data.bname;
            if (data.buildingName !== '') extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
            fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }

        setAddress(fullAddress);
        setIsAddressModalOpen(false);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="bg-white rounded-[32px] w-full max-w-lg p-8 relative z-10 shadow-2xl max-h-[90vh] overflow-y-auto scrollbar-hide"
                    >
                        {isLoading && (
                            <div className="absolute inset-0 z-50 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center rounded-[32px]">
                                <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                                <p className="text-teal-600 font-bold">소셜 로그인 연결 중...</p>
                            </div>
                        )}
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <div className="text-center mb-8">
                            <span className="text-teal-500 font-bold tracking-widest text-[10px] uppercase block mb-2">Login / Signup</span>
                            <h2 className="text-3xl font-black text-gray-900 mb-2">CLONY 시작하기</h2>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                아이디와 비밀번호 입력 없이<br />
                                1초 만에 간편하게 로그인하세요.
                            </p>
                        </div>

                        {step === 'login' ? (
                            <>
                                {/* Social Login Buttons */}
                                <div className="space-y-3 mb-8">
                                    <button
                                        onClick={() => handleSocialLogin('kakao')}
                                        className="w-full bg-[#FEE500] text-[#3c1e1e] font-bold py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-[#FADC00] transition-colors shadow-sm active:scale-[0.98]"
                                    >
                                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                            <path d="M12 3c-4.97 0-9 3.185-9 7.115 0 2.558 1.707 4.8 4.315 6.095l-1.098 4.024c-.066.242.181.442.392.302l4.81-3.18c.508.05 1.034.074 1.581.074 4.97 0 9-3.185 9-7.115S16.97 3 12 3z" />
                                        </svg>
                                        카카오 1초 로그인/회원가입
                                    </button>
                                    <button
                                        onClick={() => handleSocialLogin('naver')}
                                        className="w-full bg-[#03C75A] text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-[#02b351] transition-colors shadow-sm active:scale-[0.98]"
                                    >
                                        <span className="font-black text-lg">N</span>
                                        네이버 1초 로그인/회원가입
                                    </button>
                                </div>

                                {/* Divider */}
                                <div className="relative flex items-center gap-4 mb-8">
                                    <div className="flex-1 h-[1px] bg-gray-100"></div>
                                    <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">또는</span>
                                    <div className="flex-1 h-[1px] bg-gray-100"></div>
                                </div>

                                {/* Existing Custom Form Choice */}
                                <div className="mb-10">
                                    <div className="flex bg-gray-50 p-1.5 rounded-2xl mb-8">
                                        <button
                                            onClick={() => setStep('profile')}
                                            className="flex-1 py-3 bg-white text-gray-900 font-black rounded-[14px] shadow-sm text-sm"
                                        >
                                            자체 회원가입
                                        </button>
                                        <button className="flex-1 py-3 text-gray-400 font-bold text-sm">
                                            비회원 주문조회
                                        </button>
                                    </div>
                                    <p className="text-center text-xs text-gray-400 font-medium">
                                        이메일로 가입하시려면 '자체 회원가입'을 눌러주세요.
                                    </p>
                                </div>
                            </>
                        ) : (

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">닉네임</label>
                                        <input
                                            type="text"
                                            required
                                            value={nickname}
                                            onChange={(e) => setNickname(e.target.value)}
                                            className="w-full px-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all placeholder:text-gray-300 font-medium"
                                            placeholder="이름/닉네임"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">나이</label>
                                        <input
                                            type="number"
                                            required
                                            value={age}
                                            onChange={(e) => setAge(e.target.value)}
                                            className="w-full px-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all placeholder:text-gray-300 font-medium"
                                            placeholder="25"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">성별</label>
                                    <div className="grid grid-cols-3 gap-3">
                                        {(['male', 'female', 'other'] as const).map((g) => (
                                            <button
                                                key={g}
                                                type="button"
                                                onClick={() => setGender(g)}
                                                className={`py-3 rounded-2xl border-2 font-bold text-sm transition-all ${gender === g
                                                    ? 'border-teal-500 bg-teal-50 text-teal-700'
                                                    : 'border-gray-50 bg-gray-50 text-gray-400 hover:border-gray-200'
                                                    }`}
                                            >
                                                {g === 'male' ? '남성' : g === 'female' ? '여성' : '기타'}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">피부 고민</label>
                                    <select
                                        required
                                        value={skinConcern}
                                        onChange={(e) => setSkinConcern(e.target.value)}
                                        className="w-full px-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all appearance-none cursor-pointer font-medium"
                                    >
                                        <option value="" disabled>가장 큰 고민을 선택해주세요</option>
                                        <option value="여드름 / 트러블">여드름 / 트러블</option>
                                        <option value="주름 / 탄력">주름 / 탄력</option>
                                        <option value="기미 / 잡티">기미 / 잡티</option>
                                        <option value="건조 / 속당김">건조 / 속당김</option>
                                        <option value="민감성 / 홍조">민감성 / 홍조</option>
                                        <option value="모공 / 피지">모공 / 피지</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">배송지 주소</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            readOnly
                                            required
                                            value={address}
                                            onClick={() => setIsAddressModalOpen(true)}
                                            className="flex-1 px-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all placeholder:text-gray-300 font-medium cursor-pointer"
                                            placeholder="주소 검색을 눌러주세요"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setIsAddressModalOpen(true)}
                                            className="px-6 py-3.5 bg-gray-900 text-white font-bold rounded-2xl hover:bg-black transition-all text-xs whitespace-nowrap"
                                        >
                                            주소 검색
                                        </button>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-teal-500 text-white font-black py-4 rounded-2xl mt-4 hover:bg-teal-400 shadow-xl shadow-teal-500/20 transition-all text-lg active:scale-[0.98]"
                                >
                                    프로필 설정 완료
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setStep('login')}
                                    className="w-full text-gray-400 font-bold py-2 mt-2 hover:text-gray-600 transition-colors text-sm"
                                >
                                    이전 단계로
                                </button>
                            </form>
                        )}

                        {/* Daum Address Modal */}
                        {isAddressModalOpen && (
                            <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                                <div className="absolute inset-0 bg-black/40" onClick={() => setIsAddressModalOpen(false)}></div>
                                <div className="bg-white w-full max-w-md rounded-2xl overflow-hidden relative z-10 shadow-2xl">
                                    <DaumPostcode onComplete={handleAddressComplete} height={450} />
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
