// Product Database for AI-based Skin Analysis Recommendations
// Based on mobile app's recommendation system

export interface Product {
    name: string;
    category: string;
    reason: string;
}

export interface SkinTypeDescription {
    title: string;
    desc: string;
    tags: string[];
}

// Skin Type Descriptions
export const SKIN_DESCRIPTIONS: Record<string, SkinTypeDescription> = {
    "OSNW": {
        title: "주름진 민감 지성",
        desc: "피지는 많지만 속건조를 느끼기 쉽고, 트러블과 잔주름이 공존하는 복합적인 상태입니다.",
        tags: ["지성", "민감성", "비색소", "주름"]
    },
    "OSNT": {
        title: "수부지 민감형",
        desc: "겉은 번들거리고 속은 당기는 수분 부족형 지성이며 홍조나 트러블이 잦습니다.",
        tags: ["지성", "민감성", "비색소", "탄력"]
    },
    "ORNT": {
        title: "타고난 건강 지성",
        desc: "피지 분비만 관리하면 매우 건강하고 탄력 있는 축복받은 피부입니다.",
        tags: ["지성", "저항성", "비색소", "탄력"]
    },
    "DSNW": {
        title: "건조한 노화 민감",
        desc: "극심한 속당김과 함께 잔주름이 생기기 쉬운 얇은 피부입니다.",
        tags: ["건성", "민감성", "비색소", "주름"]
    },
    "DSNT": {
        title: "건조 민감형",
        desc: "수분이 부족하고 외부 자극에 예민한 피부로 진정 케어가 필요합니다.",
        tags: ["건성", "민감성", "비색소", "탄력"]
    },
    "DRNT": {
        title: "건강한 건성",
        desc: "건조하지만 튼튼한 피부로 보습만 잘 챙기면 좋은 상태를 유지할 수 있습니다.",
        tags: ["건성", "저항성", "비색소", "탄력"]
    },
    "OSPW": {
        title: "색소 침착 지성",
        desc: "피지와 함께 기미, 잡티가 고민인 피부입니다.",
        tags: ["지성", "민감성", "색소", "주름"]
    },
    "ORPW": {
        title: "색소 지성",
        desc: "피지 관리와 함께 미백 케어가 필요한 피부입니다.",
        tags: ["지성", "저항성", "색소", "주름"]
    }
};

// Product Database by Skin Trait
export const PRODUCT_DB: Record<string, Product[]> = {
    O: [ // Oily (지성)
        { name: "닥터지 레드 블레미쉬 클리어 수딩 크림", category: "보습", reason: "피지는 잡고 수분은 채워주는 지성 필수템" },
        { name: "아누아 어성초 77 토너", category: "토너", reason: "과다 피지와 트러블 진정에 효과적" },
        { name: "이니스프리 노세범 미네랄 파우더", category: "선케어", reason: "번들거리는 유분을 뽀송하게 잡아줌" },
        { name: "라운드랩 독도 클렌저", category: "클렌징", reason: "미세먼지와 노폐물을 말끔하게 세정" }
    ],
    D: [ // Dry (건성)
        { name: "토리든 다이브인 저분자 히알루론산 세럼", category: "세럼", reason: "속건조를 해결하는 수분 폭탄" },
        { name: "피지오겔 DMT 페이셜 크림", category: "보습", reason: "72시간 지속되는 강력한 보습 장벽" },
        { name: "바이오더마 센시비오 H2O", category: "클렌징", reason: "세안 후에도 당김 없는 촉촉한 클렌징" },
        { name: "달바 워터풀 에센스 선크림", category: "선케어", reason: "로션처럼 촉촉한 수분광 선크림" }
    ],
    S: [ // Sensitive (민감성)
        { name: "에스트라 아토베리어365 크림", category: "보습", reason: "무너진 피부 장벽을 탄탄하게 복구" },
        { name: "라로슈포제 시카플라스트 밤 B5", category: "보습", reason: "손상된 피부를 급속 진정시키는 SOS 크림" },
        { name: "메디힐 티트리 트러블 패드", category: "패드", reason: "자극 없이 순하게 진정 케어" },
        { name: "닥터지 그린 마일드 업 선 플러스", category: "선케어", reason: "민감한 피부도 안심하는 무기자차" }
    ],
    R: [ // Resistant (저항성/건강)
        { name: "구달 청귤 비타C 잡티 세럼", category: "세럼", reason: "피부를 더 맑고 생기있게 톤업" },
        { name: "마녀공장 퓨어 클렌징 오일", category: "클렌징", reason: "블랙헤드와 피지를 부드럽게 녹여줌" },
        { name: "스킨푸드 당근 패드", category: "패드", reason: "수분 충전과 피부결 정돈을 동시에" }
    ],
    N: [ // Non-Pigmented (비색소)
        { name: "라운드랩 자작나무 수분 선크림", category: "선케어", reason: "백탁 없이 산뜻한 데일리 선크림" },
        { name: "웰라쥬 리얼 히알루로닉 블루 100", category: "세럼", reason: "순도 100% 히알루론산의 수분 광채" }
    ],
    P: [ // Pigmented (색소성)
        { name: "아이소이 잡티 세럼", category: "세럼", reason: "거뭇한 잡티와 흔적을 지워주는 1등 세럼" },
        { name: "넘버즈인 5번 글루타치온 필름 패드", category: "패드", reason: "항산화 성분으로 붙이는 미백 케어" },
        { name: "미샤 비타씨플러스 잡티씨 앰플", category: "세럼", reason: "기미와 주근깨를 집중적으로 케어" }
    ],
    W: [ // Wrinkled (주름)
        { name: "설화수 자음생크림", category: "보습", reason: "피부 자생력을 높여 탄력을 되살림" },
        { name: "AHC 텐 레볼루션 리얼 아이크림", category: "보습", reason: "얼굴 전체에 바르는 고농축 안티에이징" },
        { name: "닥터지 블랙 스네일 크림", category: "보습", reason: "쫀쫀한 영양감으로 주름과 탄력 케어" }
    ],
    T: [ // Tight (탄력/탱탱)
        { name: "메디힐 콜라겐 채움 패드", category: "패드", reason: "처진 피부에 쫀쫀한 힘을 채워줌" },
        { name: "CNP 프로폴리스 에너지 앰플", category: "세럼", reason: "꿀광 피부를 위한 집중 영양 공급" }
    ]
};

// Get recommended products based on skin code
export function getRecommendedProducts(skinCode: string, category: string = '전체'): Product[] {
    // Extract traits from skin code (e.g., "OSNW" -> ['O', 'S', 'N', 'W'])
    const traits = skinCode.split('');
    let allRecommendations: Product[] = [];

    // Gather all products for each trait
    traits.forEach(trait => {
        if (PRODUCT_DB[trait]) {
            allRecommendations = [...allRecommendations, ...PRODUCT_DB[trait]];
        }
    });

    // Remove duplicates by name
    const uniqueProducts = Array.from(
        new Map(allRecommendations.map(p => [p.name, p])).values()
    );

    // Filter by category if not '전체'
    let filteredProducts = uniqueProducts;
    if (category !== '전체') {
        filteredProducts = uniqueProducts.filter(p => {
            if (category === '토너/패드') return p.category === '토너' || p.category === '패드';
            if (category === '세럼/앰플') return p.category === '세럼' || p.category === '앰플';
            return p.category === category;
        });
    }

    return filteredProducts.slice(0, 10); // Limit to 10 products
}

// Get skin type description
export function getSkinTypeInfo(skinCode: string): SkinTypeDescription {
    return SKIN_DESCRIPTIONS[skinCode] || {
        title: `${skinCode} 타입`,
        desc: "피부 데이터 분석 결과, 맞춤형 관리가 필요한 상태입니다.",
        tags: [
            skinCode.includes('O') ? '지성' : '건성',
            skinCode.includes('S') ? '민감성' : '저항성',
            skinCode.includes('P') ? '색소' : '비색소',
            skinCode.includes('W') ? '주름' : '탄력'
        ]
    };
}

// Parse skin traits for balance chart
export function parseSkinTraits(skinCode: string) {
    return {
        isOily: skinCode.includes('O'),
        isSensitive: skinCode.includes('S'),
        isPigmented: skinCode.includes('P'),
        isWrinkled: skinCode.includes('W')
    };
}
