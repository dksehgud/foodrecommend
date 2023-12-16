#!/usr/bin/env python
# coding: utf-8

# In[2]:
import pandas as pd
from fuzzywuzzy import process
import sys
import io

sys.stdout = io.TextIOWrapper(sys.stdout.detach(), encoding='utf-8')
sys.stderr = io.TextIOWrapper(sys.stderr.detach(), encoding='utf-8')

food_db_path = './public/food_db_result_final.xlsx'
food_db = pd.read_excel(food_db_path)

def get_food_attributes_and_similarity(user_food_items, food_db):
    food_info = pd.DataFrame()

    for food_item in user_food_items:
        best_match, similarity = process.extractOne(food_item, food_db['name'].tolist())

        # food_attributes가 Series일 수 있으므로 DataFrame으로 변환
        food_attributes = pd.DataFrame([food_db.loc[food_db['name'] == best_match].iloc[0].to_dict()])

        food_attributes['UserFood'] = food_item
        food_attributes['SimilarityScore'] = similarity


        food_info = pd.concat([food_info, food_attributes], ignore_index=True)
    
    return food_info

#예시 여기다 사용자가 입력한 음식 문자열 그대로 입력
#user_input = "크림파스타, 떡볶이"
user_input = sys.argv[1]
user_food_items = [item.strip() for item in user_input.split(',') if item.strip()]
#user_food_items = "크림파스타, 떡볶이"
food_info = get_food_attributes_and_similarity(user_food_items, food_db)

print(food_info.to_json(orient='records'))
#print(json.dumps(food_info))

# In[ ]:



# %%
