// import { SurveyResponse } from '../types/survey';

export interface QuestionItem {
    id: string;
    type: 'likert' | 'semantic' | 'text';
    text: string;
    labels?: [string, string]; // For semantic diff (e.g., ["Bad", "Good"])
    reverse?: boolean;
}

export interface SurveySectionData {
    id: string;
    title: string;
    description: string;
    questions: QuestionItem[];
}

export const SURVEY_SECTIONS: SurveySectionData[] = [
    {
        id: '1',
        title: 'Part I: Fashion & You',
        description: 'We want to understand your general relationship with fashion and the environment.',
        questions: [
            // H6: Fashion Involvement
            { id: 'FI_1', type: 'likert', text: 'I consider myself a fashion trend follower.' },
            { id: 'FI_2', type: 'likert', text: 'It is important to me to be well-dressed.' },

            // H4: Environmental Knowledge
            { id: 'EK_1', type: 'likert', text: 'I am knowledgeable about the environmental impact of the fashion industry.' },
            { id: 'EK_2', type: 'likert', text: 'I understand phrases like "Carbon Footprint" and "Circular Economy".' },

            // H10: Greenwashing Perception
            { id: 'GW_1', type: 'likert', text: 'Most "eco-friendly" collections are just marketing gimmicks.' },
            { id: 'GW_2', type: 'likert', text: 'It is difficult to distinguish true sustainable brands from fake ones.' },

            // H12: Social Media Usage
            { id: 'SM_1', type: 'likert', text: 'I often discover new clothing brands on Instagram/TikTok.' },
            { id: 'SM_2', type: 'likert', text: 'Influencers I follow affect my clothing choices.' },
        ]
    },
    {
        id: '2',
        title: 'Part II: Your Views',
        description: 'Please evaluate your feelings toward purchasing sustainable fashion.',
        questions: [
            // H1: Attitude (Semantic Differential)
            { id: 'ATT_1', type: 'semantic', text: 'Buying sustainable fashion is:', labels: ['Bad', 'Good'] },
            { id: 'ATT_2', type: 'semantic', text: 'Buying sustainable fashion is:', labels: ['Harmful', 'Beneficial'] },
            { id: 'ATT_3', type: 'semantic', text: 'Buying sustainable fashion is:', labels: ['Unpleasant', 'Pleasant'] },
            { id: 'ATT_4', type: 'semantic', text: 'Buying sustainable fashion is:', labels: ['Foolish', 'Wise'] },

            // H2: Subjective Norms
            { id: 'SN_1', type: 'likert', text: 'People who are important to me think I should buy eco-friendly clothes.' },
            { id: 'SN_2', type: 'likert', text: 'My close friends often purchase sustainable fashion.' },

            // H3: Perceived Behavioral Control
            { id: 'PBC_1', type: 'likert', text: 'Whether I buy sustainable fashion is entirely up to me.' },
            { id: 'PBC_2', type: 'likert', text: 'I have the time and resources to shop sustainably.' },

            // H5: Personal Norms
            { id: 'PN_1', type: 'likert', text: 'I would feel guilty if I bought fast fashion when green options were available.' },
            { id: 'PN_2', type: 'likert', text: 'I feel a moral obligation to protect the environment through my purchases.' },
        ]
    },
    {
        id: '3',
        title: 'Part III: Realities & Barriers',
        description: 'What stops you (or helps you) when you shop?',
        questions: [
            // H7: Green Trust
            { id: 'GT_1', type: 'likert', text: 'I trust the environmental claims made by certified sustainable brands.' },
            { id: 'GT_2', type: 'likert', text: 'Sustainable brands generally keep their promises.' },

            // H9: Price Sensitivity (Barrier)
            { id: 'PS_1', type: 'likert', text: 'Sustainable fashion is often too expensive for my budget.' },
            { id: 'PS_2', type: 'likert', text: 'I would buy sustainable clothes if they cost the same as regular clothes.' },
            { id: 'PS_3_WTP', type: 'likert', text: 'I am willing to pay 20% more for a sustainable garment.' }, // WTP check

            // H11: Availability (Barrier)
            { id: 'AV_1', type: 'likert', text: 'It is hard to find stylish sustainable clothes in my city/online.' },
            { id: 'AV_2', type: 'likert', text: 'The selection of sustainable fashion is too limited for my taste.' },
        ]
    },
    {
        id: '4',
        title: 'Part IV: Action & History',
        description: 'Finally, tell us about your actual habits.',
        questions: [
            // H8: The Gap (Intention vs Behavior)

            // Purchase Intention
            { id: 'PI_1', type: 'likert', text: 'I intend to buy sustainable fashion products in the next 3 months.' },
            { id: 'PI_2', type: 'likert', text: 'I plan to switch to eco-friendly brands for my future purchases.' },

            // Actual Behavior (Past)
            { id: 'AB_1', type: 'likert', text: 'In the past 6 months, I have actively purchased sustainable clothing.' },
            { id: 'AB_2', type: 'likert', text: 'I frequently check labels for material composition (e.g., organic cotton, recycled).' },
            { id: 'AB_3', type: 'likert', text: 'I have repaired or upcycled clothing instead of throwing it away.' },
        ]
    }
];
