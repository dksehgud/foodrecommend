#!/usr/bin/env python
# coding: utf-8

# In[19]:

import sys
import io
import json
import pandas as pd
from sklearn.model_selection import train_test_split
from catboost import CatBoostClassifier
from sklearn.metrics import accuracy_score
from joblib import dump, load

sys.stdout = io.TextIOWrapper(sys.stdout.detach(), encoding='utf-8')
sys.stderr = io.TextIOWrapper(sys.stderr.detach(), encoding='utf-8')


# 데이터 전처리 함수
def preprocess_data(food_data):
    ambiguous_values = ["알 수 없음", "없음", "있음"]
    filtered_data = food_data.replace(ambiguous_values, pd.NA).dropna()
    
    categorical_features = [
        'spicyPreference', 'meatConsumption', 'tastePreference', 'activityLevel', 'preferenceTypeFood'
    ]
    encoded_data = pd.get_dummies(filtered_data, columns=categorical_features)
    
    return encoded_data

# 모델 학습 및 저장 함수
def train_and_save_models(encoded_data, dependent_vars):
    models = {}
    for var in dependent_vars:
        y = encoded_data[var]
        X = encoded_data.filter(regex='spicyPreference_|meatConsumption_|tastePreference_|activityLevel_|preferenceTypeFood_')
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        
        model = CatBoostClassifier(
            iterations=100, learning_rate=0.1, depth=6, loss_function='MultiClass', verbose=False
        )
        model.fit(X_train, y_train)

        # 모델을 파일로 저장
        filename = f'./controllers/{var}_model.joblib'
        dump(model, filename)

        models[var] = model
    
    return models

# 사용자 입력 변환 함수
def transform_user_input(user_preferences, encoded_columns):
    user_input = {col: 0 for col in encoded_columns}
    for key, value in user_preferences.items():
        feature_name = f"{key}_{value}"
        if feature_name in user_input:
            user_input[feature_name] = 1
    return user_input

# 음식 추천 함수
def recommend_food(transformed_preferences, dependent_vars):
    predictions = {}
    for var in dependent_vars:
        # 저장된 모델 파일 로드
        filename = f'./controllers/{var}_model.joblib'
        model = load(filename)

        user_df = pd.DataFrame([transformed_preferences])
        prediction = model.predict(user_df)
        predictions[var] = prediction[0]
    
    return predictions

# ERR 을 통해 필터링한 음식 데이터 경로를 입력해야합니다
##food_db_path_corrected = 'food_db_result_final.csv' # 여기 수정 필요
##food_db_corrected = pd.read_csv(food_db_path_corrected)

# 유사한 음식을 찾는 함수를 정의합니다.
def find_similar_foods(food_db, predictions, top_n=50):
    # 유사성 점수를 계산하기 위한 새로운 컬럼을 생성합니다.
    food_db['similarity_score'] = 0

    # 각 음식마다 유사성 점수를 계산합니다.
    for index, row in food_db.iterrows():
        score = sum([
            row['mainFoodType'] == predictions['Similar_mainFoodType'][0],
            row['detailedFoodType'] == predictions['Similar_detailedFoodType'][0],
            row['taste'] == predictions['Similar_taste'][0],
            row['mainIngredient'] == predictions['Similar_mainIngredient'][0],
            row['secondaryIngredient'] == predictions['Similar_secondaryIngredient'][0],
            row['cookMethod'] == predictions['Similar_cookingMethod'][0]
        ])
        food_db.at[index, 'similarity_score'] = score

    # 유사성 점수가 가장 높은 상위 N개의 음식을 반환합니다.
    top_foods = food_db.sort_values(by='similarity_score', ascending=False).head(top_n)
    return top_foods

# 데이터 로드 및 전처리
file_path = './public/updated_food_survey_with_attributes.xlsx'
food_data = pd.read_excel(file_path)
encoded_data = preprocess_data(food_data)

# 종속 변수 정의
dependent_vars = [
    'Similar_mainFoodType', 'Similar_detailedFoodType',
    'Similar_taste', 'Similar_mainIngredient',
    'Similar_secondaryIngredient', 'Similar_cookingMethod'
]

# 모델 학습 및 저장
#models = train_and_save_models(encoded_data, dependent_vars)


# 사용자 선호도 예시  # 여기 수정 필요!!!!!!!!!!!!!!!!!!

user_preferences = json.loads(sys.argv[1])
#user_preferences = {
#    'spicyPreference': '매움', 'meatConsumption': '안한다', 
#    'tastePreference': '짠맛', 'activityLevel': '비활동적', 'preferenceTypeFood': '양식'
#}

# 사용자 입력 변환
transformed_preferences = transform_user_input(user_preferences, encoded_data.columns)

# 음식 특성 예측
model_predictions = recommend_food(transformed_preferences, dependent_vars)
result = []
for var, rec in model_predictions.items():
    result.append(f"{var}: {rec[0]}")
#print(json.dumps(result))

food_db_corrected = json.loads(sys.argv[2])
food_db_corrected = pd.DataFrame(food_db_corrected) 
# 가장 유사한 음식을 찾습니다.
similar_foods = find_similar_foods(food_db_corrected, model_predictions)
#print(similar_foods[['name', 'mainFoodType', 'detailedFoodType', 'taste', 'mainIngredient', 'secondaryIngredient', 'cookingMethod', 'similarity_score']])
print(similar_foods[['name']].to_json(orient='records'))

# In[10]:


#type(model_predictions)



