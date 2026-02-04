import pandas as pd
import numpy as np
import random

# Constants
N_RESPONDENTS = 206
SEED = 2026

# Set seed for reproducibility
np.random.seed(SEED)
random.seed(SEED)

def generate_likert(mean, std, n, min_val=1, max_val=5):
    """Generate Likert scale data clipped to range."""
    data = np.random.normal(mean, std, n)
    data = np.round(data)
    data = np.clip(data, min_val, max_val)
    return data.astype(int)

# --- 1. Demographics Simulation ---
# Target: Middle-High Income Urban Youth (Millennials/Gen Z)
age = np.random.randint(18, 35, N_RESPONDENTS)
gender_probs = [0.45, 0.54, 0.01] # Male, Female, Other (Slight female bias for fashion)
gender = np.random.choice(['Male', 'Female', 'Non-binary'], N_RESPONDENTS, p=gender_probs)

# NCCS Grades (A1, A2, A3, B1...) - Skewed towards A/B for "Premium" context
nccs_probs = [0.35, 0.25, 0.20, 0.15, 0.05] 
nccs_grades = np.random.choice(['A1', 'A2', 'A3', 'B1', 'B2'], N_RESPONDENTS, p=nccs_probs)

# --- 2. Psychometric Constructs ---

# A. Environmental Attitude (ATT): High Mean (People *say* they care)
# Mean = 4.2 / 5, Low SD
att_mean = 4.2
att_sd = 0.8 / 7 * 5 # Scale adjustment

# B. Perceived Behavioral Control (PBC): Moderate-Low (Barriers exist)
# Mean = 2.8 / 5
pbc_mean = 2.8
pbc_sd = 1.0

# C. Subjective Norms (SN): Moderate-High (Peer pressure)
# Mean = 3.8 / 5
sn_mean = 3.8
sn_sd = 0.9

# D. Personal Norms (PN): High (Moral obligation)
# Mean = 4.0 / 5
pn_mean = 4.0
pn_sd = 0.8

# E. Green Trust (GT): Moderate (Skepticism exists)
# Mean = 3.2 / 5
gt_mean = 3.2
gt_sd = 1.1

# F. Barriers (Price/Greenwashing) - High
# Mean = 4.1 / 5
barrier_mean = 4.1
barrier_sd = 0.8

# --- 3. Generate Items ---

df = pd.DataFrame({
    'resp_id': range(1, N_RESPONDENTS + 1),
    'Age': age,
    'Gender': gender,
    'NCCS_Grade': nccs_grades
})

# Generate construct scores first, then items
constructs = {
    'ATT': generate_likert(att_mean, att_sd, N_RESPONDENTS),
    'PBC': generate_likert(pbc_mean, pbc_sd, N_RESPONDENTS),
    'SN': generate_likert(sn_mean, sn_sd, N_RESPONDENTS),
    'PN': generate_likert(pn_mean, pn_sd, N_RESPONDENTS),
    'GT': generate_likert(gt_mean, gt_sd, N_RESPONDENTS),
    'BAR': generate_likert(barrier_mean, barrier_sd, N_RESPONDENTS),
}

# Add items with slight noise around the construct score
# 5 items for Attitude, 3 for others typically
for i in range(1, 6):
    df[f'ATT_{i}'] = generate_likert(constructs['ATT'], 0.5, N_RESPONDENTS, 1, 7) # 7-point scale for Attitude

for i in range(1, 6): # NEP (Worldview) - Correlated with Attitude
    df[f'NEP_{i}'] = generate_likert(constructs['ATT'] * 0.8 + 1, 0.8, N_RESPONDENTS)

for i in range(1, 3): df[f'SN_{i}'] = generate_likert(constructs['SN'], 0.6, N_RESPONDENTS)
for i in range(1, 3): df[f'PN_{i}'] = generate_likert(constructs['PN'], 0.6, N_RESPONDENTS)
for i in range(1, 3): df[f'PBC_{i}'] = generate_likert(constructs['PBC'], 0.7, N_RESPONDENTS)
for i in range(1, 3): df[f'GT_{i}'] = generate_likert(constructs['GT'], 0.7, N_RESPONDENTS)
for i in range(1, 4): df[f'BAR_{i}'] = generate_likert(constructs['BAR'], 0.6, N_RESPONDENTS)

# --- 4. The "Gap" Logic: Purchase Intention (PI) & Behavior (AB) ---

# Logic: PI is driven by ATT, SN, PBC (Theory of Planned Behavior)
# PI = 0.4*ATT + 0.3*SN + 0.3*PBC + Noise
pi_raw = (0.4 * constructs['ATT'] + 0.3 * constructs['SN'] + 0.3 * constructs['PBC']) 
# Behavior is PI minus Barriers (The Gap)
# AB = PI - 0.5*BAR
ab_raw = pi_raw - (0.4 * constructs['BAR'])

# Clip and Integerize
df['PI_1'] = generate_likert(pi_raw, 0.7, N_RESPONDENTS)
df['WTP_1'] = generate_likert(pi_raw - 0.5, 0.8, N_RESPONDENTS) # WTP is usually lower than PI
df['AB_1_Circular'] = generate_likert(ab_raw, 0.9, N_RESPONDENTS)
df['AB_2_Wash'] = generate_likert(ab_raw + 0.2, 0.9, N_RESPONDENTS) # Washing cold is easier
df['AB_3_Label'] = generate_likert(ab_raw, 0.9, N_RESPONDENTS)

# --- 5. Export ---
print(f"Generated {N_RESPONDENTS} responses.")
print("Attitude Mean:", df[[c for c in df.columns if 'ATT' in c]].mean().mean())
print("Behavior Mean:", df[[c for c in df.columns if 'AB' in c]].mean().mean())
print(f"Gap Detected: {df[[c for c in df.columns if 'ATT' in c]].mean().mean() - df[[c for c in df.columns if 'AB' in c]].mean().mean():.2f}")

df.to_csv('survey_data_n206.csv', index=False)
