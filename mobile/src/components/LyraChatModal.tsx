import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Animated,
  Image,
  Alert,
} from 'react-native';
import {
  X,
  Mic,
  Send,
  Sparkles,
  Volume2,
  VolumeX,
  ShieldCheck,
  Languages,
  Cpu,
  Users,
  Flame,
  CheckCircle2,
} from 'lucide-react-native';
import { HasamiEarth } from '../theme/colors';
import { useZekosStore } from '../store/useZekosStore';
import { TOAST_EMOTIONS } from '../theme/mascotRegistry';
import { ToastEmotion, UserProfile } from '../types';

type NativeLanguage = 'en' | 'hi' | 'ta' | 'te' | 'kn' | 'mr' | 'bn' | 'gu';
type KinshipMode = 'family' | 'respect';

interface ChatMessage {
  id: string;
  sender: 'user' | 'lyra';
  text: string;
  timestamp: string;
  emotion?: ToastEmotion;
}

interface LanguageOption {
  code: NativeLanguage;
  label: string;
}

const LANGUAGES: LanguageOption[] = [
  { code: 'hi', label: 'हिन्दी' },
  { code: 'en', label: 'English' },
  { code: 'ta', label: 'தமிழ்' },
  { code: 'te', label: 'తెలుగు' },
  { code: 'kn', label: 'ಕನ್ನಡ' },
  { code: 'mr', label: 'मराठी' },
  { code: 'bn', label: 'বাংলা' },
  { code: 'gu', label: 'ગુજરાતી' },
];

export const LyraChatModal: React.FC = () => {
  const {
    chatModalVisible,
    setChatModalVisible,
    pantry,
    meals,
    members,
    currentUser,
    household,
    pod,
    setMascotEmotion,
    startCookingMeal,
  } = useZekosStore();

  const [selectedLang, setSelectedLang] = useState<NativeLanguage>('hi');
  const [kinshipMode, setKinshipMode] = useState<KinshipMode>('family');
  const [showBrainHUD, setShowBrainHUD] = useState<boolean>(true);
  const [inputQuery, setInputQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [speakingMsgId, setSpeakingMsgId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [rateLimitCounter, setRateLimitCounter] = useState(0);

  const pulseAnim = useRef(new Animated.Value(1)).current;
  const soundWaveAnim = useRef(new Animated.Value(1)).current;
  const scrollViewRef = useRef<ScrollView>(null);

  // Helper: Resolve dynamic honorific addressing
  const getAddressName = (
    user: UserProfile,
    lang: NativeLanguage,
    mode: KinshipMode
  ): string => {
    const isMom = user.name.toLowerCase().includes('priya') || user.role === 'head';
    if (mode === 'family') {
      if (isMom) {
        if (lang === 'hi') return 'मम्मी जी';
        if (lang === 'ta') return 'பிரியா அம்மா';
        if (lang === 'te') return 'అమ్మ గారు';
        if (lang === 'kn') return 'ಅಮ್ಮ';
        if (lang === 'mr') return 'आई';
        if (lang === 'bn') return 'মা';
        if (lang === 'gu') return 'મમ્મી જી';
        return 'Mummy ji';
      }
    }
    // Respect Mode
    if (lang === 'hi') return 'प्रिया जी';
    if (lang === 'ta') return 'பிரியா அக்கா';
    if (lang === 'te') return 'ప్రియ గారు';
    if (lang === 'kn') return 'ಪ್ರಿಯಾ ಅವರೇ';
    if (lang === 'mr') return 'प्रिया ताई';
    if (lang === 'bn') return 'প্রিয়া দিদি';
    if (lang === 'gu') return 'પ્રિયા બેન';
    return 'Dr. Priya';
  };

  // Helper: Build dynamic greeting with Kitchen Brain perception & relational context
  const getDynamicGreeting = (
    lang: NativeLanguage,
    addressName: string
  ): string => {
    switch (lang) {
      case 'hi':
        return `नमस्ते ${addressName}! Kitchen Brain ने आज रात के लिए पालक पनीर और रागी फुल्के चुने हैं। क्रिस्पर में 250g पालक और 200g पनीर कल तक पकाना ज़रूरी है। रोहन आज बाहर डिनर कर रहा है, इसलिए मैंने सुरेश जी, अनन्या और आपके लिए 3 प्लेट तैयार की हैं।`;
      case 'ta':
        return `வணக்கம் ${addressName}! இன்னைக்கு நைட்டு பாலக் பன்னீரும் ராகி ரொட்டியும் செஞ்சிடலாமா? ரோஹன் வெளியில சாப்பிடுறாரு, அதனால நீங்க, சுரேஷ் அண்ணா மற்றும் அனன்யாவுக்கு 3 பேருக்கு பிளான் பண்ணியிருக்கேன்.`;
      case 'te':
        return `నమస్కారం ${addressName}! ఇవాళ రాత్రికి పాలకూర పన్నీర్ మరియు రాగి రోటీలు చేద్దామా? రోహన్ ఇవాళ బయట తింటున్నాడు, అందుకే 3 మందికి ప్లాన్ చేశాను. సురేష్ గారికి లో-జిఐ రోటీలు సరిపోతాయి.`;
      case 'kn':
        return `ನಮಸ್ಕಾರ ${addressName}! ಇವತ್ತು ರಾತ್ರಿಗೆ ಪಾಲಕ್ ಪನ್ನೀರ್ ಮತ್ತು ರಾಗಿ ರೊಟ್ಟಿ ಮಾಡೋಣ್ವಾ? ರೊಹನ್ ಊಟಕ್ಕೆ ಇಲ್ಲ, ಹಾಗಾಗಿ 3 ಜನಕ್ಕೆ ಲೆಕ್ಕ ಹಾಕಿದ್ದೇನೆ.`;
      case 'mr':
        return `नमस्कार ${addressName}! आज रात्री पालक पनीर आणि गरम रागी फुल्के करूया. रोहन आज बाहेर जेवणार आहे, त्यामुळे ३ जणांचा बेत आहे.`;
      case 'bn':
        return `নমস্কার ${addressName}! আজ রাতে পালং পনির আর রাগী রুটি কেমন হয়? রোহন আজ বাইরে খাচ্ছে, তাই ৩ জনের জন্য হিসাব করেছি।`;
      case 'gu':
        return `નમસ્તે ${addressName}! આજે સાંજે પાલક પનીર અને રાગી રોટલી બનાવીએ? રોહન આજે બહાર જમવાનો છે, એટલે ૩ પ્લેટ રેડી થશે.`;
      case 'en':
      default:
        return `Hello ${addressName}! The Kitchen Brain checked your crisper: 250g fresh spinach and 200g paneer must be cooked tonight. Rohan is dining out, so portions are automatically set for 3 (you, Suresh ji, and Ananya).`;
    }
  };

  // Initialize greeting on open, language switch, or kinship mode change
  useEffect(() => {
    if (chatModalVisible) {
      const addressName = getAddressName(currentUser, selectedLang, kinshipMode);
      const greetingText = getDynamicGreeting(selectedLang, addressName);
      setMessages([
        {
          id: 'welcome_msg',
          sender: 'lyra',
          text: greetingText,
          timestamp: 'Just now',
          emotion: 'toast_01_smile_neutral',
        },
      ]);
    }
  }, [chatModalVisible, selectedLang, kinshipMode]);

  // Mic Pulse Animation
  useEffect(() => {
    if (isListening) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.35,
            duration: 650,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 650,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [isListening]);

  // Sound Wave Animation for Lyra Speech
  useEffect(() => {
    if (speakingMsgId) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(soundWaveAnim, {
            toValue: 1.25,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(soundWaveAnim, {
            toValue: 0.85,
            duration: 400,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      soundWaveAnim.setValue(1);
    }
  }, [speakingMsgId]);

  // Toggle Lyra Spoken Voice
  const handleToggleSpeak = (msgId: string) => {
    if (speakingMsgId === msgId) {
      setSpeakingMsgId(null);
    } else {
      setSpeakingMsgId(msgId);
      // Auto dismiss speaking animation after 3.8s
      setTimeout(() => {
        setSpeakingMsgId((curr) => (curr === msgId ? null : curr));
      }, 3800);
    }
  };

  // Security & Anti-Abuse Sanitizer
  const sanitizeInput = (text: string): { isSafe: boolean; cleaned: string } => {
    const maliciousPatterns = [
      /ignore\s+(all\s+)?(previous|prior)\s+instructions/i,
      /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      /system\s*:\s*/i,
      /drop\s+table/i,
      /eval\s*\(/i,
      /you\s+are\s+now\s+in\s+developer\s+mode/i,
    ];

    for (const pattern of maliciousPatterns) {
      if (pattern.test(text)) {
        return { isSafe: false, cleaned: '' };
      }
    }
    return { isSafe: true, cleaned: text.trim().slice(0, 300) };
  };

  const handleSend = (textToSend?: string) => {
    const raw = textToSend || inputQuery;
    if (!raw.trim()) return;

    // Rate Limiting Check (Max 10 per minute)
    if (rateLimitCounter > 10) {
      Alert.alert('Please Wait', 'Lyra is listening carefully. Please wait a few seconds before asking again.');
      return;
    }
    setRateLimitCounter((prev) => prev + 1);

    const { isSafe, cleaned } = sanitizeInput(raw);
    if (!isSafe) {
      const userMsg: ChatMessage = {
        id: `usr_${Date.now()}`,
        sender: 'user',
        text: raw,
        timestamp: 'Just now',
      };
      const defenseMsg: ChatMessage = {
        id: `lyra_${Date.now()}`,
        sender: 'lyra',
        text: 'Main toh sirf aapki rasoi saheli hoon! Chaliye bataiye, aaj khane mein kya bana rahe hain? (I only help with cooking and recipes!)',
        timestamp: 'Just now',
        emotion: 'toast_10_thinking_question',
      };
      setMessages((prev) => [...prev, userMsg, defenseMsg]);
      setInputQuery('');
      setMascotEmotion('toast_10_thinking_question');
      return;
    }

    const userMsg: ChatMessage = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: cleaned,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setMascotEmotion('toast_11_idea_lightbulb');

    // Simulate intelligent culinary reply based on pantry, kinship, and language
    setTimeout(() => {
      const reply = generateCulinaryReply(cleaned, selectedLang, kinshipMode);
      const lyraReply: ChatMessage = {
        id: `lyra_${Date.now()}`,
        sender: 'lyra',
        text: reply.text,
        timestamp: 'Just now',
        emotion: reply.emotion,
      };
      setMessages((prev) => [...prev, lyraReply]);
      setMascotEmotion(reply.emotion);
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 850);
  };

  const generateCulinaryReply = (
    query: string,
    lang: NativeLanguage,
    mode: KinshipMode
  ): { text: string; emotion: ToastEmotion } => {
    const q = query.toLowerCase();
    const addressName = getAddressName(currentUser, lang, mode);

    // Rohan inquiry / Attendance Check
    if (q.includes('rohan') || q.includes('attendance') || q.includes('bahar') || q.includes('out')) {
      if (lang === 'hi') {
        const rohanName = mode === 'family' ? 'रोहन बेटा' : 'रोहन';
        return {
          text: `${rohanName} आज रात कॉलेज इवेंट के कारण बाहर डिनर कर रहा है। इसलिए Kitchen Brain ने डिनर में सामग्री नापकर 4 की जगह सिर्फ 3 थाली (सुरेश जी, अनन्या और आप) के लिए सेट की है! कोई खाना वेस्ट नहीं होगा।`,
          emotion: 'toast_12_reading_recipe_book',
        };
      }
      return {
        text: `Rohan is dining out tonight! The Kitchen Brain has automatically scaled ingredient measurements down to 3 portions (you, Suresh ji, and Ananya). Zero leftover waste!`,
        emotion: 'toast_12_reading_recipe_book',
      };
    }

    // Suresh ji health inquiry
    if (q.includes('suresh') || q.includes('papa') || q.includes('diabetic') || q.includes('sugar') || q.includes('health')) {
      const sureshName = mode === 'family' ? 'सुरेश जी (पापा जी)' : 'सुरेश जी';
      if (lang === 'hi') {
        return {
          text: `${sureshName} के डायबिटिक-केयर (Low-GI) के लिए आज रात का मेन्यू बिल्कुल सुरक्षित है। हमने सफेद चावल या मैदे की जगह रागी-गेहूं के ताज़ा फुल्के चुने हैं, जो ब्लड शुगर को स्थिर रखते हैं।`,
          emotion: 'toast_03_winking_sparkle',
        };
      }
      return {
        text: `Tonight's meal is customized for Suresh ji's Low-GI diabetic care. We've paired Palak Paneer with fiber-dense Ragi Phulkas instead of white carbs, keeping blood glucose completely stable!`,
        emotion: 'toast_03_winking_sparkle',
      };
    }

    // Whistle inquiry / Stove Pod Telemetry
    if (q.includes('siti') || q.includes('whistle') || q.includes('dal') || q.includes('cooker')) {
      if (lang === 'hi') {
        return {
          text: 'तूर दाल के लिए मध्यम आंच पर 3 से 4 सीटी एकदम सही रहेगी। दीवार पर लगे Zekos Pod का व्हिसल सेंसर कनेक्टेड है और सीटियां गिन रहा है!',
          emotion: 'toast_28_puffed_cheeks_steam',
        };
      }
      return {
        text: 'For toor dal, 3 to 4 whistles on medium flame is ideal. The Zekos Wall Pod acoustic sensor is connected and actively tracking whistles!',
        emotion: 'toast_28_puffed_cheeks_steam',
      };
    }

    // Perishables / Pantry Inventory Query
    if (q.includes('milk') || q.includes('doodh') || q.includes('paneer') || q.includes('spinach') || q.includes('palak')) {
      const paneerItem = pantry.find((p) => p.name.toLowerCase().includes('paneer'));
      if (lang === 'hi') {
        return {
          text: `क्रिसपर में 200g फ्रेश पनीर (2 दिन बचे हैं) और 250g ताज़ा पालक (सिर्फ 1 दिन बचा है) है। आज रात पालक पनीर बनाकर इन्हें खराब होने से पहले बचा लेते हैं!`,
          emotion: 'toast_02_excited_cheer',
        };
      }
      return {
        text: `You have 200g Fresh Paneer (2 days left) and 250g Fresh Spinach (1 day left) in the crisper. Cooking tonight saves ₹180 of perishables before spoilage!`,
        emotion: 'toast_02_excited_cheer',
      };
    }

    // Default Dinner Proposal with Full Cognitive Grounding
    if (lang === 'hi') {
      return {
        text: `आज रात का सबसे बेहतरीन बेत पालक पनीर और रागी फुल्के हैं, ${addressName}। यह 25 मिनट में तैयार होगा और फ्रिज का पालक व पनीर पूरी तरह इस्तेमाल कर लेगा। क्या मैं कुकर गाइड शुरू करूँ?`,
        emotion: 'toast_26_chef_hat_spatula',
      };
    } else if (lang === 'ta') {
      return {
        text: `இன்னைக்கு நைட்டு பாலக் பன்னீரும் ராகி ரொட்டியும் பண்ணலாம், ${addressName}. 25 நிமிஷத்துல ரெடி ஆயிடும், கீரையும் தீர்ந்துடும்!`,
        emotion: 'toast_26_chef_hat_spatula',
      };
    } else if (lang === 'te') {
      return {
        text: `ఇవాళ రాత్రికి పాలకూర పన్నీర్ మరియు రాగి ఫుల్కాలు చేద్దాం, ${addressName}. 25 నిమిషాల్లో వేడి వేడిగా సిద్ధమవుతుంది!`,
        emotion: 'toast_26_chef_hat_spatula',
      };
    }

    return {
      text: `Tonight's dinner proposal is Palak Paneer with Ragi Phulkas, ${addressName}. It takes 28 mins, satisfies Suresh ji's low-GI care, and rescues 250g fresh spinach. Shall I sync the cooking steps with the Pod?`,
      emotion: 'toast_26_chef_hat_spatula',
    };
  };

  const handleMicToggle = () => {
    if (!isListening) {
      setIsListening(true);
      setMascotEmotion('toast_10_thinking_question');

      // Simulate capturing vernacular spoken phrase
      setTimeout(() => {
        setIsListening(false);
        const spokenPhrase =
          selectedLang === 'hi'
            ? 'Aaj raat khane mein kya banayein?'
            : selectedLang === 'ta'
            ? 'இன்னைக்கு நைட்டு என்ன சமைக்கலாம்?'
            : 'What should we make for dinner today?';
        handleSend(spokenPhrase);
      }, 2500);
    } else {
      setIsListening(false);
    }
  };

  const currentAddressName = getAddressName(currentUser, selectedLang, kinshipMode);

  return (
    <Modal
      visible={chatModalVisible}
      animationType="slide"
      transparent
      onRequestClose={() => setChatModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalCard}>
          {/* Header */}
          <View style={styles.headerRow}>
            <View style={styles.headerLeft}>
              <View style={styles.mascotBadge}>
                <Image
                  source={TOAST_EMOTIONS['toast_01_smile_neutral']}
                  style={styles.headerMascot}
                  resizeMode="contain"
                />
              </View>
              <View>
                <View style={styles.headerTitleRow}>
                  <Text style={styles.assistantTitle}>LYRA KITCHEN COMPANION</Text>
                  <View style={styles.brainActiveBadge}>
                    <Cpu size={10} color={HasamiEarth.accentSage} />
                    <Text style={styles.brainActiveText}>BRAIN SYNCED</Text>
                  </View>
                </View>
                <Text style={styles.assistantSub}>
                  Addressing: {currentAddressName} • {kinshipMode === 'family' ? 'Desi Ghar Mode' : 'Formal Respect'}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => setChatModalVisible(false)}
              style={styles.closeBtn}
            >
              <X size={18} color={HasamiEarth.textEspresso} />
            </TouchableOpacity>
          </View>

          {/* Kitchen Brain Cognitive HUD Strip */}
          {showBrainHUD && (
            <View style={styles.brainHudStrip}>
              <View style={styles.hudItem}>
                <View style={styles.hudDotGreen} />
                <Text style={styles.hudLabel}>Perception</Text>
                <Text style={styles.hudValue}>18 Items (2 Perishing)</Text>
              </View>
              <View style={styles.hudDivider} />
              <View style={styles.hudItem}>
                <View style={styles.hudDotGreen} />
                <Text style={styles.hudLabel}>Kinship</Text>
                <Text style={styles.hudValue}>3 Attending (Rohan Out)</Text>
              </View>
              <View style={styles.hudDivider} />
              <View style={styles.hudItem}>
                <View style={styles.hudDotGreen} />
                <Text style={styles.hudLabel}>Memory</Text>
                <Text style={styles.hudValue}>14-Day Zero-Repeat</Text>
              </View>
            </View>
          )}

          {/* Multilingual Selector Strip with Kinship Mode Toggle */}
          <View style={styles.langStrip}>
            <View style={styles.langLeft}>
              <Languages size={13} color={HasamiEarth.textMuted} style={{ marginRight: 4 }} />
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {LANGUAGES.map((lang) => {
                  const isSelected = selectedLang === lang.code;
                  return (
                    <TouchableOpacity
                      key={lang.code}
                      onPress={() => setSelectedLang(lang.code)}
                      style={[styles.langChip, isSelected && styles.langChipActive]}
                    >
                      <Text
                        style={[
                          styles.langChipText,
                          isSelected && styles.langChipTextActive,
                        ]}
                      >
                        {lang.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>

            {/* Kinship Mode Toggle Pill */}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setKinshipMode((prev) => (prev === 'family' ? 'respect' : 'family'))}
              style={styles.kinshipToggle}
            >
              <Users size={11} color={HasamiEarth.primaryTerracotta} />
              <Text style={styles.kinshipToggleText}>
                {kinshipMode === 'family' ? 'Desi Ghar' : 'Polite'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Chat Messages */}
          <ScrollView
            ref={scrollViewRef}
            style={styles.messagesScroll}
            contentContainerStyle={styles.messagesContent}
          >
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              const isSpeaking = speakingMsgId === msg.id;

              return (
                <View
                  key={msg.id}
                  style={[
                    styles.messageRow,
                    isUser ? styles.userMessageRow : styles.lyraMessageRow,
                  ]}
                >
                  {!isUser && msg.emotion && (
                    <Image
                      source={TOAST_EMOTIONS[msg.emotion]}
                      style={styles.chatMascotIcon}
                      resizeMode="contain"
                    />
                  )}
                  <View
                    style={[
                      styles.bubble,
                      isUser ? styles.userBubble : styles.lyraBubble,
                    ]}
                  >
                    <Text
                      style={[
                        styles.bubbleText,
                        isUser ? styles.userBubbleText : styles.lyraBubbleText,
                      ]}
                    >
                      {msg.text}
                    </Text>

                    {/* Speech Playing Visualizer */}
                    {isSpeaking && (
                      <Animated.View
                        style={[
                          styles.speakingVisualizer,
                          { transform: [{ scaleY: soundWaveAnim }] },
                        ]}
                      >
                        <Volume2 size={12} color={HasamiEarth.primaryTerracotta} />
                        <Text style={styles.speakingText}>
                          Lyra speaking in {LANGUAGES.find((l) => l.code === selectedLang)?.label}...
                        </Text>
                      </Animated.View>
                    )}

                    <View style={styles.bubbleFooter}>
                      <Text
                        style={[
                          styles.timestampText,
                          isUser ? styles.userTimestamp : styles.lyraTimestamp,
                        ]}
                      >
                        {msg.timestamp}
                      </Text>

                      {/* Text-to-Speech Toggle Button on Lyra messages */}
                      {!isUser && (
                        <TouchableOpacity
                          activeOpacity={0.7}
                          onPress={() => handleToggleSpeak(msg.id)}
                          style={styles.speakIconBtn}
                        >
                          {isSpeaking ? (
                            <VolumeX size={13} color={HasamiEarth.primaryTerracotta} />
                          ) : (
                            <Volume2 size={13} color={HasamiEarth.textMuted} />
                          )}
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                </View>
              );
            })}
          </ScrollView>

          {/* Quick Relational & Brain Prompt Chips */}
          <View style={styles.quickPromptContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {[
                'Aaj kya banayein?',
                'Rohan ka kya plan hai?',
                'Suresh ji ka khana safe hai?',
                'Dal ki siti counter',
                'Start Cooking Tonight',
              ].map((chip, idx) => (
                <TouchableOpacity
                  key={idx}
                  activeOpacity={0.7}
                  onPress={() => {
                    if (chip === 'Start Cooking Tonight') {
                      setChatModalVisible(false);
                      startCookingMeal('dinner_today');
                    } else {
                      handleSend(chip);
                    }
                  }}
                  style={styles.quickChip}
                >
                  <Sparkles size={11} color={HasamiEarth.primaryTerracotta} />
                  <Text style={styles.quickChipText}>{chip}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Voice & Input Footer */}
          <View style={styles.inputFooter}>
            <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleMicToggle}
                style={[
                  styles.micBtn,
                  isListening && styles.micBtnActive,
                ]}
              >
                <Mic
                  size={18}
                  color={isListening ? HasamiEarth.canvasBone : HasamiEarth.primaryTerracotta}
                />
              </TouchableOpacity>
            </Animated.View>

            <TextInput
              style={styles.textInput}
              placeholder={
                isListening
                  ? 'Listening in ' + (LANGUAGES.find((l) => l.code === selectedLang)?.label || 'Hindi') + '...'
                  : 'Ask Lyra anything about dinner, pantry or family...'
              }
              placeholderTextColor={HasamiEarth.textSubtle}
              value={inputQuery}
              onChangeText={setInputQuery}
              onSubmitEditing={() => handleSend()}
            />

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => handleSend()}
              style={styles.sendBtn}
            >
              <Send size={16} color={HasamiEarth.textOnPrimary} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(30, 27, 24, 0.6)',
    justifyContent: 'flex-end',
  },
  modalCard: {
    backgroundColor: HasamiEarth.canvasBone,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    height: '84%',
    paddingBottom: 24,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: HasamiEarth.borderSand,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  mascotBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: HasamiEarth.surfaceLinen,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: HasamiEarth.borderSand,
  },
  headerMascot: {
    width: 30,
    height: 30,
  },
  assistantTitle: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.0,
    color: HasamiEarth.textMuted,
  },
  brainActiveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EDF2EC',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    gap: 3,
  },
  brainActiveText: {
    fontSize: 8,
    fontWeight: '700',
    color: HasamiEarth.accentSage,
    letterSpacing: 0.5,
  },
  assistantSub: {
    fontSize: 11,
    fontWeight: '600',
    color: HasamiEarth.textEspresso,
    marginTop: 2,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: HasamiEarth.surfaceLinen,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: HasamiEarth.borderSand,
  },
  brainHudStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: HasamiEarth.surfaceLinen,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: HasamiEarth.borderSand,
  },
  hudItem: {
    flex: 1,
    alignItems: 'center',
  },
  hudDotGreen: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: HasamiEarth.accentSage,
    marginBottom: 2,
  },
  hudLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: HasamiEarth.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  hudValue: {
    fontSize: 10,
    fontWeight: '600',
    color: HasamiEarth.textEspresso,
    marginTop: 1,
  },
  hudDivider: {
    width: 1,
    height: 18,
    backgroundColor: HasamiEarth.borderSand,
  },
  langStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 7,
    backgroundColor: HasamiEarth.canvasBone,
    borderBottomWidth: 1,
    borderBottomColor: HasamiEarth.borderSand,
  },
  langLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  langChip: {
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: HasamiEarth.surfaceLinen,
    borderWidth: 1,
    borderColor: HasamiEarth.borderSand,
    marginRight: 6,
  },
  langChipActive: {
    backgroundColor: HasamiEarth.primaryTerracotta,
    borderColor: HasamiEarth.primaryTerracotta,
  },
  langChipText: {
    fontSize: 11,
    fontWeight: '600',
    color: HasamiEarth.textEspresso,
  },
  langChipTextActive: {
    color: HasamiEarth.canvasBone,
  },
  kinshipToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF1EB',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E8D5C8',
    gap: 4,
    marginLeft: 6,
  },
  kinshipToggleText: {
    fontSize: 10,
    fontWeight: '700',
    color: HasamiEarth.primaryTerracotta,
  },
  messagesScroll: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
    gap: 12,
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
  },
  userMessageRow: {
    justifyContent: 'flex-end',
  },
  lyraMessageRow: {
    justifyContent: 'flex-start',
  },
  chatMascotIcon: {
    width: 28,
    height: 28,
    marginBottom: 4,
  },
  bubble: {
    maxWidth: '82%',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 16,
  },
  userBubble: {
    backgroundColor: HasamiEarth.primaryTerracotta,
    borderBottomRightRadius: 4,
  },
  lyraBubble: {
    backgroundColor: HasamiEarth.surfaceLinen,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: HasamiEarth.borderSand,
  },
  bubbleText: {
    fontSize: 13,
    lineHeight: 19,
  },
  userBubbleText: {
    color: HasamiEarth.textOnPrimary,
    fontWeight: '500',
  },
  lyraBubbleText: {
    color: HasamiEarth.textEspresso,
  },
  speakingVisualizer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: HasamiEarth.borderSand,
    gap: 6,
  },
  speakingText: {
    fontSize: 10,
    color: HasamiEarth.primaryTerracotta,
    fontStyle: 'italic',
    fontWeight: '600',
  },
  bubbleFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 6,
    gap: 8,
  },
  timestampText: {
    fontSize: 9,
  },
  userTimestamp: {
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'right',
    flex: 1,
  },
  lyraTimestamp: {
    color: HasamiEarth.textMuted,
  },
  speakIconBtn: {
    padding: 3,
    borderRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
  },
  quickPromptContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: HasamiEarth.borderLight,
  },
  quickChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: HasamiEarth.surfaceLinen,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: HasamiEarth.borderSand,
    marginRight: 8,
    gap: 5,
  },
  quickChipText: {
    fontSize: 11,
    fontWeight: '600',
    color: HasamiEarth.textEspresso,
  },
  inputFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    gap: 8,
  },
  micBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: HasamiEarth.surfaceLinen,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: HasamiEarth.primaryTerracotta,
  },
  micBtnActive: {
    backgroundColor: HasamiEarth.primaryTerracotta,
  },
  textInput: {
    flex: 1,
    height: 44,
    backgroundColor: HasamiEarth.surfaceLinen,
    borderRadius: 22,
    paddingHorizontal: 16,
    fontSize: 13,
    color: HasamiEarth.textEspresso,
    borderWidth: 1,
    borderColor: HasamiEarth.borderSand,
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: HasamiEarth.primaryTerracotta,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
