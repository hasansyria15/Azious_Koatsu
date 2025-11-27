/**
 * ================================================================
 * KOATSU - Système d'internationalisation (i18n) Professionnel
 * ================================================================
 * Fonctionne avec le backend Django pour la gestion des cookies
 * Respecte GDPR/RGPD avec consentement utilisateur
 */

const I18n = {
    // Configuration
    config: {
        defaultLang: 'ja',
        supportedLangs: ['en', 'ja'],
        apiEndpoints: {
            setLanguage: '/api/set-language/',
            setCookieConsent: '/api/cookie-consent/',
            getCookieStatus: '/api/cookie-status/'
        }
    },

    // État actuel
    currentLang: 'en',
    cookieConsent: null,

    // Traductions
    translations: {
        en: {
            // ============ PAGE TITLE ============
            'page.title': 'KOATSU - Precision in Worldwide Sourcing',

            // ============ COOKIE BANNER ============
            'cookie.title': 'Cookie Settings',
            'cookie.description': 'We use cookies to enhance your browsing experience, provide personalized content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.',
            'cookie.accept': 'Accept All',
            'cookie.reject': 'Reject All',
            'cookie.settings': 'Customize',
            'cookie.save': 'Save Preferences',
            'cookie.settings.title': 'Cookie Preferences',
            'cookie.essential.title': 'Essential Cookies',
            'cookie.essential.desc': 'Required for the website to function properly. Cannot be disabled.',
            'cookie.preferences.title': 'Preference Cookies',
            'cookie.preferences.desc': 'Remember your language and display preferences.',
            'cookie.analytics.title': 'Analytics Cookies',
            'cookie.analytics.desc': 'Help us understand how visitors interact with our website.',

            // ============ HEADER ============
            'nav.home': 'Home',
            'nav.about': 'About',
            'nav.services': 'Services',
            'nav.contact': 'Contact',
            'lang.selector': 'Language',

            // ============ SPLASH SCREEN ============
            'splash.tagline': 'Transport & Logistics',
            'splash.loading': 'Loading...',

            // ============ HERO SECTION ============
            'hero.subtitle': 'Global Sourcing',
            'hero.title': 'Japanese Precision',
            'hero.description': 'Connecting businesses worldwide with quality industrial supplies, seamless logistics, and rigorous quality control — powered by Japanese expertise.',
            'hero.btn.quote': 'Request Quote',
            'hero.btn.learn': 'Learn More',

            // ============ SERVICES SECTION ============
            'services.subtitle': 'What We Do',
            'services.title': 'End-to-End Solutions for Your Business',
            'services.description': 'KOATSU delivers comprehensive sourcing, logistics, and consulting services tailored to your business needs. From identifying reliable suppliers across Asia and Europe to managing complex supply chains and ensuring product quality, we provide the expertise and network to help your business thrive in the global market.',
            'services.btn': 'More Services',
            'services.ground': 'Ground Transport',
            'services.warehouse': 'Warehousing',
            'services.air': 'Air Transport',
            'services.maritime': 'Maritime Transport',
            'services.discover': 'Discover More',

            // ============ QUOTE SECTION ============
            'quote.subtitle': 'How It Works',
            'quote.title': 'Simple Steps to Get Started',
            'quote.step1.title': 'Share Your Details',
            'quote.step1.desc': 'Provide us with your contact information and company details so we can understand your business context and reach you quickly.',
            'quote.step2.title': 'Describe Your Needs',
            'quote.step2.desc': 'Tell us about your sourcing requirements, logistics challenges, or consulting needs. The more details you share, the better we can tailor our solutions.',
            'quote.step3.title': 'Get Expert Support',
            'quote.step3.desc': 'Our team of specialists will analyze your request and contact you promptly to discuss customized solutions for your business.',
            'quote.form.heading': 'We Are Here<br>Get A Free Quote',
            'quote.form.name': 'Enter your name',
            'quote.form.email': 'Enter your email',
            'quote.form.details': 'Enter your details & requirements',
            'quote.form.submit': 'Submit Now',
            'quote.form.error': 'This field is required.',
            'quote.form.success': 'Thank you! Your request has been sent successfully. We will get back to you soon.',

            // ============ CONTACT SECTION ============
            'contact.title': 'Our Place',
            'contact.office.title': 'Office Address',
            'contact.office.subtitle': 'KOATSU Global',
            'contact.email': 'Email',
            'contact.phone': 'Phone',
            'contact.fax': 'Fax',
            'contact.address.label': 'Tokyo Office',
            'contact.address.value': 'Harajuku, Shibuya-ku<br>Tokyo, Japan',
            'contact.btn': 'Get Direction',

            // ============ FOOTER ============
            'footer.description': 'KOATSU connects businesses worldwide with quality industrial supplies, reliable sourcing solutions, and seamless logistics — powered by Japanese precision and expertise.',
            'footer.quicklinks': 'Quick Links',
            'footer.hours.title': 'Working Hours',
            'footer.hours.weekdays': 'Mon - Fri',
            'footer.hours.weekdays.time': '08:00 - 18:00',
            'footer.hours.weekend': 'Sat - Sun',
            'footer.hours.weekend.time': 'Closed',
            'footer.hours.note': '<strong>Note:</strong> We are available 24/7 for emergencies and urgent logistics needs.',
            'footer.copyright': '© 2025 KOATSU. All rights reserved.',
            'footer.privacy': 'Privacy Policy',
            'footer.terms': 'Terms of Service',

            // ============ ABOUT PAGE ============
            'about.hero.title': 'About Us',
            'about.intro.subtitle': 'KOATSU Global Limited',
            'about.intro.title': 'Bridging Japan\'s Precision, Swiss Rigor & Asia\'s Efficiency',
            'about.intro.lead': 'Delivering reliable sourcing, premium quality, and seamless logistics solutions across Asia, Europe, and America.',
            'about.stats.founded': 'Founded',
            'about.stats.continents': 'Continents',
            'about.stats.partners': 'Partners',
            'about.image.badge': 'Global Network',

            'about.whoweare.subtitle': 'Our Story',
            'about.whoweare.title': 'Who We Are',
            'about.whoweare.connectivity.title': 'Global Connectivity',
            'about.whoweare.connectivity.text': 'Founded in <strong>2021</strong>, <strong>Koatsu Global Limited</strong> connects companies around the world with the most reliable manufacturers across Asia, Europe, and America.',
            'about.whoweare.excellence.title': 'Excellence Standard',
            'about.whoweare.excellence.text': 'We deliver premium industrial sourcing, strategic consulting, and logistics solutions — all executed with <strong>Japanese discipline</strong>, <strong>Swiss precision</strong>, and <strong>global flexibility</strong>.',
            'about.whoweare.solutions.title': 'End-to-End Solutions',
            'about.whoweare.solutions.text': 'From polymers to precision components, from packaging to engineering, we provide comprehensive procurement and supply chain services designed for performance and trust.',
            'about.whoweare.quality': 'Quality Assurance',
            'about.whoweare.network': 'Global Network',
            'about.whoweare.consulting': 'Expert Consulting',
            'about.whoweare.supplychain': 'Supply Chain',

            'about.philosophy.subtitle': 'Our Philosophy',
            'about.philosophy.title': 'Discipline. Integrity. Flexibility. Excellence.',
            'about.philosophy.lead': 'We adapt to your industry, your timelines, and your standards — without compromise.',
            'about.philosophy.desc': 'Our partnerships are built on trust, transparency, and performance.',
            'about.philosophy.tagline': 'Global reach. Local expertise. Lasting results.',
            'about.commitment.title': 'Our Commitment',
            'about.commitment.1': 'Streamlined procurement strategies',
            'about.commitment.2': 'Reliable supplier networks',
            'about.commitment.3': 'Measurable cost savings',
            'about.commitment.4': 'Premium quality assurance',
            'about.commitment.footer': '<strong>Koatsu Global Limited</strong> — where precision meets performance.',

            'about.values.subtitle': 'What Drives Us',
            'about.values.title': 'Our Core Values',
            'about.values.description': 'The principles that guide every partnership, every project, and every delivery.',
            'about.values.precision.title': 'Precision',
            'about.values.precision.desc': 'Japanese-inspired attention to detail in every aspect of our operations, from sourcing to delivery.',
            'about.values.reliability.title': 'Reliability',
            'about.values.reliability.desc': 'Swiss-level rigor in quality control and compliance, ensuring zero-defect outcomes.',
            'about.values.efficiency.title': 'Efficiency',
            'about.values.efficiency.desc': 'Asian market agility combined with streamlined processes for rapid, cost-effective solutions.',
            'about.values.partnership.title': 'Partnership',
            'about.values.partnership.desc': 'Building long-term relationships based on transparency, trust, and mutual success.',
            'about.values.innovation.title': 'Innovation',
            'about.values.innovation.desc': 'Continuously improving our methods and adopting new technologies for better results.',
            'about.values.global.title': 'Global Vision',
            'about.values.global.desc': 'A truly international perspective connecting the best of Asia, Europe, and America.',

            'about.approach.subtitle': 'How We Work',
            'about.approach.title': 'Our Approach',
            'about.approach.description': 'A systematic methodology that ensures consistent excellence in every engagement.',
            'about.approach.step1.title': 'Understanding Your Needs',
            'about.approach.step1.desc': 'In-depth consultation to understand your specifications, budget, timeline, and quality requirements.',
            'about.approach.step2.title': 'Strategic Sourcing',
            'about.approach.step2.desc': 'Leveraging our global network to identify the most reliable suppliers that match your criteria.',
            'about.approach.step3.title': 'Quality Assurance',
            'about.approach.step3.desc': 'Rigorous inspection and testing using Japanese precision and Swiss quality standards.',
            'about.approach.step4.title': 'Seamless Logistics',
            'about.approach.step4.desc': 'End-to-end coordination of shipping, customs, and delivery with real-time tracking.',
            'about.approach.step5.title': 'Ongoing Support',
            'about.approach.step5.desc': 'Continuous partnership with after-sales support and supply chain optimization.',

            'about.geographic.subtitle': 'Global Presence',
            'about.geographic.title': 'Where We Operate',
            'about.geographic.description': 'Connecting three continents with reliable sourcing and logistics expertise.',
            'about.geographic.asia.name': 'Asia',
            'about.geographic.asia.desc': 'Deep partnerships in China, Japan, South Korea, Thailand, Vietnam, and across Southeast Asia for manufacturing and sourcing excellence.',
            'about.geographic.asia.h1': 'Manufacturing hubs',
            'about.geographic.asia.h2': 'Raw materials sourcing',
            'about.geographic.asia.h3': 'Electronics & components',
            'about.geographic.europe.name': 'Europe',
            'about.geographic.europe.desc': 'Strategic connections in Switzerland, Germany, France, and across the EU for precision engineering and premium quality standards.',
            'about.geographic.europe.h1': 'Precision engineering',
            'about.geographic.europe.h2': 'Quality certification',
            'about.geographic.europe.h3': 'Advanced materials',
            'about.geographic.america.name': 'America',
            'about.geographic.america.desc': 'Established presence in North and South America for distribution, last-mile logistics, and market intelligence.',
            'about.geographic.america.h1': 'Distribution networks',
            'about.geographic.america.h2': 'Market intelligence',
            'about.geographic.america.h3': 'Customs expertise',

            'about.industries.subtitle': 'Expertise Across Sectors',
            'about.industries.title': 'Industries We Serve',
            'about.industries.polymers': 'Polymers & Chemicals',
            'about.industries.electronics': 'Electronics & Components',
            'about.industries.packaging': 'Packaging Solutions',
            'about.industries.industrial': 'Industrial Equipment',
            'about.industries.hardware': 'Hardware & Fasteners',
            'about.industries.engineering': 'Engineering Services',
            'about.industries.automotive': 'Automotive Parts',
            'about.industries.medical': 'Medical Devices',

            'about.cta.title': 'Ready to Experience the KOATSU Difference?',
            'about.cta.description': 'Let\'s discuss how our global network and expertise can optimize your supply chain and reduce costs while maintaining premium quality.',
            'about.cta.services': 'Explore Our Services',
            'about.cta.services.sub': 'Discover what we can do for you',
            'about.cta.contact': 'Get in Touch',
            'about.cta.contact.sub': 'Let\'s start a conversation',

            // ============ SERVICES PAGE ============
            'services.hero.title': 'Services',
            'services.intro.subtitle': 'Our Expertise',
            'services.intro.title': 'Comprehensive Solutions for Your Business',
            'services.intro.description': 'KOATSU combines Japanese precision with Swiss reliability to deliver world-class sourcing, logistics, and quality control services. We are your trusted partner in global industrial supply chain management.',

            // Service 1 - Global Sourcing
            'services.sourcing.title': 'Global Sourcing & Industrial Supply',
            'services.sourcing.description': 'We collaborate with manufacturers in most industries and product categories, ensuring flexibility, reliability, and performance.',
            'services.sourcing.polymers': 'Polymers & Additives:',
            'services.sourcing.polymers.desc': 'SBS, SEBS, resins, synthetic rubbers, plasticizers',
            'services.sourcing.chemicals': 'Chemicals & Coatings:',
            'services.sourcing.chemicals.desc': 'Solvents, pigments, process oils, curing agents',
            'services.sourcing.electronic': 'Electronic & Precision Components:',
            'services.sourcing.electronic.desc': 'PCB, connectors, harnesses, machined parts',
            'services.sourcing.packaging': 'Industrial Packaging:',
            'services.sourcing.packaging.desc': 'Films, cartons, cans, anti-static boxes, heat-sealable solutions',
            'services.sourcing.hardware': 'Hardware & Mechanical Parts:',
            'services.sourcing.hardware.desc': 'Fasteners, locks, customized tooling',
            'services.getstarted': 'Get Started',

            // Service 2 - Supply Chain
            'services.supplychain.title': 'Supply Chain & Logistics',
            'services.supplychain.description': 'Flexible solutions for every project, every region. Complete end-to-end logistics management.',
            'services.supplychain.freight': 'Sea, Air & Road Freight',
            'services.supplychain.freight.desc': 'Multi-modal transportation solutions',
            'services.supplychain.consolidation': 'Multi-Supplier Consolidation',
            'services.supplychain.consolidation.desc': 'Optimize costs and reduce complexity',
            'services.supplychain.documentation': 'Documentation & Customs',
            'services.supplychain.documentation.desc': 'LC, Bill of Lading, C/O management',
            'services.supplychain.inspection': 'Pre-Shipment Inspection',
            'services.supplychain.inspection.desc': 'Quality checks & temporary storage',
            'services.supplychain.traceability': 'Traceability & Cost Optimization',
            'services.supplychain.traceability.desc': 'Real-time tracking and efficiency',

            // Service 3 - Quality Control
            'services.quality.title': 'Quality Control & Audits',
            'services.quality.badge.jp': 'Japanese Standard',
            'services.quality.badge.ch': 'Swiss Precision',
            'services.quality.description': 'Our priority: <strong>zero-defect performance</strong>. We ensure the highest standards of quality at every step.',
            'services.quality.audits': 'Supplier & Factory Audits',
            'services.quality.audits.desc': 'Quality, capacity, and ESG compliance',
            'services.quality.fai': 'First Article Inspection (FAI)',
            'services.quality.fai.desc': 'Validate initial production samples',
            'services.quality.followup': 'On-Site Production Follow-Up',
            'services.quality.followup.desc': 'Continuous monitoring during manufacturing',
            'services.quality.certification': 'Certification Compliance',
            'services.quality.certification.desc': 'ISO, RoHS, REACH, and more',
            'services.quality.improvement': 'Continuous Improvement Reports',
            'services.quality.improvement.desc': 'Data-driven quality enhancements',

            // Service 4 - Strategic Consulting
            'services.consulting.title': 'Strategic Consulting',
            'services.consulting.description': 'Because every client deserves a <strong>custom-tailored approach</strong>. We help you optimize your sourcing strategy.',
            'services.consulting.scouting': 'Supplier Scouting & Negotiation',
            'services.consulting.scouting.desc': 'Find the best partners and secure optimal terms',
            'services.consulting.cost': 'Cost Optimization',
            'services.consulting.cost.desc': 'Reduce expenses without compromising quality',
            'services.consulting.development': 'Product Development Support',
            'services.consulting.development.desc': 'From concept to market-ready solutions',
            'services.consulting.market': 'Market Intelligence',
            'services.consulting.market.desc': 'Industry insights and sourcing strategy',
            'services.consulting.training': 'Knowledge Transfer & Training',
            'services.consulting.training.desc': 'Cultural insights and best practices',

            // Why Choose Us
            'services.why.subtitle': 'Why KOATSU',
            'services.why.title': 'Your Trusted Partner in Global Trade',
            'services.why.description': 'Combining Japanese precision with Swiss reliability, we deliver excellence at every step.',
            'services.why.network.title': 'Global Network',
            'services.why.network.desc': 'Extensive partnerships across Asia, America, and Europe for seamless sourcing and reliable supply chain solutions.',
            'services.why.zerodefect.title': 'Zero-Defect Focus',
            'services.why.zerodefect.desc': 'Japanese quality standards combined with Swiss precision for flawless results.',
            'services.why.team.title': 'Expert Team',
            'services.why.team.desc': 'Multilingual professionals with deep industry knowledge and cultural expertise.',
            'services.why.custom.title': 'Custom Solutions',
            'services.why.custom.desc': 'Tailored approaches designed specifically for your unique business needs.',
            'services.why.cost.title': 'Cost Optimization',
            'services.why.cost.desc': 'Transparent pricing and efficiency improvements that reduce your bottom line.',
            'services.why.confidentiality.title': 'Confidentiality',
            'services.why.confidentiality.desc': 'Your business information and trade secrets are always protected.',
            'services.why.risk.title': 'Risk Management',
            'services.why.risk.desc': 'Comprehensive supplier vetting and continuous monitoring to minimize supply chain risks.',
            'services.why.support.title': '24/7 Support',
            'services.why.support.desc': 'Round-the-clock assistance across time zones to keep your operations running smoothly.',

            // CTA
            'services.cta.title': 'Ready to Optimize Your Supply Chain?',
            'services.cta.description': 'Let\'s discuss how KOATSU can help you achieve your sourcing and logistics goals. Contact us today for a free consultation tailored to your business needs.',
            'services.cta.consultation': 'Request Consultation',
            'services.cta.email': 'Email Us',

            // ============ CONTACT PAGE ============
            'contact.hero.title': 'Contact Us',
            'contact.intro.subtitle': 'Get In Touch',
            'contact.intro.title': 'Let\'s Start a Conversation',
            'contact.intro.lead': 'Whether you\'re looking for reliable sourcing, strategic consulting, or seamless logistics solutions, our team is ready to help you achieve your goals.',

            // Locations
            'contact.locations.subtitle': 'Where We Are',
            'contact.locations.title': 'Our Locations',
            'contact.locations.tokyo.name': 'Head Office — Tokyo, Japan',
            'contact.locations.tokyo.type': 'Strategic headquarters and client relations hub.',
            'contact.locations.xiamen.name': 'Asia Operations — Xiamen, China',
            'contact.locations.xiamen.type': 'Manufacturing coordination and logistics hub.',
            'contact.locations.xiamen.desc1': 'A dynamic coastal city with world-class logistics, Xiamen stands at the crossroads of Chinese manufacturing, Japanese trade, and global export networks.',
            'contact.locations.xiamen.desc2': 'Its proximity to <strong>Shenzhen</strong>, <strong>Guangzhou</strong>, and <strong>Taiwan</strong> makes it the ideal location for supplier coordination and shipment consolidation.',

            // Maps
            'contact.maps.subtitle': 'Find Us On The Map',
            'contact.maps.title': 'Our Global Presence',
            'contact.maps.tokyo': 'Tokyo, Japan',
            'contact.maps.tokyo.info': 'Strategic headquarters and client relations hub',
            'contact.maps.xiamen': 'Xiamen, China',
            'contact.maps.xiamen.info': 'Manufacturing coordination and logistics hub',

            // Why Koatsu
            'contact.why.subtitle': 'Why Koatsu',
            'contact.why.title': 'Global Sourcing with a Japanese Soul',
            'contact.why.item1': 'Multinational presence across Japan and China',
            'contact.why.item2': 'Trusted network of certified manufacturers across Asia and Europe',
            'contact.why.item3': 'Proven expertise in industrial, electronic, and packaging sectors',
            'contact.why.item4': 'End-to-end logistics solutions: maritime, air freight, and ground transport',
            'contact.why.item5': 'Rigorous quality control and factory audits',
            'contact.why.item6': 'Strategic consulting for supply chain optimization',
            'contact.why.item7': 'Lean and disciplined operations, inspired by Japanese minimalism',

            // Form
            'contact.form.title': 'Send Us a Message',
            'contact.form.name': 'Full Name',
            'contact.form.email': 'Email Address',
            'contact.form.company': 'Company Name',
            'contact.form.subject': 'Subject',
            'contact.form.message': 'Message',
            'contact.form.required': '*',
            'contact.form.submit': 'Send Message',
            'contact.form.success.title': 'Message Sent Successfully!',
            'contact.form.success.text': 'Thank you for contacting us. We have sent a confirmation to your email. Our team will get back to you within 1-2 business days.',
            'contact.form.error.title': 'Error',

            // Contact Info
            'contact.info.subtitle': 'Contact Us',
            'contact.info.title': 'Koatsu Limited',
            'contact.info.locations': 'Tokyo | Xiamen',
            'contact.info.email.title': 'Email',
            'contact.info.hours.title': 'Business Hours',
            'contact.info.hours.value': 'Mon - Fri: 9:00 - 18:00 JST',
            'contact.info.tagline': 'Global sourcing with a Japanese soul.'
        },

        ja: {
            // ============ PAGE TITLE ============
            'page.title': 'KOATSU - 世界規模の調達における精度',

            // ============ COOKIE BANNER ============
            'cookie.title': 'Cookieの設定',
            'cookie.description': '当サイトでは、ブラウジング体験の向上、パーソナライズされたコンテンツの提供、トラフィックの分析のためにCookieを使用しています。「すべて許可」をクリックすると、Cookieの使用に同意したことになります。',
            'cookie.accept': 'すべて許可',
            'cookie.reject': 'すべて拒否',
            'cookie.settings': 'カスタマイズ',
            'cookie.save': '設定を保存',
            'cookie.settings.title': 'Cookieの設定',
            'cookie.essential.title': '必須Cookie',
            'cookie.essential.desc': 'ウェブサイトが正常に機能するために必要です。無効にすることはできません。',
            'cookie.preferences.title': '設定Cookie',
            'cookie.preferences.desc': '言語と表示設定を記憶します。',
            'cookie.analytics.title': '分析Cookie',
            'cookie.analytics.desc': '訪問者がウェブサイトをどのように利用しているかを理解するのに役立ちます。',

            // ============ HEADER ============
            'nav.home': 'ホーム',
            'nav.about': '会社概要',
            'nav.services': 'サービス',
            'nav.contact': 'お問い合わせ',
            'lang.selector': '言語',

            // ============ SPLASH SCREEN ============
            'splash.tagline': '輸送＆物流',
            'splash.loading': '読み込み中...',

            // ============ HERO SECTION ============
            'hero.subtitle': 'グローバル調達',
            'hero.title': '日本品質の精度',
            'hero.description': '高品質な産業用資材、シームレスな物流、厳格な品質管理で世界中のビジネスをつなぐ — 日本の専門知識で実現。',
            'hero.btn.quote': '見積もり依頼',
            'hero.btn.learn': '詳しく見る',

            // ============ SERVICES SECTION ============
            'services.subtitle': '事業内容',
            'services.title': 'ビジネスのためのトータルソリューション',
            'services.description': 'KOATSUは、お客様のビジネスニーズに合わせた包括的な調達、物流、コンサルティングサービスを提供します。アジアとヨーロッパ全域で信頼できるサプライヤーを見つけることから、複雑なサプライチェーンの管理、製品品質の確保まで、グローバル市場でお客様のビジネスの成功を支える専門知識とネットワークを提供します。',
            'services.btn': 'その他のサービス',
            'services.ground': '陸上輸送',
            'services.warehouse': '倉庫保管',
            'services.air': '航空輸送',
            'services.maritime': '海上輸送',
            'services.discover': '詳細を見る',

            // ============ QUOTE SECTION ============
            'quote.subtitle': 'ご利用方法',
            'quote.title': '簡単なステップで始めましょう',
            'quote.step1.title': '情報を共有',
            'quote.step1.desc': 'お客様のビジネス背景を理解し、迅速にご連絡できるよう、連絡先と会社情報をお知らせください。',
            'quote.step2.title': 'ニーズを記載',
            'quote.step2.desc': '調達要件、物流の課題、またはコンサルティングのニーズをお聞かせください。詳細を共有いただくほど、最適なソリューションをご提案できます。',
            'quote.step3.title': '専門サポート',
            'quote.step3.desc': '当社の専門チームがご要望を分析し、お客様のビジネスに合わせたカスタマイズソリューションをご提案するため、迅速にご連絡いたします。',
            'quote.form.heading': 'お気軽にどうぞ<br>無料見積もり',
            'quote.form.name': 'お名前を入力',
            'quote.form.email': 'メールアドレスを入力',
            'quote.form.details': 'ご要望の詳細を入力',
            'quote.form.submit': '送信する',
            'quote.form.error': 'この項目は必須です。',
            'quote.form.success': 'ありがとうございます！ご依頼を正常に送信しました。近日中にご連絡いたします。',

            // ============ CONTACT SECTION ============
            'contact.title': '所在地',
            'contact.office.title': 'オフィス所在地',
            'contact.office.subtitle': 'KOATSU グローバル',
            'contact.email': 'メール',
            'contact.phone': '電話',
            'contact.fax': 'ファックス',
            'contact.address.label': '東京オフィス',
            'contact.address.value': '渋谷区原宿<br>東京都、日本',
            'contact.btn': '道順を見る',

            // ============ FOOTER ============
            'footer.description': 'KOATSUは、高品質な工業用品、信頼性の高い調達ソリューション、シームレスな物流で世界中のビジネスをつなぎます — 日本の精度と専門知識を活かして。',
            'footer.quicklinks': 'クイックリンク',
            'footer.hours.title': '営業時間',
            'footer.hours.weekdays': '月曜〜金曜',
            'footer.hours.weekdays.time': '08:00 - 18:00',
            'footer.hours.weekend': '土日',
            'footer.hours.weekend.time': '休業',
            'footer.hours.note': '<strong>注：</strong>緊急の物流ニーズには24時間年中無休で対応しています。',
            'footer.copyright': '© 2025 KOATSU. 全著作権所有。',
            'footer.privacy': 'プライバシーポリシー',
            'footer.terms': '利用規約',

            // ============ ABOUT PAGE ============
            'about.hero.title': '会社概要',
            'about.intro.subtitle': 'KOATSU グローバル株式会社',
            'about.intro.title': '日本の精密さ、スイスの厳格さ、アジアの効率性を結ぶ',
            'about.intro.lead': 'アジア、ヨーロッパ、アメリカ全域で信頼性の高い調達、プレミアム品質、シームレスな物流ソリューションを提供します。',
            'about.stats.founded': '設立',
            'about.stats.continents': '大陸',
            'about.stats.partners': 'パートナー',
            'about.image.badge': 'グローバルネットワーク',

            'about.whoweare.subtitle': '私たちのストーリー',
            'about.whoweare.title': '私たちについて',
            'about.whoweare.connectivity.title': 'グローバル接続性',
            'about.whoweare.connectivity.text': '<strong>2021年</strong>設立、<strong>Koatsu Global Limited</strong>は世界中の企業をアジア、ヨーロッパ、アメリカの最も信頼できるメーカーと結びつけています。',
            'about.whoweare.excellence.title': '卓越した基準',
            'about.whoweare.excellence.text': 'プレミアムな産業調達、戦略的コンサルティング、物流ソリューションを提供 — すべて<strong>日本の規律</strong>、<strong>スイスの精密さ</strong>、<strong>グローバルな柔軟性</strong>で実行されます。',
            'about.whoweare.solutions.title': 'エンドツーエンドソリューション',
            'about.whoweare.solutions.text': 'ポリマーから精密部品、パッケージングからエンジニアリングまで、パフォーマンスと信頼のために設計された包括的な調達とサプライチェーンサービスを提供します。',
            'about.whoweare.quality': '品質保証',
            'about.whoweare.network': 'グローバルネットワーク',
            'about.whoweare.consulting': '専門コンサルティング',
            'about.whoweare.supplychain': 'サプライチェーン',

            'about.philosophy.subtitle': '私たちの哲学',
            'about.philosophy.title': '規律。誠実さ。柔軟性。卓越性。',
            'about.philosophy.lead': '私たちはお客様の業界、スケジュール、基準に — 妥協することなく — 適応します。',
            'about.philosophy.desc': '私たちのパートナーシップは信頼、透明性、パフォーマンスに基づいて構築されています。',
            'about.philosophy.tagline': 'グローバルな到達範囲。ローカルな専門知識。永続的な結果。',
            'about.commitment.title': '私たちの約束',
            'about.commitment.1': '合理化された調達戦略',
            'about.commitment.2': '信頼できるサプライヤーネットワーク',
            'about.commitment.3': '測定可能なコスト削減',
            'about.commitment.4': 'プレミアム品質保証',
            'about.commitment.footer': '<strong>Koatsu Global Limited</strong> — 精密さとパフォーマンスが出会う場所。',

            'about.values.subtitle': '私たちを動かすもの',
            'about.values.title': '私たちの核心的価値観',
            'about.values.description': 'すべてのパートナーシップ、すべてのプロジェクト、すべての納品を導く原則。',
            'about.values.precision.title': '精密さ',
            'about.values.precision.desc': '調達から納品まで、あらゆる業務における日本式の細部へのこだわり。',
            'about.values.reliability.title': '信頼性',
            'about.values.reliability.desc': '品質管理とコンプライアンスにおけるスイスレベルの厳格さ、ゼロ欠陥を保証。',
            'about.values.efficiency.title': '効率性',
            'about.values.efficiency.desc': 'アジア市場の機敏性と合理化されたプロセスを組み合わせた迅速でコスト効率の高いソリューション。',
            'about.values.partnership.title': 'パートナーシップ',
            'about.values.partnership.desc': '透明性、信頼、相互の成功に基づく長期的な関係の構築。',
            'about.values.innovation.title': 'イノベーション',
            'about.values.innovation.desc': 'より良い結果のために方法を継続的に改善し、新しい技術を採用。',
            'about.values.global.title': 'グローバルビジョン',
            'about.values.global.desc': 'アジア、ヨーロッパ、アメリカの最高を結ぶ真の国際的視点。',

            'about.approach.subtitle': '私たちの働き方',
            'about.approach.title': '私たちのアプローチ',
            'about.approach.description': 'すべてのエンゲージメントで一貫した卓越性を確保する体系的な方法論。',
            'about.approach.step1.title': 'ニーズの理解',
            'about.approach.step1.desc': '仕様、予算、タイムライン、品質要件を理解するための詳細なコンサルテーション。',
            'about.approach.step2.title': '戦略的調達',
            'about.approach.step2.desc': 'グローバルネットワークを活用して、お客様の基準に合う最も信頼できるサプライヤーを特定。',
            'about.approach.step3.title': '品質保証',
            'about.approach.step3.desc': '日本の精密さとスイスの品質基準を使用した厳格な検査とテスト。',
            'about.approach.step4.title': 'シームレスな物流',
            'about.approach.step4.desc': 'リアルタイム追跡による出荷、通関、配送のエンドツーエンド調整。',
            'about.approach.step5.title': '継続的サポート',
            'about.approach.step5.desc': 'アフターサービスとサプライチェーン最適化による継続的なパートナーシップ。',

            'about.geographic.subtitle': 'グローバルプレゼンス',
            'about.geographic.title': '私たちの活動地域',
            'about.geographic.description': '信頼できる調達と物流の専門知識で3大陸を結ぶ。',
            'about.geographic.asia.name': 'アジア',
            'about.geographic.asia.desc': '中国、日本、韓国、タイ、ベトナム、東南アジア全域での製造・調達における深いパートナーシップ。',
            'about.geographic.asia.h1': '製造拠点',
            'about.geographic.asia.h2': '原材料調達',
            'about.geographic.asia.h3': '電子部品',
            'about.geographic.europe.name': 'ヨーロッパ',
            'about.geographic.europe.desc': 'スイス、ドイツ、フランス、EU全域での精密エンジニアリングとプレミアム品質基準のための戦略的接続。',
            'about.geographic.europe.h1': '精密エンジニアリング',
            'about.geographic.europe.h2': '品質認証',
            'about.geographic.europe.h3': '先端材料',
            'about.geographic.america.name': 'アメリカ',
            'about.geographic.america.desc': '北米・南米での流通、ラストマイル物流、市場インテリジェンスのための確立されたプレゼンス。',
            'about.geographic.america.h1': '流通ネットワーク',
            'about.geographic.america.h2': '市場インテリジェンス',
            'about.geographic.america.h3': '通関専門知識',

            'about.industries.subtitle': '各セクターの専門知識',
            'about.industries.title': '私たちがサービスを提供する業界',
            'about.industries.polymers': 'ポリマー・化学品',
            'about.industries.electronics': '電子部品',
            'about.industries.packaging': 'パッケージングソリューション',
            'about.industries.industrial': '産業機器',
            'about.industries.hardware': 'ハードウェア・ファスナー',
            'about.industries.engineering': 'エンジニアリングサービス',
            'about.industries.automotive': '自動車部品',
            'about.industries.medical': '医療機器',

            'about.cta.title': 'KOATSUの違いを体験する準備はできましたか？',
            'about.cta.description': 'グローバルネットワークと専門知識がプレミアム品質を維持しながらサプライチェーンを最適化しコストを削減する方法についてお話しましょう。',
            'about.cta.services': 'サービスを見る',
            'about.cta.services.sub': '私たちにできることを発見',
            'about.cta.contact': 'お問い合わせ',
            'about.cta.contact.sub': '会話を始めましょう',

            // ============ SERVICES PAGE ============
            'services.hero.title': 'サービス',
            'services.intro.subtitle': '私たちの専門知識',
            'services.intro.title': 'ビジネスのための包括的ソリューション',
            'services.intro.description': 'KOATSUは日本の精密さとスイスの信頼性を組み合わせ、世界クラスの調達、物流、品質管理サービスを提供します。グローバル産業サプライチェーン管理における信頼できるパートナーです。',

            // Service 1 - Global Sourcing
            'services.sourcing.title': 'グローバル調達＆産業供給',
            'services.sourcing.description': 'ほとんどの業界と製品カテゴリのメーカーと協力し、柔軟性、信頼性、パフォーマンスを確保します。',
            'services.sourcing.polymers': 'ポリマー＆添加剤：',
            'services.sourcing.polymers.desc': 'SBS、SEBS、樹脂、合成ゴム、可塑剤',
            'services.sourcing.chemicals': '化学品＆コーティング：',
            'services.sourcing.chemicals.desc': '溶剤、顔料、プロセスオイル、硬化剤',
            'services.sourcing.electronic': '電子＆精密部品：',
            'services.sourcing.electronic.desc': 'PCB、コネクタ、ハーネス、機械加工部品',
            'services.sourcing.packaging': '産業パッケージング：',
            'services.sourcing.packaging.desc': 'フィルム、カートン、缶、帯電防止ボックス、ヒートシール製品',
            'services.sourcing.hardware': 'ハードウェア＆機械部品：',
            'services.sourcing.hardware.desc': 'ファスナー、ロック、カスタムツーリング',
            'services.getstarted': '始める',

            // Service 2 - Supply Chain
            'services.supplychain.title': 'サプライチェーン＆物流',
            'services.supplychain.description': 'あらゆるプロジェクト、あらゆる地域に柔軟なソリューション。完全なエンドツーエンド物流管理。',
            'services.supplychain.freight': '海上・航空・陸上輸送',
            'services.supplychain.freight.desc': 'マルチモーダル輸送ソリューション',
            'services.supplychain.consolidation': 'マルチサプライヤー統合',
            'services.supplychain.consolidation.desc': 'コスト最適化と複雑さの軽減',
            'services.supplychain.documentation': '書類＆通関',
            'services.supplychain.documentation.desc': 'LC、船荷証券、原産地証明書管理',
            'services.supplychain.inspection': '出荷前検査',
            'services.supplychain.inspection.desc': '品質チェック＆一時保管',
            'services.supplychain.traceability': 'トレーサビリティ＆コスト最適化',
            'services.supplychain.traceability.desc': 'リアルタイム追跡と効率化',

            // Service 3 - Quality Control
            'services.quality.title': '品質管理＆監査',
            'services.quality.badge.jp': '日本基準',
            'services.quality.badge.ch': 'スイスの精密さ',
            'services.quality.description': '私たちの優先事項：<strong>ゼロ欠陥パフォーマンス</strong>。あらゆる段階で最高の品質基準を確保します。',
            'services.quality.audits': 'サプライヤー＆工場監査',
            'services.quality.audits.desc': '品質、生産能力、ESGコンプライアンス',
            'services.quality.fai': '初回製品検査（FAI）',
            'services.quality.fai.desc': '初期生産サンプルの検証',
            'services.quality.followup': '現場生産フォローアップ',
            'services.quality.followup.desc': '製造中の継続的モニタリング',
            'services.quality.certification': '認証コンプライアンス',
            'services.quality.certification.desc': 'ISO、RoHS、REACHなど',
            'services.quality.improvement': '継続的改善レポート',
            'services.quality.improvement.desc': 'データドリブンな品質向上',

            // Service 4 - Strategic Consulting
            'services.consulting.title': '戦略コンサルティング',
            'services.consulting.description': 'すべてのクライアントは<strong>カスタムメイドのアプローチ</strong>に値するから。調達戦略の最適化をサポートします。',
            'services.consulting.scouting': 'サプライヤースカウティング＆交渉',
            'services.consulting.scouting.desc': '最適なパートナーを見つけ、最適な条件を確保',
            'services.consulting.cost': 'コスト最適化',
            'services.consulting.cost.desc': '品質を損なうことなく経費削減',
            'services.consulting.development': '製品開発サポート',
            'services.consulting.development.desc': 'コンセプトから市場投入可能なソリューションまで',
            'services.consulting.market': '市場インテリジェンス',
            'services.consulting.market.desc': '業界インサイトと調達戦略',
            'services.consulting.training': 'ナレッジトランスファー＆トレーニング',
            'services.consulting.training.desc': '文化的インサイトとベストプラクティス',

            // Why Choose Us
            'services.why.subtitle': 'なぜKOATSU',
            'services.why.title': 'グローバル貿易における信頼できるパートナー',
            'services.why.description': '日本の精密さとスイスの信頼性を組み合わせ、あらゆる段階で卓越性を提供します。',
            'services.why.network.title': 'グローバルネットワーク',
            'services.why.network.desc': 'アジア、アメリカ、ヨーロッパ全域にわたる幅広いパートナーシップで、シームレスな調達と信頼性の高いサプライチェーンソリューションを提供します。',
            'services.why.zerodefect.title': 'ゼロ欠陥フォーカス',
            'services.why.zerodefect.desc': '完璧な結果のための日本の品質基準とスイスの精密さの組み合わせ。',
            'services.why.team.title': '専門チーム',
            'services.why.team.desc': '深い業界知識と文化的専門知識を持つ多言語プロフェッショナル。',
            'services.why.custom.title': 'カスタムソリューション',
            'services.why.custom.desc': 'お客様独自のビジネスニーズに特化して設計されたアプローチ。',
            'services.why.cost.title': 'コスト最適化',
            'services.why.cost.desc': '透明な価格設定と収益を削減する効率化の改善。',
            'services.why.confidentiality.title': '機密性',
            'services.why.confidentiality.desc': 'お客様のビジネス情報と企業秘密は常に保護されます。',
            'services.why.risk.title': 'リスク管理',
            'services.why.risk.desc': 'サプライチェーンリスクを最小化するための包括的なサプライヤー審査と継続的モニタリング。',
            'services.why.support.title': '24時間サポート',
            'services.why.support.desc': 'タイムゾーンを超えた24時間体制のサポートで、お客様の業務をスムーズに維持。',

            // CTA
            'services.cta.title': 'サプライチェーンを最適化する準備はできましたか？',
            'services.cta.description': 'KOATSUがお客様の調達と物流の目標達成をどのようにサポートできるか、お話しましょう。ビジネスニーズに合わせた無料コンサルテーションについて、今すぐお問い合わせください。',
            'services.cta.consultation': '相談をリクエスト',
            'services.cta.email': 'メールを送る',

            // ============ CONTACT PAGE ============
            'contact.hero.title': 'お問い合わせ',
            'contact.intro.subtitle': 'ご連絡ください',
            'contact.intro.title': '会話を始めましょう',
            'contact.intro.lead': '信頼できる調達、戦略的コンサルティング、シームレスな物流ソリューションをお探しの方、当社のチームがお客様の目標達成をサポートいたします。',

            // Locations
            'contact.locations.subtitle': '拠点所在地',
            'contact.locations.title': '私たちの拠点',
            'contact.locations.tokyo.name': '本社 — 東京、日本',
            'contact.locations.tokyo.type': '戦略本部およびクライアントリレーションハブ。',
            'contact.locations.xiamen.name': 'アジア事業 — 厦門、中国',
            'contact.locations.xiamen.type': '製造調整および物流ハブ。',
            'contact.locations.xiamen.desc1': '世界クラスの物流を持つダイナミックな沿岸都市、厦門は中国の製造業、日本の貿易、グローバル輸出ネットワークの交差点に位置しています。',
            'contact.locations.xiamen.desc2': '<strong>深圳</strong>、<strong>広州</strong>、<strong>台湾</strong>への近接性により、サプライヤー調整と出荷統合に最適な場所です。',

            // Maps
            'contact.maps.subtitle': '地図で探す',
            'contact.maps.title': 'グローバルプレゼンス',
            'contact.maps.tokyo': '東京、日本',
            'contact.maps.tokyo.info': '戦略本部およびクライアントリレーションハブ',
            'contact.maps.xiamen': '厦門、中国',
            'contact.maps.xiamen.info': '製造調整および物流ハブ',

            // Why Koatsu
            'contact.why.subtitle': 'なぜKoatsu',
            'contact.why.title': '日本の魂を持つグローバル調達',
            'contact.why.item1': '日本と中国にまたがる多国籍プレゼンス',
            'contact.why.item2': 'アジアとヨーロッパの認定メーカーの信頼できるネットワーク',
            'contact.why.item3': '産業、電子、パッケージング分野での実績ある専門知識',
            'contact.why.item4': 'エンドツーエンドの物流ソリューション：海上、航空、陸上輸送',
            'contact.why.item5': '厳格な品質管理と工場監査',
            'contact.why.item6': 'サプライチェーン最適化のための戦略コンサルティング',
            'contact.why.item7': '日本のミニマリズムに着想を得たリーンで規律ある運営',

            // Form
            'contact.form.title': 'メッセージを送る',
            'contact.form.name': 'お名前',
            'contact.form.email': 'メールアドレス',
            'contact.form.company': '会社名',
            'contact.form.subject': '件名',
            'contact.form.message': 'メッセージ',
            'contact.form.required': '*',
            'contact.form.submit': 'メッセージを送信',
            'contact.form.success.title': 'メッセージが正常に送信されました！',
            'contact.form.success.text': 'お問い合わせいただきありがとうございます。確認メールをお送りしました。1〜2営業日以内にご連絡いたします。',
            'contact.form.error.title': 'エラー',

            // Contact Info
            'contact.info.subtitle': 'お問い合わせ',
            'contact.info.title': 'Koatsu Limited',
            'contact.info.locations': '東京 | 厦門',
            'contact.info.email.title': 'メール',
            'contact.info.hours.title': '営業時間',
            'contact.info.hours.value': '月〜金：9:00 - 18:00 JST',
            'contact.info.tagline': '日本の魂を持つグローバル調達。'
        }
    },

    /**
     * Initialise le système i18n
     */
    init() {
        // Récupérer la langue depuis l'attribut data du body ou le cookie
        const body = document.body;
        const cookieLang = this.getCookie('koatsu_language');

        // Priorité: 1. Cookie, 2. Attribut data du body, 3. Défaut
        this.currentLang = cookieLang || body.dataset.language || this.config.defaultLang;
        this.cookieConsent = body.dataset.consent || this.getCookie('koatsu_cookie_consent') || null;

        // Mettre à jour l'attribut data du body si nécessaire
        body.dataset.language = this.currentLang;

        // Appliquer les traductions
        this.applyTranslations();

        // Mettre à jour le sélecteur de langue
        this.updateLanguageSelector();

        // Configurer les écouteurs
        this.setupLanguageListeners();

        // Initialiser la bannière de cookies
        this.initCookieBanner();

        console.log(`[i18n] Initialized - Lang: ${this.currentLang}, Consent: ${this.cookieConsent}`);
    },

    /**
     * Récupère un cookie par son nom
     */
    getCookie(name) {
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            const [cookieName, cookieValue] = cookie.trim().split('=');
            if (cookieName === name) {
                return cookieValue;
            }
        }
        return null;
    },

    /**
     * Applique les traductions à tous les éléments avec data-i18n
     */
    applyTranslations() {
        const elements = document.querySelectorAll('[data-i18n]');

        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.t(key);

            if (translation) {
                // Vérifier si c'est un attribut spécifique
                const attr = element.getAttribute('data-i18n-attr');
                if (attr) {
                    element.setAttribute(attr, translation);
                } else if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    // Pour les inputs, modifier le placeholder
                    if (element.hasAttribute('placeholder')) {
                        element.placeholder = translation;
                    }
                } else {
                    element.innerHTML = translation;
                }
            }
        });

        // Mettre à jour l'attribut lang du document
        document.documentElement.lang = this.currentLang;

        // Mettre à jour le titre de la page
        const pageTitle = this.t('page.title');
        if (pageTitle) {
            document.title = pageTitle;
        }
    },

    /**
     * Récupère une traduction
     */
    t(key) {
        const langData = this.translations[this.currentLang];
        if (langData && langData[key]) {
            return langData[key];
        }

        // Fallback vers l'anglais
        if (this.translations.en && this.translations.en[key]) {
            return this.translations.en[key];
        }

        return null;
    },

    /**
     * Change la langue via l'API Django
     */
    async setLanguage(lang) {
        if (!this.config.supportedLangs.includes(lang)) {
            console.warn(`[i18n] Unsupported language: ${lang}`);
            return false;
        }

        try {
            // Appeler l'API Django
            const response = await fetch(this.config.apiEndpoints.setLanguage, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': this.getCSRFToken()
                },
                body: JSON.stringify({ language: lang })
            });

            if (response.ok) {
                this.currentLang = lang;
                document.body.dataset.language = lang;
                this.applyTranslations();
                this.updateLanguageSelector();
                console.log(`[i18n] Language changed to: ${lang}`);
                return true;
            }
        } catch (error) {
            console.error('[i18n] Error setting language:', error);
        }

        return false;
    },

    /**
     * Met à jour l'interface du sélecteur de langue
     */
    updateLanguageSelector() {
        // Mettre à jour le bouton desktop
        const langButton = document.querySelector('#languageDropdown span');
        if (langButton) {
            langButton.textContent = this.currentLang.toUpperCase();
        }

        // Mettre à jour les liens actifs
        document.querySelectorAll('[href*="?lang="]').forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.includes(`lang=${this.currentLang}`)) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    },

    /**
     * Configure les écouteurs pour le changement de langue
     */
    setupLanguageListeners() {
        document.addEventListener('click', (e) => {
            const langLink = e.target.closest('[href*="?lang="]');
            if (langLink) {
                e.preventDefault();
                const href = langLink.getAttribute('href');
                const params = new URLSearchParams(href.split('?')[1]);
                const lang = params.get('lang');
                if (lang) {
                    this.setLanguage(lang);
                }
            }
        });
    },

    /**
     * Initialise la bannière de consentement cookies
     */
    initCookieBanner() {
        const banner = document.getElementById('cookieConsentBanner');
        if (!banner) return;

        // Bouton Accepter
        const acceptBtn = document.getElementById('cookieAccept');
        if (acceptBtn) {
            acceptBtn.addEventListener('click', () => this.setCookieConsent('accepted'));
        }

        // Bouton Refuser
        const rejectBtn = document.getElementById('cookieReject');
        if (rejectBtn) {
            rejectBtn.addEventListener('click', () => this.setCookieConsent('rejected'));
        }

        // Bouton Personnaliser
        const settingsBtn = document.getElementById('cookieSettings');
        const settingsPanel = document.getElementById('cookieSettingsPanel');
        if (settingsBtn && settingsPanel) {
            settingsBtn.addEventListener('click', () => {
                settingsPanel.hidden = !settingsPanel.hidden;
            });
        }

        // Bouton Fermer les paramètres
        const closeBtn = document.getElementById('cookieSettingsClose');
        if (closeBtn && settingsPanel) {
            closeBtn.addEventListener('click', () => {
                settingsPanel.hidden = true;
            });
        }

        // Bouton Sauvegarder les préférences
        const saveBtn = document.getElementById('cookieSaveSettings');
        if (saveBtn) {
            saveBtn.addEventListener('click', () => {
                const preferencesEnabled = document.getElementById('cookiePreferences')?.checked;
                // Si les préférences sont activées, on accepte
                this.setCookieConsent(preferencesEnabled ? 'accepted' : 'rejected');
            });
        }
    },

    /**
     * Définit le consentement aux cookies via l'API Django
     */
    async setCookieConsent(consent) {
        try {
            const response = await fetch(this.config.apiEndpoints.setCookieConsent, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': this.getCSRFToken()
                },
                body: JSON.stringify({ consent: consent })
            });

            if (response.ok) {
                this.cookieConsent = consent;
                document.body.dataset.consent = consent;
                this.hideCookieBanner();
                console.log(`[i18n] Cookie consent: ${consent}`);
                return true;
            }
        } catch (error) {
            console.error('[i18n] Error setting cookie consent:', error);
        }

        return false;
    },

    /**
     * Cache la bannière de cookies avec animation
     */
    hideCookieBanner() {
        const banner = document.getElementById('cookieConsentBanner');
        if (banner) {
            banner.classList.add('hiding');
            setTimeout(() => {
                banner.remove();
            }, 400);
        }
    },

    /**
     * Récupère le token CSRF de Django
     */
    getCSRFToken() {
        // Chercher dans les cookies
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            const [name, value] = cookie.trim().split('=');
            if (name === 'csrftoken') {
                return value;
            }
        }

        // Chercher dans un input hidden
        const csrfInput = document.querySelector('[name=csrfmiddlewaretoken]');
        if (csrfInput) {
            return csrfInput.value;
        }

        return '';
    }
};

// Initialiser au chargement du DOM
document.addEventListener('DOMContentLoaded', () => {
    I18n.init();
});

// Exporter pour utilisation externe
window.I18n = I18n;
