import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const API_URL = 'http://localhost:8000'; // Adjust as needed

interface User {
    email: string;
    nickname: string;
}

interface Ingredient {
    id: number;
    name: string;
    name_en: string;
    cas_no: string;
    category: string;
    effect: string;
    description: string;
}

interface Product {
    id: number;
    name: string;
    brand: string;
    category: string;
    price: number;
}

const AdminDashboard: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [activeTab, setActiveTab] = useState<'users' | 'ingredients' | 'products' | 'sync'>('users');
    const [users, setUsers] = useState<User[]>([]);
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('전체');
    const [loading, setLoading] = useState(false);
    const [syncMessage, setSyncMessage] = useState('');

    useEffect(() => {
        if (isAuthenticated) {
            fetchData();
        }
    }, [activeTab, isAuthenticated]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === '0120') {
            setIsAuthenticated(true);
        } else {
            alert('비밀번호가 올바르지 않습니다.');
            setPassword('');
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-md bg-white rounded-3xl shadow-xl p-10 border border-gray-100"
                >
                    <div className="flex flex-col items-center text-center mb-8">
                        <div className="w-16 h-16 bg-clony-primary/10 rounded-2xl flex items-center justify-center mb-4">
                            <span className="text-3xl text-clony-primary">🔒</span>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900">Admin Login</h1>
                        <p className="text-gray-400 mt-2">관리자 암호를 입력해주세요.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                autoFocus
                                className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-center text-2xl font-bold tracking-[0.5em] focus:bg-white focus:ring-4 focus:ring-clony-primary/10 focus:border-clony-primary outline-none transition-all"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-4 bg-clony-primary text-white rounded-2xl font-bold shadow-lg shadow-clony-primary/30 hover:shadow-clony-primary/50 hover:scale-[1.02] active:scale-[0.98] transition-all"
                        >
                            로그인
                        </button>
                    </form>

                    <button
                        onClick={onBack}
                        className="w-full mt-6 text-sm text-gray-400 hover:text-gray-900 transition-colors font-medium"
                    >
                        메인으로 돌아가기
                    </button>
                </motion.div>
            </div>
        );
    }

    const fetchData = async () => {
        setLoading(true);
        try {
            if (activeTab === 'users') {
                const res = await fetch(`${API_URL}/admin/users`);
                const data = await res.json();
                setUsers(data);
            } else if (activeTab === 'ingredients') {
                const res = await fetch(`${API_URL}/admin/ingredients`);
                const data = await res.json();
                setIngredients(data);
            } else if (activeTab === 'products') {
                const res = await fetch(`${API_URL}/admin/products`);
                const data = await res.json();
                setProducts(data);
            }
        } catch (error) {
            console.error('Fetch error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteUser = async (email: string) => {
        if (!confirm('정말 삭제하시겠습니까?')) return;
        try {
            await fetch(`${API_URL}/admin/users/${email}`, { method: 'DELETE' });
            fetchData();
        } catch (error) {
            alert('삭제 실패');
        }
    };

    const handleDeleteIngredient = async (id: number) => {
        if (!confirm('성분을 삭제하시겠습니까?')) return;
        try {
            await fetch(`${API_URL}/admin/ingredients/${id}`, { method: 'DELETE' });
            fetchData();
        } catch (error) {
            alert('삭제 실패');
        }
    };

    const handleSync = async () => {
        setLoading(true);
        setSyncMessage('동기화 진행 중...');
        try {
            const res = await fetch(`${API_URL}/admin/sync-ingredients`, { method: 'POST' });
            const data = await res.json();
            setSyncMessage(data.message);
            fetchData();
        } catch (error) {
            setSyncMessage('동기화 실패');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <div className="w-64 bg-white border-r border-gray-200 p-6 flex flex-col">
                <div className="flex items-center gap-2 mb-10">
                    <div className="w-8 h-8 bg-clony-primary rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold">C</span>
                    </div>
                    <span className="text-xl font-bold">Admin Console</span>
                </div>

                <nav className="flex-1 space-y-2">
                    {[
                        { id: 'users', label: '회원 관리', icon: '👤' },
                        { id: 'ingredients', label: '성분 데이터', icon: '🧪' },
                        { id: 'products', label: '상품 목록', icon: '🧴' },
                        { id: 'sync', label: '데이터 동기화', icon: '🔄' },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === tab.id
                                ? 'bg-clony-primary text-white shadow-lg shadow-clony-primary/20'
                                : 'text-gray-500 hover:bg-gray-100'
                                }`}
                        >
                            <span>{tab.icon}</span>
                            <span className="font-medium">{tab.label}</span>
                        </button>
                    ))}
                </nav>

                <button
                    onClick={onBack}
                    className="mt-auto flex items-center gap-2 text-gray-400 hover:text-gray-900 transition-colors"
                >
                    <span>←</span>
                    <span className="text-sm font-medium">메인으로 돌아가기</span>
                </button>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-10 overflow-auto">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            {activeTab === 'users' && '회원 관리'}
                            {activeTab === 'ingredients' && '성분 데이터베이스'}
                            {activeTab === 'products' && '상품 관리'}
                            {activeTab === 'sync' && '시스템 동기화'}
                        </h1>
                        <p className="text-gray-500 mt-1">Clony 서비스의 핵심 데이터를 관리합니다.</p>
                    </div>
                    <button
                        onClick={fetchData}
                        className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50"
                    >
                        새로고침
                    </button>
                </div>

                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                    {loading ? (
                        <div className="p-20 flex flex-col items-center justify-center gap-4">
                            <div className="w-10 h-10 border-4 border-clony-primary border-t-transparent rounded-full animate-spin" />
                            <p className="text-gray-400">데이터를 불러오는 중입니다...</p>
                        </div>
                    ) : (
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="p-4"
                            >
                                {activeTab === 'users' && (
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="border-b border-gray-100">
                                                <th className="px-4 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">이메일</th>
                                                <th className="px-4 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">닉네임</th>
                                                <th className="px-4 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">관리</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users.map((user) => (
                                                <tr key={user.email} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                                    <td className="px-4 py-4 text-sm font-medium text-gray-900">{user.email}</td>
                                                    <td className="px-4 py-4 text-sm text-gray-600">{user.nickname}</td>
                                                    <td className="px-4 py-4 text-sm">
                                                        <button
                                                            onClick={() => handleDeleteUser(user.email)}
                                                            className="text-red-400 hover:text-red-600 font-bold"
                                                        >
                                                            삭제
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}

                                {activeTab === 'ingredients' && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {ingredients.map((ing) => (
                                            <div key={ing.id} className="p-5 border border-gray-100 rounded-xl hover:border-clony-primary/30 transition-all group">
                                                <div className="flex justify-between items-start mb-2">
                                                    <span className="px-2 py-0.5 bg-clony-primary/10 text-clony-primary text-[10px] font-bold rounded uppercase">
                                                        {ing.category || '성분'}
                                                    </span>
                                                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button className="text-xs text-blue-400 hover:underline">수정</button>
                                                        <button
                                                            onClick={() => handleDeleteIngredient(ing.id)}
                                                            className="text-xs text-red-400 hover:underline"
                                                        >
                                                            삭제
                                                        </button>
                                                    </div>
                                                </div>
                                                <h3 className="text-lg font-bold text-gray-900">{ing.name}</h3>
                                                <p className="text-xs text-gray-400 mb-2">{ing.name_en} {ing.cas_no && `(CAS: ${ing.cas_no})`}</p>
                                                <p className="text-sm text-gray-600 line-clamp-2">{ing.effect}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {activeTab === 'products' && (
                                    <div className="flex flex-col gap-6">
                                        <div className="flex flex-wrap gap-2 px-4 pb-2 border-b border-gray-50">
                                            {['전체', '에센스', '각질제거', '로션', '크림', '클렌징', '선케어'].map((cat) => (
                                                <button
                                                    key={cat}
                                                    onClick={() => setSelectedCategory(cat)}
                                                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${selectedCategory === cat
                                                        ? 'bg-clony-dark text-white shadow-md'
                                                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                                                        }`}
                                                >
                                                    {cat}
                                                </button>
                                            ))}
                                        </div>

                                        <div className="overflow-x-auto">
                                            <table className="w-full text-left">
                                                <thead>
                                                    <tr className="border-b border-gray-100">
                                                        <th className="px-4 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">브랜드</th>
                                                        <th className="px-4 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">제품명</th>
                                                        <th className="px-4 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">카테고리</th>
                                                        <th className="px-4 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">가격</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {products
                                                        .filter(p => selectedCategory === '전체' || p.category === selectedCategory)
                                                        .map((p) => (
                                                            <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                                                <td className="px-4 py-4 text-sm font-bold text-gray-900">{p.brand}</td>
                                                                <td className="px-4 py-4 text-sm text-gray-600">{p.name}</td>
                                                                <td className="px-4 py-4 text-sm text-gray-500">{p.category}</td>
                                                                <td className="px-4 py-4 text-sm font-medium text-gray-900">{p.price?.toLocaleString()}원</td>
                                                            </tr>
                                                        ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'sync' && (
                                    <div className="p-20 flex flex-col items-center text-center">
                                        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
                                            <span className="text-4xl">🔄</span>
                                        </div>
                                        <h2 className="text-2xl font-bold text-gray-900 mb-2">식약처 데이터 동기화</h2>
                                        <p className="text-gray-500 max-w-md mb-8">
                                            식품의약품안전처 공공데이터포털에서 최신 화장품 성분 및 제품 데이터를 가져와 로컬 DB를 최신화합니다.
                                        </p>
                                        <button
                                            onClick={handleSync}
                                            disabled={loading}
                                            className="px-8 py-4 bg-clony-primary text-white rounded-2xl font-bold shadow-lg shadow-clony-primary/30 hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                                        >
                                            지금 동기화 시작하기
                                        </button>
                                        {syncMessage && (
                                            <p className="mt-4 text-sm font-bold text-clony-primary">{syncMessage}</p>
                                        )}
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
