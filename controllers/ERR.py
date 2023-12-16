import sys
import io
import json

sys.stdout = io.TextIOWrapper(sys.stdout.detach(), encoding='utf-8')
sys.stderr = io.TextIOWrapper(sys.stderr.detach(), encoding='utf-8')

#ERR 계산
def calculate_err(gender, age, weight, height, activity_factor):
    if gender.lower() == '남자':
        if activity_factor == '비활동적':
            PA = 1.0
        elif activity_factor == '저활동적':
            PA = 1.11
        elif activity_factor == '활동적':
            PA = 1.25
        elif activity_factor == '매우 활동적':
            PA = 1.48
        else:
            raise ValueError("Invalid activity factor for male. Please use values 1, 2, 3, or 4.")

        err = round(662 - 9.53 * age + PA * (15.91 * weight + 5.396 * height), 2)

    elif gender.lower() == '여자':
        if activity_factor == '비활동적':
            PA = 1.0
        elif activity_factor == '저활동적':
            PA = 1.12
        elif activity_factor == '활동적':
            PA = 1.27
        elif activity_factor == '매우 활동적':
            PA = 1.45
        else:
            raise ValueError("Invalid activity factor for female. Please use values 1, 2, 3, or 4.")
        
        err = round(354 - 6.91 * age + PA * (9.36 * weight + 7.26 * height),2)
    else:
        raise ValueError("Invalid gender. Please enter 'male' or 'female'.")

    return err

#다른 영양성분 계산
def calculate_nutrients(err):

    carb_min = round(0.55 * err / 4, 2)
    carb_max = round(0.65 * err / 4, 2)

    fat_min = round(0.15 * err / 9, 2)
    fat_max = round(0.3 * err / 9, 2)

    pro_min = round(0.07 * err / 4 ,2)
    pro_max = round(0.2 * err / 4 ,2)

    sugar_max = round(0.1 * err /4 ,2)

    nat_max = 2400

    col_max = 300

    satfat_max = round(0.075 * err /9 ,2)

    transfat_max = round(0.01 * err /9 ,2)

    return carb_min, carb_max, fat_min, fat_max, pro_min, pro_max, sugar_max, nat_max, col_max, satfat_max, transfat_max

user_preferences = json.loads(sys.argv[1])
err_result = calculate_err(user_preferences['gender'], user_preferences['age'],
                        user_preferences['weight'], user_preferences['height'], user_preferences['activityLevel'])
carb_min, carb_max, fat_min, fat_max, pro_min, pro_max, sugar_max, nat_max, col_max, satfat_max, transfat_max = calculate_nutrients(err_result)

result_dict = {
    "calorie": err_result,
    "carbohydrate_min": carb_min,
    "carbohydrate_max": carb_max,
    "fat_min": fat_min,
    "fat_max": fat_max,
    "protein_min": pro_min,
    "protein_max": pro_max,
    "sugar": sugar_max,
    "sodium": nat_max,
    "cholesterol": col_max,
    "saturatedFattyAcid": satfat_max,
    "transFattyAcid": transfat_max
}
print(json.dumps(result_dict))