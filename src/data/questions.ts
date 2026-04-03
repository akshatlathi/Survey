export interface QuestionItem {
    id: string;
    type: 'likert' | 'semantic' | 'text';
    text: string;
    labels?: [string, string];
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
        title: 'Section 3: Attitudes, Beliefs & Influences',
        description: 'Scale: 1 = Strongly Disagree to 5 = Strongly Agree',
        questions: [
            { id: 'FI1', type: 'likert', text: 'I consider myself a fashion trend follower.' },
            { id: 'FI2', type: 'likert', text: 'It is important to me to be well-dressed.' },
            { id: 'EK1', type: 'likert', text: 'I am knowledgeable about the environmental impact of the fashion industry.' },
            { id: 'EK2', type: 'likert', text: 'I understand phrases like “Carbon Footprint.”' },
            { id: 'EK3', type: 'likert', text: 'I understand the concept of a “Circular Economy” in fashion.' },
            { id: 'EK4', type: 'likert', text: 'I am well-informed about sustainable materials in fashion.' },
            { id: 'EK5', type: 'likert', text: 'I am aware of ethical labor practices in the fashion industry.' },
            { id: 'EC1', type: 'likert', text: 'I feel concerned about the environmental impact of fast fashion.' },
            { id: 'EC2', type: 'likert', text: 'I am worried about the social consequences (e.g., labor issues) of conventional fashion.' },
            { id: 'EC3', type: 'likert', text: 'Protecting the environment is a high priority for me when making purchase decisions.' },
            { id: 'EC4', type: 'likert', text: 'I would feel guilty if I bought fast fashion when green options were available.' },
            { id: 'EC5', type: 'likert', text: 'I feel a moral obligation to protect the environment through my purchases.' },
            { id: 'ATT1', type: 'likert', text: 'Buying sustainable fashion is good.' },
            { id: 'ATT2', type: 'likert', text: 'Buying sustainable fashion is beneficial.' },
            { id: 'ATT3', type: 'likert', text: 'Buying sustainable fashion is pleasant.' },
            { id: 'ATT4', type: 'likert', text: 'I have a favorable opinion towards sustainable fashion.' },
            { id: 'ATT5', type: 'likert', text: 'I believe sustainable fashion is important for the environment.' },
            { id: 'ATT6', type: 'likert', text: 'I believe sustainable fashion is important for society.' },
            { id: 'SN1', type: 'likert', text: 'People who are important to me (friends, family) think I should buy eco-friendly clothes.' },
            { id: 'SN2', type: 'likert', text: 'My close friends often purchase sustainable fashion.' },
            { id: 'SN3', type: 'likert', text: 'Most people whose opinions I value would approve of me buying sustainable fashion.' },
            { id: 'SN4', type: 'likert', text: 'I feel social pressure to buy sustainable fashion.' },
            { id: 'PBC1', type: 'likert', text: 'Whether I buy sustainable fashion is entirely up to me.' },
            { id: 'PBC2', type: 'likert', text: 'I have the time and resources to shop sustainably.' },
            { id: 'PBC3', type: 'likert', text: 'I find it easy to purchase sustainable fashion products.' },
            { id: 'PBC4', type: 'likert', text: 'I am confident in my ability to find sustainable fashion options.' },
            { id: 'PBC5', type: 'likert', text: 'I have control over my decision to buy sustainable fashion.' },
            { id: 'PCE1', type: 'likert', text: 'My purchase of sustainable fashion can make a difference.' },
            { id: 'PCE2', type: 'likert', text: 'Individual consumers can help solve environmental problems through sustainable fashion.' },
            { id: 'PCE3', type: 'likert', text: 'The actions of consumers like me can influence brands to become more sustainable.' },
            { id: 'PCE4', type: 'likert', text: 'I feel empowered to contribute to sustainable fashion by my choices.' }
        ]
    },
    {
        id: '2',
        title: 'Section 4: Realities & Barriers',
        description: 'Scale: 1 = Strongly Disagree to 5 = Strongly Agree',
        questions: [
            { id: 'PS1', type: 'likert', text: 'Sustainable fashion is often too expensive for my budget.' },
            { id: 'PS2', type: 'likert', text: 'I would buy sustainable clothes if they cost the same as regular clothes.' },
            { id: 'PS3', type: 'likert', text: 'I am willing to pay 20% more for a sustainable garment.' },
            { id: 'PS4', type: 'likert', text: 'Price is the most important factor in my fashion purchases.' },
            { id: 'SKE1', type: 'likert', text: 'Most “eco-friendly” collections are just marketing gimmicks.' },
            { id: 'SKE2', type: 'likert', text: 'It is difficult to distinguish true sustainable brands from fake ones.' },
            { id: 'TRU1', type: 'likert', text: 'I trust the environmental claims made by certified sustainable brands.' },
            { id: 'TRU2', type: 'likert', text: 'Sustainable brands generally keep their promises regarding ethical practices.' },
            { id: 'TRU3', type: 'likert', text: 'I believe that third-party certifications (e.g., GOTS) ensure a product\'s sustainability.' },
            { id: 'TRU4', type: 'likert', text: 'I am confident that information about a brand\'s sustainability is accurate.' },
            { id: 'SMI1', type: 'likert', text: 'I often discover new clothing brands on Instagram/TikTok.' },
            { id: 'SMI2', type: 'likert', text: 'Social media influencers affect my clothing choices.' },
            { id: 'SMI3', type: 'likert', text: 'My peers\' sustainable fashion choices influence my own.' },
            { id: 'SMI4', type: 'likert', text: 'I learn about sustainable fashion options from social media.' },
            { id: 'SMI5', type: 'likert', text: 'Positive reviews/comments on social media encourage me to buy sustainable fashion.' },
            { id: 'AVA1', type: 'likert', text: 'Sustainable fashion products are easily available to me in stores or online.' },
            { id: 'AVA2', type: 'likert', text: 'I have access to a sufficient variety of sustainable fashion styles.' },
            { id: 'AVA3', type: 'likert', text: 'Sustainable fashion options are convenient to purchase.' }
        ]
    },
    {
        id: '3',
        title: 'Section 5: Intentions & Behavior',
        description: 'Scale: 1 = Strongly Disagree to 5 = Strongly Agree',
        questions: [
            { id: 'PI1', type: 'likert', text: 'I intend to buy sustainable fashion products in the next 3 months.' },
            { id: 'PI2', type: 'likert', text: 'I plan to switch to eco-friendly brands for my future purchases.' },
            { id: 'PI3', type: 'likert', text: 'I will actively seek out sustainable fashion options for my next purchase.' },
            { id: 'PI4', type: 'likert', text: 'My next fashion purchase is very likely to be a sustainable product.' },
            { id: 'PI5', type: 'likert', text: 'I have a strong intention to increase my sustainable fashion consumption.' },
            { id: 'AB1', type: 'likert', text: 'In the past 6 months, I have actively purchased sustainable clothing.' },
            { id: 'AB2', type: 'likert', text: 'I frequently check labels for material composition (e.g., organic cotton, recycled).' },
            { id: 'AB3', type: 'likert', text: 'I have repaired or upcycled clothing instead of throwing it away.' },
            { id: 'AB4', type: 'likert', text: 'I choose sustainable options over conventional ones when available and affordable.' }
        ]
    }
];
